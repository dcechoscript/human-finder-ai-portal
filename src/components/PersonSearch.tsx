
import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, X } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Person, PersonStatus } from "@/types";

interface PersonSearchProps {
  persons: Person[];
  onFilteredPersons: (filteredPersons: Person[]) => void;
}

const PersonSearch: React.FC<PersonSearchProps> = ({ 
  persons, 
  onFilteredPersons 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<{
    name: boolean;
    location: boolean;
    description: boolean;
    age: boolean;
    gender: boolean;
  }>({
    name: true,
    location: true,
    description: true,
    age: false,
    gender: false,
  });
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Apply filters when search query or active filters change
  useEffect(() => {
    if (!searchQuery.trim()) {
      onFilteredPersons(persons);
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    
    const filtered = persons.filter(person => {
      // Check each filter that is active
      return (
        (activeFilters.name && person.name?.toLowerCase().includes(query)) ||
        (activeFilters.location && person.lastSeenLocation?.toLowerCase().includes(query)) ||
        (activeFilters.description && person.description?.toLowerCase().includes(query)) ||
        (activeFilters.age && person.age?.toString().includes(query)) ||
        (activeFilters.gender && person.gender?.toLowerCase().includes(query))
      );
    });
    
    onFilteredPersons(filtered);
  }, [searchQuery, activeFilters, persons, onFilteredPersons]);
  
  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  
  return (
    <div className="w-full space-y-2">
      <div className="relative flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            ref={searchInputRef}
            type="text"
            className="pl-10 pr-10 w-full"
            placeholder="Search persons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-10 flex items-center pr-3"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-700" />
            </button>
          )}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 flex-shrink-0"
              aria-label="Filter search"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuCheckboxItem
              checked={activeFilters.name}
              onCheckedChange={(checked) => 
                setActiveFilters(prev => ({ ...prev, name: checked === true }))
              }
            >
              Name
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.location}
              onCheckedChange={(checked) => 
                setActiveFilters(prev => ({ ...prev, location: checked === true }))
              }
            >
              Location
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.description}
              onCheckedChange={(checked) => 
                setActiveFilters(prev => ({ ...prev, description: checked === true }))
              }
            >
              Description
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.age}
              onCheckedChange={(checked) => 
                setActiveFilters(prev => ({ ...prev, age: checked === true }))
              }
            >
              Age
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={activeFilters.gender}
              onCheckedChange={(checked) => 
                setActiveFilters(prev => ({ ...prev, gender: checked === true }))
              }
            >
              Gender
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PersonSearch;
