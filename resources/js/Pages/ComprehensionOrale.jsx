import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ComprehensionOrale({ questions }) {

    const [activeExercise, setActiveExercise] = useState(1);

    // Stocker les réponses de l'utilisateur
    const [answers, setAnswers] = useState({});

    // Filtrer les questions de l'exercice actif
    const exerciseQuestions = questions.filter(
        q => q.exercise_number === activeExercise
    );

    // Fonction pour envoyer les réponses au backend
    const handleSubmit = () => {
    router.post('/submit-comprehension-orale', {
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
            <Head title="Compréhension orale" />

            <div className="p-10 space-y-10">
                <h1 className="text-3xl font-bold text-center text-gray-200">
                    Compréhension orale
                </h1>

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

                {/* AUDIO UNIQUE POUR TOUT L’EXERCICE */}
                {exerciseQuestions[0]?.audio_url && (
                    <audio
                        controls
                        src={exerciseQuestions[0].audio_url}
                        className="w-full mb-6"
                    />
                )}

                {/* SECTIONS PAR QUESTION */}
                <div className="space-y-10">
                    {exerciseQuestions.map((q) => (
                        <div key={q.id} className="bg-white p-6 rounded-xl shadow space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                                {/* IMAGE */}
                                <div>
                                    {q.image_url && (
                                        <img
                                            src={q.image_url}
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
                                                    onChange={() =>
                                                        setAnswers(prev => ({
                                                            ...prev,
                                                            [q.id]: i   // i = index du choix (0,1,2,3)
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

                {/* BOUTON TERMINER LE TEST */}
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