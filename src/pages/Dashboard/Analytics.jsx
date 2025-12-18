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

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow rounded-lg px-3 py-2 border">
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-blue-600">
          Applications: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const StatCard = ({ icon, title, value, gradient }) => (
  <div
    className={`relative overflow-hidden rounded-3xl p-6 text-white shadow-lg 
      transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
      bg-gradient-to-br ${gradient}`}
  >
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl" />

    <div className="relative flex items-center gap-4">
      <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md">
        {icon}
      </div>

      <div>
        <p className="text-sm opacity-90">{title}</p>
        <h3 className="text-3xl font-extrabold tracking-tight">{value}</h3>
      </div>
    </div>
  </div>
);

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  // 📌 Applications
  const { data: applicationdata = [] } = useQuery({
    queryKey: ["application"],
    queryFn: async () => {
      const res = await axiosSecure.get("/application");
      return res.data;
    },
  });

  // 📌 Users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user");
      return res.data;
    },
  });

  // 📌 Scholarships
  const { data: scholarships = [] } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  // 📌 Total Fees
  const totalFees = applicationdata.reduce((sum, item) => {
    const fee = Number(item.applicationFees  || 0);
    return sum + fee;
  }, 0);

  const [chartType, setChartType] = useState("bar");
  const [viewType, setViewType] = useState("category");

  // CATEGORY COUNT
  const categoryCount = {};

 applicationdata.forEach(app=>{
       if(!categoryCount[app.scholarshipCategory])
       {
            categoryCount[app.scholarshipCategory]=1
       }
       else{
            categoryCount[app.scholarshipCategory]++
       }
  })




  console.log('categoraycount',categoryCount)

  const categoryData = Object.keys(categoryCount).map((key) => ({
    name: key,
    applications: categoryCount[key],
  }));    

  console.log('categoryData',categoryData)
  // UNIVERSITY COUNT
  const universityCount = {};
  applicationdata.forEach((app) => {
    if (!universityCount[app.universityName]) {
      universityCount[app.universityName] = 1;
    } else {
      universityCount[app.universityName]++;
    }
  });

  const universityData = Object.keys(universityCount).map((key) => ({
    name: key,
    applications: universityCount[key],
  }));

  const data = viewType === "category" ? categoryData : universityData;

  return (
    <section className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">Analytics Overview</h2>
      <p className="text-sm text-gray-500">
        Platform data & application visualization
      </p>

      {/* TOP CARDS */}
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
          value={`$${totalFees}`}
          gradient="from-emerald-500 via-teal-500 to-cyan-500"
        />

        <StatCard
          icon={<FaUniversity size={26} />}
          title="Total Scholarships"
          value={scholarships.length}
          gradient="from-orange-500 via-amber-500 to-yellow-500"
        />
      </div>

      {/* CHART AREA */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <div className="flex flex-wrap gap-3 justify-between">
          <button
            onClick={() => setViewType("category")}
            className={`px-4 py-2 rounded-full ${
              viewType === "category"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Scholarship Category
          </button>

          <button
            onClick={() => setViewType("university")}
            className={`px-4 py-2 rounded-full ${
              viewType === "university"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            University
          </button>

          <button
            onClick={() => setChartType("bar")}
            className={`px-4 py-2 rounded-full ${
              chartType === "bar"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Bar Chart
          </button>

          <button
            onClick={() => setChartType("pie")}
            className={`px-4 py-2 rounded-full ${
              chartType === "pie"
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Pie Chart
          </button>
        </div>

        {/* ACTUAL CHART */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="applications">
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={data}
                  dataKey="applications"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={80}
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
