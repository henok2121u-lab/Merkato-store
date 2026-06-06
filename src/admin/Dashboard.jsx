import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    // MOCK DATA (replace with API later)
    setStats({
      totalOrders: 128,
      totalSales: 84500,
      totalProducts: 52,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A192F] text-white p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">
        Admin Dashboard
      </h1>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* TOTAL ORDERS */}
        <div className="bg-[#112240] p-6 rounded-xl shadow-lg border border-yellow-500/20 hover:scale-105 transition">
          <h2 className="text-gray-300 text-sm">Total Orders</h2>
          <p className="text-3xl font-bold mt-2 text-white">
            {stats.totalOrders}
          </p>
        </div>

        {/* TOTAL SALES */}
        <div className="bg-[#112240] p-6 rounded-xl shadow-lg border border-yellow-500/20 hover:scale-105 transition">
          <h2 className="text-gray-300 text-sm">Total Sales</h2>
          <p className="text-3xl font-bold mt-2 text-green-400">
            ${stats.totalSales.toLocaleString()}
          </p>
        </div>

        {/* TOTAL PRODUCTS */}
        <div className="bg-[#112240] p-6 rounded-xl shadow-lg border border-yellow-500/20 hover:scale-105 transition">
          <h2 className="text-gray-300 text-sm">Total Products</h2>
          <p className="text-3xl font-bold mt-2 text-yellow-400">
            {stats.totalProducts}
          </p>
        </div>

      </div>

      {/* EXTRA SECTION (optional) */}
      <div className="mt-10 bg-[#112240] p-6 rounded-xl border border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Quick Overview
        </h2>

        <p className="text-gray-400 text-sm">
          Welcome to your admin dashboard. Here you can manage products,
          orders, inventory, and customers. More analytics and charts can be
          added later.
        </p>
      </div>

    </div>
  );
}