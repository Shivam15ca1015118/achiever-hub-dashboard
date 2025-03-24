
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { UserFormValues } from ".";

interface BasicInfoTabProps {
  form: UseFormReturn<UserFormValues>;
  profileImage: string | null;
  onProfileImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveProfileImage: () => void;
}

export const BasicInfoTab = ({ 
  form, 
  profileImage, 
  onProfileImageUpload, 
  onRemoveProfileImage 
}: BasicInfoTabProps) => {
  return (
    <>
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
                  onChange={onProfileImageUpload}
                />
              </label>
              {profileImage && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onRemoveProfileImage}
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
    </>
  );
};
