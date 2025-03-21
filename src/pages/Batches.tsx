
import { DashboardLayout } from "@/components/DashboardLayout";
import { BatchManagement } from "@/components/batches/BatchManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Batches() {
  const [activeTab, setActiveTab] = useState("management");
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Batch Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage batches, sessions, and track progress
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="management">Batch Management</TabsTrigger>
            <TabsTrigger value="sessions">Session Schedule</TabsTrigger>
            <TabsTrigger value="reporting">Reporting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="management" className="space-y-4">
            <BatchManagement />
          </TabsContent>
          
          <TabsContent value="sessions" className="space-y-4">
            <BatchSessionSchedule />
          </TabsContent>
          
          <TabsContent value="reporting" className="space-y-4">
            <BatchReporting />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

// Temporary component until we implement the real one
function BatchSessionSchedule() {
  return (
    <div className="rounded-md border p-8 text-center">
      <h2 className="text-xl font-semibold">Session Schedule</h2>
      <p className="text-muted-foreground mt-2">
        The session schedule functionality will be implemented soon.
      </p>
    </div>
  );
}

// Temporary component until we implement the real one
function BatchReporting() {
  return (
    <div className="rounded-md border p-8 text-center">
      <h2 className="text-xl font-semibold">Batch Reporting</h2>
      <p className="text-muted-foreground mt-2">
        The batch reporting functionality will be implemented soon.
      </p>
    </div>
  );
}
