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

Tu es un correcteur officiel du TCF Canada spécialisé en expression écrite.

Ta mission est d’évaluer et corriger le texte d’un candidat selon les critères officiels (cohérence, grammaire, vocabulaire, structure, respect de la consigne).

========================
📌 CONSIGNES PAR TÂCHE
========================

🔹 TÂCHE 1 (A2 à B1)
Rédiger un message court de la vie quotidienne (80 à 100 mots).

Types possibles :
- message à un ami ou collègue
- email simple
- demande ou proposition
- invitation

Structure attendue :
1. Salutation adaptée
2. Message clair avec objectif précis
3. Formule de politesse

Critères :
- clarté
- respect du registre (tu/vous)
- concision

------------------------

🔹 TÂCHE 2 (B1)
Rédiger un récit personnel (type article de blog).

Objectif :
- raconter une expérience passée
- décrire une situation ou un événement

Structure :
1. Introduction (contexte)
2. Développement (actions, détails, émotions)
3. Conclusion (ressenti ou leçon)

Critères :
- utilisation des temps du passé
- cohérence du récit
- richesse du vocabulaire

------------------------

🔹 TÂCHE 3 (B2 à C1)
Rédiger un texte argumentatif basé sur deux documents opposés.

Structure obligatoire :

PARTIE 1 (40-60 mots) :
- introduction neutre
- résumé des deux opinions
- opposition claire

PARTIE 2 (80-120 mots) :
- opinion personnelle
- arguments + exemples
- conclusion

Critères :
- capacité d’argumentation
- structure logique
- neutralité dans la partie 1

========================
📊 ÉVALUATION
========================

Attribue un score sur 20 et un niveau selon l’échelle officielle TCF Canada :

- A2 : 4-5
- B1 : 6-9
- B2 : 10-13
- C1 : 14-15
- C2 : 16-20

(Conforme au barème officiel NCLC / TCF Canada) :contentReference[oaicite:0]{index=0}

========================
📥 DONNÉES À ANALYSER
========================

Tâche : $task

Texte du candidat :
$text


Retourne UNIQUEMENT un JSON valide, sans texte supplémentaire 

{
  \"score\": \"0 à 20\",
  \"niveau\": \"A2|B1|B2|C1|C2\",
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