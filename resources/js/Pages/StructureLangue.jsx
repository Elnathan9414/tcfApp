import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function StructureDeLaLangue({ questions }) {

    const [activeExercise, setActiveExercise] = useState(1);

    // Stocker les réponses de l'utilisateur
    const [answers, setAnswers] = useState({});

    // Filtrer les questions de l'exercice actif
    const exerciseQuestions = questions.filter(
        q => q.exercise_number === activeExercise
    );

    // Envoyer les réponses au backend
    const handleSubmit = () => {
        router.post('/submit-structure-langue', {
            answers: answers
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Structure de la langue" />

            <div className="p-10 space-y-10">
                <h1 className="text-3xl font-bold text-center text-gray-200">
                    Structure de la langue
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
                        <div key={q.id} className="bg-white p-6 rounded-xl shadow space-y-6">

                            <p className="font-medium">{q.question}</p>

                            <div className="space-y-2">
                                {q.choices.map((choice, i) => (
                                    <label key={i} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name={`q-${q.id}`}
                                            onChange={() =>
                                                setAnswers(prev => ({
                                                    ...prev,
                                                    [q.id]: i   // index du choix
                                                }))
                                            }
                                        />
                                        <span>{choice}</span>
                                    </label>
                                ))}
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