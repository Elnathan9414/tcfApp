import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, router } from '@inertiajs/react';

export default function Index({ users }) {

    const { data, setData, post, reset, errors } = useForm({
        name: '',
        email: '',
        role: 'student',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/users', {
            onSuccess: () => reset()
        });
    };

    const updateRole = (id, role) => {
        router.put(`/admin/users/${id}`, { role });
    };

    const deleteUser = (id) => {
        if (confirm("Supprimer cet utilisateur ?")) {
            router.delete(`/admin/users/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-10 space-y-10 text-gray-800">

                <h1 className="text-3xl font-bold text-gray-200">Gestion des utilisateurs</h1>

                {/* FORMULAIRE AJOUT */}
                <form
                    onSubmit={submit}
                    className="bg-white p-6 rounded-xl shadow space-y-4"
                >
                    <h2 className="text-xl font-semibold">Ajouter un utilisateur</h2>

                    <div>
                        <label className="block font-medium">Nom</label>
                        <input
                            className="border p-2 rounded w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            className="border p-2 rounded w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Mot de passe</label>
                        <input
                            type="password"
                            className="border p-2 rounded w-full"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="text-red-600">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Rôle</label>
                        <select
                            className="border p-2 rounded w-full"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="contributor">Contributor</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Ajouter
                    </button>
                </form>

                {/* TABLEAU */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">ID</th>
                                <th className="p-2">Nom</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Rôle</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.data.map((u) => (
                                <tr key={u.id} className="border-b">
                                    <td className="p-2">{u.id}</td>
                                    <td className="p-2">{u.name}</td>
                                    <td className="p-2">{u.email}</td>

                                    <td className="p-2">
                                        <select
                                            className="border p-1 rounded"
                                            value={u.role}
                                            onChange={(e) => updateRole(u.id, e.target.value)}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="contributor">Contributor</option>
                                            <option value="student">Student</option>
                                        </select>
                                    </td>

                                    <td className="p-2">
                                        <button
                                            onClick={() => deleteUser(u.id)}
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
                        {users.links.map((link, index) => (
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