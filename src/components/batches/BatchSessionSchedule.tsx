
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ListChecks } from "lucide-react";

export const BatchSessionSchedule = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Session Schedule
          </CardTitle>
          <CardDescription>
            View and manage upcoming batch sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border p-8 text-center">
            <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
              <ListChecks className="h-5 w-5" />
              Session Schedule Dashboard
            </h2>
            <p className="text-muted-foreground mt-2">
              The detailed session schedule functionality will be implemented soon.
              This will include a calendar view, rescheduling options, and attendance tracking.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
