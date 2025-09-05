import './Footer.css';

export const Footer = () => {
    return (
        <footer className="Footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>О нас</h3>
                        <p>Мы предлагаем качественные товары по доступным ценам</p>
                    </div>
                    <div className="footer-section">
                        <h3>Контакты</h3>
                        <p>Email: info@shop.com</p>
                        <p>Телефон: +7 (999) 123-45-67</p>
                    </div>
                    <div className="footer-section">
                        <h3>Следите за нами</h3>
                        <div className="social-links">
                            <a href="#" className="social-link">VK</a>
                            <a href="#" className="social-link">Telegram</a>
                            <a href="#" className="social-link">WhatsApp</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 ShopProject. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};

