<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiCorrectionService
{
    public function correctText(string $text, int $task)
    {
        $prompt = $this->buildPrompt($text, $task);

        $response = Http::withToken(config('services.deepseek.key'))
            ->retry(3, 1000) // retry automatique
            ->post('https://api.deepseek.com/chat/completions', [
                'model' => 'deepseek-chat',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Tu es un correcteur officiel du TCF Canada. Réponds uniquement en JSON valide.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ],
                ],
                'temperature' => 0.2,
            ]);

        // Gestion erreur API
        if ($response->failed()) {
            Log::error('DeepSeek API Error', [
                'status' => $response->status(),
                'body' => $response->json()
            ]);

            return [
                'error' => true,
                'message' => 'Erreur API DeepSeek'
            ];
        }

        $content = $response->json()['choices'][0]['message']['content'] ?? '';

        // Extraction du JSON propre
        $cleanJson = $this->extractJson($content);

        $decoded = json_decode($cleanJson, true);

        // Vérification JSON valide
        if (!$decoded) {
            Log::error('Invalid JSON from AI', [
                'raw' => $content
            ]);

            return [
                'error' => true,
                'message' => 'Réponse IA invalide'
            ];
        }

        // Vérification structure minimale
        if (!isset($decoded['score'], $decoded['niveau'])) {
            return [
                'error' => true,
                'message' => 'Structure JSON invalide'
            ];
        }

        return $decoded;
    }

    private function extractJson(string $text): string
    {
        preg_match('/\{.*\}/s', $text, $matches);
        return $matches[0] ?? '';
    }

    private function buildPrompt(string $text, int $task)
    {
        return <<<PROMPT
Corrige ce texte selon les critères officiels du TCF Canada.

Tâche : $task
Texte :
$text

IMPORTANT :
- Réponds UNIQUEMENT avec un JSON valide
- Ne mets aucun texte avant ou après
- Respecte STRICTEMENT la structure

Format attendu :
{
  "score": "0 à 20",
  "niveau": "A2/B1/B2",
  "points_forts": ["..."],
  "erreurs": [
    {"type": "grammaire", "detail": "..."}
  ],
  "reformulation": "...",
  "conseils": ["..."]
}
PROMPT;
    }
}