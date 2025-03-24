
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { UserFormValues } from ".";

interface AccountSettingsTabProps {
  form: UseFormReturn<UserFormValues>;
  initialData?: any;
}

export const AccountSettingsTab = ({ form, initialData }: AccountSettingsTabProps) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};
