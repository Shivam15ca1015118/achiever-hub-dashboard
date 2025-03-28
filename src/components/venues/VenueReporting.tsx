
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer } from "@/components/ui/chart";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export function VenueReporting() {
  const [selectedVenue, setSelectedVenue] = useState<string>("all");
  
  // Mock data for occupancy statistics
  const occupancyData = [
    {
      name: "Jan",
      "All Venues": 65,
      "Main Campus": 75,
      "Downtown Training Center": 60,
      "East Wing Annex": 45
    },
    {
      name: "Feb",
      "All Venues": 70,
      "Main Campus": 80,
      "Downtown Training Center": 65,
      "East Wing Annex": 50
    },
    {
      name: "Mar",
      "All Venues": 75,
      "Main Campus": 85,
      "Downtown Training Center": 70,
      "East Wing Annex": 55
    },
    {
      name: "Apr",
      "All Venues": 80,
      "Main Campus": 90,
      "Downtown Training Center": 75,
      "East Wing Annex": 60
    },
    {
      name: "May",
      "All Venues": 85,
      "Main Campus": 95,
      "Downtown Training Center": 80,
      "East Wing Annex": 65
    },
    {
      name: "Jun",
      "All Venues": 90,
      "Main Campus": 97,
      "Downtown Training Center": 85,
      "East Wing Annex": 70
    }
  ];
  
  // Mock data for usage statistics (hours per month)
  const usageData = [
    {
      name: "Jan",
      "All Venues": 320,
      "Main Campus": 180,
      "Downtown Training Center": 90,
      "East Wing Annex": 50
    },
    {
      name: "Feb",
      "All Venues": 350,
      "Main Campus": 200,
      "Downtown Training Center": 100,
      "East Wing Annex": 50
    },
    {
      name: "Mar",
      "All Venues": 380,
      "Main Campus": 210,
      "Downtown Training Center": 120,
      "East Wing Annex": 50
    },
    {
      name: "Apr",
      "All Venues": 400,
      "Main Campus": 220,
      "Downtown Training Center": 130,
      "East Wing Annex": 50
    },
    {
      name: "May",
      "All Venues": 420,
      "Main Campus": 230,
      "Downtown Training Center": 140,
      "East Wing Annex": 50
    },
    {
      name: "Jun",
      "All Venues": 450,
      "Main Campus": 250,
      "Downtown Training Center": 150,
      "East Wing Annex": 50
    }
  ];
  
  // Determine which venue data to display
  const getDataKey = () => {
    switch(selectedVenue) {
      case "main": return "Main Campus";
      case "downtown": return "Downtown Training Center";
      case "eastWing": return "East Wing Annex";
      default: return "All Venues";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Historical Data of Occupancy / Usage</h2>
        <Select
          value={selectedVenue}
          onValueChange={setSelectedVenue}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select venue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Venues</SelectItem>
            <SelectItem value="main">Main Campus</SelectItem>
            <SelectItem value="downtown">Downtown Training Center</SelectItem>
            <SelectItem value="eastWing">East Wing Annex</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Rate</CardTitle>
            <CardDescription>Monthly occupancy percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey={getDataKey()}
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>Total hours of venue usage per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey={getDataKey()} 
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
