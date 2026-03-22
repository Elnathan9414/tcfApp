<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ExpressionTask;

class ExpressionTaskSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            // 2024 — Juillet
            [
                'year' => 2024,
                'month' => 'juillet',
                'task_number' => 1,
                'label' => 'Message (60–120 mots)',
                'subject' => 'Vous écrivez un message à un ami pour lui raconter une situation récente qui vous a surpris.',
            ],
            [
                'year' => 2024,
                'month' => 'juillet',
                'task_number' => 2,
                'label' => 'Narration (120–150 mots)',
                'subject' => 'Racontez un événement inattendu qui vous est arrivé pendant un voyage.',
            ],
            [
                'year' => 2024,
                'month' => 'juillet',
                'task_number' => 3,
                'label' => 'Argumentation (120–180 mots)',
                'subject' => 'Donnez votre opinion sur l’importance de voyager pour découvrir de nouvelles cultures.',
            ],

            // 2024 — Août
            [
                'year' => 2024,
                'month' => 'aout',
                'task_number' => 1,
                'label' => 'Message (60–120 mots)',
                'subject' => 'Vous écrivez un message à un collègue pour l’inviter à un événement.',
            ],
            [
                'year' => 2024,
                'month' => 'aout',
                'task_number' => 2,
                'label' => 'Narration (120–150 mots)',
                'subject' => 'Racontez une journée mémorable passée avec un ami.',
            ],
            [
                'year' => 2024,
                'month' => 'aout',
                'task_number' => 3,
                'label' => 'Argumentation (120–180 mots)',
                'subject' => 'Expliquez si vous pensez que les réseaux sociaux ont un impact positif ou négatif sur la société.',
            ],

            // 2025 — Janvier
            [
                'year' => 2025,
                'month' => 'janvier',
                'task_number' => 1,
                'label' => 'Message (60–120 mots)',
                'subject' => 'Vous écrivez un message à un membre de votre famille pour lui souhaiter la nouvelle année.',
            ],
            [
                'year' => 2025,
                'month' => 'janvier',
                'task_number' => 2,
                'label' => 'Narration (120–150 mots)',
                'subject' => 'Racontez comment vous avez célébré le passage à la nouvelle année.',
            ],
            [
                'year' => 2025,
                'month' => 'janvier',
                'task_number' => 3,
                'label' => 'Argumentation (120–180 mots)',
                'subject' => 'Donnez votre avis sur l’importance de prendre de bonnes résolutions.',
            ],
        ];

        foreach ($data as $task) {
            ExpressionTask::create($task);
        }
    }
}