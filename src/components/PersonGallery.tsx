
import { useState } from "react";
import { Person, PersonStatus } from "@/types";
import PersonCard from "./PersonCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonGalleryProps {
  persons: Person[];
  title: string;
  emptyMessage: string;
}

const PersonGallery = ({ persons, title, emptyMessage }: PersonGalleryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<PersonStatus | "all">("all");

  const filteredPersons = persons.filter((person) => {
    // Apply search filter
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.lastSeenLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          false;
    
    // Apply status filter
    const matchesFilter = filter === "all" || person.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <Input
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Select 
            value={filter} 
            onValueChange={(value: PersonStatus | "all") => setFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value={PersonStatus.MISSING}>Missing</SelectItem>
              <SelectItem value={PersonStatus.FOUND}>Found</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredPersons.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPersons.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PersonGallery;
