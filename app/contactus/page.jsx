'use client'

import HeroSection from '../../components/HeroSection.jsx'
import { ArrowRight } from 'lucide-react'
import Footer from '../../components/Footer.jsx'

export default function ContactUs() {
 
    return (
        <div>
            <HeroSection title="Contact Us" />

            <div className="container flex justify-center items-center h-screen -mt-64 -mb-48 lg:-mt-64 lg:-mb-48">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Home = contactus comes here</h1>
            </div>


            {/* Contact Form Section - Mobile Responsive */}
            <div className="w-full max-w-full min-h-screen bg-gradient-to-r from-yellow-100/65 to-purple-100/65 flex flex-col justify-center items-center py-16 lg:py-22 px-4 lg:px-36">
                <div className="w-full max-w-2xl lg:max-w-4xl flex flex-col gap-6 lg:gap-6">
                    {/* Form Title */}
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-800 text-center mb-4 lg:mb-5">
                        Get in Touch
                    </h2>

                    {/* Name and Email Row - Responsive (Stacked on mobile, parallel on desktop) */}
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 w-full">
                        {/* Name Field */}
                        <div className="flex-1">
                            <label className="block mb-2 text-sm lg:text-base font-medium text-gray-800">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-3 lg:p-4 border-2 border-white/30 rounded-xl text-sm lg:text-base bg-white/20 backdrop-blur-sm outline-none transition-all duration-300 ease-in-out focus:border-blue-600 focus:bg-white/30 box-border"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="flex-1">
                            <label className="block mb-2 text-sm lg:text-base font-medium text-gray-800">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                className="w-full p-3 lg:p-4 border-2 border-white/30 rounded-xl text-sm lg:text-base bg-white/20 backdrop-blur-sm outline-none transition-all duration-300 ease-in-out focus:border-blue-600 focus:bg-white/30 box-border"
                            />
                        </div>
                    </div>

                    {/* Message Field (Below) */}
                    <div>
                        <label className="block mb-2 text-sm lg:text-base font-medium text-gray-800">
                            Message
                        </label>
                        <textarea
                            placeholder="Your message here..."
                            rows={4}
                            className="w-full p-3 lg:p-4 border-2 border-white/30 rounded-xl text-sm lg:text-base bg-white/20 backdrop-blur-sm outline-none transition-all duration-300 ease-in-out resize-vertical min-h-24 lg:min-h-32 box-border font-inherit focus:border-blue-600 focus:bg-white/30"
                        />
                    </div>

                    {/* Send Message Button - Responsive */}
                    <button className="bg-blue-600 text-white border-none rounded-xl px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 ease-in-out self-start mt-2 lg:mt-2 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg">
                        Send Message
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}