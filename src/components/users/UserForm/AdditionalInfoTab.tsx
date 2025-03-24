
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { UserFormValues } from ".";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface AdditionalInfoTabProps {
  form: UseFormReturn<UserFormValues>;
  certificates: string[];
  onCertificateUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveCertificate: (index: number) => void;
}

export const AdditionalInfoTab = ({ 
  form, 
  certificates,
  onCertificateUpload,
  onRemoveCertificate
}: AdditionalInfoTabProps) => {
  const role = form.watch("role");

  return (
    <div className="space-y-6">
      {role === "partner" && (
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
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="associate_partner">Associate Partner</SelectItem>
                    <SelectItem value="senior_partner">Senior Partner</SelectItem>
                    <SelectItem value="instructor">Instructor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Certificates/Recognition</h3>
            <p className="text-sm text-muted-foreground">
              Upload certifications, awards, or recognition documents for this partner
            </p>
            
            <div className="p-4 border rounded-md">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <label htmlFor="certificate-upload" className="cursor-pointer">
                    <div className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Certificate
                    </div>
                    <input
                      id="certificate-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={onCertificateUpload}
                    />
                  </label>
                  <span className="text-xs text-muted-foreground">
                    PDF, JPEG, PNG (max 5MB)
                  </span>
                </div>
                
                {certificates.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Uploaded Certificates</h4>
                    <ul className="space-y-2">
                      {certificates.map((cert, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm">
                          <span className="truncate max-w-[200px]">{cert}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveCertificate(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center p-4 text-sm text-muted-foreground">
                    No certificates uploaded yet
                  </div>
                )}
              </div>
            </div>
            
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
    </div>
  );
};
