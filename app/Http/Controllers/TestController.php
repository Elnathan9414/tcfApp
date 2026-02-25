<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TestResult;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
{
    public function summary(Request $request)
{
    $type = $request->type;
    $answers = $request->answers;

    $questions = Question::where('type', $type)->get();

    $score = 0;
    $total = $questions->count();

    foreach ($questions as $q) {
        if (!$q->answer) continue;
        if (!isset($answers[$q->id])) continue;
        if ($answers[$q->id] === $q->answer) $score++;
    }

    // Enregistrer dans la base
    TestResult::create([
        'user_id' => Auth::id(),
        'type' => $type,
        'score' => $score,
        'total' => $total,
        'answers' => $answers,
    ]);

    return Inertia::render('Tests/Summary', [
        'type' => $type,
        'score' => $score,
        'total' => $total,
        'answers' => $answers,
        'questions' => $questions
    ]);
}
}