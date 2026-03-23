import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ years, selectedYear, months, selectedMonth, tasks }) {
    return (
        <AuthenticatedLayout>
            <Head title="Expression Écrite" />

            <div className="max-w-5xl mx-auto p-10 space-y-10">

                {/* NIVEAU 1 : ANNÉES */}
                {years && (
                    <>
                        <h1 className="text-3xl font-bold text-gray-200 mb-6">
                            Choisissez une année
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {years.map((year) => (
                                <a
                                    key={year}
                                    href={`/expression-ecrite/${year}`}
                                    className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center border border-gray-200"
                                >
                                    <h2 className="text-3xl font-bold text-gray-800">{year}</h2>
                                    <p className="text-gray-500 mt-2">Voir les sujets</p>
                                </a>
                            ))}
                        </div>
                    </>
                )}

                {/* NIVEAU 2 : MOIS */}
                {selectedYear && months && (
                    <>
                        <h1 className="text-3xl font-bold text-gray-200 mb-6">
                            {selectedYear} — Choisissez un mois
                        </h1>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {months.map((m) => (
                                <a
                                    key={m.slug}
                                    href={`/expression-ecrite/${selectedYear}/${m.slug}`}
                                    className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200"
                                >
                                    <h3 className="text-xl font-semibold text-gray-800">{m.label}</h3>

                                    {m.count > 0 ? (
                                        <p className="text-green-600 mt-2 font-medium">
                                            {m.count} tâche(s)
                                        </p>
                                    ) : (
                                        <p className="text-gray-400 mt-2">Aucune tâche</p>
                                    )}
                                </a>
                            ))}
                        </div>
                    </>
                )}

                {/* NIVEAU 3 : TÂCHES */}
                {selectedYear && selectedMonth && tasks && (
                    <>
                        <h1 className="text-3xl font-bold text-gray-200 mb-6">
                            {selectedYear} — {selectedMonth}
                        </h1>

                        <div className="space-y-6">
                            {tasks.map((t) => (
                                <a
                                    key={t.number}
                                    href={`/expression-ecrite/${selectedYear}/${selectedMonth}/${t.number}`}
                                    className="block bg-white p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-gray-800">
                                            Tâche {t.number} — {t.label}
                                        </h3>

                                        <span className="text-blue-600 font-semibold">
                                            Commencer →
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mt-3 line-clamp-3">
                                        {t.subject}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}