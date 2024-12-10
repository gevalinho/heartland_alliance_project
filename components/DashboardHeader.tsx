"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Medication Monitoring</h1>
        <p className="text-gray-600 mt-2">
          Monitor and manage patient medication adherence
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => router.push("/patients/new")}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Add Patient
        </Button>
        <Button
          onClick={() => router.push("/calls")}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Call History
        </Button>
      </div>
    </div>
  );
}