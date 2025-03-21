
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, HelpCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, addMonths, addDays } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const batchTypes = [
  { value: "fixed", label: "Fixed" },
  { value: "monthly", label: "Monthly Subscription" },
  { value: "quarterly", label: "Quarterly Subscription" },
  { value: "half_yearly", label: "Half Yearly Subscription" },
  { value: "yearly", label: "Yearly Subscription" }
];

const formSchema = z.object({
  batchName: z.string().min(3, { message: "Batch name must be at least 3 characters" }),
  batchType: z.enum(["fixed", "monthly", "quarterly", "half_yearly", "yearly"]),
  partner: z.string().min(1, { message: "Partner is required" }),
  venue: z.string().min(1, { message: "Venue is required" }),
  startDate: z.date(),
  endDate: z.date(),
  sessionCount: z.number().min(1, { message: "Session count must be at least 1" }),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  guestPartners: z.array(z.string()).optional(),
  maxCapacity: z.number().min(1, { message: "Maximum capacity must be at least 1" }),
  mondaySession: z.boolean(),
  fridaySession: z.boolean(),
  notes: z.string().optional()
});

type BatchFormValues = z.infer<typeof formSchema>;

// Mock partners data (faculty)
const mockPartners = [
  { id: "1", name: "Dr. Sarah Johnson" },
  { id: "2", name: "Prof. Michael Chen" },
  { id: "3", name: "Dr. Emily Rodriguez" },
  { id: "4", name: "Prof. David Thompson" },
  { id: "5", name: "Dr. Amanda Lee" }
];

// Mock venues data
const mockVenues = [
  { id: "1", name: "Main Campus" },
  { id: "2", name: "Downtown Training Center" },
  { id: "3", name: "East Wing Annex" },
  { id: "4", name: "Innovation Hub" }
];

type BatchFormProps = {
  initialData?: any;
  onClose: () => void;
  onOpenSessionModal: () => void;
};

export const BatchForm = ({ initialData, onClose, onOpenSessionModal }: BatchFormProps) => {
  // Get default values based on whether we're editing or creating
  const defaultValues: Partial<BatchFormValues> = {
    batchName: initialData?.name || "",
    batchType: initialData?.type ? initialData.type.toLowerCase() : "monthly",
    partner: initialData?.partner || "",
    venue: initialData?.venue || "",
    startDate: initialData?.startDate ? new Date(initialData.startDate) : new Date(),
    endDate: initialData?.endDate ? new Date(initialData.endDate) : addMonths(new Date(), 1),
    sessionCount: initialData?.sessionCount || 8,
    startTime: initialData?.startTime || "09:00",
    endTime: initialData?.endTime || "11:00",
    guestPartners: initialData?.guestPartners || [],
    maxCapacity: initialData?.maxCapacity || 30,
    mondaySession: initialData?.mondaySession !== undefined ? initialData.mondaySession : true,
    fridaySession: initialData?.fridaySession !== undefined ? initialData.fridaySession : true,
    notes: initialData?.notes || ""
  };

  const form = useForm<BatchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  // Watch for changes in batch type and start date to calculate end date
  const batchType = form.watch("batchType");
  const startDate = form.watch("startDate");
  
  useEffect(() => {
    if (batchType !== "fixed" && startDate) {
      let endDate;
      
      switch (batchType) {
        case "monthly":
          endDate = addMonths(startDate, 1);
          break;
        case "quarterly":
          endDate = addMonths(startDate, 3);
          break;
        case "half_yearly":
          endDate = addMonths(startDate, 6);
          break;
        case "yearly":
          endDate = addMonths(startDate, 12);
          break;
        default:
          endDate = addMonths(startDate, 1);
      }
      
      // Subtract one day to make it inclusive of the last day of the period
      endDate = addDays(endDate, -1);
      
      form.setValue("endDate", endDate);
    }
  }, [batchType, startDate, form]);

  const onSubmit = (data: BatchFormValues) => {
    console.log("Form data submitted:", data);
    
    // Here you would typically make an API call to save the batch
    // For now we'll just log it and close the form
    
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {initialData ? "Edit Batch" : "Create New Batch"}
        </h2>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Batch Information</CardTitle>
              <CardDescription>
                Enter the basic information about this batch
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="batchName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter batch name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="batchType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select batch type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {batchTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose between fixed or subscription-based batch types
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="partner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign Partner</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select faculty partner" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockPartners.map(partner => (
                            <SelectItem key={partner.id} value={partner.name}>
                              {partner.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="venue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select venue" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockVenues.map(venue => (
                            <SelectItem key={venue.id} value={venue.name}>
                              {venue.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="maxCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Capacity</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1}
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum number of students
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sessionCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Sessions</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1}
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Default is 8 sessions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Start Time</FormLabel>
                      <FormControl>
                        <Input 
                          type="time"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session End Time</FormLabel>
                      <FormControl>
                        <Input 
                          type="time"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Batch Schedule</CardTitle>
              <CardDescription>
                Define the batch duration and session days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        The first session date of the batch
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={batchType !== "fixed"}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={batchType !== "fixed"}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        {batchType === "fixed" 
                          ? "Select the end date for fixed batches" 
                          : "Auto-calculated based on subscription type"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="mondaySession"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Monday Sessions</FormLabel>
                        <FormDescription>
                          Schedule sessions on Mondays
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fridaySession"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Friday Sessions</FormLabel>
                        <FormDescription>
                          Schedule sessions on Fridays
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Add additional notes about scheduling if needed"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <CardFooter className="flex justify-end space-x-2 px-0">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Batch" : "Create Batch"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
};
