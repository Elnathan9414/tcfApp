import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Options() {
    const options = [
        { label: "Compréhension orale", type: "orale" },
        { label: "Compréhension écrite", type: "ecrite" },
        { label: "Expression écrite", type: "expression_ecrite" },
        { label: "Expression orale", type: "expression_orale" },
    ];

    return (
        <>
            <Head title="Choix de l'épreuve" />
            <AuthenticatedLayout>

            <div className="min-h-screen bg-gray-50 py-20">
                <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow">

                    <h1 className="text-4xl font-bold mb-10">
                        Choisis une épreuve du TCF Canada
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {options.map((opt, index) => (
                            <Link
                                key={index}
                                href={`/tests/start/${opt.type}`}
                                className="p-6 border rounded-xl shadow hover:bg-gray-100 transition"
                            >
                                <h2 className="text-xl font-semibold">{opt.label}</h2>
                                <p className="text-gray-600 mt-2">
                                    Commencer cette épreuve
                                </p>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
        </>
    );
}