import React from 'react';
import { Search, Briefcase, Award, TrendingUp, Clock } from 'lucide-react';
import MaterialCard from '../components/MaterialCard';
import Button from '../components/Button';
import Footer from '../components/Footer';

const Home = () => {
 

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg" 
            alt="Construction site" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="lg:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Find the Perfect Materials for Your Construction Project
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Get expert recommendations tailored to your specific construction needs.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => {}}
              >
                Get Recommendations
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:bg-opacity-10"
                onClick={() => {}}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-lg p-6 md:p-8 shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Find Materials for Your Project</h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-grow">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500">
                  <option value="">Select Material Category</option>
                  <option value="concrete">Concrete & Cement</option>
                  <option value="steel">Steel & Metals</option>
                  <option value="wood">Wood & Timber</option>
                  <option value="brick">Bricks & Blocks</option>
                  <option value="roofing">Roofing Materials</option>
                </select>
              </div>
              <div className="flex-grow">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500">
                  <option value="">Select Project Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>
              </div>
              <div>
                <button className="w-full md:w-auto bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition duration-300 flex items-center justify-center">
                  <Search size={20} className="mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Recommendation System</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our intelligent system helps you find the best materials for any construction project, saving you time and money.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Recommendations</h3>
              <p className="text-gray-600">
                Curated by industry professionals with years of experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Focused</h3>
              <p className="text-gray-600">
                Only the highest quality materials make it into our recommendations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost Effective</h3>
              <p className="text-gray-600">
                Find materials that meet your budget without compromising quality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Time Saving</h3>
              <p className="text-gray-600">
                Quick recommendations to keep your project moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Materials Section */}
      
      {/* CTA Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find the Perfect Materials?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Create an account today and get personalized recommendations for your construction projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="secondary" 
              size="lg"
            >
              Sign Up Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:bg-opacity-10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home; 