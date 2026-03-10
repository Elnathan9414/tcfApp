<?php

namespace App\Http\Controllers;

use App\Models\TestResult;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;

class DashboardController extends Controller
{
  
public function student()
{
    $userId = Auth::id();

    // Récupérer tous les résultats de l'utilisateur
    $results = TestResult::where('user_id', $userId)
        ->orderBy('created_at', 'desc')
        ->get();

    // Calcul des statistiques
    $stats = [
        'average' => round($results->avg('percentage')),
        'best' => $results->max('percentage'),
        'testsCount' => $results->count(),

        // Répartition par niveau CECRL
        'levels' => $results->groupBy('level')->map->count(),

        // Statistiques par type de test
        'byType' => $results->groupBy('test_type')->map(function ($group) {
            return [
                'avg' => round($group->avg('percentage')),
                'count' => $group->count(),
            ];
        }),
    ];

    return Inertia::render('Student/Dashboard', [
        'results' => $results,
        'stats' => $stats,
    ]);
}
}