import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Start({ type }) {

    // TIMER GLOBAL (20 minutes)
    const [globalTime, setGlobalTime] = useState(20 * 60);

    // TIMER PAR QUESTION (30 secondes)
    const QUESTION_TIME = 30;
    const [questionTime, setQuestionTime] = useState(QUESTION_TIME);

    // QUESTIONS ET CHARGEMENT
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    // CHARGEMENT DES QUESTIONS VIA IA
  useEffect(() => {
    fetch('/ai/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({ type })
    })
    .then(res => res.json())
    .then(data => {
        setQuestions(data.questions || []);
        setLoading(false);
    })
    .catch(() => {
        setQuestions([]);
        setLoading(false);
    });
}, []);

    // AFFICHAGE DU LOADING
    if (loading) {
        return (
            <AuthenticatedLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-xl text-gray-200 font-semibold">Génération des questions...</p>
                </div>
            </AuthenticatedLayout>
        );
    }

    // SI AUCUNE QUESTION N'A ÉTÉ GÉNÉRÉE
    if (questions.length === 0) {
        return (
            <AuthenticatedLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-xl font-semibold text-red-600">
                        Impossible de générer les questions.
                    </p>
                </div>
            </AuthenticatedLayout>
        );
    }

    // INDEX DE QUESTION
    const [currentIndex, setCurrentIndex] = useState(0);

    // RÉPONSES DE L’UTILISATEUR
    const [answers, setAnswers] = useState({});

    const question = questions[currentIndex];

    // FIN DU TEST
    const finishTest = () => {
        router.post('/tests/summary', {
            answers,
            type,
        });
    };

    // TIMER GLOBAL COUNTDOWN
    useEffect(() => {
        if (globalTime <= 0) {
            finishTest();
            return;
        }

        const interval = setInterval(() => {
            setGlobalTime(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [globalTime]);

    // TIMER PAR QUESTION COUNTDOWN
    useEffect(() => {
        if (questionTime <= 0) {
            if (currentIndex === questions.length - 1) {
                finishTest();
            } else {
                nextQuestion();
            }
            return;
        }

        const interval = setInterval(() => {
            setQuestionTime(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [questionTime]);

    // SÉLECTION DE RÉPONSE
    const selectAnswer = (choice) => {
        setAnswers({
            ...answers,
            [currentIndex]: choice
        });
    };

    // NAVIGATION
    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setQuestionTime(QUESTION_TIME);
        } else {
            finishTest();
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setQuestionTime(QUESTION_TIME);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Test TCF - En cours" />

            <div className="min-h-screen bg-gray-50 py-10">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

                    {/* TYPE D'ÉPREUVE */}
                    <div className="mb-6 text-gray-700 text-lg">
                        <span className="font-semibold">Épreuve sélectionnée :</span> {type}
                    </div>

                    {/* TIMER GLOBAL */}
                    <div className="text-right text-xl font-bold text-red-600 mb-2">
                        Temps global : {Math.floor(globalTime / 60)}:
                        {String(globalTime % 60).padStart(2, '0')}
                    </div>

                    {/* TIMER PAR QUESTION */}
                    <div className="text-right text-lg font-semibold text-blue-600 mb-6">
                        Temps question : {questionTime}s
                    </div>

                    {/* QUESTION */}
                    <h1 className="text-2xl font-bold mb-6">
                        {question.text}
                    </h1>

                    {/* CHOIX */}
                    <div className="space-y-4">
                        {question.choices.map((choice, index) => (
                            <label
                                key={index}
                                className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
                            >
                                <input
                                    type="radio"
                                    name="answer"
                                    checked={answers[currentIndex] === choice}
                                    onChange={() => selectAnswer(choice)}
                                />
                                <span>{choice}</span>
                            </label>
                        ))}
                    </div>

                    {/* NAVIGATION */}
                    <div className="mt-8 flex justify-between items-center">

                        <button
                            onClick={prevQuestion}
                            disabled={currentIndex === 0}
                            className="px-6 py-3 bg-gray-300 rounded-lg disabled:opacity-50"
                        >
                            Précédent
                        </button>

                        <div className="flex space-x-4">

                            <button
                                onClick={nextQuestion}
                                disabled={currentIndex === questions.length - 1}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-blue-300"
                            >
                                Suivant
                            </button>

                            <button
                                onClick={finishTest}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Terminer le test
                            </button>

                        </div>

                    </div>

                </div>
            </div>

            
        </AuthenticatedLayout>
    );
}