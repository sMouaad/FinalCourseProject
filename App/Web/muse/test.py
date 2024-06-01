import tensorflow.compat.v1 as tf
<<<<<<< HEAD
from tensorflow import keras 
from tensorflow.keras import models
=======
from sklearn.metrics import confusion_matrix
import numpy as np
from scipy.io import loadmat
import os
from pywt import wavedec
from functools import reduce
from scipy import signal
from scipy.stats import entropy
from scipy.fft import fft, ifft
import pandas as pd
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from tensorflow import keras as K
import matplotlib.pyplot as plt
import scipy
from sklearn import metrics
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
from sklearn.model_selection import KFold,cross_validate
from tensorflow.keras.layers import Dense, Activation, Flatten, concatenate, Input, Dropout, LSTM, Bidirectional,BatchNormalization,PReLU,ReLU,Reshape
#from keras.wrappers.scikit_learn import KerasClassifier
from sklearn.metrics import classification_report
from tensorflow.keras.models import Sequential, Model, load_model
import matplotlib.pyplot as plt;
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.decomposition import PCA
from sklearn.model_selection import cross_val_score
from tensorflow import keras
from tensorflow.keras.layers import Conv1D,Conv2D,Add
from tensorflow.keras.layers import MaxPool1D, MaxPooling2D
import seaborn as sns
>>>>>>> muse
import pylsl
import numpy as np
import pandas as pd
from pylsl import resolve_stream                  
from EEG_feature_extraction import generate_feature_vectors_from_samples
<<<<<<< HEAD

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

=======
from record import record_direct

#Reading EEG data with feature extracted
model = load_model("_focus_model.keras")



for iter in range (50):
        all_samples = record_direct(2)

        all_samples = np.array(all_samples)
        vector, header= generate_feature_vectors_from_samples(all_samples, nsamples = 150, period = 1., remove_redundant = True)
        predictions = np.array(list(map(lambda x: np.argmax(x), model.predict(vector))))
>>>>>>> muse
        for prediction in predictions:       
            if prediction == 2 :
                print("concentrating")
            elif prediction == 1 :
                print("neutral")
            elif prediction == 0 :
                print("relaxed")
<<<<<<< HEAD
=======

>>>>>>> muse
