import React from "react";



export default function Dashboard() {
    return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Parroquias</div>
          <div className="stat-value">15</div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Usuarios</div>
          <div className="stat-value">120</div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Reportes</div>
          <div className="stat-value">34</div>
        </div>
      </div>
    </div>
  );
}



