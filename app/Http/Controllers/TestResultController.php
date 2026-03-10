<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TestResult;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class TestResultController extends Controller
{
    public function submitComprehensionOrale(Request $request)
    {
        return $this->storeResult(
            'comprehension_orale',
            $request->correct,
            $request->total
        );
    }

    public function submitComprehensionEcrite(Request $request)
    {
        return $this->storeResult(
            'comprehension_ecrite',
            $request->correct,
            $request->total
        );
    }

    public function submitStructureLangue(Request $request)
    {
        return $this->storeResult(
            'structure_langue',
            $request->correct,
            $request->total
        );
    }

    /**
     * Méthode interne réutilisée pour éviter la duplication
     */
    private function storeResult(string $type, int $correct, int $total)
    {
        $percentage = round(($correct / $total) * 100);

        TestResult::create([
            'user_id' => Auth::id(),
            'test_type' => $type,
            'score' => $correct,
            'total' => $total,
            'percentage' => $percentage,
            'level' => $this->calculateLevel($correct, $total),
        ]);

        return response()->json(['success' => true]);
    }

    /**
     * Calcul du niveau CECRL
     */
    private function calculateLevel($score, $total)
    {
        $percentage = ($score / $total) * 100;

        return match (true) {
            $percentage >= 90 => 'C2',
            $percentage >= 80 => 'C1',
            $percentage >= 70 => 'B2',
            $percentage >= 60 => 'B1',
            $percentage >= 50 => 'A2',
            default => 'A1',
        };
    }
}