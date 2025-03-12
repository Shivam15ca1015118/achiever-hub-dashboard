
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Users, Shield, ClipboardList, UserCog } from "lucide-react";

const menuItems = [
  {
    title: "User Management",
    icon: Users,
    url: "/users",
  },
  {
    title: "Roles & Permissions",
    icon: Shield,
    url: "/roles",
  },
  {
    title: "Action Logs",
    icon: ClipboardList,
    url: "/logs",
  },
  {
    title: "Profile",
    icon: UserCog,
    url: "/profile",
  },
];

export function AdminSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-xl font-semibold text-primary">Young Achiever</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
