<?php

namespace App\Http\Controllers;

use App\Models\TestResult;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        // Nombre total de tentatives
        $attempts = TestResult::where('user_id', $userId)->count();

        // Nombre total de bonnes réponses
        $correctAnswers = TestResult::where('user_id', $userId)
            ->whereNotNull('score')
            ->sum('score');

        // Nombre total de questions répondues
        $totalQuestionsAnswered = TestResult::where('user_id', $userId)
            ->whereNotNull('total')
            ->sum('total');

        // Tentatives par type d'épreuve
        $attemptsByType = TestResult::where('user_id', $userId)
            ->selectRaw('type, COUNT(*) as count')
            ->groupBy('type')
            ->get();

        return Inertia::render('Dashboard', [
            'attempts' => $attempts,
            'correctAnswers' => $correctAnswers,
            'totalQuestionsAnswered' => $totalQuestionsAnswered,
            'attemptsByType' => $attemptsByType,
        ]);
    }
}