import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Write({ year, month, task, label, subject }) {

    /* -------------------------------
       TIMER (10 / 20 / 30 minutes)
    --------------------------------*/
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
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const sendForCorrection = async () => {
        setLoading(true);

        try {
            const response = await axios.post('/expression-ecrite/correct', {
                text,
                task,
            });

            if (response.data.success) {
                setResult(response.data.data);
            } else {
                setResult({
                    score: '—',
                    niveau: '—',
                    points_forts: [],
                    erreurs: [{ type: 'Erreur', detail: response.data.message || 'Erreur inconnu' }],
                    reformulation: response.data.message || 'Erreur inconnue',
                    conseils: [],
                });
            }
        } catch (error) {
            console.error(error);
            setResult({
                score: '—',
                niveau: '—',
                points_forts: [],
                erreurs: [{ type: 'Server', detail: error.response?.data?.message || error.message }],
                reformulation: 'La correction a échoué.',
                conseils: [],
            });
        } finally {
            setLoading(false);
        }
    };

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

    /* -------------------------------
       WORD COUNT
    --------------------------------*/
    const countWords = (str) => {
        return str.trim().split(/\s+/).filter(Boolean).length;
    };

    const wordCount = countWords(text);

    return (
        <AuthenticatedLayout>
            <Head title="Expression Écrite — Rédaction" />

            <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-10">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-200">
                        Expression écrite — Tâche {task}
                    </h1>

                    <div className={`text-2xl font-bold px-4 py-2 rounded-lg shadow ${remaining <= 60
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}>
                        ⏱ {formatTime(remaining)}
                    </div>
                </div>

                {/* CONSIGNES */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-800 font-medium">
                        Vous devez rédiger un texte en respectant la consigne ci-dessous.
                        Le temps est limité et le nombre de mots recommandé dépend de la tâche.
                    </p>
                </div>

                {/* SUJET */}
                <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Sujet — {label}
                    </h2>

                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {subject}
                    </p>
                </div>

                {/* ZONE DE RÉDACTION */}
                <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Votre production écrite
                        </h2>

                        <p className="text-sm text-gray-500">
                            Nombre de mots : <strong>{wordCount}</strong>
                        </p>
                    </div>

                    <textarea
                        className="w-full h-80 p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        placeholder="Commencez à écrire ici..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={remaining <= 0}
                    />
                </div>

                {/* BOUTON */}
                <div className="text-center">
                    <button
                        onClick={sendForCorrection}
                        className="px-10 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                        disabled={remaining <= 0 || loading}
                    >
                        {loading ? "Analyse en cours..." : "Tester ma production"}
                    </button>
                </div>
                {result && (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 space-y-4 mt-10">

        <h2 className="text-2xl font-bold text-gray-800">Résultat de la correction</h2>

        <p><strong>Score :</strong> {result.score}</p>
        <p><strong>Niveau estimé :</strong> {result.niveau}</p>

        <h3 className="text-xl font-semibold mt-4">Points forts</h3>
        <ul className="list-disc ml-6 text-green-700">
            {result.points_forts.map((p, i) => <li key={i}>{p}</li>)}
        </ul>

        <h3 className="text-xl font-semibold mt-4">Erreurs détectées</h3>
        <ul className="list-disc ml-6 text-red-700">
            {result.erreurs.map((e, i) => (
                <li key={i}><strong>{e.type} :</strong> {e.detail}</li>
            ))}
        </ul>

        <h3 className="text-xl font-semibold mt-4">Texte reformulé</h3>
        <p className="bg-gray-100 p-4 rounded">{result.reformulation}</p>

        <h3 className="text-xl font-semibold mt-4">Conseils</h3>
        <ul className="list-disc ml-6 text-blue-700">
            {result.conseils.map((c, i) => <li key={i}>{c}</li>)}
        </ul>

    </div>
)}
            </div>
        </AuthenticatedLayout>
    );
}