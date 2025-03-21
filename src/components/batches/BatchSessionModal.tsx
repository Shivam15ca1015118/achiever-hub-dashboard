
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Calendar, 
  Clock, 
  ListChecks, 
  FileText, 
  CheckCheck, 
  BookOpenText 
} from "lucide-react";

type BatchSessionModalProps = {
  open: boolean;
  onClose: () => void;
};

export const BatchSessionModal = ({ open, onClose }: BatchSessionModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Session Scheduling
          </DialogTitle>
          <DialogDescription>
            Manage and understand batch session schedules
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" /> 
              Session Structure
            </h3>
            <p className="text-sm text-muted-foreground">
              Each batch consists of 8 classes that follow a Monday & Friday roster.
              All sessions are scheduled automatically based on the start date and selected days.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary" />
              Scheduling Rules
            </h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 pl-1">
              <li>Sessions can only be rescheduled but never canceled</li>
              <li>For subscription batches, sessions recur on selected days</li>
              <li>For fixed batches, all 8 sessions are scheduled upfront</li>
              <li>All batches will automatically complete after 8 sessions</li>
              <li>If one day is selected (only Monday or only Friday), sessions will be weekly</li>
              <li>If both days are selected, sessions will alternate between Monday and Friday</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Session Management
            </h3>
            <p className="text-sm text-muted-foreground">
              Trainers can view upcoming sessions in the Session Schedule tab. 
              Rescheduling requires approval and will be reflected in the calendar. 
              All changes are logged for auditing purposes.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BookOpenText className="h-5 w-5 text-primary" />
              Batch Completion
            </h3>
            <p className="text-sm text-muted-foreground">
              A batch is considered complete when all 8 sessions have been conducted.
              For subscription batches, a new cycle begins automatically after completion.
              Fixed batches are marked as completed after the 8th session.
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CheckCheck className="h-5 w-5 text-primary" />
              Default Schedule
            </h3>
            <p className="text-sm text-muted-foreground">
              By default, both Monday and Friday are selected for sessions, providing an optimal
              learning schedule with appropriate intervals. You can adjust this if needed,
              but maintaining both days is recommended for best learning outcomes.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
