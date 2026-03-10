export default function StatsCards({ stats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Score moyen */}
            <div className="bg-white p-6 rounded-xl shadow text-center">
                <p className="text-gray-500 text-sm">Score moyen</p>
                <p className="text-3xl font-bold text-blue-600">{stats.average}%</p>
            </div>

            {/* Meilleur score */}
            <div className="bg-white p-6 rounded-xl shadow text-center">
                <p className="text-gray-500 text-sm">Meilleur score</p>
                <p className="text-3xl font-bold text-green-600">{stats.best}%</p>
            </div>

            {/* Nombre de tests */}
            <div className="bg-white p-6 rounded-xl shadow text-center">
                <p className="text-gray-500 text-sm">Tests effectués</p>
                <p className="text-3xl font-bold text-purple-600">{stats.testsCount}</p>
            </div>

            {/* Niveau dominant */}
            <div className="bg-white p-6 rounded-xl shadow text-center">
                <p className="text-gray-500 text-sm">Niveau dominant</p>
                <p className="text-3xl font-bold text-orange-600">
                    {Object.keys(stats.levels).length > 0
                        ? Object.entries(stats.levels).sort((a, b) => b[1] - a[1])[0][0]
                        : "N/A"}
                </p>
            </div>

        </div>
    );
}