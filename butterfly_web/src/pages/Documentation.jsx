import React from 'react';
import { SiTensorflow, SiFlask, SiTailwindcss } from "react-icons/si";
import { FaPython, FaReact } from "react-icons/fa";

const DocumentationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 px-4 pt-24"> {/* Added pt-24 for padding below navbar */}
      <div className="container mx-auto p-8 bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center tracking-tight">
          Documentation & Model Information
        </h1>
        <p className="text-center text-lg text-gray-700 mb-10">
          Created by Himan Manduja
        </p>
        
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <section>
            <h2 className="text-3xl font-semibold text-indigo-700 mt-6 mb-4 border-b-2 border-indigo-200 pb-2">
              Overview
            </h2>
            <p>
              Welcome to the documentation for the Butterfly Prediction application. This guide provides details on the prediction model, how to use the application, the data sources, and information about the underlying technology. Our goal is to offer a transparent and informative resource for users and developers alike.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-indigo-700 mt-8 mb-4 border-b-2 border-indigo-200 pb-2">
              The Prediction Model
            </h2>
            <p>
              The core of this application is a sophisticated deep learning classifier. This model is built using <strong className="text-orange-600">TensorFlow</strong> and utilizes the <strong className="text-green-600">MobileNetV2</strong> architecture, known for its efficiency and performance on mobile and edge devices. It has been trained on an extensive and diverse dataset of butterfly images primarily sourced from <strong className="text-sky-600">Kaggle</strong>. The model is designed to accurately identify various butterfly species based on their distinct visual characteristics.
            </p>
            <p className="mt-2">
              Further details about specific training methodologies, data augmentation techniques, performance metrics (e.g., accuracy, precision, recall), and potential limitations will be made available as documentation expands. We are committed to continuous improvement and model refinement.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-indigo-700 mt-8 mb-4 border-b-2 border-indigo-200 pb-2">
              Technologies Used
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 text-gray-700 py-4">
              <div className="flex flex-col items-center p-3 transition-transform transform hover:scale-110">
                <SiTensorflow size={48} className="text-orange-500 mb-2" />
                <span className="font-medium">TensorFlow</span>
              </div>
              <div className="flex flex-col items-center p-3 transition-transform transform hover:scale-110">
                <FaPython size={48} className="text-blue-600 mb-2" />
                <span className="font-medium">Python</span>
              </div>
              <div className="flex flex-col items-center p-3 transition-transform transform hover:scale-110">
                <SiFlask size={48} className="text-gray-800 mb-2" />
                <span className="font-medium">Flask</span>
              </div>
              <div className="flex flex-col items-center p-3 transition-transform transform hover:scale-110">
                <FaReact size={48} className="text-sky-500 mb-2" />
                <span className="font-medium">React</span>
              </div>
              <div className="flex flex-col items-center p-3 transition-transform transform hover:scale-110">
                <SiTailwindcss size={48} className="text-cyan-400 mb-2" />
                <span className="font-medium">Tailwind CSS</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-indigo-700 mt-8 mb-4 border-b-2 border-indigo-200 pb-2">
              How to Use the Predictor
            </h2>
            <p>
              Using the butterfly predictor is straightforward:
            </p>
            <ol className="list-decimal list-inside ml-4 space-y-2 mt-2">
              <li>Navigate to the <strong className="text-indigo-600">'Predict'</strong> page using the navigation bar.</li>
              <li>Click on the designated area to upload an image of a butterfly or drag and drop a file.</li>
              <li>Ensure the image is clear and the butterfly is the main subject.</li>
              <li>Once the image is uploaded, click the 'Predict' button.</li>
              <li>The application will then display the predicted butterfly species, a confidence score, and other available information such as its common and scientific name, habitat, and a brief description.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-indigo-700 mt-8 mb-4 border-b-2 border-indigo-200 pb-2">
              Data Sources & Preprocessing
            </h2>
            <p>
              The dataset integral to training our model comprises images aggregated from various reputable open-source collections, contributions from citizen science platforms, and publicly available academic datasets. Each image undergoes a rigorous preprocessing phase, including resizing, normalization, and augmentation techniques (like rotation, flipping, and brightness adjustments) to enhance the model's robustness and generalization capabilities.
            </p>
            <p className="mt-2">
              We prioritize ethical data sourcing and an ongoing commitment to expanding the dataset to include more species and improve predictive accuracy.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-indigo-700 mt-8 mb-4 border-b-2 border-indigo-200 pb-2">
              API Information (Future)
            </h2>
            <p>
              Currently, direct API access for predictions is not available. However, we are exploring options to provide an API for developers in the future. This section will be updated with technical specifications, authentication details, rate limits, and usage examples if an API becomes available.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
