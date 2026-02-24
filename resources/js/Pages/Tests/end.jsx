import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function End() {
    return (
        <AuthenticatedLayout>
            <Head title="Fin du test" />

            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white p-10 rounded-xl shadow max-w-xl text-center">

                    <h1 className="text-4xl font-bold mb-6">
                        Test terminé !
                    </h1>

                    <p className="text-lg text-gray-700 mb-10">
                        Merci d’avoir complété cette épreuve du TCF Canada.
                    </p>

                    <div className="space-y-4">
                        <Link
                            href="/dashboard"
                            className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Retour au tableau de bord
                        </Link>

                        <Link
                            href="/tests/options"
                            className="block px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Recommencer un test
                        </Link>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}