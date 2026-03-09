import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ questions }) {

    // Formulaire partagé (création + édition)
    const { data, setData, post, put, reset, errors } = useForm({
        type: '',
        question: '',
        choices: ['', '', '', ''],
        exercise_number: '',
        answer: 0,
        audio: null,
        image: null,
    });

    // ID de la question en cours d'édition
    const [editingId, setEditingId] = useState(null);

    // Soumission du formulaire
    const submit = (e) => {
        e.preventDefault();

        if (editingId) {
            // MODE ÉDITION
            put(route('admin.questions.update', editingId), {
                onSuccess: () => {
                    reset();
                    setEditingId(null);
                }
            });
        } else {
            // MODE AJOUT
            post(route('admin.questions.store'), {
                onSuccess: () => reset()
            });
        }
    };

    // Remplir le formulaire pour modifier
    const startEdit = (q) => {
        setEditingId(q.id);
        setData({
            type: q.type,
            question: q.question,
            choices: q.choices || ['', '', '', ''],
            exercise_number: q.exercise_number,
            answer: q.answer,
            audio: null,
            image: null,
        });
    };

    // Annuler la modification
    const cancelEdit = () => {
        reset();
        setEditingId(null);
    };

    // Supprimer une question
    const deleteQuestion = (id) => {
        if (confirm("Supprimer cette question ?")) {
            router.delete(route('admin.questions.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-10 space-y-10 text-gray-800">

                <h1 className="text-3xl font-bold text-gray-200">Gestion des questions</h1>

                {/* FORMULAIRE AJOUT / MODIFICATION */}
                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded-xl shadow space-y-4"
                    encType="multipart/form-data"
                >
                    <h2 className="text-xl font-semibold">
                        {editingId ? "Modifier la question" : "Ajouter une question"}
                    </h2>

                    {/* TYPE */}
                    <div>
                        <label className="block font-medium">Type</label>
                        <select
                            className="border p-2 rounded w-full"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                        >
                            <option value="">-- Choisir --</option>
                            <option value="comprehension_orale">Compréhension orale</option>
                            <option value="structure_langue">Structure de la langue</option>
                            <option value="comprehension_ecrite">Compréhension écrite</option>
                        </select>
                        {errors.type && <p className="text-red-600">{errors.type}</p>}
                    </div>

                    {/* EXERCICE */}
                    <div>
                        <label className="block font-medium">Numéro de l'exercice</label>
                        <input
                            type="number"
                            className="border p-2 rounded w-full"
                            value={data.exercise_number}
                            onChange={(e) => setData('exercise_number', e.target.value)}
                        />
                    </div>

                    {/* QUESTION */}
                    <div>
                        <label className="block font-medium">Question</label>
                        <textarea
                            className="border p-2 rounded w-full"
                            value={data.question}
                            onChange={(e) => setData('question', e.target.value)}
                        />
                        {errors.question && <p className="text-red-600">{errors.question}</p>}
                    </div>

                    {/* CHOIX */}
                    <div className="grid grid-cols-2 gap-4">
                        {data.choices.map((choice, index) => (
                            <div key={index}>
                                <label className="block font-medium">Choix {index + 1}</label>
                                <input
                                    className="border p-2 rounded w-full"
                                    value={choice}
                                    onChange={(e) => {
                                        const newChoices = [...data.choices];
                                        newChoices[index] = e.target.value;
                                        setData('choices', newChoices);
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* BONNE RÉPONSE */}
                    <div>
                        <label className="block font-medium">Bonne réponse (0-3)</label>
                        <input
                            type="number"
                            min="0"
                            max="3"
                            className="border p-2 rounded w-full"
                            value={data.answer}
                            onChange={(e) => setData('answer', e.target.value)}
                        />
                        {errors.answer && <p className="text-red-600">{errors.answer}</p>}
                    </div>

                    {/* AUDIO */}
                    <div>
                        <label className="block font-medium">Audio (optionnel)</label>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setData('audio', e.target.files[0])}
                        />
                    </div>

                    {/* IMAGE */}
                    <div>
                        <label className="block font-medium">Image (optionnel)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files[0])}
                        />
                    </div>

                    {/* BOUTONS */}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            {editingId ? "Mettre à jour" : "Ajouter"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="bg-gray-400 text-white px-4 py-2 rounded"
                            >
                                Annuler
                            </button>
                        )}
                    </div>
                </form>

                {/* TABLEAU DES QUESTIONS */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Liste des questions</h2>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">ID</th>
                                <th className="p-2">Type / Exercice</th>
                                <th className="p-2">Question</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {questions.data.map((q) => (
                                <tr key={q.id} className="border-b">
                                    <td className="p-2">{q.id}</td>

                                    <td className="p-2">
                                        {q.type} — <strong>Exercice {q.exercise_number}</strong>
                                    </td>

                                    <td className="p-2">{q.question}</td>

                                    <td className="p-2 space-x-3">
                                        <button
                                            className="text-blue-600 hover:underline"
                                            onClick={() => startEdit(q)}
                                        >
                                            Modifier
                                        </button>

                                        <button
                                            onClick={() => deleteQuestion(q.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* PAGINATION */}
                    <div className="mt-4 flex space-x-2">
                        {questions.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => router.visit(link.url)}
                                className={`px-3 py-1 rounded ${
                                    link.active
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200"
                                }`}
                            >
                                <span dangerouslySetInnerHTML={{ __html: link.label }} />
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}