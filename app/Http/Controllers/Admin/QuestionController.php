<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Questions/Index', [
            'questions' => Question::orderBy('id', 'desc')->paginate(20)
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
            $data['audio'] = $request->file('audio')->store('audio/questions', 'public');
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images/questions', 'public');
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
            $data['audio'] = $request->file('audio')->store('audio/questions', 'public');
        }

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images/questions', 'public');
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