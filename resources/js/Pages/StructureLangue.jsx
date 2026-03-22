import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function StructureDeLaLangue({ questions }) {
    const [activeExercise, setActiveExercise] = useState(1);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(10 * 60); // 10 minutes
    const timerRef = useRef(null);

    // Filtrer les questions de l'exercice actif
    const exerciseQuestions = questions.filter(
        q => q.exercise_number === activeExercise
    );

    // Index de la question actuelle dans l'exercice
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Fonction de soumission
    const handleSubmit = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        router.post('/submit-structure-langue', {
            answers: answers,
            question_ids: exerciseQuestions.map(q => q.id)
        }, {
            onSuccess: () => {
                console.log("Summary affichée !");
            }
        });
    };

    // Timer
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    handleSubmit(); // soumission automatique
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []); // ne redémarre pas au changement d'exercice

    // Formatage du temps
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Navigation
    const goToNextQuestion = () => {
        if (currentQuestionIndex < exerciseQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Réinitialiser l'index quand on change d'exercice
    useEffect(() => {
        setCurrentQuestionIndex(0);
    }, [activeExercise]);

    const currentQuestion = exerciseQuestions[currentQuestionIndex];

    return (
        <AuthenticatedLayout>
            <Head title="Structure de la langue" />

            <div className="p-10 space-y-10">
                {/* Barre supérieure : timer + progression */}
                <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                    <div className="text-lg font-semibold text-gray-700">
                        Temps restant :{' '}
                        <span className="text-blue-600 font-mono">
                            {formatTime(timeRemaining)}
                        </span>
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                        Question {currentQuestionIndex + 1} / {exerciseQuestions.length}
                    </div>
                </div>

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
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white hover:bg-gray-100'
                                }`}
                            >
                                Exercice {num}
                            </button>
                        );
                    })}
                </div>

                {/* Une seule question à la fois avec navigation */}
                {currentQuestion && (
                    <div className="bg-white p-6 rounded-xl shadow space-y-6">
                        <p className="font-medium">{currentQuestion.question}</p>

                        <div className="space-y-2">
                            {currentQuestion.choices.map((choice, i) => (
                                <label key={i} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name={`q-${currentQuestion.id}`}
                                        onChange={() =>
                                            setAnswers(prev => ({
                                                ...prev,
                                                [currentQuestion.id]: i,
                                            }))
                                        }
                                        checked={answers[currentQuestion.id] === i}
                                    />
                                    <span>{choice}</span>
                                </label>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between pt-4">
                            <button
                                onClick={goToPrevQuestion}
                                disabled={currentQuestionIndex === 0}
                                className={`px-4 py-2 rounded ${
                                    currentQuestionIndex === 0
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-gray-500 hover:bg-gray-600 text-white'
                                }`}
                            >
                                Précédent
                            </button>
                            {currentQuestionIndex === exerciseQuestions.length - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Terminer le test
                                </button>
                            ) : (
                                <button
                                    onClick={goToNextQuestion}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Suivant
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Bouton Terminer global (optionnel) */}
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