
import { useState } from "react";
import { BatchForm } from "./BatchForm";
import { BatchList } from "./BatchList";
import { BatchSessionModal } from "./BatchSessionModal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const BatchManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [editBatch, setEditBatch] = useState<any>(null);

  const handleAddBatch = () => {
    setEditBatch(null);
    setShowForm(true);
  };

  const handleEditBatch = (batch: any) => {
    setEditBatch(batch);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditBatch(null);
  };

  const handleOpenSessionModal = () => {
    setShowSessionModal(true);
  };

  const handleCloseSessionModal = () => {
    setShowSessionModal(false);
  };

  return (
    <div className="space-y-6">
      {showForm ? (
        <BatchForm 
          initialData={editBatch} 
          onClose={handleCloseForm} 
          onOpenSessionModal={handleOpenSessionModal} 
        />
      ) : (
        <>
          <div className="flex justify-end">
            <Button onClick={handleAddBatch} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Add New Batch
            </Button>
          </div>
          <BatchList onEdit={handleEditBatch} />
        </>
      )}

      <BatchSessionModal
        open={showSessionModal}
        onClose={handleCloseSessionModal}
      />
    </div>
  );
};
