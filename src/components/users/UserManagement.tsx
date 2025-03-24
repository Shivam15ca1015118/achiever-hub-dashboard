
import { useState } from "react";
import { UserForm } from "./UserForm";
import { UsersList } from "./UsersList";
import { Button } from "@/components/ui/button";
import { FileDown, PlusCircle, Upload } from "lucide-react";
import { CSVImporter } from "./CSVImporter";

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

  return (
    <div className="space-y-6">
      {showForm ? (
        <UserForm initialData={editUser} onClose={handleCloseForm} />
      ) : showImporter ? (
        <CSVImporter onClose={handleCloseImporter} />
      ) : (
        <>
          <div className="flex justify-end gap-2">
            <Button onClick={handleImportCSV} variant="outline" className="flex items-center gap-2">
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
