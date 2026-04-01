<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AiCorrectionService
{
    public function correctText(string $text, int $task)
    {
        // Récupérer la clé depuis la configuration (nom de la clé = 'key')
        $apiKey = config('services.deepseek.key');

        // Vérifier si la clé existe
        if (!$apiKey) {
            return [
                'error' => true,
                'message' => 'Clé API DeepSeek manquante. Ajoutez DEEPSEEK_API_KEY dans Laravel Cloud.',
                'details' => null,
            ];
        }

        $prompt = $this->buildPrompt($text, $task);

        // Appel API DeepSeek
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
        ])->timeout(30)->post('https://api.deepseek.com/chat/completions', [
            'model' => 'deepseek-chat',
            'messages' => [
                ['role' => 'system', 'content' => 'Tu es un correcteur officiel du TCF Canada.'],
                ['role' => 'user', 'content' => $prompt],
            ],
            'temperature' => 0.2,
        ]);

        // Si DeepSeek renvoie une erreur HTTP
        if ($response->failed()) {
            return [
                'error' => true,
                'message' => 'Erreur API DeepSeek',
                'details' => $response->json() ?? $response->body(),
            ];
        }

        $json = $response->json();

        if (!isset($json['choices'][0]['message']['content'])) {
            return [
                'error' => true,
                'message' => 'Réponse DeepSeek invalide',
                'details' => $json,
            ];
        }

        // Décodage du JSON retourné par DeepSeek
        try {
            $content = json_decode($json['choices'][0]['message']['content'], true, 512, JSON_THROW_ON_ERROR);

            if (!is_array($content)) {
                throw new \UnexpectedValueException('Contenu DeepSeek non attendu.');
            }

            return $content;
        } catch (\Throwable $e) {
            return [
                'error' => true,
                'message' => 'Impossible de décoder la réponse JSON de DeepSeek.',
                'details' => $json['choices'][0]['message']['content'] ?? $response->body(),
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