import './Footer.css';

export const Footer = () => {
    return (
        <footer className="Footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>About us</h3>
                        <p>We offer quality products at affordable prices</p>
                    </div>
                    <div className="footer-section">
                        <h3>Contact</h3>
                        <p>Email: info@shop.com</p>
                        <p>Phone: +7 (999) 123-45-67</p>
                    </div>
                    <div className="footer-section">
                        <h3>Follow us</h3>
                        <div className="social-links">
                            <a href="#" className="social-link">VK</a>
                            <a href="#" className="social-link">Telegram</a>
                            <a href="#" className="social-link">WhatsApp</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 ShopProject. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

