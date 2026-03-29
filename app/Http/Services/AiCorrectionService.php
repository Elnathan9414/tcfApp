<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AiCorrectionService
{
    public function correctText(string $text, int $task)
    {
        // Vérifier si la clé existe
        if (!env('DEEPSEEK_API_KEY')) {
            return [
                'error' => true,
                'message' => 'Clé API DeepSeek manquante. Ajoutez DEEPSEEK_API_KEY dans Laravel Cloud.',
                'details' => null,
            ];
        }

        $prompt = $this->buildPrompt($text, $task);

        // Appel API DeepSeek
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('DEEPSEEK_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.deepseek.com/chat/completions', [
            'model' => 'deepseek-chat',
            'messages' => [
                ['role' => 'system', 'content' => 'Tu es un correcteur officiel du TCF Canada.'],
                ['role' => 'user', 'content' => $prompt],
            ],
            'temperature' => 0.2,
        ]);

        // Si DeepSeek renvoie une erreur HTTP (403, 401, 500…)
        if ($response->failed()) {
            return [
                'error' => true,
                'message' => 'Erreur API DeepSeek',
                'details' => $response->json(),
            ];
        }

        // Extraire le contenu
        $json = $response->json();

        if (!isset($json['choices'][0]['message']['content'])) {
            return [
                'error' => true,
                'message' => 'Réponse DeepSeek invalide',
                'details' => $json,
            ];
        }

        // DeepSeek renvoie du texte → on le convertit en JSON
        $content = json_decode($json['choices'][0]['message']['content'], true);

        if (!$content) {
            return [
                'error' => true,
                'message' => 'Impossible de décoder la réponse JSON de DeepSeek.',
                'details' => $json['choices'][0]['message']['content'],
            ];
        }

        return $content;
    }

    private function buildPrompt(string $text, int $task)
    {
        return "
Corrige ce texte selon les critères officiels du TCF Canada.

Tâche : $task
Texte de l’utilisateur :
$text

Retourne STRICTEMENT ce JSON :

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