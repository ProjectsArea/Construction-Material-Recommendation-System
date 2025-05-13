# app.py

from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
from flask_cors import CORS
from xgboost import XGBClassifier
import pickle

app = Flask(__name__)
CORS(app)
# Load model, data columns, and mapping
xgb_model = pickle.load(open("xgb_model.pkl", "rb"))  # Make sure your model is saved as .pkl
X_train_resampled_columns = pickle.load(open("X_columns.pkl", "rb"))  # Save and load the training columns
material_mapping = pickle.load(open("material_mapping.pkl", "rb"))  # Original label mapping dictionary

reverse_material_mapping = {v: k for k, v in material_mapping.items()}

# Dummy data for dropdowns (can be replaced with actual values)
environmental_types = ['Coastal', 'Mountain', 'Rural', 'Suburban', 'Urban']
project_types = ['Commercial', 'Industrial', 'Infrastructure', 'Residential']
soil_types = ['Chalky', 'Clay', 'Loamy', 'Peaty', 'Sandy', 'Silty']

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            # Get input values from JSON data
            data = request.get_json()
            budget = float(data['budget'])
            area_size = float(data['area_size'])
            environmental_type = data['environmental_type']
            project_type = data['project_type']
            soil_type = data['soil_type']

            # Build input dataframe
            input_data = pd.DataFrame({
                'budget': [budget],
                'area size': [area_size],
                'environmental type': [environmental_type],
                'project type': [project_type],
                'soil type': [soil_type]
            })

            # One-hot encode categorical features
            input_data = pd.get_dummies(input_data, columns=['environmental type', 'project type', 'soil type'], dtype=int)

            # Add missing columns
            for col in set(X_train_resampled_columns) - set(input_data.columns):
                input_data[col] = 0

            # Align with training column order
            input_data = input_data[X_train_resampled_columns]

            # Predict
            prediction = xgb_model.predict(input_data)[0]
            predicted_material = reverse_material_mapping.get(prediction, "Unknown")

            return jsonify({
                'success': True,
                'prediction': predicted_material
            })

        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            }), 400

    return render_template('index.html',
                         prediction=None,
                         environmental_types=environmental_types,
                         project_types=project_types,
                         soil_types=soil_types)

if __name__ == '__main__':
    app.run(debug=True)
