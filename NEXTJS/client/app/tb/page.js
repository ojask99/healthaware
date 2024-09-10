"use client";
import * as React from 'react';
import ContinuousSlider from '../components/ContinuousSlider';
import UploadFileButton from '../components/UploadFileButton';
import SubmitButton from '../components/SubmitButton';
import Button from '@mui/material/Button';
import { Upload } from '@mui/icons-material';

export default function TuberculosisDetectionForm() {
  return (
    <div className="flex flex-col items-center justify-start h-full text-white bg-sky-950">
      <div className="mt-10"> {/* Added margin-top */}
        <h1 className="font-bold text-3xl mb-2 text-center">Tuberculosis Detection Form</h1> {/* Increased font size */}
        <h2 className="font-bold text-xl mb-8 text-center">Powered by YOLOv8</h2> {/* Reduced bottom margin */}
      </div>

      <div className="p-10 border-orange-200 mb-5 rounded-lg text-white w-full max-w-2xl" style={{
          WebkitBoxShadow: '1px 26px 73px 9px rgba(0,0,0,0.75)',
          MozBoxShadow: '1px 26px 73px 9px rgba(0,0,0,0.75)',
          boxShadow: '1px 26px 73px 9px rgba(0,0,0,0.75)',
        }}>
        <div className="form">
          <div className="flex justify-start mb-7">
            <h3 className="mr-2">Upload Image:</h3>
            <UploadFileButton />
          </div>
          <div className="flex justify-start mb-7">
            <h3 className="mr-2">Confidence:</h3>
            <ContinuousSlider />
          </div>
          <div className="mb-7">
            <SubmitButton />
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-white">Processed Image:</h3>
          <img src="https://i1.sndcdn.com/artworks-7yTGT2Ldcj1k52QL-nOHcfw-t1080x1080.jpg" alt="Processed Image" className="border rounded-lg shadow-sm text-white" />
        </div>
      </div>
    </div>
  );
}
