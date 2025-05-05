
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Image as ImageIcon, Loader2, AlertCircle, Bell } from "lucide-react";
import { Person, PersonStatus } from "@/types";
import ImageUploader from "@/components/ImageUploader";
import PersonSelector from "@/components/PersonSelector";
import { toast } from "@/hooks/use-toast";
import { detectHumanFace, compareFaces, preloadImage } from "@/utils/faceDetection";
import { NotificationService } from "@/services/NotificationService";

// Include example person that exists in both missing and found categories (same person with different records)
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
  {
    id: "6",
    name: "Alex Johnson",
    age: 32,
    gender: "male",
    lastSeenDate: "2023-10-25",
    lastSeenLocation: "Chicago, IL",
    description: "Has a distinctive birthmark on right cheek. Last seen at train station.",
    contactInfo: "chicago.pd@example.com",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop",
    status: PersonStatus.MISSING,
    reportedDate: "2023-10-26",
  },
  {
    id: "7",
    name: "Alex Johnson",
    age: 32,
    gender: "male",
    lastSeenDate: "2023-12-12",
    lastSeenLocation: "Denver, CO",
    description: "Found disoriented at a local hospital. Has a distinctive birthmark on right cheek.",
    contactInfo: "denver.pd@example.com",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop",
    status: PersonStatus.FOUND,
    reportedDate: "2023-12-13",
  }
];

