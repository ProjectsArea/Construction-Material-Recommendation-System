import React, { useState, useEffect } from 'react';
import { Calculator, History } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

const Prediction = () => {
  const [formData, setFormData] = useState({
    budget: '',
    area_size: '',
    environmental_type: '',
    project_type: '',
    soil_type: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Get user data from localStorage
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  // Dropdown options from app.py
  const environmentalTypes = ['Coastal', 'Mountain', 'Rural', 'Suburban', 'Urban'];
  const projectTypes = ['Commercial', 'Industrial', 'Infrastructure', 'Residential'];
  const soilTypes = ['Chalky', 'Clay', 'Loamy', 'Peaty', 'Sandy', 'Silty'];

  useEffect(() => {
    if (userId) {
      fetchPredictions();
    }
  }, [userId]);

  const fetchPredictions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/predictions/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setPredictions(data.predictions);
      }
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Get prediction from Flask server
      const predictionResponse = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          budget: parseFloat(formData.budget),
          area_size: parseFloat(formData.area_size),
          environmental_type: formData.environmental_type,
          project_type: formData.project_type,
          soil_type: formData.soil_type
        }),
      });

      const predictionData = await predictionResponse.json();

      if (!predictionData.success) {
        throw new Error(predictionData.error || 'Failed to get prediction');
      }

      setPrediction(predictionData.prediction);

      // Store prediction in database if user is logged in
      if (userId) {
        const storeResponse = await fetch('http://localhost:3001/api/predictions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: parseInt(userId),
            budget: parseFloat(formData.budget),
            area_size: parseFloat(formData.area_size),
            environmental_type: formData.environmental_type,
            project_type: formData.project_type,
            soil_type: formData.soil_type,
            predicted_material: predictionData.prediction
          }),
        });

        const storeData = await storeResponse.json();
        
        if (!storeData.success) {
          throw new Error(storeData.error || 'Failed to store prediction');
        }

        // Refresh predictions list
        await fetchPredictions();
        
        // Show success message
        setError(''); // Clear any existing errors
        alert('Prediction stored successfully');
      } else {
        alert('Please log in to save your prediction');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <Calculator className="mx-auto h-12 w-12 text-blue-800" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Material Recommendation
          </h2>
          {userName && (
            <p className="mt-2 text-lg text-blue-800 font-medium">
              Welcome, {userName}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-600">
            Enter your project details to get a material recommendation
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <Input
                label="Budget"
                type="number"
                name="budget"
                id="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />

              <Input
                label="Area Size"
                type="number"
                name="area_size"
                id="area_size"
                value={formData.area_size}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              <div>
                <label htmlFor="environmental_type" className="block text-sm font-medium text-gray-700">
                  Environmental Type
                </label>
                <select
                  id="environmental_type"
                  name="environmental_type"
                  value={formData.environmental_type}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm rounded-md"
                >
                  <option value="">Select type</option>
                  {environmentalTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="project_type" className="block text-sm font-medium text-gray-700">
                  Project Type
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm rounded-md"
                >
                  <option value="">Select type</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="soil_type" className="block text-sm font-medium text-gray-700">
                Soil Type
              </label>
              <select
                id="soil_type"
                name="soil_type"
                value={formData.soil_type}
                onChange={handleChange}
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-800 focus:border-blue-800 sm:text-sm rounded-md"
              >
                <option value="">Select type</option>
                {soilTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Getting prediction...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Get Recommendation
                  </span>
                )}
              </Button>

              {userId && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  <span className="flex items-center justify-center">
                    <History className="mr-2 h-5 w-5" />
                    {showHistory ? 'Hide History' : 'Show History'}
                  </span>
                </Button>
              )}
            </div>
          </form>

          {prediction && (
            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-medium text-green-800">Recommended Material</h3>
              <p className="mt-2 text-2xl font-bold text-green-900">{prediction}</p>
            </div>
          )}

          {showHistory && predictions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Prediction History</h3>
              <div className="space-y-4">
                {predictions.map((pred) => (
                  <div key={pred.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Budget</p>
                        <p className="font-medium">{pred.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Area Size</p>
                        <p className="font-medium">{pred.area_size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Environmental Type</p>
                        <p className="font-medium">{pred.environmental_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Project Type</p>
                        <p className="font-medium">{pred.project_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Soil Type</p>
                        <p className="font-medium">{pred.soil_type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Predicted Material</p>
                        <p className="font-medium text-green-600">{pred.predicted_material}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(pred.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction; 