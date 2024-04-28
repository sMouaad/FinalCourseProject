from nltk import flatten
from spectralanalysis.dsp import generate_features
import numpy as np

def features(raw_data):

    implementation_version = 4 # 4 is latest versions

    raw_data = np.array(raw_data)

    axes = ['TP9', 'AF7', 'AF8', 'TP10']                        # Axes names.
    sampling_freq = 250                                         # Sampling frequency of the data.

    #Parameters specific to the spectral analysis DSP block [Default Values].
    scale_axes = 1                                             
    input_decimation_ratio = 1                                  
    filter_type = 'none'                                        
    filter_cutoff = 0                                           
    filter_order = 0                                            
    analysis_type = 'FFT'    
    draw_graphs = False                                  

    # The following parameters only apply to FFT analysis type.  Even if you choose wavelet analysis, these parameters still need dummy values
    fft_length = 64                                             

    # Deprecated parameters. Only for backwards compatibility.  
    spectral_peaks_count = 0                                    
    spectral_peaks_threshold = 0                                
    spectral_power_edges = "0"                                 

    # Current FFT parameters
    do_log = True                                               # Log of the spectral powers from the FFT frames
    do_fft_overlap = True                                       # Overlap FFT frames by 50%.  If false, no overlap
    extra_low_freq = False                                      #Decimate the input window by 10 and perform another FFT on the decimated window.
                                                                # This is useful to extract low frequency data.  The features will be appended to the normal FFT features

    # These parameters only apply to Wavelet analysis type.  Even if you choose FFT analysis, these parameters still need dummy values
    wavelet_level = 2                                           # Level of wavelet decomposition
    wavelet = "rbio3.1"                                         # Wavelet kernel to use

    output = generate_features(implementation_version, draw_graphs, raw_data, axes, sampling_freq, scale_axes, input_decimation_ratio,
                        filter_type, filter_cutoff, filter_order, analysis_type, fft_length, spectral_peaks_count,
                        spectral_peaks_threshold, spectral_power_edges, do_log, do_fft_overlap,
                        wavelet_level, wavelet, extra_low_freq)


    return output["features"]