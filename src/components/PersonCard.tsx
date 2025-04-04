
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Person, PersonStatus } from "@/types";
import { MapPin, Calendar } from "lucide-react";

interface PersonCardProps {
  person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => {
  const { id, name, age, lastSeenDate, lastSeenLocation, imageUrl, status } = person;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-56 bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No Image Available</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge 
            variant={status === PersonStatus.MISSING ? "destructive" : "default"}
            className={status === PersonStatus.MISSING ? "bg-red-500" : "bg-green-500"}
          >
            {status === PersonStatus.MISSING ? "Missing" : "Found"}
          </Badge>
        </div>
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="mt-2 space-y-2 text-sm text-gray-600">
          {age && <p>Age: {age}</p>}
          {lastSeenDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(lastSeenDate).toLocaleDateString()}</span>
            </div>
          )}
          {lastSeenLocation && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{lastSeenLocation}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link to={`/person/${id}`} className="w-full">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PersonCard;
