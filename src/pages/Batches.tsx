
import { DashboardLayout } from "@/components/DashboardLayout";
import { BatchManagement } from "@/components/batches/BatchManagement";
import { BatchSessionSchedule } from "@/components/batches/BatchSessionSchedule";
import { BatchReporting } from "@/components/batches/BatchReporting";
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
            <TabsTrigger value="sessions">Session Routine</TabsTrigger>
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
