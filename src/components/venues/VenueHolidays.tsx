
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

type Holiday = {
  id: string;
  venueName: string;
  date: Date;
  description: string;
};

// Mock data for demonstration
const demoHolidays: Holiday[] = [
  {
    id: '1',
    venueName: 'Main Campus',
    date: new Date(2023, 11, 25), // Christmas
    description: 'Christmas Day'
  },
  {
    id: '2',
    venueName: 'All Venues',
    date: new Date(2024, 0, 1), // New Year
    description: 'New Year\'s Day'
  },
  {
    id: '3',
    venueName: 'Downtown Training Center',
    date: new Date(2023, 10, 23), // Thanksgiving
    description: 'Thanksgiving'
  }
];

export function VenueHolidays() {
  const [holidays, setHolidays] = useState<Holiday[]>(demoHolidays);
  const [selectedVenue, setSelectedVenue] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState("");
  
  const holidayDates = holidays.map(holiday => holiday.date);
  
  const addHoliday = () => {
    if (selectedDate && description) {
      const newHoliday: Holiday = {
        id: (holidays.length + 1).toString(),
        venueName: selectedVenue === 'all' ? 'All Venues' : 
                  selectedVenue === 'main' ? 'Main Campus' : 
                  selectedVenue === 'downtown' ? 'Downtown Training Center' : 'East Wing Annex',
        date: selectedDate,
        description
      };
      
      setHolidays([...holidays, newHoliday]);
      setSelectedDate(undefined);
      setDescription("");
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Set the day off during business days</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Select Venue</label>
                  <Select
                    value={selectedVenue}
                    onValueChange={setSelectedVenue}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Venues</SelectItem>
                      <SelectItem value="main">Main Campus</SelectItem>
                      <SelectItem value="downtown">Downtown Training Center</SelectItem>
                      <SelectItem value="eastWing">East Wing Annex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-md p-3"
                    modifiers={{
                      holiday: holidayDates
                    }}
                    modifiersStyles={{
                      holiday: {
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        color: 'red'
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Holiday Description</label>
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter description for the holiday"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={addHoliday}
                    disabled={!selectedDate || !description}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Holiday
                  </Button>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-md font-medium mb-2">Upcoming Holidays</h3>
                  <div className="max-h-[220px] overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Venue</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {holidays.map((holiday) => (
                          <TableRow key={holiday.id}>
                            <TableCell>{holiday.venueName}</TableCell>
                            <TableCell>{format(holiday.date, 'MMM dd, yyyy')}</TableCell>
                            <TableCell>{holiday.description}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
