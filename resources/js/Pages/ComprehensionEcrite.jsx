import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ComprehensionEcrite({ questions }) {

    const [activeExercise, setActiveExercise] = useState(1);

    // Réponses de l'utilisateur
    const [answers, setAnswers] = useState({});

    // Questions de l'exercice actif
    const exerciseQuestions = questions.filter(
        q => q.exercise_number === activeExercise
    );

   const handleSubmit = () => {
    router.post('/submit-comprehension-ecrite', {
        answers: answers,
        question_ids: exerciseQuestions.map(q => q.id)
    }, {
        onSuccess: () => {
            console.log("Summary affichée !");
        }
    });
};

    return (
        <AuthenticatedLayout>
            <Head title="Compréhension Écrite" />

            <div className="p-10 space-y-10">

                <h1 className="text-3xl font-bold text-center text-gray-200">
                    Compréhension Écrite
                </h1>

                {/* Boutons des exercices */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

                {/* Questions */}
                <div className="space-y-10">
                    {exerciseQuestions.map((q) => (
                        <div key={q.id} className="bg-white p-6 rounded-xl shadow">

                            {/* LAYOUT IMAGE GAUCHE / TEXTE DROITE */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* IMAGE À GAUCHE */}
                              
                                <div>
                                    {q.image_url && (
                                        <img
                                            src={q.image_url}
                                            alt="Illustration"
                                            className="rounded-lg w-full max-w-md border shadow"
                                        />
                                    )}
                                </div>

                                {/* TEXTE + QUESTIONS À DROITE */}
                                <div className="space-y-4">
                                    <p className="font-medium text-gray-800">{q.question}</p>

                                    <div className="space-y-2">
                                        {q.choices.map((choice, i) => (
                                            <label key={i} className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name={`q-${q.id}`}
                                                    onChange={() =>
                                                        setAnswers(prev => ({
                                                            ...prev,
                                                            [q.id]: i
                                                        }))
                                                    }
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

                {/* Bouton Terminer */}
                <div className="text-center mt-10">
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Terminer le test
                    </button>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}