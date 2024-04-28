import tensorflow as tf
import pylsl
import numpy as np
from pylsl import StreamInlet, resolve_stream                  
from nltk import flatten
from record import record_direct
from features import features
from timeit import default_timer as timer

confidence_threshold = 0.6

model_path = "ei-eeg_focus-classifier-tensorflow-lite-float32-model.lite"
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

print()
print(input_details)
print()
print(output_details)


nr_samples = 1
streams = resolve_stream('type', 'EEG')                         # create a new inlet to read # from the stream
inlet = pylsl.stream_inlet(streams[0])

while True:

    concentrating_nr = relaxed_nr = neutral_nr = uncertain_nr = 0

    for iter in range (nr_samples):
        all_samples = []
        for i in range (2000 // 4):                                                 # 2000 ms = 2 secs, 4 EEG-electrodes (channels)
            sample, timestamp = inlet.pull_sample()
            sample.pop()
            all_samples.append(sample)


        all_samples = flatten(all_samples)                                          
        all_samples = features(all_samples)

        input_samples = np.array(all_samples[:65], dtype=np.float32)
        input_samples = np.expand_dims(input_samples, axis=0)

        interpreter.set_tensor(input_details[0]['index'], input_samples)            # input_details[0]['index'] = the index which accepts the input
        interpreter.invoke()                                                        # run the inference

        output_data = interpreter.get_tensor(output_details[0]['index'])            # output_details[0]['index'] = the index which provides the input

        if output_data[0][0] >= 0.6 : print(output_data[0][0])
        if output_data[0][1] <= 0.6 : print(output_data[0][1])
        if output_data[0][2] <= 0.6 : print(output_data[0][2])

        concentrating  = output_data[0][0]
        neutral        = output_data[0][1]
        relaxed       = output_data[0][2]
        
        if concentrating >= confidence_threshold:
            print("concentrating")
        elif relaxed >= confidence_threshold:
            print("relaxed")
        elif neutral >= confidence_threshold:
            print("neutral")
        else : print("uncertain")
