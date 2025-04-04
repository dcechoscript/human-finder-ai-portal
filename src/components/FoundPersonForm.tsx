
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Person, PersonStatus } from "@/types";

const FoundPersonForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    approximateAge: "",
    gender: "",
    foundDate: "",
    foundLocation: "",
    description: "",
    contactInfo: "",
    image: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real application, this would be a fetch request to the backend
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newPerson: Partial<Person> = {
        name: formData.name || "Unknown",
        age: formData.approximateAge ? parseInt(formData.approximateAge) : undefined,
        gender: formData.gender,
        lastSeenDate: formData.foundDate, // Using lastSeenDate as foundDate
        lastSeenLocation: formData.foundLocation, // Using lastSeenLocation as foundLocation
        description: formData.description,
        contactInfo: formData.contactInfo,
        // In a real app, imageUrl would come from uploaded file
        imageUrl: formData.image ? URL.createObjectURL(formData.image) : undefined,
        status: PersonStatus.FOUND,
        reportedDate: new Date().toISOString(),
      };

      console.log("Submitted found person:", newPerson);

      toast({
        title: "Found Person Report Submitted",
        description: "Your report has been successfully submitted.",
      });

      // Redirect to found persons page
      navigate("/found");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Report a Found Person</CardTitle>
        <CardDescription>
          Please provide details about the person you've found or encountered who may be missing
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Basic Information</h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="input-label">
                  Name (if known)
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Leave blank if unknown"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="approximateAge" className="input-label">
                  Approximate Age
                </label>
                <Input
                  id="approximateAge"
                  name="approximateAge"
                  type="number"
                  min="0"
                  max="120"
                  placeholder="Best estimate"
                  value={formData.approximateAge}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="input-label">
                Gender
              </label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="unknown">Unknown/Uncertain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Found Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Found Information</h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="foundDate" className="input-label">
                  Date Found <span className="text-red-500">*</span>
                </label>
                <Input
                  id="foundDate"
                  name="foundDate"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.foundDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="foundLocation" className="input-label">
                  Location Found <span className="text-red-500">*</span>
                </label>
                <Input
                  id="foundLocation"
                  name="foundLocation"
                  placeholder="City, State, Country"
                  value={formData.foundLocation}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="input-label">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Physical appearance, clothing, circumstances, mental state, etc."
                value={formData.description}
                onChange={handleInputChange}
                className="h-24"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Contact Information</h3>
            
            <div className="space-y-2">
              <label htmlFor="contactInfo" className="input-label">
                Your Contact Information <span className="text-red-500">*</span>
              </label>
              <Input
                id="contactInfo"
                name="contactInfo"
                placeholder="Phone number, email, etc."
                value={formData.contactInfo}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Photo</h3>
            
            <div className="space-y-2">
              <label htmlFor="image" className="input-label">
                Upload Photo
              </label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <p className="text-xs text-gray-500">
                A photo can greatly increase the chances of identification.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Report"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FoundPersonForm;
