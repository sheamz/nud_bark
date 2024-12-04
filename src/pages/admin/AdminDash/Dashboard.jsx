import React from "react";
import AdminNav from "../AdminNav";

export default function Dashboard() {
  return (
    <>
      <AdminNav />
      <div className="container p-0 mt-5">
        <div className="admin-dash">
          <h2>Dashboard</h2>
        </div>
      </div>
    </>
  );
}
