import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useState } from "react";
import { FaUsers, FaMoneyBillWave, FaUniversity } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import UseAuth from "../../Hook/UseAuth";
import Loading from "../Loading";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white shadow-lg rounded-lg px-4 py-2 border border-gray-600">
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-blue-400">Applications: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const StatCard = ({ icon, title, value, gradient }) => (
  <div
    className={`relative bg-white/10 backdrop-blur-xl border border-white/10
      overflow-hidden rounded-2xl p-6 text-white shadow-lg
      transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
      bg-gradient-to-br ${gradient}`}
  >
    <div className="flex items-center gap-4">
      <div className="p-4 rounded-xl bg-white/20 shadow-inner">{icon}</div>
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h3 className="text-3xl font-black tracking-tight">{value}</h3>
      </div>
    </div>
  </div>
);

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const { loading } = UseAuth();

  const { data: applicationdata = [] } = useQuery({
    queryKey: ["application"],
    queryFn: async () => {
      const res = await axiosSecure.get("/application");
      return res.data;
    },
  });

  const { data: paymentTotal = {} } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment-analysis/total");
      return res.data;
    },
  });

  const { data: users = [], isLoading: userLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  const { data: scholarships = [] } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data.totalScholar;
    },
  });

  const [chartType, setChartType] = useState("bar");
  const [viewType, setViewType] = useState("category");

  const categoryCount = {};
  applicationdata.forEach((app) => {
    categoryCount[app.scholarshipCategory] =
      (categoryCount[app.scholarshipCategory] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCount).map((key) => ({
    name: key,
    applications: categoryCount[key],
  }));

  const universityCount = {};
  applicationdata.forEach((app) => {
    universityCount[app.universityName] =
      (universityCount[app.universityName] || 0) + 1;
  });

  const universityData = Object.keys(universityCount).map((key) => ({
    name: key,
    applications: universityCount[key],
  }));

  const data = viewType === "category" ? categoryData : universityData;

  if (loading || userLoading) return <Loading />;

  return (
    <section className="p-8 space-y-9 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h2 className="text-4xl font-black">📊 Analytics Dashboard</h2>
        <p className="text-gray-300">Visual insights from system activity</p>
      </div>

      {/* Cards */}
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <StatCard
    icon={<FaUsers size={30} />}
    title="Total Users"
    value={users.length}
    gradient="from-blue-500 via-indigo-500 to-purple-500"
  />
  <StatCard
    icon={<FaMoneyBillWave size={26} />}
    title="Total Fees Collected"
    value={`$${paymentTotal.totalAmount || 0}`}
    gradient="from-emerald-500 via-teal-500 to-cyan-500"
  />
  <StatCard
    icon={<FaUniversity size={26} />}
    title="Total Scholarships"
    value={scholarships || 0}
    gradient="from-orange-500/30 via-amber-500/30 to-yellow-500/30"
  />
</div>
      {/* Chart */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 space-y-6">
        <div className="flex flex-wrap gap-3">
          {[
            ["category", "Scholarship Category"],
            ["university", "University"],
          ].map(([type, label]) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-5 py-2.5 rounded-full font-medium transition 
                ${
                  viewType === type
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
            >
              {label}
            </button>
          ))}

          {[
            ["bar", "Bar Chart"],
            ["pie", "Pie Chart"],
          ].map(([type, label]) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-5 py-2.5 rounded-full font-medium transition 
                ${
                  chartType === type
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="applications">
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <PieChart>
                <Tooltip />
                <Legend wrapperStyle={{ color: "#fff" }} />
                <Pie
                  data={data}
                  dataKey="applications"
                  nameKey="name"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={6}
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
