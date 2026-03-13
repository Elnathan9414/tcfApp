<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\TestResult;
use Illuminate\Support\Facades\Auth;    
use App\Models\User;

class QuestionController extends Controller
{


    public function index()
    {
        $questions = Question::paginate(10);
        return Inertia::render('Admin/Questions/Index', [
    'questions' => $questions
]);


    }



    public function comprehensionOrale()
{
    $questions = Question::where('type', 'comprehension_orale')
        ->get()
        ->map(function ($q) {
            return [
                'id' => $q->id,
                'type' => $q->type,
                'exercise_number' => $q->exercise_number,
                'question' => $q->question,
                'choices' => $q->choices,
                'answer' => $q->answer,
                'image_url' => $q->image_url,
                'audio_url' => $q->audio_url,
            ];
        });

    return Inertia::render('ComprehensionOrale', [
        'questions' => $questions,
    ]);
}
       public function structureLangue()
    {
        $questions = Question::where('type', 'structure_langue')
            ->orderBy('exercise_number')
            ->get()
            ->map(fn($q) => [
                'id' => $q->id,
                'type' => $q->type,
                'exercise_number' => $q->exercise_number,
                'question' => $q->question,
                'choices' => $q->choices,
                'answer' => $q->answer,
            ]);

        return Inertia::render('StructureLangue', [
            'questions' => $questions
        ]);
    }


    
public function comprehensionEcrite()
{
    $questions = Question::where('type', 'comprehension_ecrite')
        ->orderBy('exercise_number')
        ->get()
        ->map(function ($q) {
            return [
                'id' => $q->id,
                'type' => $q->type,
                'exercise_number' => $q->exercise_number,
                'question' => $q->question,
                'choices' => $q->choices ?? [],
                'answer' => $q->answer,

                // génération de l'URL de l'image si elle existe
                'image_url' => $q->image 
                    ? Storage::url($q->image)
                    : null,
            ];
        });

    return Inertia::render('ComprehensionEcrite', [
        'questions' => $questions
    ]);
}

public function submitComprehensionOrale(Request $request)
{
    $answers = $request->answers;
    $questionIds = $request->question_ids;

    // Charger uniquement les questions de l'exercice actif
    $questions = Question::whereIn('id', $questionIds)->get();

    $correct = 0;

    foreach ($questions as $q) {
        if (isset($answers[$q->id]) && intval($answers[$q->id]) === intval($q->answer)) {
            $correct++;
        }
    }

    $total = $questions->count();
    $percentage = ($correct / $total) * 100;

    $level = $this->convertToCECRL($percentage);

    TestResult::create([
        'user_id' => Auth::id(),
        'test_type' => 'comprehension_orale',
        'score' => $correct,
        'total' => $total,
        'percentage' => round($percentage),
        'level' => $level,
    ]);

    return Inertia::render('Tests/Summary', [
        'correct' => $correct,
        'total' => $total,
        'percentage' => round($percentage),
        'level' => $level,
        'testType' => 'comprehension-orale',
    ]);
}

public function submitStructureLangue(Request $request)
{
    $answers = $request->answers;
    $questionIds = $request->question_ids;

    $questions = Question::whereIn('id', $questionIds)->get();

    $correct = 0;

    foreach ($questions as $q) {
        if (isset($answers[$q->id]) && intval($answers[$q->id]) === intval($q->answer)) {
            $correct++;
        }
    }

    $total = $questions->count();
    $percentage = ($correct / $total) * 100;

    $level = $this->convertToCECRL($percentage);

    TestResult::create([
        'user_id' => Auth::id(),
        'test_type' => 'structure_langue',
        'score' => $correct,
        'total' => $total,
        'percentage' => round($percentage),
        'level' => $level,
    ]);

    return Inertia::render('Tests/Summary', [
        'correct' => $correct,
        'total' => $total,
        'percentage' => round($percentage),
        'level' => $level,
        'testType' => 'structure-langue',
    ]);
}

public function submitComprehensionEcrite(Request $request)
{
    $answers = $request->answers;
    $questionIds = $request->question_ids;

    $questions = Question::whereIn('id', $questionIds)->get();

    $correct = 0;

    foreach ($questions as $q) {
        if (isset($answers[$q->id]) && intval($answers[$q->id]) === intval($q->answer)) {
            $correct++;
        }
    }

    $total = $questions->count();
    $percentage = ($correct / $total) * 100;

    $level = $this->convertToCECRL($percentage);

    TestResult::create([
        'user_id' => Auth::id(),
        'test_type' => 'comprehension_ecrite',
        'score' => $correct,
        'total' => $total,
        'percentage' => round($percentage),
        'level' => $level,
    ]);

    return Inertia::render('Tests/Summary', [
        'correct' => $correct,
        'total' => $total,
        'percentage' => round($percentage),
        'level' => $level,
        'testType' => 'comprehension-ecrite',
    ]);
}

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|string',
            'exercise_number' => 'required|integer|min:1|max:20',
            'question' => 'required|string',
            'choices' => 'required|array|size:4',
            'answer' => 'required|integer|min:0|max:3',
            'audio' => 'nullable|file|mimes:mp3,wav',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('audio')) {
            $data['audio'] = $request->file('audio')->store('audio/questions', 's3');
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images/questions', 's3');
        }

        Question::create($data);

        return back();
    }

    public function update(Request $request, $id)
    {
        $question = Question::findOrFail($id);

        $data = $request->validate([
            'type' => 'required|string',
            'exercise_number' => 'required|integer|min:1|max:20',
            'question' => 'required|string',
            'choices' => 'required|array|size:4',
            'answer' => 'required|integer|min:0|max:3',
            'audio' => 'nullable|file|mimes:mp3,wav',
            'image' => 'nullable|image'
        ]);

        if ($request->hasFile('audio')) {
            $data['audio'] = $request->file('audio')->store('audio/questions', 's3');
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images/questions', 's3');
        }

        $question->update($data);

        return back();
    }

    public function destroy($id)
    {
        Question::findOrFail($id)->delete();
        return back();
    }

    private function convertToCECRL($percentage)
    {
        if ($percentage >= 80) {
            return 'C2';
        } elseif ($percentage >= 70) {
            return 'C1';
        } elseif ($percentage >= 60) {
            return 'B2';
        } elseif ($percentage >= 50) {
            return 'B1';
        } elseif ($percentage >= 40) {
            return 'A2';
        } else {
            return 'A1';
        }
    }
}
