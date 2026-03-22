import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function ComprehensionOrale({ questions }) {
    const [activeExercise, setActiveExercise] = useState(1);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(20 * 60); // 20 minutes en secondes
    const timerRef = useRef(null);

    // Filtrer les questions de l'exercice actif
    const exerciseQuestions = questions.filter(
        q => q.exercise_number === activeExercise
    );

    // Indice de la question actuelle dans l'exercice (pour l'affichage)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Fonction pour soumettre les réponses
    const handleSubmit = () => {
        // Arrêter le timer
        if (timerRef.current) clearInterval(timerRef.current);
        router.post('/submit-comprehension-orale', {
            answers: answers,
            question_ids: exerciseQuestions.map(q => q.id)
        }, {
            onSuccess: () => {
                console.log("Summary affichée !");
            }
        });
    };

    // Timer : démarrage au montage
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    // Temps écoulé : soumission automatique
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Nettoyage au démontage
        return () => clearInterval(timerRef.current);
    }, []); // Dépendances vides : ne redémarre pas au changement d'exercice

    // Formatage du temps restant (HH:MM:SS)
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Gestion du changement de question (navigation)
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

    // Réinitialiser l'index de question quand on change d'exercice
    useEffect(() => {
        setCurrentQuestionIndex(0);
    }, [activeExercise]);

    const currentQuestion = exerciseQuestions[currentQuestionIndex];

    return (
        <AuthenticatedLayout>
            <Head title="Compréhension orale" />

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

                {/* AUDIO UNIQUE POUR TOUT L'EXERCICE */}
                {exerciseQuestions[0]?.audio_url && (
                    <audio
                        controls
                        src={exerciseQuestions[0].audio_url}
                        className="w-full mb-6"
                    />
                )}

                {/* QUESTION UNIQUE AVEC NAVIGATION */}
                {currentQuestion && (
                    <div className="bg-white p-6 rounded-xl shadow space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* IMAGE */}
                            <div>
                                {currentQuestion.image_url && (
                                    <img
                                        src={currentQuestion.image_url}
                                        alt="Illustration"
                                        className="rounded-lg w-full max-w-md border shadow"
                                    />
                                )}
                            </div>

                            {/* QUESTION + CHOIX */}
                            <div className="space-y-4">
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
                            </div>
                        </div>

                        {/* Navigation entre questions */}
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

                {/* Bouton "Terminer le test" global (au cas où) */}
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