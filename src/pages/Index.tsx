
import { Card } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Users, Shield, ClipboardList, UserCog } from "lucide-react";

const statsCards = [
  {
    title: "Total Users",
    value: "24",
    icon: Users,
    className: "bg-blue-50",
    iconClassName: "text-blue-500",
  },
  {
    title: "Active Roles",
    value: "5",
    icon: Shield,
    className: "bg-purple-50",
    iconClassName: "text-purple-500",
  },
  {
    title: "Today's Logs",
    value: "127",
    icon: ClipboardList,
    className: "bg-green-50",
    iconClassName: "text-green-500",
  },
  {
    title: "Admin Users",
    value: "8",
    icon: UserCog,
    className: "bg-orange-50",
    iconClassName: "text-orange-500",
  },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="fade-in">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2">Welcome to Young Achiever Academy's admin portal</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card) => (
            <Card key={card.title} className={`p-6 glass-card ${card.className}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-semibold mt-2">{card.value}</p>
                </div>
                <card.icon className={`h-8 w-8 ${card.iconClassName}`} />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card className="p-6 glass-card">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-white/50">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="text-sm font-medium">New admin user added</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
