
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, MapPin, Users, Package, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

// Mock data for batches
const mockBatches = [
  {
    id: "1",
    name: "Web Development Fundamentals",
    type: "Subscription",
    partner: "Tech Solutions Inc.",
    venue: "Main Campus",
    startDate: "2023-06-01",
    endDate: "2023-07-31",
    sessionsCompleted: 5,
    totalSessions: 8,
    status: "active",
    enrollmentCount: 25,
    maxCapacity: 30
  },
  {
    id: "2",
    name: "UX Design Basics",
    type: "Fixed",
    partner: "Creative Design Co.",
    venue: "Downtown Training Center",
    startDate: "2023-07-15",
    endDate: "2023-09-15",
    sessionsCompleted: 8,
    totalSessions: 8,
    status: "completed",
    enrollmentCount: 18,
    maxCapacity: 20
  },
  {
    id: "3",
    name: "Mobile App Development",
    type: "Subscription",
    partner: "AppWorks Ltd.",
    venue: "East Wing Annex",
    startDate: "2023-08-01",
    endDate: "2023-10-01",
    sessionsCompleted: 2,
    totalSessions: 8,
    status: "active",
    enrollmentCount: 15,
    maxCapacity: 25
  },
  {
    id: "4",
    name: "Data Science Fundamentals",
    type: "Fixed",
    partner: "Data Insights Corp.",
    venue: "Main Campus",
    startDate: "2023-09-01",
    endDate: "2023-11-01",
    sessionsCompleted: 0,
    totalSessions: 8,
    status: "upcoming",
    enrollmentCount: 22,
    maxCapacity: 30
  },
];

type BatchListProps = {
  onEdit: (batch: any) => void;
};

export const BatchList = ({ onEdit }: BatchListProps) => {
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (batch: any) => {
    setSelectedBatch(batch);
    setDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "completed":
        return <Badge className="bg-gray-500 hover:bg-gray-600">Completed</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getOccupancyPercentage = (enrolled: number, max: number) => {
    return Math.round((enrolled / max) * 100);
  };

  return (
    <>
      <Table>
        <TableCaption>A list of all batches</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Batch Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Partner</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Occupancy</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockBatches.map((batch) => (
            <TableRow key={batch.id}>
              <TableCell className="font-medium">{batch.name}</TableCell>
              <TableCell>{batch.type}</TableCell>
              <TableCell>{batch.partner}</TableCell>
              <TableCell>{batch.venue}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>{batch.sessionsCompleted}/{batch.totalSessions} Sessions</span>
                    <span>{Math.round((batch.sessionsCompleted / batch.totalSessions) * 100)}%</span>
                  </div>
                  <Progress value={(batch.sessionsCompleted / batch.totalSessions) * 100} />
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(batch.status)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{batch.enrollmentCount}/{batch.maxCapacity}</span>
                  <Progress 
                    value={getOccupancyPercentage(batch.enrollmentCount, batch.maxCapacity)} 
                    className="w-16"
                  />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(batch)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(batch)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedBatch && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Batch Details</DialogTitle>
              <DialogDescription>
                Detailed information about the batch
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{selectedBatch.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={selectedBatch.type === "Subscription" ? "outline" : "default"}>
                      {selectedBatch.type}
                    </Badge>
                    {getStatusBadge(selectedBatch.status)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4" />
                    <span>Batch Type: {selectedBatch.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>Partner: {selectedBatch.partner}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>Venue: {selectedBatch.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Start Date: {new Date(selectedBatch.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>End Date: {new Date(selectedBatch.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Session Progress</h4>
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{selectedBatch.sessionsCompleted}/{selectedBatch.totalSessions} Sessions Completed</span>
                      <span>{Math.round((selectedBatch.sessionsCompleted / selectedBatch.totalSessions) * 100)}%</span>
                    </div>
                    <Progress value={(selectedBatch.sessionsCompleted / selectedBatch.totalSessions) * 100} />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium">Occupancy</h4>
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{selectedBatch.enrollmentCount}/{selectedBatch.maxCapacity} Enrolled</span>
                      <span>{getOccupancyPercentage(selectedBatch.enrollmentCount, selectedBatch.maxCapacity)}%</span>
                    </div>
                    <Progress value={getOccupancyPercentage(selectedBatch.enrollmentCount, selectedBatch.maxCapacity)} />
                  </div>
                </div>
                
                <div className="pt-2">
                  {selectedBatch.status === "active" && selectedBatch.sessionsCompleted === selectedBatch.totalSessions && (
                    <Button className="w-full flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Mark as Complete
                    </Button>
                  )}
                  
                  {selectedBatch.status === "active" && selectedBatch.enrollmentCount >= selectedBatch.maxCapacity && (
                    <Badge className="mt-2 w-full justify-center bg-yellow-500 hover:bg-yellow-600">
                      Enrollment Disabled (Maximum Capacity)
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
