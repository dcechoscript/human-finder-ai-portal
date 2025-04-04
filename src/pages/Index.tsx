
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="container px-4 py-16 md:py-24 flex flex-col items-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark">
            Reunite<span className="hero-gradient bg-clip-text text-transparent"> Lost Loved Ones</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-600">
            A community-powered platform to help find missing persons and reconnect families
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link to="/report/missing">
            <Button className="text-lg px-6 py-6 bg-brand-purple hover:bg-brand-purple/90 w-full">
              Report Missing Person
            </Button>
          </Link>
          <Link to="/report/found">
            <Button variant="outline" className="text-lg px-6 py-6 border-brand-purple text-brand-purple hover:bg-brand-purple/10 w-full">
              Report Found Person
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-24 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Report & Search</h3>
              <p className="text-gray-600">
                Submit detailed reports for missing or found persons with photos and descriptions
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
              <p className="text-gray-600">
                Our advanced AI technology matches reports based on descriptions and facial recognition
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reconnect</h3>
              <p className="text-gray-600">
                Get notified of potential matches and safely communicate to verify and reconnect
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-brand-dark text-white py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Making a Difference</h2>
            <p className="text-xl opacity-80 mt-2">Join our growing community helping to reunite loved ones</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-brand-purple">1,200+</p>
              <p className="mt-2 text-gray-300">Persons Reported</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-brand-blue">820+</p>
              <p className="mt-2 text-gray-300">Successful Matches</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-brand-purple">650+</p>
              <p className="mt-2 text-gray-300">Families Reunited</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-brand-blue">10k+</p>
              <p className="mt-2 text-gray-300">Community Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Help?</h2>
        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-8">
          Join our community today to help reconnect loved ones with their families
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <Button className="text-lg px-6 py-6 w-full">
              Register Now
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" className="text-lg px-6 py-6 w-full">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full hero-gradient flex items-center justify-center">
                <span className="text-white font-bold text-xs">H&F</span>
              </div>
              <span className="ml-2 font-bold text-xl">HumanFinder</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-gray-600 hover:text-brand-purple">About</Link>
              <Link to="/privacy" className="text-gray-600 hover:text-brand-purple">Privacy</Link>
              <Link to="/terms" className="text-gray-600 hover:text-brand-purple">Terms</Link>
              <Link to="/contact" className="text-gray-600 hover:text-brand-purple">Contact</Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} HumanFinder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
