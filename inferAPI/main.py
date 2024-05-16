import time
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import numpy as np
import logging
import os
import uvicorn
import random
import dill 
import pandas as pd
from catboost import CatBoostClassifier
import requests
from datetime import datetime

app = FastAPI()
global model
f = open('catboost_app.pkl', 'rb')
model = dill.load(f)
f.close()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        if file.content_type != "application/octet-stream":
            raise HTTPException(status_code=400, detail="File must be a .npy file")

        start_time = time.time()
        
        # Save the uploaded file to a temporary location
        temp_file_path = "/tmp/temp_npy_file.npy"
        with open(temp_file_path, "wb") as temp_file:
            temp_file.write(await file.read())

        # Load the numpy array from the temporary file
        input = np.load(temp_file_path)[:,[0,1,2,3,4,5,7]]
        # preprocess
        uni_absolute_values = np.abs(input)
        # Compute the mean of the absolute values
        uni_avg_amplitude = np.mean(uni_absolute_values, axis=0)
        uni_max_V = np.max(input, axis=0)
        uni_min_V = np.min(input, axis=0)
        uni_sd = np.std(input, axis=0)

        ncol = ['Fz','C3','Cz','C4','Pz','PO7','PO8']
        columns = []
        for i in ncol:
            columns.append(i+'_A')
        for i in ncol:
            columns.append(i+'_max')
        for i in ncol:
            columns.append(i+'_min')
        for i in ncol:
            columns.append(i+'_sd')

        # Combine features into a single feature matrix
        uni_features = np.hstack((uni_avg_amplitude, uni_max_V, uni_min_V, uni_sd))

        
        pred = str(model.predict(uni_features)[0])
        elapsed_time = time.time() - start_time

        current_datetime = datetime.now()
        formatted_datetime = current_datetime.strftime("%Y-%m-%d %H:%M:%S")

        decode = {
            "110":"R",
            "120":"L",
            "150":"rest"
        }
        
        url = "http://server:3000/log/api/prediction-log"

        # Define the body data
        body = {
            "log_time": str(formatted_datetime),
            "inference_time": elapsed_time,
            "logit": pred,
            "log_status": "200",
            "response": "-",
            "user_id": random.randint(1, 4),
            "admit_id": random.randint(1, 4)
        }

        # Make the POST request
        res = requests.post(url, json=body)

        # Dummy prediction logic (replace this with your model's prediction logic)
        # probabilities = np.random.random(size=(3,)).tolist()
        
        # Remove the temporary file
        os.remove(temp_file_path)
        bp = random.randint(60,100)
        return {"action": decode[pred],
                "raw_pred": pred, 
                "vital_sign":{
                    "HeartRate": random.randint(60,100),
                    "BloodPressure": [bp + random.randint(10,30), bp],
                    "sp_o2": random.randint(80,100), #generates a random number between a and b Inclusive
                    "respiration": random.randint(12,16),
                    "temperature": random.randint(97,101),
                 },
                 "log": {
                    "status": res.status_code,
                    "json": res.json()
                }
        }
    except Exception as e:
        logger.error(f"Error processing file: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
