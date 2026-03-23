import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Write({ year, month, task, label, subject }) {

    const getInitialTime = (taskNumber) => {
        switch (Number(taskNumber)) {
            case 1: return 10 * 60;
            case 2: return 20 * 60;
            case 3: return 30 * 60;
            default: return 10 * 60;
        }
    };

    const [remaining, setRemaining] = useState(getInitialTime(task));
    const [text, setText] = useState("");

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

    const countWords = (str) => {
        return str.trim().split(/\s+/).filter(Boolean).length;
    };

    const wordCount = countWords(text);

    return (
        <AuthenticatedLayout>
            <Head title="Expression Écrite — Rédaction" />

            <div className="max-w-4xl mx-auto p-10 space-y-10">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-200">
                        Tâche {task} — {label}
                    </h1>

                    <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${
                        remaining <= 60 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                    }`}>
                        ⏱ {formatTime(remaining)}
                    </div>
                </div>

                {/* SUJET */}
                <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Sujet</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {subject}
                    </p>
                </div>

                {/* TEXTAREA */}
                <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Votre texte</h2>

                    <textarea
                        className="w-full h-72 p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        placeholder="Commencez à écrire ici..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={remaining <= 0}
                    />

                    <p className="text-sm text-gray-500 mt-2">
                        Nombre de mots : <strong>{wordCount}</strong>
                    </p>
                </div>

                {/* BOUTON */}
                <div className="text-center">
                    <button
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                        disabled={remaining <= 0}
                    >
                        Tester ma production
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}