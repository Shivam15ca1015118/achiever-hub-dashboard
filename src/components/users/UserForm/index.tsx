
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Plus, ArrowLeft, Upload, Save, X } from "lucide-react";
import { BasicInfoTab } from "./BasicInfoTab";
import { RoleAccessTab } from "./RoleAccessTab";
import { AdditionalInfoTab } from "./AdditionalInfoTab";
import { AccountSettingsTab } from "./AccountSettingsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock venues data
const mockVenues = [
  { id: "1", name: "Main Campus" },
  { id: "2", name: "Downtown Training Center" },
  { id: "3", name: "East Wing Annex" },
  { id: "4", name: "Innovation Hub" }
];

// Mock batches data
const mockBatches = [
  { id: "1", name: "Batch 2023 - Web Development" },
  { id: "2", name: "Batch 2023 - Mobile App Development" },
  { id: "3", name: "Batch 2022 - Data Science" },
  { id: "4", name: "Batch 2022 - Digital Marketing" },
];

export const userSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  role: z.enum(["admin", "partner", "student"]),
  department: z.string().optional(),
  assignedBatches: z.array(z.string()).optional(),
  enrollmentNumber: z.string().optional(),
  batch: z.string().optional(),
  venue: z.string().optional(),
  permissions: z.record(z.boolean()).optional(),
  designation: z.string().optional(),
  subjectsAssigned: z.string().optional(),
  certificatesRecognition: z.array(z.string()).optional(),
  joiningDate: z.string().optional(),
  dateOfBirth: z.string().optional(),
  guardianContact: z.string().optional(),
  admissionDate: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]),
  emailVerification: z.boolean().default(true),
  sendWelcomeEmail: z.boolean().default(true),
  payType: z.enum(["revShare", "fixed", "batchShare"]).optional(),
  sharePercentage: z.string().optional(),
  fixedPay: z.string().optional(),
  batchShareAmount: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  initialData?: any;
  onClose: () => void;
}

export const UserForm = ({ initialData, onClose }: UserFormProps) => {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<string[]>([]);

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
    assignedBatches: initialData?.assignedBatches || [],
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
    certificatesRecognition: initialData?.certificatesRecognition || [],
    joiningDate: initialData?.joiningDate || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    guardianContact: initialData?.guardianContact || "",
    admissionDate: initialData?.admissionDate || "",
    status: initialData?.status || "pending",
    emailVerification: initialData?.emailVerification !== false,
    sendWelcomeEmail: initialData ? false : true,
    payType: initialData?.payType || undefined,
    sharePercentage: initialData?.sharePercentage || "",
    fixedPay: initialData?.fixedPay || "",
    batchShareAmount: initialData?.batchShareAmount || "",
  };

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const role = form.watch("role");
  const payType = form.watch("payType");

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

  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this file to your server or cloud storage
      // For now, we'll just use the file name in the UI
      setCertificates(prev => [...prev, file.name]);
      
      // Update the form value
      const currentCerts = form.getValues("certificatesRecognition") || [];
      form.setValue("certificatesRecognition", [...currentCerts, file.name]);
    }
  };

  const removeCertificate = (index: number) => {
    setCertificates(prev => prev.filter((_, i) => i !== index));
    
    // Update the form value
    const currentCerts = form.getValues("certificatesRecognition") || [];
    form.setValue(
      "certificatesRecognition", 
      currentCerts.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: UserFormValues) => {
    console.log("Form data:", data);
    console.log("Profile image:", profileImage);
    console.log("Certificates:", certificates);
    
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
      setCertificates([]);
    }
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
                <BasicInfoTab 
                  form={form} 
                  profileImage={profileImage} 
                  onProfileImageUpload={handleImageUpload}
                  onRemoveProfileImage={() => setProfileImage(null)}
                />
              </TabsContent>

              <TabsContent value="roleAccess" className="space-y-6 py-4">
                <RoleAccessTab 
                  form={form} 
                  venues={mockVenues}
                  batches={mockBatches}
                />
              </TabsContent>

              {role !== "admin" && (
                <TabsContent value="additionalInfo" className="space-y-6 py-4">
                  <AdditionalInfoTab 
                    form={form}
                    certificates={certificates}
                    onCertificateUpload={handleCertificateUpload}
                    onRemoveCertificate={removeCertificate}
                  />
                </TabsContent>
              )}

              <TabsContent value="accountSettings" className="space-y-6 py-4">
                <AccountSettingsTab 
                  form={form}
                  initialData={initialData}
                />
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
