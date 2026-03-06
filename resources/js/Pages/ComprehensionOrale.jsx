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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {[...Array(20)].map((_, i) => {
                        const num = i + 1;
                        return (
                            <button
                                key={num}
                                onClick={() => setActiveExercise(num)}
                                className={`p-3 rounded-lg border text-center ${activeExercise === num
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
                {/* AUDIO EN HAUT */}
{exerciseQuestions[0]?.audio && (
    <audio
        controls
        src={` src={q.audio_url} controls}`}
        className="w-full mb-6"
    />
)}

{/* IMAGE À GAUCHE / QUESTIONS À DROITE */}

{/* AUDIO UNIQUE POUR TOUT L’EXERCICE */}


{/* SECTIONS PAR QUESTION */}
<div className="space-y-10">
    {exerciseQuestions.map((q) => (
        <div key={q.id} className="bg-white p-6 rounded-xl shadow space-y-6">

            {/* IMAGE À GAUCHE / QUESTION À DROITE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                {/* IMAGE */}
                <div>
                    {q.image && (
                        <img
                            src={`/storage/${q.image}`}
                            alt="Illustration"
                            className="rounded-lg w-full max-w-md border shadow"
                        />
                    )}
                </div>

                {/* QUESTION + CHOIX */}
                <div className="space-y-4">
                    <p className="font-medium">{q.question}</p>

                    <div className="space-y-2">
                        {q.choices.map((choice, i) => (
                            <label key={i} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name={`q-${q.id}`}
                                    onChange={() => handleSelect(q.id, i)}
                                />
                                <span>{choice}</span>
                            </label>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    ))}
</div>
            </div>
        </AuthenticatedLayout>
    );
}