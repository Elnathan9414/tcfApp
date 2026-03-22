import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function YearsMonths({ years = null, selectedYear = null, months = null, selectedMonth = null, tasks = null }) {
    return (
        <AuthenticatedLayout>
            <Head title="Expression Écrite — TCF Canada" />

            <div className="p-10 max-w-6xl mx-auto space-y-12">

                {/* TITRE */}
                <h1 className="text-3xl font-bold text-center text-gray-200">
                    Expression Écrite — TCF Canada
                </h1>

                {/* NIVEAU 1 : ANNÉES */}
                {years && (
                    <div className="bg-white p-6 rounded-xl shadow space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800 text-center">
                            Sélectionnez une année
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {years.map(year => (
                                <Link
                                    key={year}
                                    href={`/expression-ecrite/${year}`}
                                    className="p-4 rounded-lg border text-center font-semibold bg-gray-50 hover:bg-gray-100"
                                >
                                    {year}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* NIVEAU 2 : MOIS */}
                {months && (
                    <div className="bg-white p-6 rounded-xl shadow space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Mois disponibles — {selectedYear}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {months.map(month => (
                                <Link
                                    key={month.slug}
                                    href={`/expression-ecrite/${selectedYear}/${month.slug}`}
                                    className="p-6 border rounded-xl bg-gray-50 hover:bg-gray-100 shadow transition"
                                >
                                    <h3 className="text-lg font-bold text-gray-800">
                                        {month.label} {selectedYear}
                                    </h3>

                                    <p className="text-green-600 font-semibold mt-2">
                                        Disponible
                                    </p>

                                    <p className="text-gray-600 text-sm mt-1">
                                        {month.count} combinaisons
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* NIVEAU 3 : TÂCHES */}
                {tasks && (
                    <div className="bg-white p-6 rounded-xl shadow space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Tâches — {selectedMonth} {selectedYear}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {tasks.map(task => (
                                <Link
                                    key={task.number}
                                    href={`/expression-ecrite/${selectedYear}/${selectedMonth}/tache/${task.number}`}
                                    className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100"
                                >
                                    <h3 className="font-bold text-gray-800">Tâche {task.number}</h3>
                                    <p className="text-gray-600">{task.label}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}