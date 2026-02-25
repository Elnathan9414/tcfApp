import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,router } from '@inertiajs/react';

export default function Summary({ type, score, total, answers, questions }) {

    console.log({ type, score, total, answers, questions });

    if (!questions) {
        return (
            <AuthenticatedLayout>
                <p className="p-10 text-center text-gray-200 text-2xl">Chargement...</p>
            </AuthenticatedLayout>
        );
    }

    return (
        <>
            <Head title="Résultats" />

            <AuthenticatedLayout>
                <div className="min-h-screen bg-gray-50 py-20">
                    <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow">

                        <h1 className="text-4xl font-bold mb-6">
                            Résultats de l'épreuve : {type}
                        </h1>

                        <p className="text-2xl mb-10">
                            Score : <span className="font-bold">{score}</span> / {total}
                        </p>

                        <h2 className="text-xl font-semibold mb-4">Détails</h2>

                        <div className="space-y-6">
                            {questions.map((q, index) => {
                                const userAnswer = answers[q.id] ?? "Aucune réponse";

                                return (
                                    <div key={index} className="p-4 border rounded">
                                        <p className="font-semibold mb-2">
                                            {index + 1}. {q.text}
                                        </p>

                                        {q.answer ? (
                                            <>
                                                <p>Votre réponse : {userAnswer}</p>
                                                <p>Bonne réponse : {q.answer}</p>

                                                {userAnswer === q.answer ? (
                                                    <p className="text-green-600 font-bold">✔ Correct</p>
                                                ) : (
                                                    <p className="text-red-600 font-bold">✘ Incorrect</p>
                                                )}
                                            </>
                                        ) : (
                                            <p className="italic text-gray-600">
                                                Question ouverte — pas de correction automatique
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between mt-10">

                            {/* Bouton recommencer */}
                            <button
                                onClick={() => router.visit(`/tests/start/${type}`)}
                                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Recommencer le test
                            </button>

                            {/* Bouton tableau de bord */}
                            <button
                                onClick={() => router.visit('/dashboard')}
                                className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                            >
                                Retour au tableau de bord
                            </button>

                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}