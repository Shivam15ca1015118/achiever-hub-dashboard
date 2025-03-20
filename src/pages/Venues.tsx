
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VenueList } from "@/components/venues/VenueList";
import { VenueReporting } from "@/components/venues/VenueReporting";
import { VenueHolidays } from "@/components/venues/VenueHolidays";
import { VenueManagers } from "@/components/venues/VenueManagers";
import { VenueMap } from "@/components/venues/VenueMap";

export default function Venues() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Venue Management</h1>
        
        <Tabs defaultValue="venues" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="venues">Add / Update / Disable</TabsTrigger>
            <TabsTrigger value="reporting">Reporting Dashboards</TabsTrigger>
            <TabsTrigger value="holidays">Mark Holiday / Day Off</TabsTrigger>
            <TabsTrigger value="managers">Facility Manager</TabsTrigger>
            <TabsTrigger value="location">GeoLocation on Maps</TabsTrigger>
          </TabsList>
          
          <TabsContent value="venues" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Venue List</CardTitle>
              </CardHeader>
              <CardContent>
                <VenueList />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reporting" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Venue Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <VenueReporting />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="holidays" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Venue Holidays</CardTitle>
              </CardHeader>
              <CardContent>
                <VenueHolidays />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="managers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Facility Managers</CardTitle>
              </CardHeader>
              <CardContent>
                <VenueManagers />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="location" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Venue Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <VenueMap />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
