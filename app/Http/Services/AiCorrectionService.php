<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AiCorrectionService
{
    public function correctText(string $text, int $task)
    {
        $prompt = $this->buildPrompt($text, $task);

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

        // DeepSeek renvoie du texte brut → on le convertit en JSON
        return json_decode($response->json()['choices'][0]['message']['content'], true);
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