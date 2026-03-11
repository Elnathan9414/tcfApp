import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

export default function ProgressionChart({ results }) {

    const data = results.map(r => ({
        date: new Date(r.created_at).toLocaleDateString(),
        percentage: r.percentage,
    }));

    return (
        <div className="w-full h-72">
            <h2 className="text-lg font-semibold mb-4">Évolution des scores</h2>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="percentage"
                        stroke="#4F46E5"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}