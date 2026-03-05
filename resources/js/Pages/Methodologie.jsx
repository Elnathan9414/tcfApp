import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Methodologie() {
    return (
        < >
            <Head title="Méthodologie" />

            <AuthenticatedLayout >
                <div className="p-10 space-y-10 text-gray-700">

                    <h1 className="text-3xl font-bold">Méthodologie des épreuves</h1>

                    {/* Compréhension orale */}
                    <section className="bg-white p-6 rounded-xl shadow space-y-3">
                        <h2 className="text-2xl font-semibold">🎧 Compréhension orale</h2>
                        <p>Objectif : écouter un audio et choisir la bonne réponse.</p>
                        <ul className="list-disc ml-6">
                            <li>Lire les questions avant d’écouter.</li>
                            <li>Identifier les mots-clés.</li>
                            <li>Se concentrer sur l’essentiel.</li>
                            <li>Repérer chiffres, lieux, opinions.</li>
                            <li>Attention aux reformulations.</li>
                        </ul>
                    </section>

                    {/* Compréhension écrite */}
                    <section className="bg-white p-6 rounded-xl shadow space-y-3">
                        <h2 className="text-2xl font-semibold">📖 Compréhension écrite</h2>
                        <p>Objectif : lire un texte et répondre aux questions.</p>
                        <ul className="list-disc ml-6">
                            <li>Lire les questions avant le texte.</li>
                            <li>Faire une lecture rapide.</li>
                            <li>Revenir sur les paragraphes utiles.</li>
                            <li>Identifier les connecteurs logiques.</li>
                            <li>Repérer les synonymes.</li>
                        </ul>
                    </section>

                    {/* Expression orale */}
                    <section className="bg-white p-6 rounded-xl shadow space-y-3">
                        <h2 className="text-2xl font-semibold">🗣️ Expression orale</h2>
                        <p>Objectif : répondre à une question ou décrire une situation.</p>
                        <ul className="list-disc ml-6">
                            <li>Structure : introduction → développement → conclusion.</li>
                            <li>Utiliser des connecteurs.</li>
                            <li>Parler lentement et clairement.</li>
                            <li>Donner des exemples.</li>
                        </ul>
                    </section>

                    {/* Expression écrite */}
                    <section className="bg-white p-6 rounded-xl shadow space-y-3">
                        <h2 className="text-2xl font-semibold">✍️ Expression écrite</h2>
                        <p>Objectif : rédiger un texte structuré.</p>
                        <ul className="list-disc ml-6">
                            <li>Lire attentivement la consigne.</li>
                            <li>Faire un plan rapide.</li>
                            <li>Utiliser des paragraphes courts.</li>
                            <li>Varier les connecteurs.</li>
                            <li>Relire pour corriger les fautes.</li>
                        </ul>
                    </section>

                </div>
            </AuthenticatedLayout>
        </>
    );
}