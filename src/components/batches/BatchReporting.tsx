
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

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
          <div className="rounded-md border p-8 text-center">
            <h2 className="text-xl font-semibold">Batch Reporting Analytics</h2>
            <p className="text-muted-foreground mt-2">
              The detailed batch reporting functionality will be implemented soon.
              This will include progress tracking, completion rates, and occupancy analytics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
