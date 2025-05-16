import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ChefHat, UtensilsCrossed, ScrollText, Navigation } from 'lucide-react';
import './LandingPage.css'; // Import the external CSS file

// Sample menu items based on the provided image
const initialMenuItems = [
    {
        id: 1,
        name: "Shanghai Chaofan",
        description: "Classic savory fried rice with Shanghai-style spring rolls.",
        price: 75,
        photoUrl: "https://placehold.co/600x400/FDB813/4A4A4A?text=Shanghai+Chaofan",
        category: "Chaofan"
    },
    {
        id: 2,
        name: "Sweet & Sour Chicken Chaofan",
        description: "Crispy chicken in sweet and sour sauce served with flavorful fried rice.",
        price: 90,
        photoUrl: "https://placehold.co/600x400/FDB813/4A4A4A?text=Sweet+%26+Sour+Chicken",
        category: "Chaofan"
    },
    {
        id: 3,
        name: "Tonkatsu Chaofan",
        description: "Japanese-style breaded pork cutlet on a bed of delicious chaofan.",
        price: 90,
        photoUrl: "https://placehold.co/600x400/FDB813/4A4A4A?text=Tonkatsu+Chaofan",
        category: "Chaofan"
    },
    {
        id: 4,
        name: "Hungarian Chaofan",
        description: "Spicy Hungarian sausage slices mixed with our signature fried rice.",
        price: 85,
        photoUrl: "https://placehold.co/600x400/FDB813/4A4A4A?text=Hungarian+Chaofan",
        category: "Chaofan"
    },
    {
        id: 5,
        name: "Tokwa't Baboy Chaofan",
        description: "A Filipino favorite: fried tofu and pork belly, served with chaofan.",
        price: 80,
        photoUrl: "https://placehold.co/600x400/FDB813/4A4A4A?text=Tokwa't+Baboy",
        category: "Chaofan"
    },
    {
        id: 6,
        name: "Sharksfin Chaofan",
        description: "Flavorful chaofan with mock sharksfin for a unique taste.",
        price: 75,
        photoUrl: "https://placehold.co/600x400/FDB813/4A4A4A?text=Sharksfin+Chaofan",
        category: "Chaofan"
    },
    {
        id: 7,
        name: "Ramen",
        description: "Rich and savory broth with noodles, toppings, and a soft-boiled egg.",
        price: 130,
        photoUrl: "https://placehold.co/600x400/FDB813/4A4A4A?text=Ramen",
        category: "Noodles"
    },
    {
        id: 8,
        name: "Lechon Kawali Chaofan",
        description: "Crispy deep-fried pork belly (Lechon Kawali) served with our tasty chaofan.",
        price: 85,
        photoUrl: "https://placehold.co/600x400/FDB813/4A4A4A?text=Lechon+Kawali",
        category: "Chaofan"
    },
    {
        id: 9,
        name: "Laksa Noodles",
        description: "Spicy and creamy coconut-based noodle soup, a Southeast Asian delight.",
        price: 170,
        photoUrl: "https://placehold.co/600x400/FDB813/4A4A4A?text=Laksa+Noodles",
        category: "Noodles"
    }
];

const LandingPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Simulate fetching menu items
    useEffect(() => {
        // In a real app, you would fetch from your API:
        // fetch('/api/menu')
        //   .then(res => res.json())
        //   .then(data => {
        //     setMenuItems(data);
        //     setLoading(false);
        //   })
        //   .catch(err => {
        //     setError(err.message);
        //     setLoading(false);
        //   });
        setMenuItems(initialMenuItems);
        setLoading(false);
    }, []);

    const NavLink = ({ href, children }) => (
        <a
            href={href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="navbar-link"
        >
            {children}
        </a>
    );

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="container navbar-container">
                    <div className="navbar-brand">
                        <ChefHat className="navbar-brand-icon" />
                        <a href="#" className="navbar-brand">
                            Kahit Saan
                        </a>
                    </div>
                    <div className="navbar-menu">
                        <NavLink href="#menu">Menu</NavLink>
                        <NavLink href="#about">About</NavLink>
                        <NavLink href="#location">Location</NavLink>
                        <NavLink href="#social">Contact</NavLink>
                        <a
                            href="/admin/login"
                            className="navbar-button"
                        >
                            Admin Login
                        </a>
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="mobile-menu-button"
                        aria-label="Open main menu"
                    >
                        <Navigation size={24} />
                    </button>
                </div>
                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="mobile-menu">
                        <NavLink href="#menu">Menu</NavLink>
                        <NavLink href="#about">About</NavLink>
                        <NavLink href="#location">Location</NavLink>
                        <NavLink href="#social">Contact</NavLink>
                        <a
                            href="/admin/login"
                            className="navbar-button"
                        >
                            Admin Login
                        </a>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <header
                className="hero"
                style={{ backgroundImage: "url('https://placehold.co/1920x800/FFF8E1/FDB813?text=Delicious+Food+Awaits!')" }}
            >
                <div className="hero-overlay">
                    <div className="container">
                        <h1 className="hero-title">
                            <span>Welcome to</span>
                            <span className="block" style={{ color: 'var(--primary)' }}>Kahit Saan</span>
                        </h1>
                        <p className="hero-subtitle">
                            Your Everyday Delicious, Anywhere in Nueva Vizcaya! Craving Comfort? Kahit Saan Delivers!
                        </p>
                        <a
                            href="#menu"
                            className="hero-button"
                        >
                            View Our Menu <UtensilsCrossed className="ml-2" />
                        </a>
                    </div>
                </div>
            </header>

            <main>
                {/* Menu Section */}
                <section id="menu" className="section section-white">
                    <div className="container">
                        <div className="section-header">
                            <ScrollText className="section-icon" />
                            <h2 className="section-title">
                                Our Delicious Menu
                            </h2>
                            <p className="section-subtitle">
                                Freshly prepared, full of flavor, and always satisfying.
                            </p>
                        </div>

                        {loading && <p className="text-center">Loading menu...</p>}
                        {error && <p className="text-center" style={{ color: 'red' }}>Error: {error}</p>}

                        {!loading && !error && (
                            <div className="menu-grid">
                                {menuItems.map((item) => (
                                    <div key={item.id} className="menu-item">
                                        <img 
                                            className="menu-item-image" 
                                            src={item.photoUrl} 
                                            alt={item.name} 
                                            onError={(e) => e.target.src='https://placehold.co/600x400/EEEEEE/AAAAAA?text=Image+Not+Available'} 
                                        />
                                        <div className="menu-item-content">
                                            <div>
                                                <p className="menu-item-category">
                                                    {item.category}
                                                </p>
                                                <h3 className="menu-item-name">{item.name}</h3>
                                                <p className="menu-item-description">{item.description}</p>
                                            </div>
                                            <div className="menu-item-footer">
                                                <p className="menu-item-price">
                                                    ₱{item.price.toFixed(2)}
                                                </p>
                                                <button className="menu-item-button">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="section section-light">
                    <div className="container">
                        <div className="section-header">
                            <ChefHat className="section-icon" />
                            <p className="about-title">About Us</p>
                            <h2 className="about-subtitle">
                                The Story of Kahit Saan
                            </h2>
                        </div>
                        <div className="about-section">
                            <div className="about-content">
                                <p>
                                    Kahit Saan started with a simple idea: to bring flavorful and comforting Filipino-Asian meals to everyone in Nueva Vizcaya, without breaking the bank. We believe good food should be accessible anywhere, anytime. Our chaofan and noodle dishes are made with love, using fresh ingredients, perfect for your daily cravings.
                                </p>
                                <h3 className="about-heading">Our Mission</h3>
                                <p>
                                    To be the go-to spot in Nueva Vizcaya for delicious, affordable, and convenient meals that feel like home. We are committed to quality ingredients, friendly service, and making every meal a delightful experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Location Section */}
                <section id="location" className="section section-white">
                    <div className="container">
                        <div className="section-header">
                            <MapPin className="section-icon" />
                            <h2 className="section-title">
                                Visit Us or Get in Touch
                            </h2>
                            <p className="section-subtitle">
                                We're conveniently located in the heart of Bayombong.
                            </p>
                        </div>
                        <div className="location-container">
                            <div className="location-info">
                                <h3>Kahit Saan Restaurant</h3>
                                <p>
                                    Purok 5, Barangay Don Mariano Perez,<br />
                                    Bayombong, 3700 Nueva Vizcaya, Philippines
                                </p>
                                <h4>Operating Hours:</h4>
                                <p>Monday - Sunday: 10:00 AM - 8:00 PM</p>

                                <h4>Contact Us:</h4>
                                <div>
                                    <p className="contact-item">
                                        <Phone className="contact-icon" /> (078) 123-4567 (Sample)
                                    </p>
                                    <p className="contact-item">
                                        <Mail className="contact-icon" /> info@kahitsaanresto.com (Sample)
                                    </p>
                                </div>
                            </div>
                            <div className="map-container">
                                <iframe
                                    className="map-iframe"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61054.70701051794!2d121.1130487459675!3d16.48008071654067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33905cecd5cbf491%3A0x8d3a1763d6369208!2sBayombong%2C%20Nueva%20Vizcaya!5e0!3m2!1sen!2sph!4v1684321987654!5m2!1sen!2sph"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Restaurant Location"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Media / Contact Section */}
                <section id="social" className="section section-light social-section">
                    <div className="container">
                        <h2 className="social-title">
                            Connect With Us
                        </h2>
                        <p className="social-description">
                            Follow us on social media for the latest updates and promotions!
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <span className="sr-only">Facebook</span>
                                <Facebook size={32} />
                            </a>
                            <a href="#" className="social-link">
                                <span className="sr-only">Instagram</span>
                                <Instagram size={32} />
                            </a>
                            <a href="#" className="social-link">
                                <span className="sr-only">Twitter</span>
                                <Twitter size={32} />
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p className="footer-copyright">&copy; {new Date().getFullYear()} Kahit Saan Restaurant. All Rights Reserved.</p>
                    <p className="footer-location">Nueva Vizcaya, Philippines</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;