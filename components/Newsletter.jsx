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
    <section 
      id="newsletter" 
      className="relative overflow-hidden bg-black text-white"
      style={{
        width: '100%',
        height: 'auto',
        minHeight: '400px'
      }}
    >
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

      <div 
        className="relative z-10 text-center"
        style={{
          padding: '60px 0',
          width: '100%'
        }}
      >
        <h3 
          className="font-semibold"
          style={{
            fontSize: '48px',
            lineHeight: '1.2',
            marginBottom: '20px'
          }}
        >
          Get the best stories and travel deals straight<br />to your inbox, Sign-up here
        </h3>
        <p 
          className="text-white/70"
          style={{
            fontSize: '24px',
            marginBottom: '40px'
          }}
        >
          We send only good stuff no spam, just pure wanderlust.
        </p>

        <form 
          onSubmit={handleSubmit} 
          className="mx-auto flex flex-col sm:flex-row overflow-hidden rounded-lg bg-white"
          style={{
            width: '1000px',
            height: '120px'
          }}
        >
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black outline-none"
            style={{
              width: '728px',
              height: '81px',
              opacity: 1,
              padding: '0 20px',
              fontSize: '20px',
              border: 'none'
            }}
            required
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-indigo-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
            style={{
              width: '272px',
              height: '81px',
              fontSize: '20px',
              border: 'none'
            }}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
