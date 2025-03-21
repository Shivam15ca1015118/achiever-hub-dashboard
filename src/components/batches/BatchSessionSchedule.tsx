
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ListChecks, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BatchSessionSchedule = () => {
  // Mock data for upcoming sessions
  const upcomingSessions = [
    { id: 1, batchName: "JavaScript Fundamentals", date: "May 15, 2023", time: "9:00 AM - 11:00 AM", location: "Main Campus" },
    { id: 2, batchName: "React Advanced", date: "May 16, 2023", time: "2:00 PM - 4:00 PM", location: "Innovation Hub" },
    { id: 3, batchName: "UX Design Principles", date: "May 17, 2023", time: "10:00 AM - 12:00 PM", location: "Downtown Training Center" },
  ];

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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {upcomingSessions.map(session => (
                <Card key={session.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{session.batchName}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="h-4 w-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Clock className="h-4 w-4" />
                          <span>{session.time}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="secondary" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="rounded-md border p-6 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <ListChecks className="h-5 w-5" />
                  Session Calendar
                </h3>
              </div>
              <p className="text-muted-foreground mt-2 mb-6">
                Full calendar view with session details and management options
              </p>
              
              <div className="flex items-center justify-center">
                <Calendar className="h-24 w-24 text-muted-foreground" />
              </div>
              <p className="text-center text-muted-foreground mt-4">
                The detailed calendar view will be implemented soon.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
