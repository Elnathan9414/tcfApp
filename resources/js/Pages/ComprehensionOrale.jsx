import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function ComprehensionOrale({ questions }) {

    const [activeExercise, setActiveExercise] = useState(1);

    // Filtrer les questions de l'exercice actif
    const exerciseQuestions = questions.filter(
        q => q.exercise_number === activeExercise
    );

    return (
        <AuthenticatedLayout>
            <Head title="Compréhension orale" />

            <div className="p-10 space-y-10">
                <h1 className="text-3xl font-bold text-center text-gray-200">Compréhension orale</h1>

                {/* Boutons des 20 exercices */}
                <div className="grid grid-cols-5 gap-4">
                    {[...Array(20)].map((_, i) => {
                        const num = i + 1;
                        return (
                            <button
                                key={num}
                                onClick={() => setActiveExercise(num)}
                                className={`p-3 rounded-lg border text-center ${
                                    activeExercise === num
                                        ? "bg-blue-600 text-white"
                                        : "bg-white hover:bg-gray-100"
                                }`}
                            >
                                Exercice {num}
                            </button>
                        );
                    })}
                </div>

                {/* Affichage de l'exercice sélectionné */}
                <div className="bg-white p-6 rounded-xl shadow space-y-6">
                    <h2 className="text-2xl font-semibold">
                        Exercice {activeExercise}
                    </h2>

                    {exerciseQuestions.length === 0 && (
                        <p>Aucune question pour cet exercice.</p>
                    )}

                    {exerciseQuestions.map((q) => (
                        <div key={q.id} className="space-y-4">

                            {/* Audio */}
                            {q.audio && (
                                <audio controls src={`/storage/${q.audio}`} className="w-full" />
                            )}

                            {/* Image */}
                            {q.image && (
                                <img
                                    src={`/storage/${q.image}`}
                                    alt="Illustration"
                                    className="rounded-lg max-w-md"
                                />
                            )}

                            <p className="font-medium">{q.question}</p>

                            <div className="space-y-2">
                                {q.choices.map((choice, i) => (
                                    <label key={i} className="flex items-center space-x-2">
                                        <input type="radio" name={`q-${q.id}`} />
                                        <span>{choice}</span>
                                    </label>
                                ))}
                            </div>

                            <hr />
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}