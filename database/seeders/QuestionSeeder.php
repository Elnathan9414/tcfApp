<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        // -------------------------------
        // COMPRÉHENSION ORALE (orale)
        // -------------------------------
        Question::create([
            'text' => "Vous entendez : « Le train à destination de Montréal aura 20 minutes de retard ». Que devez-vous comprendre ?",
            'choices' => [
                "A. Le train est annulé",
                "B. Le train partira plus tard",
                "C. Le train arrive plus tôt",
                "D. Le train change de destination"
            ],
            'answer' => "B",
            'type' => "orale"
        ]);

        Question::create([
            'text' => "Vous entendez : « Merci de laisser votre message après le signal sonore ». Où êtes-vous ?",
            'choices' => [
                "A. Dans un magasin",
                "B. Sur une messagerie vocale",
                "C. À la gare",
                "D. Dans une réunion"
            ],
            'answer' => "B",
            'type' => "orale"
        ]);

        // -------------------------------
        // COMPRÉHENSION ÉCRITE (ecrite)
        // -------------------------------
        Question::create([
            'text' => "Vous lisez une affiche : « Promotion valable jusqu’à dimanche ». Que signifie cette phrase ?",
            'choices' => [
                "A. La promotion commence dimanche",
                "B. La promotion se termine dimanche",
                "C. La promotion n’est valable que dimanche",
                "D. La promotion est annulée dimanche"
            ],
            'answer' => "B",
            'type' => "ecrite"
        ]);

        Question::create([
            'text' => "Vous recevez un message : « Merci de confirmer votre présence avant vendredi ». Que devez-vous faire ?",
            'choices' => [
                "A. Annuler votre participation",
                "B. Répondre avant vendredi",
                "C. Venir vendredi",
                "D. Payer avant vendredi"
            ],
            'answer' => "B",
            'type' => "ecrite"
        ]);

        // -------------------------------
        // EXPRESSION ÉCRITE (expression_ecrite)
        // -------------------------------
        Question::create([
            'text' => "Décrivez votre routine quotidienne en quelques phrases.",
            'choices' => [],
            'answer' => null,
            'type' => "expression_ecrite"
        ]);

        Question::create([
            'text' => "Expliquez un souvenir important de votre vie.",
            'choices' => [],
            'answer' => null,
            'type' => "expression_ecrite"
        ]);

        // -------------------------------
        // EXPRESSION ORALE (expression_orale)
        // -------------------------------
        Question::create([
            'text' => "Présentez-vous en quelques phrases.",
            'choices' => [],
            'answer' => null,
            'type' => "expression_orale"
        ]);

        Question::create([
            'text' => "Parlez d’un projet que vous souhaitez réaliser.",
            'choices' => [],
            'answer' => null,
            'type' => "expression_orale"
        ]);
    }
}