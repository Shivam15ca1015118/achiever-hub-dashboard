
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, LineChart } from "@/components/ui/chart";
import { useState } from "react";

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
            <ChartContainer
              className="aspect-square md:aspect-video"
            >
              <LineChart
                data={occupancyData}
                index="name"
                categories={[
                  selectedVenue === "all" ? "All Venues" :
                  selectedVenue === "main" ? "Main Campus" :
                  selectedVenue === "downtown" ? "Downtown Training Center" : "East Wing Annex"
                ]}
                colors={["blue"]}
                yAxisWidth={40}
                showLegend={false}
              />
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>Total hours of venue usage per month</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[300px]">
            <div className="text-center text-muted-foreground">
              Detailed usage statistics will be available soon
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
