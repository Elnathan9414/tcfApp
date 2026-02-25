<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI;

class AIQuestionController extends Controller
{
    public function generate(Request $request)
    {
        try {

            $type = $request->input('type', 'comprehension_ecrite');

            if (!config('services.openai.key')) {
                return response()->json([
                    'error' => 'Clé API OpenAI manquante'
                ], 500);
            }

            $client = OpenAI::client(config('services.openai.key'));

            $response = $client->chat()->create([
                'model' => 'gpt-5.2',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Tu es un générateur de questions TCF Canada.'
                    ],
                    [
                        'role' => 'user',
                        'content' => "
Génère 3 questions TCF Canada pour l’épreuve : $type.

Réponds STRICTEMENT en JSON valide.
Format :
[
  {
    \"text\": \"...\",
    \"choices\": [\"A. ...\", \"B. ...\", \"C. ...\", \"D. ...\"],
    \"answer\": \"A\"
  }
]
"
                    ]
                ],
                'temperature' => 0.7,
            ]);

            if (!isset($response->choices[0]->message->content)) {
                return response()->json([
                    'error' => 'Réponse OpenAI invalide'
                ], 500);
            }

            $raw = $response->choices[0]->message->content;

            // Nettoyage des ```json ```
            $clean = preg_replace('/```json|```/i', '', trim($raw));

            $parsed = json_decode($clean, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return response()->json([
                    'error' => 'JSON invalide retourné par OpenAI',
                    'raw' => $clean
                ], 500);
            }

            return response()->json([
                'questions' => $parsed
            ]);

        } catch (\Throwable $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }
    
}
