
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Calendar as CalendarIcon, Clock, GraduationCap, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
    startTime: "14:00",
    endTime: "16:00"
  }
];

type Session = {
  id: string;
  date: Date;
  sessionNumber: number;
  startTime: string;
  endTime: string;
};

export const BatchSessionSchedule = () => {
  const [selectedBatch, setSelectedBatch] = useState(mockBatches[0]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isWeekendDialogOpen, setIsWeekendDialogOpen] = useState(false);
  
  // Generate session schedule based on batch parameters
  const generateSessionSchedule = (batch: typeof mockBatches[0]) => {
    const { startDate, sessionCount, startTime, endTime } = batch;
    
    const sessions = [];
    let currentDate = new Date(startDate);
    let sessionCounter = 0;
    
    while (sessionCounter < sessionCount) {
      const dayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
      
      // Only schedule on Monday (1) through Friday (5)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
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
  
  const handleReschedule = (session: Session) => {
    setSelectedSession(session);
    setIsRescheduleOpen(true);
  };
  
  const handleSaveReschedule = () => {
    // In a real application, save the rescheduled session
    setIsRescheduleOpen(false);
    setSelectedSession(null);
  };
  
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
            <div className="w-full max-w-xs">
              <Select 
                value={selectedBatch.id} 
                onValueChange={(value) => {
                  const batch = mockBatches.find(b => b.id === value);
                  if (batch) setSelectedBatch(batch);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a batch" />
                </SelectTrigger>
                <SelectContent>
                  {mockBatches.map(batch => (
                    <SelectItem key={batch.id} value={batch.id}>
                      {batch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                    Session count: {selectedBatch.sessionCount}
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
                      <TableHead>Actions</TableHead>
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
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleReschedule(session)}
                              disabled={isCompleted}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit session</span>
                            </Button>
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
      
      {/* Reschedule Dialog */}
      <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reschedule Session</DialogTitle>
            <DialogDescription>
              Select a new date and time for this session
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium">Session:</span>
              <span className="col-span-3">{selectedSession ? `Session ${selectedSession.sessionNumber}` : ''}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium">Current Date:</span>
              <span className="col-span-3">
                {selectedSession ? format(selectedSession.date, "MMM d, yyyy (EEEE)") : ''}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium">Current Time:</span>
              <span className="col-span-3">
                {selectedSession ? `${selectedSession.startTime} - ${selectedSession.endTime}` : ''}
              </span>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">New Schedule:</h4>
              <div className="space-y-2">
                <div>
                  <label htmlFor="new-date" className="text-sm text-muted-foreground">
                    New Date (Monday - Friday only)
                  </label>
                  <input 
                    type="date" 
                    id="new-date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      const day = date.getDay();
                      // Check if weekend (0 = Sunday, 6 = Saturday)
                      if (day === 0 || day === 6) {
                        setIsWeekendDialogOpen(true);
                        e.target.value = ''; // Reset input
                      }
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="new-start-time" className="text-sm text-muted-foreground">
                      New Start Time
                    </label>
                    <input 
                      type="time" 
                      id="new-start-time"
                      defaultValue={selectedSession?.startTime}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="new-end-time" className="text-sm text-muted-foreground">
                      New End Time
                    </label>
                    <input 
                      type="time" 
                      id="new-end-time"
                      defaultValue={selectedSession?.endTime}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRescheduleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveReschedule}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Weekend Warning Dialog */}
      <Dialog open={isWeekendDialogOpen} onOpenChange={setIsWeekendDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invalid Selection</DialogTitle>
            <DialogDescription>
              Sessions can only be scheduled between Monday and Friday. Please select a weekday.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsWeekendDialogOpen(false)}>
              Understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
