
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
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, HelpCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  batchName: z.string().min(3, { message: "Batch name must be at least 3 characters" }),
  batchType: z.enum(["subscription", "fixed"]),
  partner: z.string().min(1, { message: "Partner is required" }),
  venue: z.string().min(1, { message: "Venue is required" }),
  startDate: z.date(),
  guestPartners: z.array(z.string()).optional(),
  maxCapacity: z.number().min(1, { message: "Maximum capacity must be at least 1" }),
  mondaySession: z.boolean(),
  fridaySession: z.boolean(),
  notes: z.string().optional()
});

type BatchFormValues = z.infer<typeof formSchema>;

// Mock partners data
const mockPartners = [
  { id: "1", name: "Tech Solutions Inc." },
  { id: "2", name: "Creative Design Co." },
  { id: "3", name: "AppWorks Ltd." },
  { id: "4", name: "Data Insights Corp." },
  { id: "5", name: "Global Education Partners" }
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
    batchType: initialData?.type ? initialData.type.toLowerCase() : "subscription",
    partner: initialData?.partner || "",
    venue: initialData?.venue || "",
    startDate: initialData?.startDate ? new Date(initialData.startDate) : new Date(),
    guestPartners: initialData?.guestPartners || [],
    maxCapacity: initialData?.maxCapacity || 30,
    mondaySession: true,
    fridaySession: true,
    notes: initialData?.notes || ""
  };

  const form = useForm<BatchFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

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
                          <SelectItem value="subscription">Subscription</SelectItem>
                          <SelectItem value="fixed">Fixed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Subscription batches are recurring, fixed are one-time
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
                      <FormLabel>Primary Partner</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select primary partner" />
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
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                        Maximum number of students in this batch
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Session Scheduling</CardTitle>
                  <CardDescription>
                    Sessions are scheduled on Monday and Friday
                  </CardDescription>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={onOpenSessionModal}
                >
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
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
