<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Services\AiCorrectionService;

class ExpressionEcriteController extends Controller
{
    public function years()
    {
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

    public function correct(Request $request, AiCorrectionService $service)
    {
        $request->validate([
            'text' => 'required|string|min:20',
            'task' => 'required|integer|exists:questions,task_number',
        ]);

        try {
            $result = $service->correctText($request->text, $request->task);

            // ❌ erreur IA (Gemini, JSON, etc.)
            if (isset($result['error']) && $result['error'] === true) {
                Log::error('AI correction failed', [
                    'task' => $request->task,
                    'details' => $result,
                ]);

                return response()->json([
                    'success' => false,
                    'message' => $result['message'],
                    'details' => $result['details'] ?? null,
                ], 200); // ✅ IMPORTANT
            }

            // ✅ succès
            return response()->json([
                'success' => true,
                'data' => $result,
            ]);

        } catch (\Throwable $e) {
            Log::error('Erreur correction expression écrite', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'task' => $request->task,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Une erreur serveur est survenue.',
            ], 500); // ✅ vrai 500 uniquement ici
        }
    }
}