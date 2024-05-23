import tensorflow.compat.v1 as tf
from tensorflow import keras 
from tensorflow.keras import models
import pylsl
import numpy as np
import pandas as pd
from pylsl import resolve_stream                  
from EEG_feature_extraction import generate_feature_vectors_from_samples

loaded_model = models.load_model("_focus_model.keras")

nr_samples = 1
streams = resolve_stream('type', 'EEG')                         # create a new inlet to read # from the stream
inlet = pylsl.stream_inlet(streams[0])

while True:
    for iter in range (nr_samples):
        all_samples = []
        for i in range (2000 // 4):                                                 # 2000 ms = 2 secs, 4 EEG-electrodes (channels)
            sample, timestamp = inlet.pull_sample()
            sample.pop()
            all_samples.append([timestamp]+sample)

        all_samples = np.array(all_samples)
        vector, header= generate_feature_vectors_from_samples(all_samples, nsamples = 150, period = 1., remove_redundant = True)
        predictions = loaded_model.predict(vector)

        for prediction in predictions:       
            if prediction == 2 :
                print("concentrating")
            elif prediction == 1 :
                print("neutral")
            elif prediction == 0 :
                print("relaxed")
