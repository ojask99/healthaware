"use client";
import * as React from 'react';
import MultiActionAreaCard from '../components/Card';
import Link from 'next/link';

export default function Enterprise() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[radial-gradient(circle,rgba(30,162,160,1)_0%,rgba(8,28,87,0.9641981792717087)_39%,rgba(9,9,9,1)_100%)] text-white p-4 pt-24">
            <div>
                <h1 className="text-2xl md:text-4xl mb-8 text-center">
                    Welcome to Enterprise!
                </h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                <MultiActionAreaCard
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhj-Tj-GvC-Qf2VGyeHKRlrrhlUCyJBrAng&s"
                    title="TB Bacilli Detection"
                    content="Experience advanced AI-driven Tuberculosis Detection with YOLOv8 technology—engineered for precision, speed, and scalability. Quickly identify TB bacteria in microscopic images, enhancing diagnostic accuracy and lab efficiency while reducing errors. Transform your healthcare delivery with our state-of-the-art solution today!"
                    link="/tb"
                    buttonLabel="Explore"
                />
                <MultiActionAreaCard
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHLiXBvclnhixSaZTt7Bt-fsP_5WYuoyeSOw&s"
                    title="Kidney Stone Detection"
                    content="Enhance diagnostic precision with our AI-powered Kidney Stone Detection System, designed for enterprise efficiency. Leveraging advanced deep learning, our solution quickly identifies kidney stones in medical images, reducing diagnostic time and improving patient outcomes. Elevate your healthcare services with cutting-edge, scalable technology today!"
                    link="/kidney"
                    buttonLabel="Explore"
                />
                <MultiActionAreaCard
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjlERo59eJncfF-hKA3EGX9o_FV82kGNv0EQ&s"
                    title="Brain Tumor"
                    content="Boost your diagnostic precision with our AI-powered Brain Tumor Detection System. Utilizing advanced deep learning, it swiftly identifies brain tumors in medical scans, enhancing accuracy and patient care. Experience next-level healthcare with scalable, cutting-edge technology today!"
                    link="/kidney"
                    buttonLabel="Explore"
                />
            </div>
        </div>
    );
}
