import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatsCards from '@/Components/StatsCards';
import ProgressionChart from '@/Components/ProgressChart';
import SkillsChart from '@/Components/SkillsChart';

export default function Dashboard({ results, stats }) {
    return (
        <AuthenticatedLayout>
            <Head title="Tableau de bord" />

            <div className="p-8 space-y-10">

                {/* HEADER */}
                <header>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Tableau de bord étudiant
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Suivi de tes performances et progression.
                    </p>
                </header>

                {/* SECTION : CARDS DE STATISTIQUES */}
                <section id="stats-cards">
                      <StatsCards stats={stats} />

                </section>

                {/* SECTION : GRAPHIQUES */}
                <section id="charts" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Graphique progression */}
                    <div id="progression-chart" className="bg-white p-6 rounded-xl shadow">
                        <ProgressionChart results={results} />
                    </div>

                    {/* Graphique par compétence */}
                    <div id="skills-chart" className="bg-white p-6 rounded-xl shadow">
                        <SkillsChart stats={stats.byType} />
                    </div>
                </section>

                {/* SECTION : HISTORIQUE DES TESTS */}
                <section id="history">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Historique des tests
                    </h2>

                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        {/* On remplira ici */}
                    </div>
                </section>

            </div>
        </AuthenticatedLayout>
    );
}