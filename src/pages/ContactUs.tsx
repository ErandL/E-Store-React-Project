import Header from "./header";
import Footer from "./footer";
import "../assets/contactUs.css";

export default function ContactUs() {
    return (
        <>
            <Header />
            <main className="contact-us-container">
                <section className="contact-us-content">
                    <h2>Contact Us</h2>
                    <p>
                        We'd love to hear from you! For any questions, suggestions, or partnership inquiries, reach out to us at:
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:erand.tik@gmail.com">erand.tik@gmail.com</a>
                    </p>

                    <div className="newsletter-box">
                        <h3>Subscribe to Our Newsletter</h3>
                        <p>Stay updated with the latest products and offers from E Store.</p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Subscribed!");
                            }}
                            className="newsletter-form"
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
