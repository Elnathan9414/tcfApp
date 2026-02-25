import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';

export default function Start() {
    const { type } = usePage().props;

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [globalTime, setGlobalTime] = useState(15 * 60); // 15 min global
    const [questionTime, setQuestionTime] = useState(30); // 30 sec par question

    const globalTimerRef = useRef(null);
    const questionTimerRef = useRef(null);

    const [answers, setAnswers] = useState({});

    // -------------------------------
    // Charger les questions
    // -------------------------------
    useEffect(() => {
        fetch(`/questions/test/${type}`)
            .then(res => res.json())
            .then(data => {
                setQuestions(data.questions);
            });
    }, [type]);

    // -------------------------------
    // Timer global
    // -------------------------------
    useEffect(() => {
        globalTimerRef.current = setInterval(() => {
            setGlobalTime(prev => {
                if (prev <= 1) {
                    finishTest();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(globalTimerRef.current);
    }, []);

    // -------------------------------
    // Timer par question
    // -------------------------------
    useEffect(() => {
        resetQuestionTimer();
        return () => clearInterval(questionTimerRef.current);
    }, [currentIndex]);

    const resetQuestionTimer = () => {
        clearInterval(questionTimerRef.current);
        setQuestionTime(30);

        questionTimerRef.current = setInterval(() => {
            setQuestionTime(prev => {
                if (prev <= 1) {
                    goNext();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // -------------------------------
    // Navigation
    // -------------------------------
    const goNext = () => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            finishTest();
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // -------------------------------
    // Sauvegarder une réponse
    // -------------------------------
    const saveAnswer = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    // -------------------------------
    // Fin du test → redirection
    // -------------------------------
    const finishTest = () => {
        clearInterval(globalTimerRef.current);
        clearInterval(questionTimerRef.current);

        router.visit('/tests/summary', {
            method: 'post',
            data: {
                type,
                answers
            }
        });
    };

    // -------------------------------
    // Formatage du temps
    // -------------------------------
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // -------------------------------
    // Rendu
    // -------------------------------
    if (questions.length === 0) {
        return (
            <AuthenticatedLayout>
                <p className="p-10">Chargement...</p>
            </AuthenticatedLayout>
        );
    }

    const q = questions[currentIndex];

    return (
        <>
            <Head title="Épreuve" />

            <AuthenticatedLayout>
                <div className="min-h-screen bg-gray-50 py-10">
                    <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow">

                        {/* Timers */}
                        <div className="flex justify-between mb-6">
                            <div className="text-xl font-bold text-blue-600">
                                Temps global : {formatTime(globalTime)}
                            </div>
                            <div className="text-xl font-bold text-red-600">
                                Temps question : {formatTime(questionTime)}
                            </div>
                        </div>

                        {/* Question */}
                        <h2 className="text-2xl font-bold mb-4">
                            Question {currentIndex + 1} / {questions.length}
                        </h2>

                        <p className="text-lg mb-6">{q.text}</p>

                        {/* Choix */}
                        {q.choices && q.choices.length > 0 ? (
                            <div className="space-y-3">
                                {q.choices.map((choice, i) => (
                                    <button
                                        key={i}
                                        onClick={() => saveAnswer(q.id, choice)}
                                        className={`block w-full text-left p-4 border rounded-lg 
                                            ${answers[q.id] === choice ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'}`}
                                    >
                                        {choice}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <textarea
                                className="w-full border rounded p-3"
                                rows="5"
                                placeholder="Écris ta réponse ici..."
                                value={answers[q.id] || ""}
                                onChange={(e) => saveAnswer(q.id, e.target.value)}
                            ></textarea>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between mt-10">
                            <button
                                onClick={goPrev}
                                disabled={currentIndex === 0}
                                className="px-6 py-3 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Précédent
                            </button>

                            {currentIndex + 1 === questions.length ? (
                                <button
                                    onClick={finishTest}
                                    className="px-6 py-3 bg-green-600 text-white rounded"
                                >
                                    Terminer
                                </button>
                            ) : (
                                <button
                                    onClick={goNext}
                                    className="px-6 py-3 bg-blue-600 text-white rounded"
                                >
                                    Suivant
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}