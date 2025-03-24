
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CSVImporterProps {
  onClose: () => void;
}

export const CSVImporter = ({ onClose }: CSVImporterProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: number;
    errors: { row: number; error: string }[];
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "text/csv") {
        toast({
          title: "Invalid file",
          description: "Please upload a CSV file",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const downloadSampleCSV = () => {
    // Create sample CSV content
    const csvContent = [
      "firstName,lastName,email,phone,username,password,role,venue,department,enrollmentNumber,batch,designation,subjectsAssigned,joiningDate,dateOfBirth,guardianContact,admissionDate,status,emailVerification,sendWelcomeEmail,payType,sharePercentage,fixedPay,batchShare",
      "John,Doe,john@example.com,1234567890,johndoe,password123,admin,Main Campus,,,,,,,,,,,active,true,true,,,",
      "Jane,Smith,jane@example.com,9876543210,janesmith,password123,faculty,Downtown Training Center,Mathematics,,,,,,,,,,active,true,true,,,",
      "Alex,Johnson,alex@example.com,5551234567,alexj,password123,student,Main Campus,,STU123456,Batch 2023,,,,2000-01-01,parent@example.com,2023-08-15,active,true,true,,,",
      "Sarah,Williams,sarah@example.com,7778889999,sarahw,password123,partner,Innovation Hub,,,,,,,,,,,active,true,true,Rev Share,25,,",
    ].join("\n");

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "user_import_template.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Sample CSV downloaded",
      description: "The template has been downloaded to your device.",
    });
  };

  const handleUploadCSV = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate processing the CSV file
    setTimeout(() => {
      // This would be where you'd actually process the file and import users
      // For now, we'll just simulate a successful import with some errors
      
      setUploadResult({
        success: 3,
        errors: [
          { row: 2, error: "Email already exists" }
        ]
      });
      
      setIsUploading(false);
      
      toast({
        title: "Import completed",
        description: "Users have been imported successfully with some warnings.",
      });
    }, 2000);
  };

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between bg-muted/30">
        <CardTitle>Import Users from CSV</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex flex-col gap-2 p-6 border rounded-lg">
          <h3 className="text-lg font-medium">Download Sample CSV</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Download a sample CSV file with the correct format for importing users. Fill in your data and upload it back.
          </p>
          <Button 
            onClick={downloadSampleCSV} 
            variant="outline" 
            className="w-fit"
          >
            <Download className="mr-2 h-4 w-4" /> Download Sample CSV
          </Button>
        </div>

        <div className="flex flex-col gap-2 p-6 border rounded-lg">
          <h3 className="text-lg font-medium">Upload User CSV</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select your completed CSV file to import users. Make sure it follows the template format.
          </p>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Input 
                type="file" 
                accept=".csv" 
                onChange={handleFileChange}
                className="max-w-md"
              />
              <Button 
                onClick={handleUploadCSV} 
                disabled={!file || isUploading}
              >
                {isUploading ? "Uploading..." : "Upload & Import"}
                {!isUploading && <Upload className="ml-2 h-4 w-4" />}
              </Button>
            </div>
            
            {file && (
              <p className="text-sm">
                Selected file: <span className="font-medium">{file.name}</span> ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>
        </div>

        {uploadResult && (
          <Alert className={uploadResult.errors.length > 0 ? "bg-amber-50" : "bg-green-50"}>
            <AlertTitle>Import Results</AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2">
                <p>Successfully imported {uploadResult.success} user(s).</p>
                
                {uploadResult.errors.length > 0 && (
                  <div>
                    <p className="font-medium">Errors encountered:</p>
                    <ul className="list-disc pl-5 mt-1">
                      {uploadResult.errors.map((error, idx) => (
                        <li key={idx}>
                          Row {error.row}: {error.error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
