'use client';
import React from 'react';
import FuzzyText from '@/blocks/TextAnimations/FuzzyText';
import Link from 'next/link';
import { IoMdHome } from "react-icons/io";

const BlogPage: React.FC = () => {
    return (
        <main className='flex flex-col gap-6 justify-center items-center h-screen'>
            <div>
                <FuzzyText
                    baseIntensity={0.2}
                    hoverIntensity={0.5}
                    enableHover={true}
                >
                    404
                </FuzzyText>
            </div>
            <div>
                <FuzzyText
                    baseIntensity={0.2}
                    hoverIntensity={0.5}
                    enableHover={true}
                    fontSize="clamp(2rem, 4vw, 4rem)"
                >
                    not found
                </FuzzyText>
            </div>

            <div className="goback mt-10">
                <Link
                    href="/"
                    className="px-6 py-2 border-2 transition-colors hover:bg-gray-100/10 font-bold hover:text-blak flex items-center gap-2"
                >
                    <span>Go back</span>
                    <IoMdHome className="text-lg" />
                </Link>
            </div>
        </main>
    );
};

export default BlogPage;