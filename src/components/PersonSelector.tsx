
import { useState } from "react";
import { Person, PersonStatus } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

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
  
  const missingPersons = persons.filter(person => person.status === PersonStatus.MISSING);
  const foundPersons = persons.filter(person => person.status === PersonStatus.FOUND);
  
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
        
        <TabsContent value={PersonStatus.MISSING} className="mt-4">
          {missingPersons.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No missing persons found in the database.</p>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {missingPersons.map(person => (
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
          {foundPersons.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No found persons in the database.</p>
          ) : (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {foundPersons.map(person => (
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
