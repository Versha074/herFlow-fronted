import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

export default function WhatTrack() {
    // Placeholder image sources (replace with your actual image paths)
    const menstrualCycleImg = "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";
    const pregnancyCycleImg = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                {/* Heading for context */}
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Choose Your Tracking Journey
                </h2>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                >   
                    {/* Menstrual Cycle Slide */}
                    <SwiperSlide>
                        <Link to="/cycle" className="group cursor-pointer">
                            <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                {/* Larger image container */}
                                <div className="relative h-[60vh] overflow-hidden">
                                    <img
                                        src={menstrualCycleImg}
                                        alt="Cycle tracking"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Enhanced gradient for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-900/70" />
                                </div>
                                {/* Text area with backdrop-blur */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="backdrop-blur-sm bg-black/20 rounded-lg p-4 space-y-3 text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-rose-100/20 rounded-full backdrop-blur-sm">
                                                <svg className="w-6 h-6 text-rose-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-3xl font-bold">Cycle Tracking</h3>
                                        </div>
                                        <p className="text-lg opacity-90">Track your menstrual cycle, ovulation days, and symptoms</p>
                                        <button className="mt-4 flex items-center gap-2 px-6 py-4 bg-rose-600/90 hover:bg-rose-700 text-white rounded-lg font-medium transition-all duration-300 hover:gap-3">
                                            <span>Start Tracking</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>

                    {/* Pregnancy Tracking Slide */}
                    <SwiperSlide>
                        <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            {/* Larger image container */}
                            <div className="relative h-[60vh] overflow-hidden">
                                <img
                                    src={pregnancyCycleImg}
                                    alt="Pregnancy tracking"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Enhanced gradient for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/70" />
                            </div>
                            {/* Text area with backdrop-blur */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="backdrop-blur-sm bg-black/20 rounded-lg p-4 space-y-3 text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-100/20 rounded-full backdrop-blur-sm">
                                            <svg className="w-6 h-6 text-indigo-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-3xl font-bold">Pregnancy Tracking</h3>
                                    </div>
                                    <p className="text-lg opacity-90">Monitor your pregnancy journey with weekly milestones</p>
                                    <button className="mt-4 flex items-center gap-2 px-6 py-4 bg-indigo-600/90 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-300 hover:gap-3">
                                        <span>Start Tracking</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}