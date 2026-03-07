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
        $questions = Question::all()->map(function ($q) {
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
                'image_url' => $q->image_url,
            ]);

        return Inertia::render('ComprehensionEcrite', [
            'questions' => $questions
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
}
