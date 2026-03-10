import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

export default function ProgressionChart({ results }) {

    // Transformer les résultats pour le graphique
    const data = results
        .map(r => ({
            date: new Date(r.created_at).toLocaleDateString(),
            percentage: r.percentage
        }))
        .reverse(); // pour afficher du plus ancien au plus récent

    return (
        <div className="w-full h-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Progression dans le temps
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="percentage"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}