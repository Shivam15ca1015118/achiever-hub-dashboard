
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, PieChart, Activity } from "lucide-react";

export const BatchReporting = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Batch Reporting Dashboard
          </CardTitle>
          <CardDescription>
            Track batch progress, completion rates, and occupancy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Batch Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <p className="text-2xl font-bold">14</p>
                    <p className="text-xs text-muted-foreground">Total Active Batches</p>
                  </div>
                  <div className="grid gap-1">
                    <p className="text-2xl font-bold">6</p>
                    <p className="text-xs text-muted-foreground">Completed Batches</p>
                  </div>
                  <div className="grid gap-1">
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-xs text-muted-foreground">Near Completion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="grid gap-1">
                    <p className="text-2xl font-bold">87%</p>
                    <p className="text-xs text-muted-foreground">Average Occupancy</p>
                  </div>
                  <div className="grid gap-1">
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-xs text-muted-foreground">Full Batches</p>
                  </div>
                  <div className="grid gap-1">
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-xs text-muted-foreground">Low Enrollment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 rounded-md border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Batch Completion Timeline</h3>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mt-2 mb-6">
              Tracking batch completion rates and timelines
            </p>
            
            <div className="flex items-center justify-center">
              <Activity className="h-24 w-24 text-muted-foreground" />
            </div>
            <p className="text-center text-muted-foreground mt-4">
              Detailed batch analytics and completion tracking will be implemented soon.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
