from functools import partial

import mne_lsl.lsl

import backends
from muse import Muse


# Begins LSL stream(s) from a Muse with a given address with data sources determined by arguments
def stream(preset=None):
    # Find device

    from find import find_devices
 
    device = find_devices(max_duration=10, verbose=True)[0]
    address = device["address"]
    # EEG ====================================================
    eeg_info = mne_lsl.lsl.StreamInfo(
        "Muse",
        stype="EEG",
        n_channels=5,
        sfreq=256,
        dtype="float32",
        source_id=f"Muse_{address}",
    )
    eeg_info.desc.append_child_value("manufacturer", "Muse")
    eeg_info.set_channel_names(["TP9", "AF7", "AF8", "TP10", "AUX"])
    eeg_info.set_channel_types(["eeg"] * 5)
    eeg_info.set_channel_units("microvolts")

    eeg_outlet = mne_lsl.lsl.StreamOutlet(eeg_info, chunk_size=6)


    def push(data, timestamps, outlet):
        outlet.push_chunk(data.T, timestamps[-1])

    push_eeg = partial(push, outlet=eeg_outlet)

    muse = Muse(
        address=address,
        callback_eeg=push_eeg,
        preset=preset,
    )

    didConnect = muse.connect()

    if didConnect:
        print("Connected.")
        muse.start()

        print(f"Streaming... EEG (CTRL + C to interrupt)")

        # Disconnect if no data is received for 60 seconds
        while mne_lsl.lsl.local_clock() - muse.last_timestamp < 60:
            try:
                backends.sleep(1)
            except KeyboardInterrupt:
                muse.stop()
                print("Stream interrupted. Stopping...")
                break

        if mne_lsl.lsl.local_clock() - muse.last_timestamp > 60:
            print("No data received for 60 seconds. Disconnecting...")
        print("Disconnected.")

stream()