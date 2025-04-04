
import { useState } from "react";
import Header from "@/components/Header";
import PersonGallery from "@/components/PersonGallery";
import { Person, PersonStatus } from "@/types";

// Mock data for demo purposes
const mockMissingPersons: Person[] = [
  {
    id: "1",
    name: "John Doe",
    age: 35,
    gender: "male",
    lastSeenDate: "2023-11-15",
    lastSeenLocation: "New York, NY",
    description: "Last seen wearing a blue jacket and jeans. Has a small scar on his right cheek.",
    contactInfo: "contact@example.com",
    imageUrl: "https://source.unsplash.com/random/300x400/?portrait,man",
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
    imageUrl: "https://source.unsplash.com/random/300x400/?portrait,woman",
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
    imageUrl: "https://source.unsplash.com/random/300x400/?portrait,middle-aged",
    status: PersonStatus.MISSING,
    reportedDate: "2023-10-21",
  },
];

const Missing = () => {
  const [missingPersons, setMissingPersons] = useState<Person[]>(mockMissingPersons);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <PersonGallery 
          persons={missingPersons} 
          title="Missing Persons" 
          emptyMessage="No missing persons reports found. Please check back later or refine your search." 
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

export default Missing;
