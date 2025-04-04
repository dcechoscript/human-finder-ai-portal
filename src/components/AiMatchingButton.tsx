
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Brain, X } from "lucide-react";
import { Person, PersonStatus } from "@/types";

const AiMatchingButton = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<Person[]>([]);
  
  const handleMatchingRequest = () => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Mock results - in a real app, this would call an API endpoint
      const mockResults: Person[] = [
        {
          id: "match-1",
          name: "Emily Wilson",
          age: 28,
          gender: "female",
          lastSeenLocation: "Portland, OR",
          lastSeenDate: "2023-12-10",
          imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
          status: PersonStatus.FOUND,
          reportedDate: "2023-12-11",
          description: "Found at a local shelter. Possibly disoriented.",
        },
        {
          id: "match-2",
          name: "Michael Rodriguez",
          age: 34,
          gender: "male",
          lastSeenLocation: "Seattle, WA",
          lastSeenDate: "2023-11-28",
          imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
          status: PersonStatus.MISSING,
          reportedDate: "2023-11-29",
          description: "Last seen wearing a blue jacket and jeans.",
        }
      ];
      
      setResults(mockResults);
      setIsProcessing(false);
    }, 2000);
  };
  
  const goToAiMatchingPage = () => {
    setIsOpen(false);
    navigate("/ai-matching");
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            className="rounded-full h-14 w-14 bg-gradient-to-br from-brand-blue to-brand-purple shadow-lg hover:shadow-xl transition-all"
            onClick={() => !isOpen && setResults([])}
          >
            <Brain className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 border-none shadow-xl rounded-xl" side="top" align="end">
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-brand-blue to-brand-purple p-4 flex justify-between items-center">
              <h3 className="font-bold text-white">AI Face Matching</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4">
              {!isProcessing && results.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Our AI can scan photos to find potential matches between missing and found persons.
                  </p>
                  <div className="space-y-2">
                    <Button 
                      onClick={handleMatchingRequest}
                      className="w-full bg-brand-purple hover:bg-brand-purple/90"
                    >
                      Quick Face Matching
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={goToAiMatchingPage}
                      className="w-full"
                    >
                      Advanced AI Matching
                    </Button>
                  </div>
                </div>
              ) : isProcessing ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-3">
                  <div className="animate-pulse flex space-x-2">
                    <div className="h-3 w-3 bg-brand-purple rounded-full"></div>
                    <div className="h-3 w-3 bg-brand-purple rounded-full animation-delay-200"></div>
                    <div className="h-3 w-3 bg-brand-purple rounded-full animation-delay-400"></div>
                  </div>
                  <p className="text-sm text-gray-500">AI is analyzing faces...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-gray-600">
                    Found {results.length} potential matches:
                  </p>
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {results.map(person => (
                      <a 
                        href={`/person/${person.id}`}
                        key={person.id}
                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 border border-gray-100 transition-colors"
                      >
                        <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                          {person.imageUrl && (
                            <img 
                              src={person.imageUrl} 
                              alt={person.name} 
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{person.name}</h4>
                          <p className="text-xs text-gray-500 truncate">
                            {person.lastSeenLocation} • {new Date(person.lastSeenDate).toLocaleDateString()}
                          </p>
                          <div className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                            person.status === PersonStatus.MISSING 
                              ? "bg-red-100 text-red-700" 
                              : "bg-green-100 text-green-700"
                          }`}>
                            {person.status}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Button 
                      onClick={handleMatchingRequest} 
                      className="w-full bg-brand-purple hover:bg-brand-purple/90"
                    >
                      Run New Match
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={goToAiMatchingPage}
                      className="w-full"
                    >
                      Advanced AI Matching
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AiMatchingButton;
