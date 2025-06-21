import React, { useState, useRef } from 'react';
import axios from 'axios';

const PredictionPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPredictionResult(null); 
      setError(null); 
    } else {
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    }
  };

  const handlePredict = () => {
    if (!selectedFile) {
      setError('Please select an image file first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPredictionResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('/api/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      setPredictionResult(response.data);
    })
    .catch(err => {
      let errorMessage = 'An error occurred during prediction.';
      if (err.response && err.response.data && err.response.data.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error("Prediction error:", err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const handleClearAll = () => {
    setSelectedFile(null);
    setPredictionResult(null);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-50 to-pink-100 py-8 px-4 pt-24">
      <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl p-8 space-y-8">

        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tracking-tight">
            Butterfly Identifier
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Upload an image to discover the butterfly species!
          </p>
        </header>


        <div className="text-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {selectedFile ? selectedFile.name : "Upload Butterfly Image"}
          </label>
          <input
            id="file-upload"
            ref={fileInputRef} 
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {error && <p className="mt-3 text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
        </div>


        <div className="mt-6 bg-gray-100/50 p-4 rounded-lg shadow-inner min-h-[200px] flex justify-center items-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected butterfly"
              className="max-w-full max-h-80 h-auto object-contain rounded-md shadow-md"
            />
          ) : (
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-2">Image preview will appear here.</p>
            </div>
          )}
        </div>


        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
          <button
            onClick={handlePredict}
            disabled={!selectedFile || isLoading}
            className={`w-full sm:w-auto font-semibold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50
                        ${!selectedFile || isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400'}`}
          >
            {isLoading ? 'Predicting...' : 'Predict Species'}
          </button>
          <button
            onClick={handleClearAll}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
            Clear All
          </button>
        </div>


        {!isLoading && predictionResult && (
          <div className="mt-10 p-6 sm:p-8 bg-white/80 backdrop-blur-xl shadow-2xl rounded-xl space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 text-center mb-2">
                {predictionResult.name}
              </h2>
              <p className="text-xl text-gray-700 text-center mb-6">
                Confidence: <strong className="font-semibold">{(predictionResult.confidence).toFixed(2)}%</strong>
              </p>
            </div>

            {predictionResult.image && (
              <div className="flex justify-center">
                <img
                  src={predictionResult.image}
                  alt={`Predicted: ${predictionResult.name}`}
                  className="w-full max-w-lg h-auto object-contain rounded-lg shadow-lg border-2 border-gray-200"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-6 border-t border-gray-200">
              {predictionResult.scientific_name && predictionResult.scientific_name !== "N/A" && (
                <div className="py-2">
                  <strong className="font-semibold text-gray-800">Scientific Name:</strong>
                  <span className="ml-2 text-gray-700">{predictionResult.scientific_name}</span>
                </div>
              )}
              {predictionResult.family && predictionResult.family !== "N/A" && (
                <div className="py-2">
                  <strong className="font-semibold text-gray-800">Family:</strong>
                  <span className="ml-2 text-gray-700">{predictionResult.family}</span>
                </div>
              )}
              {predictionResult.wingspan_mm && predictionResult.wingspan_mm !== "N/A" && (
                <div className="py-2">
                  <strong className="font-semibold text-gray-800">Wingspan:</strong>
                  <span className="ml-2 text-gray-700">{predictionResult.wingspan_mm} mm</span>
                </div>
              )}
              {predictionResult.distribution && predictionResult.distribution !== "N/A" && (
                <div className="py-2 md:col-span-2">
                  <strong className="font-semibold text-gray-800">Distribution:</strong>
                  <p className="ml-2 text-gray-700 whitespace-pre-line">{predictionResult.distribution}</p>
                </div>
              )}
              {predictionResult.habitat && predictionResult.habitat !== "N/A" && (
                <div className="py-2 md:col-span-2">
                  <strong className="font-semibold text-gray-800">Habitat:</strong>
                  <p className="ml-2 text-gray-700 whitespace-pre-line">{predictionResult.habitat}</p>
                </div>
              )}
              {predictionResult.host_plants && predictionResult.host_plants !== "N/A" && (
                <div className="py-2 md:col-span-2">
                  <strong className="font-semibold text-gray-800">Host Plants:</strong>
                  <p className="ml-2 text-gray-700 whitespace-pre-line">{predictionResult.host_plants}</p>
                </div>
              )}
              {predictionResult.lifecycle_notes && predictionResult.lifecycle_notes !== "N/A" && (
                <div className="py-2 md:col-span-2">
                  <strong className="font-semibold text-gray-800">Lifecycle Notes:</strong>
                  <p className="ml-2 text-gray-700 whitespace-pre-line">{predictionResult.lifecycle_notes}</p>
                </div>
              )}
              {predictionResult.conservation_status && predictionResult.conservation_status !== "N/A" && (
                <div className="py-2 md:col-span-2">
                  <strong className="font-semibold text-gray-800">Conservation Status:</strong>
                  <p className="ml-2 text-gray-700 whitespace-pre-line">{predictionResult.conservation_status}</p>
                </div>
              )}
              {predictionResult.general_description && predictionResult.general_description !== "N/A" && (
                <div className="py-2 md:col-span-2">
                  <strong className="font-semibold text-gray-800">General Description:</strong>
                  <p className="ml-2 text-gray-700 whitespace-pre-line">{predictionResult.general_description}</p>
                </div>
              )}
            </div>

            {predictionResult.youtube_embed_link && predictionResult.youtube_embed_link !== "N/A" && predictionResult.youtube_embed_link.trim() !== "" && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Watch a Video</h3>
              
                <div className="bg-black rounded-lg shadow-xl overflow-hidden"> 
                  <iframe
                    className="w-full aspect-video" 
                    src={predictionResult.youtube_embed_link}
                    title="Butterfly Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        )}


        {!isLoading && !predictionResult && (
          <div className="mt-10 p-6 text-center text-gray-500">
            <p>Prediction results will be displayed here once an image is processed.</p>
          </div>
        )}

      
        {isLoading && (
          <div className="mt-10 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-lg text-gray-700">Identifying butterfly, please wait...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;
