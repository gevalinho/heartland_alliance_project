"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Clock, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Patient {
  id: string;
  name: string;
  phoneNumber: string;
  medicationName: string;
  lastCallTime: string;
  adherenceScore: number;
}

export function PatientDashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const response = await fetch("/api/patients");
    const data = await response.json();
    setPatients(data);
  };

  const initiateCall = async (patientId: string) => {
    try {
      const response = await fetch("/api/twilio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to initiate call");
      }
      
      // Refresh the patient list after initiating the call
      fetchPatients();
    } catch (error) {
      console.error("Error initiating call:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {patients.map((patient) => (
        <Card key={patient.id}>
          <CardHeader>
            <CardTitle>{patient.name}</CardTitle>
            <CardDescription>{patient.medicationName}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Last call:{" "}
                    {patient.lastCallTime
                      ? formatDistanceToNow(new Date(patient.lastCallTime), {
                          addSuffix: true,
                        })
                      : "Never"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {patient.adherenceScore >= 0.8 ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm">
                    {Math.round(patient.adherenceScore * 100)}% adherence
                  </span>
                </div>
              </div>
              <Button
                onClick={() => initiateCall(patient.id)}
                className="w-full flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Initiate Call
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}