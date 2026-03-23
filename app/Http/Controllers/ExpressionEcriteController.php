<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Inertia\Inertia;

class ExpressionEcriteController extends Controller
{
    public function years()
    {
        // Récupérer les années disponibles depuis la base
        $years = Question::where('type', 'expression_ecrite')
            ->select('year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        return Inertia::render('ExpressionEcrite/Index', [
            'years' => $years,
        ]);
    }

    public function months($year)
    {
        $monthsList = [
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

        foreach ($monthsList as &$m) {
            $m['count'] = Question::where('type', 'expression_ecrite')
                ->where('year', $year)
                ->where('month', $m['slug'])
                ->count();
        }

        return Inertia::render('ExpressionEcrite/Index', [
            'selectedYear' => $year,
            'months' => $monthsList,
        ]);
    }

    public function tasks($year, $month)
    {
        $tasks = Question::where('type', 'expression_ecrite')
            ->where('year', $year)
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
        $taskData = Question::where('type', 'expression_ecrite')
            ->where('year', $year)
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