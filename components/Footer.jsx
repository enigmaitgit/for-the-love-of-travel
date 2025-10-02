import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="bg-black text-white"
      style={{
        width: '100%',
        height: '100%',
        padding: '40px 0'
      }}
    >
      <div 
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Main Footer Content */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            height: '100%'
          }}
        >
          {/* Left Section - Logo, Social Media, Text */}
          <div style={{ textAlign: 'left' }}>
            {/* Logo */}
            <div style={{ marginBottom: '30px' }}>
              <Image
                src="/images/logo.png"
                alt="For the Love of Travel Logo"
                width={360}
                height={120}
                style={{ height: '60px', width: 'auto' }}
              />
            </div>
            
            {/* Social Media Icons */}
            <div 
              style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '30px'
              }}
            >
              <Link href="#" aria-label="Facebook" style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Facebook style={{ height: '24px', width: '24px', color: 'black' }} />
              </Link>
              <Link href="#" aria-label="Twitter" style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Twitter style={{ height: '24px', width: '24px', color: 'black' }} />
              </Link>
              <Link href="#" aria-label="Instagram" style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Instagram style={{ height: '24px', width: '24px', color: 'black' }} />
              </Link>
              <Link href="#" aria-label="LinkedIn" style={{ width: '50px', height: '50px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Linkedin style={{ height: '24px', width: '24px', color: 'black' }} />
              </Link>
            </div>
            
            {/* Text Block */}
            <p 
              style={{
                color: 'white',
                fontSize: '18px',
                lineHeight: '1.6',
                maxWidth: '600px'
              }}
            >
              The Impact of Technology on the Workplace: How Technology is Changing The Impact of Technology on the Workplace
            </p>
          </div>

          {/* Right Section - Navigation Links */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <nav>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '15px' }}><Link href="#" style={{ color: 'white', textTransform: 'uppercase', fontSize: '18px', fontWeight: '500', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ marginBottom: '15px' }}><Link href="#destinations" style={{ color: 'white', textTransform: 'uppercase', fontSize: '18px', fontWeight: '500', textDecoration: 'none' }}>Destinations</Link></li>
                <li style={{ marginBottom: '15px' }}><Link href="#vacations" style={{ color: 'white', textTransform: 'uppercase', fontSize: '18px', fontWeight: '500', textDecoration: 'none' }}>Vacations</Link></li>
                <li style={{ marginBottom: '15px' }}><Link href="#tours" style={{ color: 'white', textTransform: 'uppercase', fontSize: '18px', fontWeight: '500', textDecoration: 'none' }}>Tours</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Separator Line */}
        <div style={{ marginTop: '40px', borderTop: '1px solid #4a5568' }}></div>

        {/* Bottom Section */}
        <div 
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          {/* Legal Links */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              color: 'white',
              textTransform: 'uppercase',
              fontSize: '16px'
            }}
          >
            <Link href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy & Cookies Statement</Link>
            <span style={{ color: '#9ca3af' }}>|</span>
            <Link href="#" style={{ color: 'white', textDecoration: 'none' }}>RSS Feeds</Link>
            <span style={{ color: '#9ca3af' }}>|</span>
            <Link href="#" style={{ color: 'white', textDecoration: 'none' }}>Conde Nast Store</Link>
          </div>
          
          {/* Copyright */}
          <div style={{ color: 'white', fontSize: '16px' }}>
            Copyright 2025, fortheloveoftravel.nz
          </div>
        </div>
      </div>
    </footer>
  );
}
