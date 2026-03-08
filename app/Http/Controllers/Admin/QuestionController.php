<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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
        ->map(fn($q) => [
            'id' => $q->id,
            'type' => $q->type,
            'exercise_number' => $q->exercise_number,
            'question' => $q->question,
            'choices' => $q->choices,
            'answer' => $q->answer,
            'image_url' => $q->image_url, // OBLIGATOIRE
        ]);

    return Inertia::render('ComprehensionEcrite', [
        'questions' => $questions
    ]);
}
public function submitComprehensionEcrite(Request $request)
{
    // 1. Récupérer les réponses envoyées par React
    $answers = $request->answers;

    // 2. Récupérer les questions du test
    $questions = Question::where('type', 'comprehension_ecrite')->get();

    // 3. Calcul du score
    $correct = 0;

    foreach ($questions as $q) {
        if (isset($answers[$q->id]) && $answers[$q->id] === $q->answer) {
            $correct++;
        }
    }

    $total = $questions->count();
    $percentage = ($correct / $total) * 100;

    // 4. Déterminer le niveau CECRL
    $level = $this->convertToCECRL($percentage);

    // 5. Retourner la page Summary
   return Inertia::render('Tests/Summary', [
    'correct' => $correct,
    'total' => $total,
    'percentage' => round($percentage),
    'level' => $level,
    'testType' => 'comprehension_ecrite',
]);
}

public function submitComprehensionOrale(Request $request)
{
    // 1. Récupérer les réponses envoyées par React
    $answers = $request->answers;

    // 2. Récupérer les questions du test
    $questions = Question::where('type', 'comprehension_orale')->get();

    // 3. Calcul du score
    $correct = 0;

    foreach ($questions as $q) {

        // 👉 C’EST ICI que tu mets la ligne
        if (isset($answers[$q->id]) && intval($answers[$q->id]) === intval($q->answer)) {
            $correct++;
        }
    }

    // 4. Calcul du total et du pourcentage
    $total = $questions->count();
    $percentage = ($correct / $total) * 100;

    // 5. Déterminer le niveau CECRL
    $level = $this->convertToCECRL($percentage);

    // 6. Retourner la page Summary
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
    // 1. Récupérer les réponses envoyées par React
    $answers = $request->answers;

    // 2. Récupérer les questions du test
    $questions = Question::where('type', 'structure_langue')->get();

    // 3. Calcul du score
    $correct = 0;

    foreach ($questions as $q) {
        if (isset($answers[$q->id]) && $answers[$q->id] === $q->answer) {
            $correct++;
        }
    }

    $total = $questions->count();
    $percentage = ($correct / $total) * 100;

    // 4. Déterminer le niveau CECRL
    $level = $this->convertToCECRL($percentage);

    // 5. Retourner la page Summary
   return Inertia::render('Tests/Summary', [
    'correct' => $correct,
    'total' => $total,
    'percentage' => round($percentage),
    'level' => $level,
    'testType' => 'structure-langue',
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
