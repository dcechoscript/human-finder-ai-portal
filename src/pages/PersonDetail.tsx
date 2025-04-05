import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Person, PersonStatus } from "@/types";
import { MapPin, Calendar, ArrowDown, Mail, User } from "lucide-react";

// Mock data combining both missing and found persons with realistic images
const mockPersons: Person[] = [
  {
    id: "1",
    name: "John Doe",
    age: 35,
    gender: "male",
    lastSeenDate: "2023-11-15",
    lastSeenLocation: "New York, NY",
    description: "Last seen wearing a blue jacket and jeans. Has a small scar on his right cheek.",
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
    id: "3",
    name: "Michael Johnson",
    age: 42,
    gender: "male",
    lastSeenDate: "2023-10-20",
    lastSeenLocation: "Chicago, IL",
    description: "Has a tattoo on his left arm. Last seen at downtown train station.",
    contactInfo: "contact@example.com",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    status: PersonStatus.MISSING,
    reportedDate: "2023-10-21",
  },
  {
    id: "4",
    name: "Unknown Male",
    age: 30,
    gender: "male",
    lastSeenDate: "2023-12-10",
    lastSeenLocation: "Boston, MA",
    description: "Found near Boston Common. Medium height, brown hair. May have amnesia.",
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
    description: "Found at local shelter. No identification, speaks with foreign accent.",
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

const PersonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [potentialMatches, setPotentialMatches] = useState<Person[]>([]);

  useEffect(() => {
    // Simulate API call to fetch person details
    setLoading(true);
    setTimeout(() => {
      const foundPerson = mockPersons.find(p => p.id === id);
      if (foundPerson) {
        setPerson(foundPerson);
        
        // Generate potential matches based on opposite status and same name
        const matches = mockPersons.filter(p => 
          p.id !== id && 
          (p.status !== foundPerson.status || p.name === foundPerson.name) && 
          (p.gender === foundPerson.gender || !p.gender || !foundPerson.gender)
        ).slice(0, 3);
        
        setPotentialMatches(matches);
        setError(null);
      } else {
        setPerson(null);
        setError("Person not found");
      }
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-xl text-gray-500">Loading...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Person Not Found</h1>
            <p className="text-gray-600 mb-8">The person you are looking for could not be found.</p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <Link to={person.status === PersonStatus.MISSING ? "/missing" : "/found"} className="inline-flex items-center text-brand-purple hover:underline">
            <ArrowDown className="h-4 w-4 rotate-90 mr-1" />
            Back to {person.status === PersonStatus.MISSING ? "Missing" : "Found"} Persons
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                {person.imageUrl ? (
                  <img 
                    src={person.imageUrl} 
                    alt={person.name} 
                    className="w-full h-72 object-cover"
                  />
                ) : (
                  <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
                    <User className="h-20 w-20 text-gray-400" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={person.status === PersonStatus.MISSING ? "destructive" : "default"}
                    className={`${person.status === PersonStatus.MISSING ? "bg-red-500" : "bg-green-500"} text-white px-3 py-1`}
                  >
                    {person.status === PersonStatus.MISSING ? "Missing" : "Found"}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{person.name}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {person.age && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="text-gray-900">{person.age} years</p>
                    </div>
                  )}
                  
                  {person.gender && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="text-gray-900">{person.gender.charAt(0).toUpperCase() + person.gender.slice(1)}</p>
                    </div>
                  )}
                  
                  {person.lastSeenDate && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">
                        {person.status === PersonStatus.MISSING ? "Last Seen Date" : "Found Date"}
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <p className="text-gray-900">{new Date(person.lastSeenDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                  
                  {person.lastSeenLocation && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">
                        {person.status === PersonStatus.MISSING ? "Last Seen Location" : "Found Location"}
                      </p>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <p className="text-gray-900">{person.lastSeenLocation}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {person.description && (
                  <div className="mt-8">
                    <h3 className="font-medium text-lg mb-2">Description</h3>
                    <p className="text-gray-700 whitespace-pre-line">{person.description}</p>
                  </div>
                )}
                
                <div className="mt-8">
                  <h3 className="font-medium text-lg mb-2">Contact Information</h3>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-700">{person.contactInfo}</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-sm text-gray-500">
                    Report ID: {person.id} • Reported on {new Date(person.reportedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar with Potential Matches */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4">Potential Matches</h3>
                
                {potentialMatches.length > 0 ? (
                  <div className="space-y-4">
                    {potentialMatches.map(match => (
                      <Link to={`/person/${match.id}`} key={match.id}>
                        <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 border border-gray-100">
                          <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                            {match.imageUrl ? (
                              <img 
                                src={match.imageUrl} 
                                alt={match.name} 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center">
                                <User className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{match.name}</h4>
                            <p className="text-sm text-gray-500">
                              {match.lastSeenLocation} • {new Date(match.lastSeenDate).toLocaleDateString()}
                            </p>
                            <Badge 
                              variant={match.status === PersonStatus.MISSING ? "destructive" : "default"}
                              className="mt-1"
                            >
                              {match.status}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No potential matches found at this time.</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4">Report Information</h3>
                <p className="text-gray-700 mb-4">
                  This report was created on {new Date(person.reportedDate).toLocaleDateString()}.
                </p>
                <p className="text-gray-700 mb-4">
                  If you have any additional information about this {person.status === PersonStatus.MISSING ? "missing" : "found"} person, 
                  please contact the reporter or use the button below.
                </p>
                <Button className="w-full">
                  Provide Information
                </Button>
              </CardContent>
            </Card>
          </div>
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

export default PersonDetail;
