import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Summary({ correct, total, percentage, level, testType }) {

    // Route dynamique selon le test terminé
    const restartRoute = `/${testType}`;

    return (
        <AuthenticatedLayout>
            <Head title="Résultats du test" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
                <div className="bg-white p-10 rounded-xl shadow-xl max-w-xl w-full text-center space-y-6">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Résultats du test
                    </h1>

                    <div className="text-lg text-gray-700 space-y-2">
                        <p><strong>Bonnes réponses :</strong> {correct} / {total}</p>
                        <p><strong>Pourcentage :</strong> {percentage}%</p>
                        <p>
                            <strong>Niveau CECRL :</strong>
                            <span className="ml-2 px-3 py-1 rounded-lg bg-blue-600 text-white font-semibold">
                                {level}
                            </span>
                        </p>
                    </div>

                    <div className="border-t pt-6 space-y-4">
                        <Link
                            href="/tests/options"
                            className="block w-full py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
                        >
                            Retour au menu
                        </Link>

                        <Link
                            href={restartRoute}
                            className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                        >
                            Recommencer le test
                        </Link>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}