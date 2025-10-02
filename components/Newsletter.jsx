'use client'

import { useState } from 'react';
import { newsletterApi } from '../lib/api';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      await newsletterApi.subscribe(email, {
        frequency: 'weekly',
        categories: ['all'],
        language: 'en'
      });
      
      toast.success('Successfully subscribed to our newsletter!');
      setEmail(''); // Clear the form
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      if (error.message.includes('already subscribed')) {
        toast.error('This email is already subscribed to our newsletter');
      } else {
        toast.error('Failed to subscribe. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="relative overflow-hidden bg-black text-white">
      {/* Top curve */}
      <svg
        viewBox="0 0 1440 120"
        className="pointer-events-none absolute top-0 left-0 w-full h-24"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C360,40 720,80 1080,40 C1200,20 1320,10 1440,0 L1440,0 L0,0 Z"
          fill="#ffffff"
        />
      </svg>

      <div className="container relative z-10 pt-20 sm:pt-28 pb-16 sm:pb-20 text-center px-4">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
          Get the best stories and travel deals straight<br className="hidden sm:block" />to your inbox, Sign-up here
        </h3>
        <p className="mt-4 text-white/70 text-base sm:text-lg">
          We send only good stuff no spam, just pure wanderlust.
        </p>

        <form 
          onSubmit={handleSubmit} 
          className="mt-10 sm:mt-16 mx-auto flex flex-col sm:flex-row w-full max-w-2xl overflow-hidden rounded-lg bg-white"
        >
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 sm:px-8 py-4 text-black outline-none text-base sm:text-lg"
            required
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-6 sm:px-8 py-4 bg-indigo-600 text-white text-base sm:text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
