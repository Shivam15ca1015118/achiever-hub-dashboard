
import { DashboardLayout } from "@/components/DashboardLayout";
import { UserManagement } from "@/components/users/UserManagement";

export default function Users() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
        </div>
        <UserManagement />
      </div>
    </DashboardLayout>
  );
}
