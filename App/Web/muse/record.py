import numpy as np
import pandas as pd
import os
from typing import Union, List, Optional
from pathlib import Path
from pylsl import StreamInlet, resolve_byprop
from sklearn.linear_model import LinearRegression
from time import time, strftime, gmtime
import backends
from muse import Muse
from constants import LSL_SCAN_TIMEOUT, LSL_EEG_CHUNK, LSL_PPG_CHUNK, LSL_ACC_CHUNK, LSL_GYRO_CHUNK


def record_direct(duration):

    from find import find_devices
 
    device = find_devices(max_duration=10, verbose=True)[0]
    address = device["address"]
    
    eeg_samples = []
    timestamps = []

    def save_eeg(new_samples, new_timestamps):
        eeg_samples.append(new_samples)
        timestamps.append(new_timestamps)

    muse = Muse(address, save_eeg)
    muse.connect()
    muse.start()

    t_init = time()
    print('Start recording at time t=%.3f' % t_init)

    while (time() - t_init) < duration:
        try:
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

    return recording 