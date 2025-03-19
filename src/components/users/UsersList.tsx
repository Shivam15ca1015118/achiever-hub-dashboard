import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Lock, 
  Mail,
  Check,
  X,
  User
} from "lucide-react";

const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    username: "janesmith",
    role: "faculty",
    status: "active",
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@example.com",
    username: "michaelj",
    role: "student",
    status: "pending",
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.w@example.com",
    username: "sarahw",
    role: "faculty",
    status: "inactive",
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Brown",
    email: "david.b@example.com",
    username: "davidb",
    role: "student",
    status: "active",
  },
];

interface UsersListProps {
  onEdit: (user: any) => void;
}

export const UsersList = ({ onEdit }: UsersListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState(mockUsers);
  const isMobile = useIsMobile();

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "faculty":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "student":
        return "bg-teal-100 text-teal-800 hover:bg-teal-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const renderMobileView = () => {
    return (
      <div className="space-y-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No users found matching your search criteria.
          </div>
        ) : (
          filteredUsers.map((user) => (
            <Card key={user.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">
                      {user.firstName} {user.lastName}
                    </h3>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(user)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Lock className="h-4 w-4 mr-2" />
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Username:</div>
                  <div>{user.username}</div>
                  
                  <div className="text-muted-foreground">Email:</div>
                  <div className="truncate">{user.email}</div>
                  
                  <div className="text-muted-foreground">Role:</div>
                  <div>
                    <Badge variant="outline" className={getRoleBadge(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="text-muted-foreground">Status:</div>
                  <div>
                    <Badge variant="outline" className={getStatusBadgeColor(user.status)}>
                      {user.status === "active" && <Check className="h-3 w-3 mr-1" />}
                      {user.status === "inactive" && <X className="h-3 w-3 mr-1" />}
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  };

  const renderTableView = () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[150px]">Username</TableHead>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead className="w-[120px] text-center">Role</TableHead>
            <TableHead className="w-[120px] text-center">Status</TableHead>
            <TableHead className="w-[80px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                No users found matching your search criteria.
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium w-[200px]">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell className="w-[150px]">{user.username}</TableCell>
                <TableCell className="w-[200px]">{user.email}</TableCell>
                <TableCell className="w-[120px] text-center">
                  <Badge variant="outline" className={getRoleBadge(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="w-[120px] text-center">
                  <Badge variant="outline" className={getStatusBadgeColor(user.status)}>
                    {user.status === "active" && <Check className="h-3 w-3 mr-1" />}
                    {user.status === "inactive" && <X className="h-3 w-3 mr-1" />}
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="w-[80px] text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(user)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Lock className="h-4 w-4 mr-2" />
                        Reset Password
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/30">
        <CardTitle>User List</CardTitle>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isMobile ? renderMobileView() : renderTableView()}
      </CardContent>
    </Card>
  );
};
