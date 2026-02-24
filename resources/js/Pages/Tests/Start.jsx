import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Start({ type }) {

    // TIMER GLOBAL (20 minutes)
    const [globalTime, setGlobalTime] = useState(20 * 60);

    // TIMER PAR QUESTION (30 secondes)
    const QUESTION_TIME = 30;
    const [questionTime, setQuestionTime] = useState(QUESTION_TIME);

    // QUESTIONS (temporaire — plus tard : chargées depuis Laravel)
    const questions = [
        {
            text: "Quel est l’objet principal du message ?",
            choices: [
                "A. Une invitation",
                "B. Une réclamation",
                "C. Une information",
                "D. Une publicité"
            ]
        },
        {
            text: "Que doit faire le destinataire du message ?",
            choices: [
                "A. Appeler un numéro",
                "B. Remplir un formulaire",
                "C. Se présenter à un rendez-vous",
                "D. Envoyer un email"
            ]
        },
        {
            text: "Quel est le ton général du message ?",
            choices: [
                "A. Urgent",
                "B. Informel",
                "C. Professionnel",
                "D. Humoristique"
            ]
        }
    ];

    // INDEX DE QUESTION
    const [currentIndex, setCurrentIndex] = useState(0);

    // RÉPONSES DE L’UTILISATEUR
    const [answers, setAnswers] = useState({});

    const question = questions[currentIndex];

    // FIN DU TEST
    const finishTest = () => {
        router.visit('/tests/end');
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
            setQuestionTime(QUESTION_TIME); // reset timer
        } else {
            finishTest();
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setQuestionTime(QUESTION_TIME); // reset timer
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