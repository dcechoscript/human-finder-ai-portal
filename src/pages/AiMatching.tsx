
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Person, PersonStatus } from "@/types";
import ImageUploader from "@/components/ImageUploader";
import PersonSelector from "@/components/PersonSelector";
import { toast } from "@/hooks/use-toast";

// Mock data combining both missing and found persons with realistic images
const mockPersons: Person[] = [
  {
    id: "1",
    name: "John Doe",
    age: 35,
    gender: "male",
    lastSeenDate: "2023-11-15",
    lastSeenLocation: "New York, NY",
    description: "Last seen wearing a blue jacket and jeans.",
    contactInfo: "contact@example.com",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=800&fit=crop",
    status: PersonStatus.MISSING,
    reportedDate: "2023-11-16",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 28,
    gender: "female",
    lastSeenDate: "2023-12-01",
    lastSeenLocation: "Los Angeles, CA",
    description: "Last seen wearing a red dress and black coat.",
    contactInfo: "contact@example.com",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=800&fit=crop",
    status: PersonStatus.MISSING,
    reportedDate: "2023-12-02",
  },
  {
    id: "4",
    name: "Unknown Male",
    age: 30,
    gender: "male",
    lastSeenDate: "2023-12-10",
    lastSeenLocation: "Boston, MA",
    description: "Found near Boston Common. Medium height, brown hair.",
    contactInfo: "boston.police@example.com",
    imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=800&fit=crop",
    status: PersonStatus.FOUND,
    reportedDate: "2023-12-11",
  },
  {
    id: "5",
    name: "Unknown Female",
    age: 25,
    gender: "female",
    lastSeenDate: "2023-11-30",
    lastSeenLocation: "Seattle, WA",
    description: "Found at local shelter. No identification.",
    contactInfo: "seattle.services@example.com",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
    status: PersonStatus.FOUND,
    reportedDate: "2023-12-01",
  },
];

const AiMatching = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upload" | "select">("select");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
  };
  
  const handlePersonSelect = (person: Person) => {
    setSelectedPerson(person);
  };
  
  const runAiMatching = () => {
    // Validate that we have either an uploaded image or a selected person
    if (!uploadedImage && !selectedPerson && activeTab === "upload") {
      toast({
        title: "No image selected",
        description: "Please upload an image or select a person to search for matches",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedPerson && activeTab === "select") {
      toast({
        title: "No person selected",
        description: "Please select a missing or found person to search for matches",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    setHasSearched(false);
    setSearchResults([]);
    
    // Mock AI matching - simulate API call
    setTimeout(() => {
      let results: Person[];
      
      if (activeTab === "select" && selectedPerson) {
        // If a person is selected, search for matches in the opposite category
        const oppositeStatus = selectedPerson.status === PersonStatus.MISSING 
          ? PersonStatus.FOUND 
          : PersonStatus.MISSING;
          
        results = mockPersons.filter(person => 
          person.status === oppositeStatus && 
          person.id !== selectedPerson.id &&
          (person.gender === selectedPerson.gender || !person.gender || !selectedPerson.gender)
        );
      } else {
        // For uploaded images, just return random results from both categories
        results = mockPersons.filter((_, index) => index % 2 === 0);
      }
      
      // Simulate sometimes finding no results
      if (Math.random() > 0.7) {
        results = [];
      }
      
      setSearchResults(results);
      setIsSearching(false);
      setHasSearched(true);
      
      if (results.length > 0) {
        toast({
          title: "Potential matches found",
          description: `Found ${results.length} potential ${results.length === 1 ? 'match' : 'matches'}`,
        });
      } else {
        toast({
          title: "No matches found",
          description: "We couldn't find any potential matches. Try adjusting your search.",
          variant: "destructive",
        });
      }
    }, 3000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Face Matching</h1>
          <p className="text-lg text-gray-600 mb-8">
            Our AI can scan photos to find potential matches between missing and found persons.
            Upload a new photo or select a person from our database to search for matches.
          </p>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "upload" | "select")} className="mb-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="select">Select Existing Person</TabsTrigger>
              <TabsTrigger value="upload">Upload New Photo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="select" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Select a Missing or Found Person</h2>
                  <p className="text-gray-600 mb-6">
                    Choose a person from our database. We'll search for potential matches in the opposite category.
                  </p>
                  
                  <PersonSelector
                    persons={mockPersons}
                    onSelect={handlePersonSelect}
                    selected={selectedPerson}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="upload" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Upload a New Photo</h2>
                  <p className="text-gray-600 mb-6">
                    Upload a clear photo of the person you're looking for. Our AI will search both missing and found persons.
                  </p>
                  
                  <ImageUploader onImageUploaded={handleImageUpload} />
                  
                  {uploadedImage && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">Preview:</p>
                      <div className="w-40 h-40 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center mb-10">
            <Button 
              onClick={runAiMatching} 
              disabled={isSearching}
              size="lg" 
              className="bg-gradient-to-r from-brand-blue to-brand-purple"
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-5 w-5" />
                  Run AI Face Matching
                </>
              )}
            </Button>
          </div>
          
          {hasSearched && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchResults.length > 0 ? "Potential Matches" : "No Matches Found"}
              </h2>
              
              {searchResults.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No matches found</h3>
                  <p className="mt-2 text-gray-500">
                    We couldn't find any potential matches. Try uploading a different photo or selecting another person.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map(person => (
                    <Card key={person.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-w-16 aspect-h-9">
                        <img 
                          src={person.imageUrl} 
                          alt={person.name} 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg mb-1">{person.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          {person.status === PersonStatus.MISSING ? "Missing since" : "Found on"}: {new Date(person.lastSeenDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500 mb-3">
                          {person.lastSeenLocation}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            person.status === PersonStatus.MISSING 
                              ? "bg-red-100 text-red-800" 
                              : "bg-green-100 text-green-800"
                          }`}>
                            {person.status}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/person/${person.id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} HumanFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AiMatching;
