'use client';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

export default function ClientHomeStats() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
                {name: 'M1', score: 80}, {name: 'M2', score: 65}, {name: 'M3', score: 90}, {name: 'M5', score: 75}, {name: 'M6', score: 85}
            ]}>
                <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={false} tickLine={false} />
                <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
