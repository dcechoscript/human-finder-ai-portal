
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">About HumanFinder</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              HumanFinder is dedicated to reuniting missing persons with their loved ones through the power of community and technology.
              We provide a centralized platform where people can report and search for missing or found individuals, leveraging artificial
              intelligence to increase the chances of successful matches.
            </p>
            <p className="text-gray-700">
              Every year, countless individuals become separated from their families and loved ones due to various circumstances.
              Our goal is to bridge these gaps and facilitate reconnections that might otherwise never happen.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-16 flex items-start justify-center">
                  <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">Reporting</h3>
                  <p className="text-gray-700">
                    Users can submit detailed reports about missing persons or individuals they've found who may be missing.
                    Our forms collect comprehensive information including physical descriptions, last seen locations, and photographs.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-16 flex items-start justify-center">
                  <div className="w-10 h-10 rounded-full bg-brand-purple flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">Intelligent Matching</h3>
                  <p className="text-gray-700">
                    Our AI-powered system analyzes reports to find potential matches between missing and found individuals.
                    This includes facial recognition technology and semantic analysis of descriptions to identify similarities.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-16 flex items-start justify-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">Notification & Verification</h3>
                  <p className="text-gray-700">
                    When potential matches are found, our system notifies relevant parties. Users can communicate through our
                    secure platform to verify identities and coordinate reunions while maintaining privacy and safety.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-16 flex items-start justify-center">
                  <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">Reunion</h3>
                  <p className="text-gray-700">
                    Our ultimate goal is to facilitate reunions between missing persons and their loved ones.
                    We provide guidance throughout this process while respecting the privacy and wishes of all involved parties.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Commitment to Privacy & Safety</h2>
            <p className="text-gray-700 mb-4">
              We take the privacy and safety of our users extremely seriously. Our platform includes safeguards to protect vulnerable
              individuals and prevent misuse. All communication is monitored, and we work closely with relevant authorities when necessary.
            </p>
            <p className="text-gray-700">
              Personal information is handled with the utmost care, and we employ industry-standard security measures to protect user data.
              We only share information necessary for the purpose of reuniting missing persons with their loved ones.
            </p>
          </div>

          <div className="bg-brand-dark text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
            <p className="mb-6">
              Whether you're looking for someone or want to help others find their loved ones,
              your participation makes our community stronger.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button className="bg-brand-purple hover:bg-brand-purple/90 w-full">Join Our Community</Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} HumanFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
