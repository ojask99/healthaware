"use client";
import * as React from 'react';
import MultiActionAreaCard from '../components/Card';
import Link from 'next/link';

export default function Enterprise() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[radial-gradient(circle,rgba(30,162,160,1)_0%,rgba(8,28,87,0.9641981792717087)_39%,rgba(9,9,9,1)_100%)] text-white p-4">
            <div>
                <h1 className="text-2xl md:text-4xl mb-8 text-center">
                    Welcome to Enterprise!
                </h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                <MultiActionAreaCard
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhj-Tj-GvC-Qf2VGyeHKRlrrhlUCyJBrAng&s"
                    title="TB Bacilli Detection"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    link="/tb"
                    buttonLabel="Explore"
                />
                <MultiActionAreaCard
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHLiXBvclnhixSaZTt7Bt-fsP_5WYuoyeSOw&s"
                    title="Kidney Stone Detection"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    link="/kidney"
                    buttonLabel="Explore"
                />
                <MultiActionAreaCard
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjlERo59eJncfF-hKA3EGX9o_FV82kGNv0EQ&s"
                    title="Leprosy"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                    link="/kidney"
                    buttonLabel="Explore"
                />
            </div>
        </div>
    );
}
