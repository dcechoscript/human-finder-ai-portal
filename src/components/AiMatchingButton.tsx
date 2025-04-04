
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Brain, X } from "lucide-react";

const AiMatchingButton = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
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
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Our AI can scan photos to find potential matches between missing and found persons.
                </p>
                <div className="space-y-2">
                  <Button 
                    variant="default"
                    onClick={goToAiMatchingPage}
                    className="w-full bg-brand-purple hover:bg-brand-purple/90"
                  >
                    Go to AI Matching
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AiMatchingButton;
