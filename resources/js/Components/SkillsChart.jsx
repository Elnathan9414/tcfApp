import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

export default function SkillsChart({ stats }) {

    // Transformer les données pour Recharts
    const data = Object.entries(stats).map(([type, values]) => ({
        name:
            type === "comprehension_orale" ? "Compréhension orale" :
            type === "comprehension_ecrite" ? "Compréhension écrite" :
            type === "structure_langue" ? "Structure de la langue" :
            type,
        avg: values.avg
    }));

    return (
        <div className="w-full h-80">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Performance par compétence
            </h2>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="avg" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}