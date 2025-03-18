
import { useState } from "react";
import { UserForm } from "./UserForm";
import { UsersList } from "./UsersList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const UserManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<any>(null);

  const handleAddUser = () => {
    setEditUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user: any) => {
    setEditUser(user);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditUser(null);
  };

  return (
    <div className="space-y-6">
      {showForm ? (
        <UserForm initialData={editUser} onClose={handleCloseForm} />
      ) : (
        <>
          <div className="flex justify-end">
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
