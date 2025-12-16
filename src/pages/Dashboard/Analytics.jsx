import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { FaUsers, FaUniversity, FaMoneyBillWave } from "react-icons/fa";
const Analytics = () => {
        const chartData = [
        { name: "Engineering", applications: 120 },
        { name: "Medical", applications: 90 },
        { name: "Business", applications: 70 },
        { name: "Arts", applications: 50 }
    ];
    return (
        <div>
               <section className="p-6">
            <h2 className="text-2xl font-bold mb-6">Analytics Overview</h2>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Total Users */}
                <div className="bg-base-200 rounded-2xl p-6 shadow flex items-center gap-4">
                    <div className="p-4 rounded-full bg-primary text-white">
                        <FaUsers size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500">Total Users</p>
                        <h3 className="text-2xl font-bold">1,250</h3>
                    </div>
                </div>

                {/* Total Fees */}
                <div className="bg-base-200 rounded-2xl p-6 shadow flex items-center gap-4">
                    <div className="p-4 rounded-full bg-success text-white">
                        <FaMoneyBillWave size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500">Total Fees Collected</p>
                        <h3 className="text-2xl font-bold">$18,400</h3>
                    </div>
                </div>

                {/* Total Scholarships */}
                <div className="bg-base-200 rounded-2xl p-6 shadow flex items-center gap-4">
                    <div className="p-4 rounded-full bg-warning text-white">
                        <FaUniversity size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500">Total Scholarships</p>
                        <h3 className="text-2xl font-bold">42</h3>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-base-200 rounded-2xl p-6 shadow">
                <h3 className="text-xl font-semibold mb-4">
                    Applications by Scholarship Category
                </h3>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="applications" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
        </div>
    );
};

export default Analytics;