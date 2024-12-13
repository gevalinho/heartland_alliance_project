import { Suspense } from "react";
import { PatientDashboard } from "@/components/PatientDashboard";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card } from "@/components/ui/card";
import Dashboard from "@/components/ui/Dashboard";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      <Suspense fallback={<Card />}>
        {/* <PatientDashboard /> */}
        <Dashboard />
      </Suspense>
    </div>
  );
}
