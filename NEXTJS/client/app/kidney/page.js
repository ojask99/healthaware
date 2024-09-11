"use client";
import * as React from 'react';
import ContinuousSlider from '../components/ContinuousSlider';
import UploadFileButton from '../components/UploadFileButton';
import SubmitButton from '../components/SubmitButton';
import Image from 'next/image';

export default function TuberculosisDetectionForm() {
  const [confidence, setConfidence] = React.useState(0.3);
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');
  const [processedImage, setProcessedImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfidenceChange = (event, newValue) => {
    setConfidence(newValue);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('confidence', confidence / 100);  // Convert to 0-1 range

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kidney`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProcessedImage(`data:image/jpeg;base64,${data.processed_image}`);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-950 text-white">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="max-w-4xl mx-auto w-full mt-16 p-8">
          <h1 className="text-4xl font-bold text-center mt-2 mb-10">Kidney Stone Detection</h1>

        <div className="w-full bg-sky-900 rounded-lg p-6 shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Upload and Process</h3>
          <div className="space-y-6">
            <div>
              <h4 className="mb-2">Upload Image:</h4>
              <UploadFileButton onChange={handleFileChange} />
              {fileName && <p className="mt-2">Selected file: {fileName}</p>}
            </div>
            <div>
              <h4 className="mb-2">Confidence:</h4>
              <ContinuousSlider value={confidence} 
                onChange={handleConfidenceChange} 
                min={0.00} 
                max={1.00} 
                step={0.01}/>
              <h4>{confidence}%</h4>
            </div>
            <div>
              <SubmitButton onClick={handleSubmit} disabled={isLoading} />
            </div>
          </div>
        </div>
        </div>

        {/* Processed Image Section */}
        
            {isLoading ? (
              <div className="w-full bg-sky-900 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Processed Image</h3>
              <div className="w-full flex items-center justify-center border border-sky-700 rounded-lg overflow-hidden">
              <p>Processing...</p></div></div>
            ) : processedImage ? (
              <div className="w-full bg-sky-900 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Processed Image</h3>
              <div className="w-full flex items-center justify-center border border-sky-700 rounded-lg overflow-hidden">
              <Image src={processedImage} alt="Processed Image" layout="responsive" width={1000} height={1000} className="max-w-full h-auto object-contain" />
              </div></div>
            ) : (
              <></>
            )}
          </div>
        </div>
  );
}
