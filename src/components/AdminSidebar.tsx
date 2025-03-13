import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { 
  Users, 
  Shield, 
  ClipboardList, 
  UserCog, 
  MapPin, 
  Package, 
  Building, 
  User 
} from "lucide-react";
import { useState } from "react";

export function AdminSidebar() {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);

  const toggleUserManagement = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <div className="p-6">
          <div className="flex justify-center items-center mb-2">
            <img 
              src="/lovable-uploads/98dec25d-616a-4afa-94ce-e404b365aa35.png" 
              alt="Young Achievers Logo" 
              className="h-20"
            />
          </div>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={toggleUserManagement}
                  className="flex items-center gap-3 justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4" />
                    <span>User Management</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${isUserManagementOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </SidebarMenuButton>
                {isUserManagementOpen && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/roles" className="flex items-center gap-3">
                          <Shield className="h-4 w-4" />
                          <span>Roles & Permissions</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/logs" className="flex items-center gap-3">
                          <ClipboardList className="h-4 w-4" />
                          <span>Action Logs</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/venues" className="flex items-center gap-3">
                    <MapPin className="h-4 w-4" />
                    <span>Venue Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/batches" className="flex items-center gap-3">
                    <Package className="h-4 w-4" />
                    <span>Batch Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/partners" className="flex items-center gap-3">
                    <Building className="h-4 w-4" />
                    <span>Partner Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/members" className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    <span>Member Management</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
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
