<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiCorrectionService
{
    public function correctText(string $text, int $task)
    {
        $apiKey = config('services.gemini.key');

        if (!$apiKey) {
            return [
                'error' => true,
                'message' => 'Clé API Gemini manquante.',
                'details' => null,
            ];
        }

        $prompt = $this->buildPrompt($text, $task);

        try {
            $response = Http::timeout(30)->post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}",
                [
                    "contents" => [
                        [
                            "parts" => [
                                ["text" => $prompt]
                            ]
                        ]
                    ],
                    "generationConfig" => [
                        "temperature" => 0.2,
                        "response_mime_type" => "application/json"
                    ]
                ]
            );

            if ($response->failed()) {
                return [
                    'error' => true,
                    'message' => 'Erreur API Gemini',
                    'details' => $response->json() ?? $response->body(),
                ];
            }

            $json = $response->json();

            // 🔍 log pour debug
            Log::info('GEMINI RAW RESPONSE', $json);

            $content = $json['candidates'][0]['content']['parts'][0]['text'] ?? null;

            if (!$content) {
                return [
                    'error' => true,
                    'message' => 'Réponse Gemini vide',
                    'details' => $json,
                ];
            }

            // Nettoyage (au cas où)
            $cleaned = trim($content);
            $cleaned = preg_replace('/^```json|```$/m', '', $cleaned);

            $decoded = json_decode($cleaned, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return [
                    'error' => true,
                    'message' => 'JSON invalide retourné par Gemini',
                    'details' => $cleaned,
                ];
            }

            return $decoded;

        } catch (\Throwable $e) {
            Log::error('Gemini Exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'error' => true,
                'message' => 'Exception lors de l’appel à Gemini',
                'details' => $e->getMessage(),
            ];
        }
    }

    private function buildPrompt(string $text, int $task)
    {
        return "
Corrige ce texte selon les critères officiels du TCF Canada.

Tâche : $task
Texte de l'utilisateur :
$text

Retourne STRICTEMENT ce JSON valide :

{
  \"score\": \"0 à 20\",
  \"niveau\": \"A2/B1/B2\",
  \"points_forts\": [\"...\", \"...\"],
  \"erreurs\": [
    {\"type\": \"grammaire\", \"detail\": \"...\"},
    {\"type\": \"lexique\", \"detail\": \"...\"}
  ],
  \"reformulation\": \"Texte corrigé et amélioré\",
  \"conseils\": [\"...\", \"...\"] 
}
";
    }
}