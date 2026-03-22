import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Write({ year, month, task, label, subject }) {

    // Convertir la tâche en nombre
    const taskNum = Number(task);

    // Durée selon la tâche
    const getInitialTime = (taskNumber) => {
        switch (taskNumber) {
            case 1: return 10 * 60; // 10 minutes
            case 2: return 20 * 60; // 20 minutes
            case 3: return 30 * 60; // 30 minutes
            default: return 10 * 60;
        }
    };

    const [remaining, setRemaining] = useState(getInitialTime(taskNum));
    const [text, setText] = useState("");

    // TIMER DÉCRÉMENTANT
    useEffect(() => {
        if (remaining <= 0) return;

        const interval = setInterval(() => {
            setRemaining(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [remaining]);

    const formatTime = (totalSeconds) => {
        const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
        const s = (totalSeconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // COMPTEUR DE MOTS
    const countWords = (str) => {
        return str
            .trim()
            .split(/\s+/)
            .filter(Boolean).length;
    };

    const wordCount = countWords(text);

    return (
        <AuthenticatedLayout>
            <Head title="Expression Écrite — Rédaction" />

            <div className="p-10 max-w-4xl mx-auto space-y-8">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-200">
                        Tâche {taskNum} — {label}
                    </h1>

                    <div className={`text-xl font-semibold ${remaining <= 60 ? "text-red-500" : "text-blue-400"}`}>
                        ⏱️Temps restant {formatTime(remaining)}
                    </div>
                </div>

                {/* SUJET */}
                <div className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Sujet</h2>
                    <p className="text-gray-700">{subject}</p>
                </div>

                {/* TEXTAREA */}
                <div className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Votre texte</h2>

                    <textarea
                        className="w-full h-64 p-4 border rounded-lg focus:ring focus:ring-blue-300"
                        placeholder="Écrivez votre texte ici..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={remaining <= 0}
                    ></textarea>

                    <p className="text-sm text-gray-500">
                        Nombre de mots : {wordCount}
                    </p>

                    {remaining <= 0 && (
                        <p className="text-red-600 font-semibold">
                            ⛔ Temps écoulé — vous ne pouvez plus écrire.
                        </p>
                    )}
                </div>

                {/* BOUTON */}
                <div className="text-center">
                    <button
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
                        disabled={remaining <= 0}
                    >
                        Tester ma production
                    </button>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}