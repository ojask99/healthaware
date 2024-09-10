"use client";
import * as React from 'react';
import ContinuousSlider from '../components/ContinuousSlider';
import UploadFileButton from '../components/UploadFileButton';
import SubmitButton from '../components/SubmitButton';
import Button from '@mui/material/Button';
import { Upload } from '@mui/icons-material';

export default function TuberculosisDetectionForm() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 border rounded-lg shadow-md bg-white">
        <h1 className="font-bold text-2xl mb-4">Tuberculosis Detection Form</h1>
        <h2 className="font-bold text-xl mb-4">Powered by YOLOv8</h2>
        <div className="form">
          <div className="flex justify-start mb-4">
            <h3 className="mr-2">Upload Image:</h3>
            <UploadFileButton />
          </div>
          <div className="flex justify-start mb-4">
            <h3 className="mr-2">Confidence:</h3>
            <ContinuousSlider />
          </div>
          <div className="mb-4">
            <SubmitButton />
          </div>

          <div>
            <h3 className="mb-2">Processed Image:</h3>
            <img src="https://example.com/image.jpg" alt="Processed Image" className="border rounded-lg shadow-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
