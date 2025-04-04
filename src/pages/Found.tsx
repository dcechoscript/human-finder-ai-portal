
import { useState } from "react";
import Header from "@/components/Header";
import PersonGallery from "@/components/PersonGallery";
import { Person, PersonStatus } from "@/types";

// Mock data for demo purposes
const mockFoundPersons: Person[] = [
  {
    id: "4",
    name: "Unknown Male",
    age: 30,
    gender: "male",
    lastSeenDate: "2023-12-10",
    lastSeenLocation: "Boston, MA",
    description: "Found near Boston Common. Medium height, brown hair. May have amnesia.",
    contactInfo: "boston.police@example.com",
    imageUrl: "https://source.unsplash.com/random/300x400/?portrait,confused",
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
    imageUrl: "https://source.unsplash.com/random/300x400/?portrait,young-woman",
    status: PersonStatus.FOUND,
    reportedDate: "2023-12-01",
  },
];

const Found = () => {
  const [foundPersons, setFoundPersons] = useState<Person[]>(mockFoundPersons);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <PersonGallery 
          persons={foundPersons} 
          title="Found Persons" 
          emptyMessage="No found persons reports available. Please check back later or refine your search." 
        />
      </main>
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} HumanFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Found;
