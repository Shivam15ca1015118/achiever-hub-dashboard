
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { UserFormValues } from ".";
import { 
  MultiSelect, 
  MultiSelectTrigger, 
  MultiSelectValue, 
  MultiSelectContent, 
  MultiSelectItem 
} from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";

interface Venue {
  id: string;
  name: string;
}

interface Batch {
  id: string;
  name: string;
}

interface RoleAccessTabProps {
  form: UseFormReturn<UserFormValues>;
  venues: Venue[];
  batches: Batch[];
}

export const RoleAccessTab = ({ form, venues, batches }: RoleAccessTabProps) => {
  const role = form.watch("role");
  const payType = form.watch("payType");
  
  const renderPermissions = () => {
    if (role === "student") {
      return (
        <div className="flex items-center justify-center h-32 border rounded-md">
          <p className="text-muted-foreground">Students do not have any permission access rights.</p>
        </div>
      );
    }

    if (role === "partner") {
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

  return (
    <div className="space-y-6">
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
                  <SelectItem value="partner">Partner</SelectItem>
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
                  {venues.map(venue => (
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

        {role === "partner" && (
          <>
            <FormField
              control={form.control}
              name="assignedBatches"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Batches</FormLabel>
                  <MultiSelect
                    selected={field.value || []}
                    onChange={field.onChange}
                  >
                    <MultiSelectTrigger>
                      <MultiSelectValue placeholder="Select batches" />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                      {batches.map(batch => (
                        <MultiSelectItem key={batch.id} value={batch.id}>
                          {batch.name}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectContent>
                  </MultiSelect>
                  <FormDescription>
                    Select multiple batches to assign to this partner
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pay Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pay type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="revShare">Rev Share</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="batchShare">Batch Share</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {payType === "revShare" && (
              <FormField
                control={form.control}
                name="sharePercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Share Percentage (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {payType === "fixed" && (
              <FormField
                control={form.control}
                name="fixedPay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fixed Pay Amount</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {payType === "batchShare" && (
              <FormField
                control={form.control}
                name="batchShareAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch Share Amount</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
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
    </div>
  );
};
