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
Format de la Tâche 1
La première tâche est généralement la plus simple et correspond souvent à un niveau A2 à B1. Il s'agit d'écrire un message court dans un contexte de la vie quotidienne.

Types de messages demandés :

Message à un ami ou un collègue
Email pour signaler quelque chose
Note pour demander ou proposer quelque chose
Invitation à un événement
Structure Recommandée
1. Ouverture
Salutation adaptée au destinataire (Cher/Chère, Bonjour, Salut)

2. Corps du message
Présentation de l'objet, détails importants, demande ou proposition

3. Fermeture
Formule de politesse adaptée au contexte (Amicalement, Cordialement)

Conseils Pratiques
Respectez le nombre de mots : Visez 80-100 mots pour être dans la fourchette idéale
Adaptez le registre : Tutoiement pour un ami, vouvoiement pour un professionnel
Soyez clair et concis : Allez droit au but, évitez les répétitions
Relisez-vous : Vérifiez l'orthographe et la cohérence du message. 
Format de la Tâche 2
Il s'agit le plus souvent de la rédaction d'un article de blog. On demande souvent au candidat de :

Parler d'une expérience vécue dans le passé
Décrire une situation personnelle
Raconter un événement
Partager un souvenir ou une anecdote
Structure Recommandée
1. Introduction
Contexte de l'expérience (quand, où, pourquoi)

2. Développement
Récit détaillé avec descriptions, émotions, actions

3. Conclusion
Leçon tirée, sentiment final ou recommandation

Conseils Pratiques
Utilisez les temps du passé : Passé composé, imparfait, plus-que-parfait pour raconter
Ajoutez des détails sensoriels : Ce que vous avez vu, entendu, ressenti
Utilisez des connecteurs temporels : D'abord, ensuite, puis, enfin, finalement
Exprimez vos émotions : J'étais ravi, surpris, ému, impressionné...
Format de la Tâche 3
C'est la tâche la plus exigeante. Le candidat doit obligatoirement rédiger un texte argumentatif qui compare deux points de vue.

Vous recevez :

Un sujet sous forme de question
Deux documents à lire (opinions contradictoires)
Exemple : Sur les jeux vidéo pour les enfants, un document sera FAVORABLE, l'autre DÉFAVORABLE
Structure Obligatoire en 2 Parties avec Titre

Partie 1 : 40-60 mots

Introduction générale et neutre
Résumé des deux documents
Utilisation d'un connecteur d'opposition pour montrer la contradiction
Partie 2 : 80-120 mots

Expression du point de vue personnel du candidat
Arguments pour justifier sa position
Conclusion personnelle
Conseils Pratiques
Lisez attentivement les 2 documents : Identifiez clairement la position de chaque auteur
N'oubliez pas le titre : Il doit refléter le sujet du débat
Restez neutre en partie 1 : Ne donnez pas votre avis, résumez objectivement
Argumentez en partie 2 : Justifiez votre position avec des exemples concrets
Tâche : $task
Texte de l'utilisateur :
$text

Retourne STRICTEMENT ce JSON valide :

{
  \"score\": \"0 à 20\",
  \"niveau\": \"A1//A2//B1//B2//C1//C2\",
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