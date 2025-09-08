'use client'

import HeroSection from '../../components/HeroSection.jsx'
import { ArrowRight } from 'lucide-react'
import Footer from '../../components/footer.jsx'

export default function ContactUs() {
 
    return (
        <div>
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
            <div style={{
                width: '100%',
                maxWidth: '2050.5px',
                height: '749px',
                opacity: 1,
                gap: '10px',
                paddingTop: '88px',
                paddingRight: '144px',
                paddingBottom: '88px',
                paddingLeft: '144px',
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
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#333',
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>
                        Get in Touch
                    </h2>

                    {/* Name and Email Row (Parallel) */}
                    <div style={{
                        display: 'flex',
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
        </div>
    );
}