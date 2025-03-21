
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// Mock data for demonstration purposes
const mockBatches = [
  {
    id: "1",
    name: "Web Development Fundamentals",
    partner: "Dr. Sarah Johnson",
    venue: "Main Campus",
    startDate: new Date("2024-07-15"),
    endDate: new Date("2024-08-10"),
    sessionCount: 8,
    type: "Fixed",
    mondaySession: true,
    fridaySession: true,
    startTime: "09:00",
    endTime: "11:00"
  },
  {
    id: "2",
    name: "Data Science Basics",
    partner: "Prof. Michael Chen",
    venue: "Innovation Hub",
    startDate: new Date("2024-07-20"),
    endDate: new Date("2024-10-20"),
    sessionCount: 12,
    type: "Quarterly Subscription",
    mondaySession: true,
    fridaySession: false,
    startTime: "14:00",
    endTime: "16:00"
  }
];

export const BatchSessionSchedule = () => {
  const [selectedBatch, setSelectedBatch] = useState(mockBatches[0]);
  
  // Generate session schedule based on batch parameters
  const generateSessionSchedule = (batch: typeof mockBatches[0]) => {
    const { startDate, sessionCount, mondaySession, fridaySession, startTime, endTime } = batch;
    
    const sessions = [];
    let currentDate = new Date(startDate);
    let sessionCounter = 0;
    
    while (sessionCounter < sessionCount) {
      const dayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
      
      // Check if the current day is a Monday (1) or Friday (5) based on batch configuration
      if ((mondaySession && dayOfWeek === 1) || (fridaySession && dayOfWeek === 5)) {
        sessions.push({
          id: `session-${sessionCounter + 1}`,
          date: new Date(currentDate),
          sessionNumber: sessionCounter + 1,
          startTime,
          endTime
        });
        
        sessionCounter++;
      }
      
      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return sessions;
  };
  
  const sessions = generateSessionSchedule(selectedBatch);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Session Routine Dashboard
          </CardTitle>
          <CardDescription>
            View and manage session schedules for each batch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {mockBatches.map(batch => (
                <Button 
                  key={batch.id}
                  variant={selectedBatch.id === batch.id ? "default" : "outline"}
                  onClick={() => setSelectedBatch(batch)}
                >
                  {batch.name}
                </Button>
              ))}
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {selectedBatch.name} - {selectedBatch.type}
                </CardTitle>
                <CardDescription>
                  Faculty: {selectedBatch.partner} | Venue: {selectedBatch.venue}
                </CardDescription>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>
                      {format(selectedBatch.startDate, "MMM d, yyyy")} - {format(selectedBatch.endDate, "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {selectedBatch.startTime} - {selectedBatch.endTime}
                    </span>
                  </div>
                  <div>
                    Session days: {[
                      selectedBatch.mondaySession ? "Monday" : null, 
                      selectedBatch.fridaySession ? "Friday" : null
                    ].filter(Boolean).join(", ")}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Session #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Day</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map(session => {
                      const sessionDate = new Date(session.date);
                      const isCompleted = sessionDate < new Date();
                      const isToday = format(sessionDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
                      
                      return (
                        <TableRow key={session.id}>
                          <TableCell className="font-medium">Session {session.sessionNumber}</TableCell>
                          <TableCell>{format(sessionDate, "MMM d, yyyy")}</TableCell>
                          <TableCell>{format(sessionDate, "EEEE")}</TableCell>
                          <TableCell>{session.startTime} - {session.endTime}</TableCell>
                          <TableCell>
                            {isCompleted ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Completed
                              </span>
                            ) : isToday ? (
                              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                Today
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                Upcoming
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
