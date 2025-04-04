
import { useState } from "react";
import { Person, PersonStatus } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PersonSelectorProps {
  persons: Person[];
  onSelect: (person: Person) => void;
  selected: Person | null;
}

const PersonSelector: React.FC<PersonSelectorProps> = ({ 
  persons, 
  onSelect,
  selected 
}) => {
  const [activeTab, setActiveTab] = useState<PersonStatus>(PersonStatus.MISSING);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  
  const filteredPersons = persons.filter(person => {
    // Filter by status tab
    if (person.status !== activeTab) return false;
    
    // Filter by search term (name or description)
    const matchesSearch = 
      !searchTerm || 
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (person.description && person.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by location
    const matchesLocation = 
      !locationFilter || 
      (person.lastSeenLocation && person.lastSeenLocation.toLowerCase().includes(locationFilter.toLowerCase()));
    
    return matchesSearch && matchesLocation;
  });
  
  return (
    <div>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PersonStatus)} className="mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={PersonStatus.MISSING} className="text-red-600 data-[state=active]:text-red-700">
            Missing Persons
          </TabsTrigger>
          <TabsTrigger value={PersonStatus.FOUND} className="text-green-600 data-[state=active]:text-green-700">
            Found Persons
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-4 space-y-4">
          {/* Search and filter inputs */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="relative flex-1">
              <Input
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
              {locationFilter && (
                <button 
                  onClick={() => setLocationFilter("")}
                  className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          {/* Results count */}
          <div className="text-sm text-gray-500">
            Showing {filteredPersons.length} {activeTab} {filteredPersons.length === 1 ? 'person' : 'people'}
            {(searchTerm || locationFilter) && " matching filters"}
          </div>
        </div>
        
        <TabsContent value={PersonStatus.MISSING} className="mt-4">
          {filteredPersons.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No missing persons found matching your criteria.</p>
          ) : (
            <div className="grid gap-4 grid-cols-1">
              {filteredPersons.map(person => (
                <PersonCard 
                  key={person.id} 
                  person={person} 
                  onSelect={onSelect}
                  isSelected={selected?.id === person.id}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value={PersonStatus.FOUND} className="mt-4">
          {filteredPersons.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No found persons matching your criteria.</p>
          ) : (
            <div className="grid gap-4 grid-cols-1">
              {filteredPersons.map(person => (
                <PersonCard 
                  key={person.id} 
                  person={person} 
                  onSelect={onSelect}
                  isSelected={selected?.id === person.id}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface PersonCardProps {
  person: Person;
  onSelect: (person: Person) => void;
  isSelected: boolean;
}

const PersonCard: React.FC<PersonCardProps> = ({ person, onSelect, isSelected }) => {
  return (
    <div 
      className={`border rounded-md overflow-hidden flex cursor-pointer transition-all ${
        isSelected ? 'border-brand-purple ring-2 ring-brand-purple ring-opacity-50' : 'border-gray-200 hover:border-brand-purple'
      }`}
      onClick={() => onSelect(person)}
    >
      <div className="h-24 w-24 bg-gray-200 flex-shrink-0">
        {person.imageUrl ? (
          <img 
            src={person.imageUrl} 
            alt={person.name} 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <User className="h-10 w-10 text-gray-400" />
          </div>
        )}
      </div>
      <div className="p-3 flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{person.name}</h3>
            <p className="text-sm text-gray-500">
              {person.lastSeenLocation} • {new Date(person.lastSeenDate).toLocaleDateString()}
            </p>
            {person.description && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{person.description}</p>
            )}
          </div>
          <Badge 
            variant={person.status === PersonStatus.MISSING ? "destructive" : "default"}
            className={person.status === PersonStatus.MISSING ? "bg-red-500" : "bg-green-500"}
          >
            {person.status}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default PersonSelector;
