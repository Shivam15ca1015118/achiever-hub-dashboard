
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { VenueForm } from "./VenueForm";
import { Building, Edit, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Venue = {
  id: string;
  name: string;
  address: string;
  capacity: number;
  status: 'active' | 'inactive';
  type: string;
};

// Mock data for demonstration
const demoVenues: Venue[] = [
  { 
    id: '1', 
    name: 'Main Campus', 
    address: '123 Education St, City', 
    capacity: 500, 
    status: 'active',
    type: 'Campus' 
  },
  { 
    id: '2', 
    name: 'Downtown Training Center', 
    address: '456 Learning Ave, Downtown', 
    capacity: 200, 
    status: 'active',
    type: 'Training Center' 
  },
  { 
    id: '3', 
    name: 'East Wing Annex', 
    address: '789 Knowledge Rd, East District', 
    capacity: 150, 
    status: 'inactive',
    type: 'Annex' 
  },
];

export function VenueList() {
  const [venues, setVenues] = useState<Venue[]>(demoVenues);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const handleStatusChange = (id: string) => {
    setVenues(venues.map(venue => 
      venue.id === id 
        ? { ...venue, status: venue.status === 'active' ? 'inactive' : 'active' } 
        : venue
    ));
  };

  const handleEdit = (venue: Venue) => {
    setSelectedVenue(venue);
  };

  const handleAddVenue = (venue: Venue) => {
    setVenues([...venues, { ...venue, id: (venues.length + 1).toString() }]);
    setIsAddOpen(false);
  };

  const handleUpdateVenue = (updatedVenue: Venue) => {
    setVenues(venues.map(venue => 
      venue.id === updatedVenue.id ? updatedVenue : venue
    ));
    setSelectedVenue(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage venue operations</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Building className="mr-2 h-4 w-4" />
              Add New Venue
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Venue</DialogTitle>
            </DialogHeader>
            <VenueForm onSubmit={handleAddVenue} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {venues.map((venue) => (
            <TableRow key={venue.id}>
              <TableCell className="font-medium">{venue.name}</TableCell>
              <TableCell>{venue.type}</TableCell>
              <TableCell>{venue.address}</TableCell>
              <TableCell>{venue.capacity}</TableCell>
              <TableCell>
                <Badge 
                  variant={venue.status === 'active' ? 'default' : 'destructive'}
                >
                  {venue.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleStatusChange(venue.id)}
                    title={venue.status === 'active' ? 'Disable Venue' : 'Enable Venue'}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleEdit(venue)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Edit Venue</DialogTitle>
                      </DialogHeader>
                      {selectedVenue && (
                        <VenueForm venue={venue} onSubmit={handleUpdateVenue} />
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
