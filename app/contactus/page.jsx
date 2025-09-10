'use client'

import Navbar from '../../components/Navbar.jsx'
import HeroSection from '../../components/HeroSection.jsx'
import { ArrowRight } from 'lucide-react'
import Footer from '../../components/Footer.jsx'

export default function ContactUs() {
 
    return (
        <div>
            <Navbar />
            <HeroSection title="Contact Us" />

            <div className="container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                marginTop: '-250px',
                marginBottom: '-200px'
            }}>
                <h1>Home = contactus comes here</h1>
            </div>


            {/* Contact Form Section */}
            <div className="contact-form-section" style={{
                width: '100%',
                maxWidth: '2050.5px',
                minHeight: '749px',
                opacity: 1,
                gap: '10px',
                paddingTop: '88px',
                paddingBottom: '88px',
                background: 'linear-gradient(102.91deg, rgba(247, 236, 213, 0.65) 1.8%, rgba(238, 201, 249, 0.65) 99.54%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '800px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                }}>
                    {/* Form Title */}
                    <h2 className="form-title" style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#333',
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>
                        Get in Touch
                    </h2>

                    {/* Name and Email Row (Parallel on desktop, stacked on mobile) */}
                    <div className="form-row" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '20px',
                        width: '100%'
                    }}>
                        {/* Name Field */}
                        <div style={{ flex: 1 }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#3514EE';
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                }}
                            />
                        </div>

                        {/* Email Field */}
                        <div style={{ flex: 1 }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                fontSize: '1rem',
                                fontWeight: '500',
                                color: '#333'
                            }}>
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                style={{
                                    width: '100%',
                                    padding: '16px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    boxSizing: 'border-box'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#3514EE';
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                }}
                            />
                        </div>
                    </div>

                    {/* Message Field (Below) */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            color: '#333'
                        }}>
                            Message
                        </label>
                        <textarea
                            placeholder="Your message here..."
                            rows={6}
                            style={{
                                width: '100%',
                                padding: '16px',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                backdropFilter: 'blur(10px)',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                resize: 'vertical',
                                minHeight: '120px',
                                boxSizing: 'border-box',
                                fontFamily: 'inherit'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#3514EE';
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                            }}
                        />
                    </div>

                    {/* Send Message Button */}
                    <button
                        className="submit-button"
                        style={{
                            background: '#3514EE',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '16px 32px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: 'all 0.3s ease',
                            alignSelf: 'flex-start',
                            marginTop: '10px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#2a0fc7';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 25px rgba(53, 20, 238, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = '#3514EE';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        Send Message
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            <Footer />

            {/* Mobile-specific CSS */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .contact-form-section {
                        padding-left: 20px !important;
                        padding-right: 20px !important;
                    }
                    
                    .form-title {
                        font-size: 2rem !important;
                    }
                    
                    .form-row {
                        flex-direction: column !important;
                    }
                    
                    .submit-button {
                        align-self: stretch !important;
                        width: 100% !important;
                        padding: 14px 24px !important;
                        font-size: 1rem !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .contact-form-section {
                        padding-left: 16px !important;
                        padding-right: 16px !important;
                        padding-top: 60px !important;
                        padding-bottom: 60px !important;
                    }
                    
                    .form-title {
                        font-size: 1.75rem !important;
                        margin-bottom: 16px !important;
                    }
                }
            `}</style>
        </div>
    );
}