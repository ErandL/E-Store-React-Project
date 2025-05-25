import Header from "./header";
import Footer from "./footer";
import "../assets/aboutUs.css";

export default function AboutUs() {
    return (
        <>
            <Header />
            <main className="about-us-container">
                <section className="about-us-content">
                    <h2>About Us</h2>
                    <p>
                        Welcome to <strong>E Store</strong> – your one-stop destination for all things electronics. From mobile phones and televisions to audio systems and cutting-edge tech, we bring you the latest in innovation and quality.
                    </p>
                    <p>
                        I'm <strong>Erand Lika</strong>, the developer behind E Store. I specialize in modern web development using technologies like <strong>React</strong>, <strong>Next.js</strong>, <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong>, and <strong>Shopify</strong>. I'm also learning <strong>Salesforce</strong> to expand our  capabilities.
                    </p>
                </section>
            </main>
            <Footer />
        </>
    );
}
