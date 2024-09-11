"use client";
import * as React from 'react';
import UploadFileButton from '../components/UploadFileButton';
import SubmitButton from '../components/SubmitButton';
import Image from 'next/image';

export default function BrainTumorDetectionForm() {
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');
  const [result, setResult] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

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

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/brain_tumor`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
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
          <h1 className="text-4xl font-bold text-center mt-2 mb-10">Brain Tumor Detection</h1>
          <div className="w-full bg-sky-900 rounded-lg p-6 shadow-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Upload and Process</h3>
            <div className="space-y-6">
              <div>
                <h4 className="mb-2">Upload Image:</h4>
                <UploadFileButton onChange={handleFileChange} />
                {fileName && <p className="mt-2">Selected file: {fileName}</p>}
              </div>
              <div>
                <SubmitButton onClick={handleSubmit} disabled={isLoading} />
              </div>
            </div>
          </div>

          {/* Result Section */}
          {isLoading ? (
            <div className="w-full bg-sky-900 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Processing...</h3>
              <div className="w-full flex items-center justify-center border border-sky-700 rounded-lg overflow-hidden">
                <p>Processing...</p>
              </div>
            </div>
          ) : result ? (
            <div className="w-full bg-sky-900 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Detection Result</h3>
              <div className="w-full flex flex-col items-center border border-sky-700 rounded-lg p-4">
                <p className="text-lg">Class: {result.class_name}</p>
                <p className="text-lg">Confidence: {result.confidence}</p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
