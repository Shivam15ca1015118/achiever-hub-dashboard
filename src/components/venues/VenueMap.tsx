
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import { useState } from "react";

export function VenueMap() {
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Configure the venues on Maps for smooth navigation across venues</h2>
        
        {!isMapVisible ? (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="mapbox-token">Mapbox Access Token</Label>
                  <Input
                    id="mapbox-token"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    placeholder="Enter your Mapbox public token"
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    To use the map feature, you need a Mapbox access token. 
                    You can get one for free at <a href="https://mapbox.com" className="underline" target="_blank" rel="noreferrer">mapbox.com</a>
                  </p>
                </div>
                
                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={() => setIsMapVisible(true)}
                    disabled={!mapboxToken}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Show Venue Map
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Map Visualization</h3>
                <p className="text-muted-foreground max-w-md">
                  This is a placeholder for the Mapbox map. In a production environment, 
                  this would display an interactive map with venue locations.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Main Campus</h4>
                      <p className="text-sm text-muted-foreground">123 Education St, City</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Downtown Training Center</h4>
                      <p className="text-sm text-muted-foreground">456 Learning Ave, Downtown</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">East Wing Annex</h4>
                      <p className="text-sm text-muted-foreground">789 Knowledge Rd, East District</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
