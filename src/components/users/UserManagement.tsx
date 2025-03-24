
import { useState } from "react";
import { UserForm } from "./UserForm";
import { UsersList } from "./UsersList";
import { Button } from "@/components/ui/button";
import { Download, FileDown, PlusCircle, Upload } from "lucide-react";
import { CSVImporter } from "./CSVImporter";
import { toast } from "@/components/ui/use-toast";

export const UserManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);
  const [showImporter, setShowImporter] = useState(false);

  const handleAddUser = () => {
    setEditUser(null);
    setShowForm(true);
    setShowImporter(false);
  };

  const handleEditUser = (user: any) => {
    setEditUser(user);
    setShowForm(true);
    setShowImporter(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditUser(null);
  };

  const handleImportCSV = () => {
    setShowImporter(true);
    setShowForm(false);
  };

  const handleCloseImporter = () => {
    setShowImporter(false);
  };

  const handleDownloadCSVTemplate = () => {
    // Create CSV headers
    const headers = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "role",
      "venue",
      "status",
      "address",
      "city",
      "state",
      "zip",
    ].join(",");
    
    // Create a sample row
    const sampleData = [
      "John",
      "Doe",
      "john@example.com",
      "1234567890",
      "student", // student, partner, admin
      "Main Campus",
      "active", // active, inactive
      "123 Main St",
      "New York",
      "NY",
      "10001",
    ].join(",");
    
    // Combine headers and sample data
    const csvContent = `${headers}\n${sampleData}`;
    
    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "user_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "CSV Template Downloaded",
      description: "Use this template to prepare your user data for import.",
    });
  };

  return (
    <div className="space-y-6">
      {showForm ? (
        <UserForm initialData={editUser} onClose={handleCloseForm} />
      ) : showImporter ? (
        <CSVImporter onClose={handleCloseImporter} />
      ) : (
        <>
          <div className="flex justify-end gap-2">
            <Button 
              onClick={handleDownloadCSVTemplate} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" /> Download CSV Template
            </Button>
            <Button 
              onClick={handleImportCSV} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" /> Import CSV
            </Button>
            <Button onClick={handleAddUser} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Add New User
            </Button>
          </div>
          <UsersList onEdit={handleEditUser} />
        </>
      )}
    </div>
  );
};
