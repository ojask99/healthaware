"use client";
import * as React from 'react';
import MultiActionAreaCard from '../components/Card';
import Link from 'next/link';

export default function Casual() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[radial-gradient(circle,rgba(30,162,160,1)_0%,rgba(8,28,87,0.9641981792717087)_39%,rgba(9,9,9,1)_100%)] text-white p-4 pt-24">
            <div>
                <h1 className="text-2xl md:text-4xl mb-8 text-center">
                    Welcome!
                </h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                <MultiActionAreaCard
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mn_OAM0IuPUPihesBDmhFR6YzJ_Dn_0U3g&s"
                    title="Skin Cancer"
                    content="Gain valuable skin health insights with our AI-powered Skin Lesion Detection System. Quickly analyze and classify skin lesions from your images, aiding in early skin cancer detection and enhancing outcomes. Experience advanced, scalable technology for precision and convenience today!"
                    link="/skincancer"
                    buttonLabel="Explore"
                />
                <MultiActionAreaCard
                    image="https://cdn.who.int/media/images/default-source/health-topics/coronavirus/corona-virus-getty.tmb-1200v.jpg?sfvrsn=217a6a68_42"
                    title="Pneumonia/Covid-19"
                    content="Optimize your diagnostic capabilities with our AI-powered Chest CT Classification System. Quickly analyze and classify CT scans into COVID-19, pneumonia, or normal categories, enhancing detection speed and accuracy. Experience advanced, scalable technology for superior healthcare insights today!"
                    link="/pneumonia"
                    buttonLabel="Explore"
                />
                <MultiActionAreaCard
                    image="https://www.spinenbrain.com/wp-content/uploads/2023/06/Brain-tumor-severity-and-survival-may-be-dependent-on-sex-scaled.jpg"
                    title="Brain Tumor"
                    content="Get crucial insights into brain health with our AI-powered Brain Tumor Classification System. Swiftly analyze and classify brain tumors from your scans, aiding in early detection and improving outcomes. Discover advanced, scalable technology for precise and efficient diagnostics today!"
                    link="/braintumor"
                    buttonLabel="Explore"
                />
            </div>
        </div>
    );
}
