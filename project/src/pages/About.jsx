import React from 'react';
import { Users, Lightbulb, Target, Star } from 'lucide-react';
import Button from '../components/Button';
import Footer from '../components/Footer';
const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Robert Johnson',
      position: 'Chief Materials Expert',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: '20+ years of experience in construction materials engineering.'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      position: 'Sustainability Director',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      bio: 'Leads our eco-friendly materials initiatives and green building practices.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      position: 'Technical Lead',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      bio: 'Former construction manager developing our advanced recommendation algorithms.'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      position: 'Quality Assurance',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
      bio: 'Ensures all recommended materials meet rigorous quality standards.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.pexels.com/photos/1012504/pexels-photo-1012504.jpeg" 
            alt="Construction team" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About BuildRight</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              We're on a mission to transform the construction industry through smart material recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <img 
                src="https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg" 
                alt="Construction team meeting" 
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2020, BuildRight was born from a simple observation: construction professionals waste countless hours researching and comparing materials, often without access to reliable information.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Our team of construction industry veterans and technology experts came together to solve this problem, creating an intelligent recommendation system that matches the right materials to any project's specific requirements.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Today, BuildRight helps thousands of construction professionals save time, reduce costs, and improve quality across their projects through data-driven material recommendations.
              </p>
              <Button variant="primary" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're driven by a commitment to excellence and innovation in construction material selection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-800 mb-4">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Constantly improving our recommendations through new technologies and methodologies.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Precision</h3>
              <p className="text-gray-600">
                Delivering exact recommendations tailored to each project's unique requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                Unwavering commitment to recommending only the highest quality materials.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition duration-300 hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Building a network of construction professionals to share knowledge and experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our expert team brings decades of construction industry experience to every recommendation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-800 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn more about how our construction material recommendation system works.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How does your recommendation system work?</h3>
              <p className="text-gray-600">
                Our system uses a combination of expert knowledge, material specifications, and project requirements to match the ideal materials for your specific construction needs. We analyze factors like budget, timeline, environmental conditions, and performance requirements.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Is the service free to use?</h3>
              <p className="text-gray-600">
                We offer both free and premium tiers. Basic recommendations are available for free, while our premium service provides detailed analysis, alternative options, and direct supplier connections.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Do you work with specific suppliers?</h3>
              <p className="text-gray-600">
                We maintain relationships with a wide network of suppliers but remain independent in our recommendations. Our focus is always on finding the best materials for your project, regardless of supplier.
              </p>
            </div>
            
            <div className="py-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I request recommendations for specialized projects?</h3>
              <p className="text-gray-600">
                Absolutely! Our system handles everything from residential construction to specialized industrial and infrastructure projects. For highly specialized needs, our experts can provide customized recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Construction Material Selection?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of construction professionals who trust BuildRight for their material recommendations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="secondary" 
              size="lg"
            >
              Create Account
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:bg-opacity-10"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About; 