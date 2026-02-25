<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Retourne toutes les questions d’un type donné
     */
    public function index($type)
    {
        return response()->json([
            'questions' => Question::where('type', $type)->get()
        ]);
    }

    /**
     * Ajoute une nouvelle question
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string',
            'choices' => 'nullable|array',
            'answer' => 'nullable|string',
            'type' => 'required|string'
        ]);

        $question = Question::create($validated);

        return response()->json([
            'message' => 'Question créée avec succès',
            'question' => $question
        ], 201);
    }

    /**
     * Affiche une question précise
     */
    public function show(Question $question)
    {
        return response()->json($question);
    }

    /**
     * Met à jour une question
     */
    public function update(Request $request, Question $question)
    {
        $validated = $request->validate([
            'text' => 'sometimes|string',
            'choices' => 'sometimes|array',
            'answer' => 'sometimes|string|nullable',
            'type' => 'sometimes|string'
        ]);

        $question->update($validated);

        return response()->json([
            'message' => 'Question mise à jour',
            'question' => $question
        ]);
    }

    /**
     * Supprime une question
     */
    public function destroy(Question $question)
    {
        $question->delete();

        return response()->json([
            'message' => 'Question supprimée'
        ]);
    }
}