const AiMatching = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"select" | "upload">("select");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [modelLoadError, setModelLoadError] = useState<string | null>(null);
  const [notificationSent, setNotificationSent] = useState<boolean>(false);
  
  const uploadedImageRef = useRef<HTMLImageElement | null>(null);
  
  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsLoadingModels(true);
        setModelLoadError(null);
        
        const { loadFaceDetectionModels } = await import('@/utils/faceDetection');
        await loadFaceDetectionModels();
        
        setIsLoadingModels(false);
      } catch (error) {
        console.error("Failed to load face detection models:", error);
        setModelLoadError("Failed to load face detection models. Make sure you've downloaded the required model files to the public/models directory.");
        setIsLoadingModels(false);
      }
    };
    
    loadModels();
  }, []);
  
  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    
    const img = new Image();
    img.src = imageDataUrl;
    img.onload = () => {
      uploadedImageRef.current = img;
    };
  };
  
  const handlePersonSelect = (person: Person) => {
    setSelectedPerson(person);
  };
  
  const runAiMatching = async () => {
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
    setNotificationSent(false);
    
    try {
      if (activeTab === "upload" && uploadedImage && uploadedImageRef.current) {
        const isHuman = await detectHumanFace(uploadedImageRef.current);
        
        if (!isHuman) {
          setIsSearching(false);
          setHasSearched(true);
          setSearchResults([]);
          
          toast({
            title: "No human face detected",
            description: "We couldn't detect a human face in the uploaded image. Please upload a clear photo of a person.",
            variant: "destructive",
          });
          return;
        }
      }
      
      let results: Person[] = [];
      
      if (activeTab === "select" && selectedPerson) {
        // Find persons from the opposite status (missing/found)
        const oppositeCategoryPersons = mockPersons.filter(person => 
          person.status !== selectedPerson.status
        );
        
        const matchPromises = oppositeCategoryPersons.map(async (person) => {
          try {
            // Special case for same people (Alex Johnson in both categories - ID 6 and 7)
            // This is for the example match
            if (
              (selectedPerson.id === "6" && person.id === "7") || 
              (selectedPerson.id === "7" && person.id === "6")
            ) {
              return {
                ...person,
                matchScore: 0.95 // Guaranteed match for demo
              };
            }
            
            const sourceImg = await preloadImage(selectedPerson.imageUrl || '');
            const targetImg = await preloadImage(person.imageUrl || '');
            
            const { matches, similarity } = await compareFaces(
              sourceImg, 
              targetImg, 
              0.5 // Using stricter threshold for better accuracy
            );
            
            if (matches) {
              return {
                ...person,
                matchScore: similarity
              };
            }
            return null;
          } catch (error) {
            console.error(`Error comparing faces for person ${person.id}:`, error);
            return null;
          }
        });
        
        const matchResults = await Promise.all(matchPromises);
        
        results = matchResults
          .filter((result): result is Person & { matchScore: number } => result !== null)
          .sort((a, b) => b.matchScore - a.matchScore);
          
        // Create notifications for matches if any found
        if (results.length > 0) {
          const topMatch = results[0];
          
          // Determine which person is missing and which is found
          let missingPerson = selectedPerson.status === PersonStatus.MISSING ? selectedPerson : topMatch;
          let foundPerson = selectedPerson.status === PersonStatus.FOUND ? selectedPerson : topMatch;
          
          // Create notification
          NotificationService.createMatchNotification(
            missingPerson,
            foundPerson,
            topMatch.matchScore
          );
          
          // Show toast notification
          NotificationService.showMatchToast(
            missingPerson,
            foundPerson,
            topMatch.matchScore
          );
          
          setNotificationSent(true);
        } else {
          // No matches found
          NotificationService.showNoMatchToast(selectedPerson);
        }
      } else if (activeTab === "upload" && uploadedImage && uploadedImageRef.current) {
        const allPersons = mockPersons;
        
        const matchPromises = allPersons.map(async (person) => {
          try {
            const targetImg = await preloadImage(person.imageUrl || '');
            
            const { matches, similarity } = await compareFaces(
              uploadedImageRef.current!,
              targetImg,
              0.5 // Using stricter threshold for better matches
            );
            
            if (matches) {
              return {
                ...person,
                matchScore: similarity
              };
            }
            return null;
          } catch (error) {
            console.error(`Error comparing uploaded face with person ${person.id}:`, error);
            return null;
          }
        });
        
        const matchResults = await Promise.all(matchPromises);
        
        results = matchResults
          .filter((result): result is Person & { matchScore: number } => result !== null)
          .sort((a, b) => b.matchScore - a.matchScore);
          
        // No notification for uploaded images since there's no "reporter"
      }
      
      setSearchResults(results);
      setIsSearching(false);
      setHasSearched(true);
      
      if (results.length > 0) {
        if (activeTab === "upload") {
          toast({
            title: "Potential matches found",
            description: `Found ${results.length} potential ${results.length === 1 ? 'match' : 'matches'}`,
          });
        }
      } else {
        toast({
          title: "No matches found",
          description: "We couldn't find any potential matches. Try adjusting your search.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during face matching:", error);
      setIsSearching(false);
      setHasSearched(true);
      
      toast({
        title: "Error during face matching",
        description: "An error occurred while trying to match faces. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (modelLoadError) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-md mx-auto mt-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Error Loading Face Detection</h2>
            <p className="text-gray-600 mb-6">{modelLoadError}</p>
            <Button onClick={() => window.location.reload()}>
              Retry Loading
            </Button>
          </div>
        </main>
      </div>
    );
  }
  
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
          
          {isLoadingModels ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-brand-purple mb-4" />
              <p className="text-gray-600">Loading face detection models...</p>
            </div>
          ) : (
            <>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Bell className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Example matches:</strong> Select "Alex Johnson" (missing) to find his match in the found persons.
                      Or try "John Doe" (missing) who has no matches to see how no-match cases work.
                    </p>
                  </div>
                </div>
              </div>
              
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
                      Analyzing faces...
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
                  
                  {notificationSent && activeTab === "select" && searchResults.length > 0 && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg">
                      <div className="flex items-start">
                        <Bell className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-green-800">Notifications Sent</h3>
                          <p className="text-sm text-green-700">
                            Both reporters have been notified about this potential match.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
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
                            <div className="bg-green-100 px-2 py-1 rounded-full text-sm text-green-800 inline-flex items-center mb-2">
                              <span className="font-bold mr-1">Match:</span> 
                              {Math.round((person as any).matchScore * 100)}%
                            </div>
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
            </>
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
