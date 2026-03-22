<?php

namespace App\Http\Controllers;

use App\Models\ExpressionTask;
use Inertia\Inertia;

class ExpressionEcriteController extends Controller
{
    /**
     * NIVEAU 1 : Affiche les années disponibles
     */
    public function years()
    {
        return Inertia::render('ExpressionEcrite/Index', [
            'years' => [2026, 2025, 2024],
        ]);
    }

    /**
     * NIVEAU 2 : Affiche les mois d'une année
     */
    public function months($year)
    {
        // Tu peux plus tard rendre ça dynamique via la base
        $months = [
            ['slug' => 'janvier', 'label' => 'Janvier'],
            ['slug' => 'fevrier', 'label' => 'Février'],
            ['slug' => 'mars', 'label' => 'Mars'],
            ['slug' => 'avril', 'label' => 'Avril'],
            ['slug' => 'mai', 'label' => 'Mai'],
            ['slug' => 'juin', 'label' => 'Juin'],
            ['slug' => 'juillet', 'label' => 'Juillet'],
            ['slug' => 'aout', 'label' => 'Août'],
            ['slug' => 'septembre', 'label' => 'Septembre'],
            ['slug' => 'octobre', 'label' => 'Octobre'],
            ['slug' => 'novembre', 'label' => 'Novembre'],
            ['slug' => 'decembre', 'label' => 'Décembre'],
        ];

        // Compter combien de tâches existent pour chaque mois
        foreach ($months as &$m) {
            $m['count'] = ExpressionTask::where('year', $year)
                ->where('month', $m['slug'])
                ->count();
        }

        return Inertia::render('ExpressionEcrite/Index', [
            'selectedYear' => $year,
            'months' => $months,
        ]);
    }

    /**
     * NIVEAU 3 : Affiche les tâches d'un mois donné
     */
    public function tasks($year, $month)
    {
        $tasks = ExpressionTask::where('year', $year)
            ->where('month', $month)
            ->orderBy('task_number')
            ->get()
            ->map(function ($task) {
                return [
                    'number' => $task->task_number,
                    'label' => $task->label,
                    'subject' => $task->subject,
                ];
            });

        return Inertia::render('ExpressionEcrite/Index', [
            'selectedYear' => $year,
            'selectedMonth' => $month,
            'tasks' => $tasks,
        ]);
    }
    public function write($year, $month, $task)
{
    $taskData = ExpressionTask::where('year', $year)
        ->where('month', $month)
        ->where('task_number', $task)
        ->firstOrFail();

    return Inertia::render('ExpressionEcrite/Write', [
        'year' => $year,
        'month' => $month,
        'task' => $task,
        'label' => $taskData->label,
        'subject' => $taskData->subject,
    ]);
}
}