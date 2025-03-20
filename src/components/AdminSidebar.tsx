
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Users, 
  User, 
  MapPin, 
  Package, 
  Building, 
  UserCog,
  History
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    return currentPath === path;
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <div className="p-6">
          <div className="flex justify-center items-center mb-4">
            <img 
              src="/lovable-uploads/98dec25d-616a-4afa-94ce-e404b365aa35.png" 
              alt="Young Achievers Logo" 
              className="h-20"
            />
          </div>
          <p className="text-sm text-gray-500 text-center py-2">Admin Dashboard</p>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    isActive("/users") && "bg-secondary text-secondary-foreground font-medium"
                  )}
                >
                  <a href="/users" className="flex items-center gap-3">
                    <Users className="h-4 w-4" />
                    <span>User Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    isActive("/venues") && "bg-secondary text-secondary-foreground font-medium"
                  )}
                >
                  <a href="/venues" className="flex items-center gap-3">
                    <MapPin className="h-4 w-4" />
                    <span>Venue Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    isActive("/batches") && "bg-secondary text-secondary-foreground font-medium"
                  )}
                >
                  <a href="/batches" className="flex items-center gap-3">
                    <Package className="h-4 w-4" />
                    <span>Batch Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    isActive("/partners") && "bg-secondary text-secondary-foreground font-medium"
                  )}
                >
                  <a href="/partners" className="flex items-center gap-3">
                    <Building className="h-4 w-4" />
                    <span>Partner Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    isActive("/members") && "bg-secondary text-secondary-foreground font-medium"
                  )}
                >
                  <a href="/members" className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    <span>Member Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    isActive("/activity-logs") && "bg-secondary text-secondary-foreground font-medium"
                  )}
                >
                  <a href="/activity-logs" className="flex items-center gap-3">
                    <History className="h-4 w-4" />
                    <span>Activity Logs</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    isActive("/profile") && "bg-secondary text-secondary-foreground font-medium"
                  )}
                >
                  <a href="/profile" className="flex items-center gap-3">
                    <UserCog className="h-4 w-4" />
                    <span>Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
