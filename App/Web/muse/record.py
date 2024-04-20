import numpy as np
import pandas as pd
import os
from time import time, strftime, gmtime
from find import find_devices
import backends
from muse import Muse

# Rercord directly from a Muse without the use of LSL


def record_direct(duration,
                  filename=None,
                  backend='auto',):

    device = find_devices(max_duration=10, verbose=True)[0]
    address = device["address"]


    if not filename:
        filename = os.path.join(
            os.getcwd(),
            ("recording_%s.csv" % strftime("%Y-%m-%d-%H.%M.%S", gmtime())))

    eeg_samples = []
    timestamps = []

    def save_eeg(new_samples, new_timestamps):
        eeg_samples.append(new_samples)
        timestamps.append(new_timestamps)

    muse = Muse(address, save_eeg, backend=backend)
    muse.connect()
    muse.start()

    t_init = time()
    print('Start recording at time t=%.3f' % t_init)
    
    while (time() - t_init) < duration:
        try:
            #print(eeg_samples)
            #print(timestamps)

            backends.sleep(1)
        except KeyboardInterrupt:
            break

    muse.stop()
    muse.disconnect()

    timestamps = np.concatenate(timestamps)
    eeg_samples = np.concatenate(eeg_samples, 1).T
    recording = pd.DataFrame(
        data=eeg_samples, columns=['TP9', 'AF7', 'AF8', 'TP10', 'Right AUX'])

    recording['timestamps'] = timestamps
    print(recording)

record_direct(5)

