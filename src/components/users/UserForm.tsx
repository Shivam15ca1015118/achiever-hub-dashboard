
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { X, ArrowLeft, Upload, Save, Plus } from "lucide-react";

// Mock venues data
const mockVenues = [
  { id: "1", name: "Main Campus" },
  { id: "2", name: "Downtown Training Center" },
  { id: "3", name: "East Wing Annex" },
  { id: "4", name: "Innovation Hub" }
];

const userSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  role: z.enum(["admin", "faculty", "student"]),
  department: z.string().optional(),
  enrollmentNumber: z.string().optional(),
  batch: z.string().optional(),
  venue: z.string().optional(),
  permissions: z.record(z.boolean()).optional(),
  designation: z.string().optional(),
  subjectsAssigned: z.string().optional(),
  joiningDate: z.string().optional(),
  dateOfBirth: z.string().optional(),
  guardianContact: z.string().optional(),
  admissionDate: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]),
  emailVerification: z.boolean().default(true),
  sendWelcomeEmail: z.boolean().default(true),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  initialData?: any;
  onClose: () => void;
}

export const UserForm = ({ initialData, onClose }: UserFormProps) => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const defaultValues: Partial<UserFormValues> = {
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    username: initialData?.username || "",
    password: initialData ? "********" : "",
    confirmPassword: initialData ? "********" : "",
    role: initialData?.role || "student",
    department: initialData?.department || "",
    enrollmentNumber: initialData?.enrollmentNumber || "",
    batch: initialData?.batch || "",
    venue: initialData?.venue || "",
    permissions: initialData?.permissions || {
      users: false,
      roles: false,
      venues: false,
      batches: false,
      partners: false,
      members: false,
    },
    designation: initialData?.designation || "",
    subjectsAssigned: initialData?.subjectsAssigned || "",
    joiningDate: initialData?.joiningDate || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    guardianContact: initialData?.guardianContact || "",
    admissionDate: initialData?.admissionDate || "",
    status: initialData?.status || "pending",
    emailVerification: initialData?.emailVerification !== false,
    sendWelcomeEmail: initialData ? false : true,
  };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const role = form.watch("role");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: UserFormValues) => {
    console.log("Form data:", data);
    console.log("Profile image:", profileImage);
    
    // In a real app, you would save the data to your backend here
    toast({
      title: "User saved",
      description: `${data.firstName} ${data.lastName} has been ${initialData ? "updated" : "created"} successfully.`,
    });
    
    onClose();
  };

  const handleSaveAndAddAnother = async () => {
    const valid = await form.trigger();
    if (valid) {
      const values = form.getValues();
      onSubmit(values);
      form.reset(defaultValues);
      setProfileImage(null);
    }
  };

  const renderPermissions = () => {
    if (role === "student") {
      return (
        <div className="flex items-center justify-center h-32 border rounded-md">
          <p className="text-muted-foreground">Students do not have any permission access rights.</p>
        </div>
      );
    }

    if (role === "faculty") {
      return (
        <div className="border rounded-md p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="permissions.members"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">Member Management</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="permissions.batches"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="cursor-pointer">Batch Management</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="border rounded-md p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="permissions.users"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">User Management</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permissions.roles"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">Roles & Permissions</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permissions.venues"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">Venue Management</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permissions.batches"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">Batch Management</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permissions.partners"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">Partner Management</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permissions.members"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">Member Management</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="permissions.billing"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer">Billing Permissions</FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  };

  const getTabsList = () => {
    if (role === "admin") {
      return (
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="userDetails">User Details</TabsTrigger>
          <TabsTrigger value="roleAccess">Role & Access</TabsTrigger>
          <TabsTrigger value="accountSettings">Account Settings</TabsTrigger>
        </TabsList>
      );
    }
    
    return (
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="userDetails">User Details</TabsTrigger>
        <TabsTrigger value="roleAccess">Role & Access</TabsTrigger>
        <TabsTrigger value="additionalInfo">Additional Info</TabsTrigger>
        <TabsTrigger value="accountSettings">Account Settings</TabsTrigger>
      </TabsList>
    );
  };

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/30">
        <CardTitle>{initialData ? "Edit User" : "Add New User"}</CardTitle>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="userDetails" className="w-full">
              {getTabsList()}

              <TabsContent value="userDetails" className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="johndoe" {...field} />
                        </FormControl>
                        <FormDescription>
                          Auto-generated based on name or manually enter.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <div className="text-muted-foreground text-xs text-center">No Image</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium mb-2">Profile Picture</h3>
                      <div className="flex gap-2">
                        <label htmlFor="profile-upload" className="cursor-pointer">
                          <div className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Upload
                          </div>
                          <input
                            id="profile-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </label>
                        {profileImage && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setProfileImage(null)}
                            size="sm"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Recommended: Square image, at least 300x300px
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="roleAccess" className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="faculty">Faculty</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
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
                        <FormLabel>Assigned Venue</FormLabel>
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
                        <FormDescription>
                          Assign this user to a specific venue
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {role === "faculty" && (
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department/Subject</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="history">History</SelectItem>
                              <SelectItem value="computer_science">Computer Science</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {role === "student" && (
                    <>
                      <FormField
                        control={form.control}
                        name="enrollmentNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enrollment Number</FormLabel>
                            <FormControl>
                              <Input placeholder="ENR123456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="batch"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Batch/Grade/Class</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select batch" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="batch_2023">Batch 2023</SelectItem>
                                <SelectItem value="batch_2022">Batch 2022</SelectItem>
                                <SelectItem value="batch_2021">Batch 2021</SelectItem>
                                <SelectItem value="grade_10">Grade 10</SelectItem>
                                <SelectItem value="grade_11">Grade 11</SelectItem>
                                <SelectItem value="grade_12">Grade 12</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>

                {role !== "student" && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Permissions & Access Levels</h3>
                    {renderPermissions()}
                  </div>
                )}
              </TabsContent>

              {role !== "admin" && (
                <TabsContent value="additionalInfo" className="space-y-6 py-4">
                  {role === "faculty" && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Designation</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select designation" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="professor">Professor</SelectItem>
                                <SelectItem value="assistant_professor">Assistant Professor</SelectItem>
                                <SelectItem value="lecturer">Lecturer</SelectItem>
                                <SelectItem value="instructor">Instructor</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subjectsAssigned"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subjects Assigned</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter subjects assigned, one per line"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter multiple subjects separated by commas or new lines
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="joiningDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Joining Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {role === "student" && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="guardianContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Guardian Contact Info</FormLabel>
                            <FormControl>
                              <Input placeholder="Guardian phone or email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="admissionDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Admission Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </TabsContent>
              )}

              <TabsContent value="accountSettings" className="space-y-6 py-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Account Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="active" />
                            </FormControl>
                            <FormLabel className="cursor-pointer">Active</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="inactive" />
                            </FormControl>
                            <FormLabel className="cursor-pointer">Inactive</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="pending" />
                            </FormControl>
                            <FormLabel className="cursor-pointer">Pending</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="emailVerification"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="cursor-pointer">Email Verification Required</FormLabel>
                          <FormDescription>
                            User will need to verify their email before accessing the system
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sendWelcomeEmail"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="cursor-pointer">Send Welcome Email</FormLabel>
                          <FormDescription>
                            An email with login details will be sent to the user
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Audit Information</h3>
                  <div className="text-sm space-y-2 text-muted-foreground">
                    {initialData ? (
                      <>
                        <p>Created by: Admin User on {new Date().toLocaleDateString()}</p>
                        <p>Last updated by: Admin User on {new Date().toLocaleDateString()}</p>
                      </>
                    ) : (
                      <p>Will be created by: Admin User</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleSaveAndAddAnother}
                variant="outline"
              >
                <Save className="mr-2 h-4 w-4" /> Save & Add Another
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save & Close
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
