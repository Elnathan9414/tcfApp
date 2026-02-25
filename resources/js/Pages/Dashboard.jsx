import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function Dashboard({
    attempts = 0,
    correctAnswers = 0,
    totalQuestionsAnswered = 0,
    attemptsByType = [],
    history = [],
    scoreByType = []
}) {

    // Bar chart : tentatives par type
    const barData = {
        labels: attemptsByType.map(a => a.type),
        datasets: [
            {
                label: 'Tentatives',
                data: attemptsByType.map(a => a.count),
                backgroundColor: '#3b82f6',
            }
        ]
    };

    // Donut chart : bonnes vs mauvaises réponses
    const donutData = {
        labels: ['Bonnes réponses', 'Mauvaises réponses'],
        datasets: [
            {
                data: [
                    correctAnswers,
                    totalQuestionsAnswered - correctAnswers
                ],
                backgroundColor: ['#10b981', '#ef4444'],
            }
        ]
    };

    // Line chart : évolution du score
    const lineData = {
        labels: history.map(h => new Date(h.created_at).toLocaleDateString()),
        datasets: [
            {
                label: 'Score',
                data: history.map(h => h.score ?? 0),
                borderColor: '#6366f1',
                backgroundColor: '#6366f1',
            }
        ]
    };

    // Radar chart : compétences par type
    const radarData = {
        labels: scoreByType.map(s => s.type),
        datasets: [
            {
                label: 'Score moyen',
                data: scoreByType.map(s => s.avg_score),
                backgroundColor: 'rgba(59,130,246,0.3)',
                borderColor: '#3b82f6',
            }
        ]
    };

    return (
        <>
            <Head title="Tableau de bord" />

            <AuthenticatedLayout>
                <div className="p-7 space-y-7">

                    {/* Cartes statistiques */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-xl shadow text-center">
                            <h2 className="text-xl font-bold">Tentatives</h2>
                            <p className="text-4xl font-extrabold text-blue-600">{attempts}</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow text-center">
                            <h2 className="text-xl font-bold">Questions trouvées</h2>
                            <p className="text-4xl font-extrabold text-green-600">{correctAnswers}</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl shadow text-center">
                            <h2 className="text-xl font-bold">Total questions répondues</h2>
                            <p className="text-4xl font-extrabold text-gray-700">{totalQuestionsAnswered}</p>
                        </div>
                    </div>

                    {/* Graphiques */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="text-lg font-bold mb-4">Tentatives par type</h3>
                            <Bar data={barData} />
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="text-lg font-bold mb-4">Répartition des réponses</h3>
                            <Doughnut data={donutData} />
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="text-lg font-bold mb-4">Évolution du score</h3>
                            <Line data={lineData} />
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow">
                            <h3 className="text-lg font-bold mb-4">Profil de compétences</h3>
                            <Radar data={radarData} />
                        </div>
                    </div>

                    {/* Historique */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-bold mb-4">Historique des tests</h3>

                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Type</th>
                                    <th className="p-2">Score</th>
                                    <th className="p-2">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((h, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="p-2">{new Date(h.created_at).toLocaleDateString()}</td>
                                        <td className="p-2">{h.type}</td>
                                        <td className="p-2">{h.score ?? '-'}</td>
                                        <td className="p-2">{h.total ?? '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </AuthenticatedLayout>
        </>
    );
}