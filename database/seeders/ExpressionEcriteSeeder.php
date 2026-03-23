<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;
use Faker\Factory as Faker;

class ExpressionEcriteSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('fr_FR');

        $years = [2024, 2025, 2026];

        $months = [
            'janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'
        ];

        foreach ($years as $year) {
            foreach ($months as $month) {

                // Tâche 1 — Message court
                Question::create([
                    'type' => 'expression_ecrite',
                    'year' => $year,
                    'month' => $month,
                    'task_number' => 1,
                    'label' => 'Message court • 60-120 mots • 10 min',
                    'subject' => "Votre ami(e) vous écrit : « {$faker->sentence(8)} ». "
                        . "Vous lui répondez dans un message où vous décrivez "
                        . "{$faker->sentence(6)}, {$faker->sentence(6)} et {$faker->sentence(6)}.",
                ]);

                // Tâche 2 — Courriel
                Question::create([
                    'type' => 'expression_ecrite',
                    'year' => $year,
                    'month' => $month,
                    'task_number' => 2,
                    'label' => 'Courriel • 120-150 mots • 20 min',
                    'subject' => "Vous avez participé à {$faker->sentence(4)}. "
                        . "L'organisateur vous demande un retour. "
                        . "Vous écrivez un courriel pour expliquer ce que vous avez aimé, "
                        . "ce que vous proposez d'améliorer et si vous recommanderiez l'activité.",
                ]);

                // Tâche 3 — Texte argumentatif
                Question::create([
                    'type' => 'expression_ecrite',
                    'year' => $year,
                    'month' => $month,
                    'task_number' => 3,
                    'label' => 'Texte argumentatif • 150-180 mots • 30 min',
                    'subject' => "Votre ville envisage {$faker->sentence(6)}. "
                        . "Vous écrivez un texte pour donner votre avis, présenter des arguments "
                        . "et proposer une solution alternative.",
                ]);
            }
        }
    }
}