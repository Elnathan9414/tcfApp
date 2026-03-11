import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Methodologie() {

    const conseils = [
        {
            epreuve: "Compréhension orale",
            icon: "🎧",
            conseils: [
                "Écoute des podcasts et vidéos en français tous les jours (RFI, TV5Monde, France 24)",
                "Entraîne-toi à prendre des notes rapides pendant l'écoute",
                "Lis les questions AVANT d'écouter l'audio pour savoir quoi chercher",
                "Familiarise-toi avec différents accents francophones (québécois, africain, européen)",
                "Ne reste pas bloqué sur une question, passe à la suivante",
            ],
        },
        {
            epreuve: "Maîtrise des structures de la langue",
            icon: "📝",
            conseils: [
                "Révise les temps verbaux : présent, passé composé, imparfait, subjonctif, conditionnel",
                "Entraîne-toi aux accords (adjectifs, participes passés)",
                "Apprends les connecteurs logiques : donc, car, cependant, néanmoins...",
                "Fais des exercices de grammaire ciblés sur tes points faibles",
                "Lis beaucoup pour intégrer les structures naturellement",
            ],
        },
        {
            epreuve: "Compréhension écrite",
            icon: "📖",
            conseils: [
                "Lis d'abord les questions, ensuite le texte pour gagner du temps",
                "Repère les mots-clés dans les questions et cherche-les dans le texte",
                "Lis des articles de presse française régulièrement (Le Monde, Le Figaro)",
                "Ne te fie pas uniquement au sens général, les réponses sont précises",
                "Gère ton temps : ~1 min 30 par question maximum",
            ],
        },
        {
            epreuve: "Expression écrite",
            icon: "✍️",
            conseils: [
                "Structure toujours ta réponse : introduction, développement, conclusion",
                "Utilise des connecteurs logiques pour lier tes idées",
                "Varie ton vocabulaire, évite les répétitions",
                "Respecte le nombre de mots demandé (ni trop court, ni trop long)",
                "Relis-toi à la fin pour corriger les fautes d'orthographe et de grammaire",
                "Entraîne-toi à écrire des lettres formelles, des descriptions et des argumentations",
            ],
        },
        {
            epreuve: "Expression orale",
            icon: "🎤",
            conseils: [
                "Parle français tous les jours, même seul à voix haute",
                "Structure ta réponse avant de parler : prends 30 secondes pour réfléchir",
                "Utilise des expressions de transition : 'Tout d'abord...', 'En revanche...', 'Pour conclure...'",
                "Ne t'arrête pas trop longtemps sur une hésitation, continue à parler",
                "Entraîne-toi avec des sujets variés : environnement, technologie, société",
                "Soigne ta prononciation et ton débit, parle ni trop vite ni trop lentement",
            ],
        },
    ];
    return (
        <AuthenticatedLayout>
            <Head title="Méthodologie" />

            <div className="p-8 space-y-10 max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800">
                    Méthodologie du Test
                </h1>

                <p className="text-gray-600">
                    Cette page explique en détail comment fonctionne le test, comment les scores sont calculés et comment interpréter votre niveau CECRL.
                </p>

                {/* SECTION 1 */}
                <section className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        1. Qu'est ce que le TCF?
                    </h2>
                    <p className="text-gray-700">
                        Le TCF est le test de niveau linguistique du ministère français de l’Éducation nationale et de la Jeunesse. France Éducation international est l’opérateur du ministère pour la supervision et la diffusion du test en France et dans le monde.
                        Le TCF évalue les compétences en français langue générale des personnes dont le français n’est pas la langue maternelle. Il évalue en particulier la compréhension orale et écrite ainsi que la maîtrise des structures de la langue. Le TCF se présente sous la forme de questions à choix multiple, chaque question n’ayant qu’une seule réponse correcte.

                    </p>

                    <p className="text-gray-700">
                        La conception du TCF repose sur une méthodologie d'une extrême rigueur scientifique : il s’agit d’un test standardisé, calibré et étalonné. Tout au long des sessions et quelle que soit la version du test, les résultats restent comparables et assurent un positionnement fiable des candidats sur une échelle de six niveaux de connaissance allant de « élémentaire » (A1) à « supérieur avancé » (C2). Ces niveaux correspondent à ceux qui ont été définis par le Conseil de l'Europe dans le Cadre européen commun de référence pour les langues.
                        La souplesse et la simplicité du TCF en font un instrument commode qui répond aux besoins de tous ceux qui, pour des raisons personnelles ou professionnelles, doivent faire valider leur niveau de français.

                        En complément du TCF expliqué ci-dessus, il existe d’autres déclinaisons selon le projet du candidat :

                        TCF pour l’accès à la nationalité française (ANF)
                        TCF pour la carte de résident en France (CRF)
                        TCF pour la migration au Québec
                        TCF pour la migration au Canada
                    </p>


                </section>

                {/* SECTION 2 */}
                <section className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        2. Calcul du score
                    </h2>

                    <p className="text-gray-700">
                        Le TCF évalue six niveaux de connaissance du français, définis selon le Cadre européen commun de référence pour les langues du Conseil de l’Europe (Division des politiques linguistiques, Strasbourg, 2000 ; éditions Didier, Paris, 2001). Dans un souci de lisibilité, les appellations de ces niveaux ont été simplifiées.

                        SUPÉRIEUR AVANCÉ : C2
                        Excellente maîtrise de la langue. La personne comprend sans effort pratiquement tout ce qu’elle lit ou entend et peut tout résumer de façon cohérente. Elle s’exprime très couramment et de façon différenciée et nuancée sur des sujets complexes.
                        SUPÉRIEUR : C1
                        Bonne maîtrise de la langue. La personne peut comprendre une grande gamme de textes longs et exigeants comportant des contenus implicites. Elle s’exprime couramment et de façon bien structurée sur sa vie sociale, professionnelle ou académique et sur des sujets complexes.
                        INTERMÉDIAIRE AVANCÉ : B2
                        Maîtrise générale et spontanée de la langue. La personne peut comprendre l’essentiel d’un texte complexe. Elle peut participer à une conversation sur un sujet général ou professionnel de façon claire et détaillée en donnant des avis argumentés.
                        INTERMÉDIAIRE : B1
                        Maîtrise efficace, mais limitée de la langue. La personne comprend un langage clair et standard s’il s’agit d’un domaine familier. Elle peut se débrouiller en voyage, parler de ses centres d’intérêt et donner de brèves explications sur un projet ou une idée.
                        ÉLÉMENTAIRE AVANCÉ : A2
                        Maîtrise élémentaire de la langue. La personne peut comprendre des phrases isolées portant sur des domaines familiers. Elle peut communiquer dans des situations courantes, et évoquer avec des moyens simples des questions qui la concernent.
                        ÉLÉMENTAIRE : A1
                        Maîtrise de base du français. La personne est capable de comprendre des situations simples et concrètes se rapportant à la vie quotidienne. Elle peut communiquer de façon simple si l’interlocuteur parle lentement.
                    </p>


                </section>

                {/* SECTION 3 */}
                <section className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        3. Les épreuves du TCF
                    </h2>

                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2 font-semibold">Épreuve</th>
                                <th className="p-2 font-semibold">Questions</th>
                                <th className="p-2 font-semibold">Durée</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b bg-gray-50">
                                <td className="p-2 font-semibold" colSpan={3}>Épreuves obligatoires</td>
                            </tr>
                            <tr><td className="p-2">Compréhension orale</td><td className="p-2">29 questions</td><td className="p-2">~35 min</td></tr>
                            <tr><td className="p-2">Maîtrise des structures de la langue</td><td className="p-2">20 questions</td><td className="p-2">~20 min</td></tr>
                            <tr><td className="p-2">Compréhension écrite</td><td className="p-2">29 questions</td><td className="p-2">~45 min</td></tr>

                            <tr className="border-b bg-gray-50">
                                <td className="p-2 font-semibold" colSpan={3}>Épreuves facultatives</td>
                            </tr>
                            <tr><td className="p-2">Expression écrite</td><td className="p-2">3 tâches</td><td className="p-2">~60 min</td></tr>
                            <tr><td className="p-2">Expression orale</td><td className="p-2">3 tâches</td><td className="p-2">~12 min</td></tr>
                        </tbody>
                    </table>
                </section>

                {/* SECTION 4 */}
                <section className="bg-white p-6 rounded-xl shadow space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        4. Conseils pour réussir
                    </h2>

                    <div className="space-y-6">
                        {conseils.map((item, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <h3 className="text-lg font-semibold mb-3">
                                    {item.icon} {item.epreuve}
                                </h3>
                                <ul className="space-y-2">
                                    {item.conseils.map((conseil, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                            <span className="text-green-500 mt-0.5">✓</span>
                                            {conseil}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </AuthenticatedLayout>
    );
}