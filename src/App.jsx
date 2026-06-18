import { useState, useEffect, useRef } from "react";
import { BRAND, WHY, PRODUCTS, BENEFITS, TESTIMONIALS, FAQS, INSTA_TILES } from "./data";

/* ---------- small hooks ---------- */
function useScrolled(threshold = 30) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function Reveal({ children, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- nav ---------- */
const NAV_LINKS = [
  { label: "Why Us", href: "#why" },
  { label: "Products", href: "#products" },
  { label: "Benefits", href: "#benefits" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap nav-inner">
          <a href="#top" className="logo" onClick={close}>
            <span className="logo-mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 13 q7 -9 14 0 q-7 9 -14 0Z" fill="#F8F3EA"/><circle cx="12" cy="13" r="3" fill="#5FBF4A"/></svg>
            </span>
            Mek<b>Bites</b>
          </a>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary nav-cta">Shop Now</a>
          <button className="nav-toggle" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <a href="#contact" className="btn btn-primary" onClick={close}>Shop Now</a>
      </div>
    </>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bg-blob blob-1" />
      <div className="hero-bg-blob blob-2" />
      <div className="wrap hero-grid">
        <div>
          <div className="hero-pill"><em>NEW</em> Roasted, never fried 🔥</div>
          <h1 className="display">
            Healthy <span className="hl">Crunch</span><br />in Every Bite
          </h1>
          <p className="hero-sub">
            Premium Makhana crafted for taste, nutrition, and everyday snacking — guilt-free goodness the whole family will love.
          </p>
          <div className="hero-btns">
            <a href="#products" className="btn btn-primary">Shop Now →</a>
            <a href="#contact" className="btn btn-ghost">Contact Us</a>
          </div>
          <div className="hero-stats">
            <div className="st"><b>6</b><span>Bold Flavours</span></div>
            <div className="st"><b>0%</b><span>Deep Fried</span></div>
            <div className="st"><b>100%</b><span>Guilt-Free</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-jar">
            <span className="lid" />
            <span className="nut-emoji">🥣</span>
            <h3>MekBites</h3>
            <p>Modern Day Snacking</p>
          </div>
          <div className="float-chip fc-1"><span className="ic" style={{ background: "rgba(95,191,74,.15)" }}>💪</span> High Protein</div>
          <div className="float-chip fc-2"><span className="ic" style={{ background: "rgba(255,90,54,.15)" }}>🔥</span> Roasted</div>
          <div className="float-chip fc-3"><span className="ic" style={{ background: "rgba(0,123,127,.15)" }}>🍃</span> Low Calorie</div>
        </div>
      </div>
    </header>
  );
}

/* ---------- marquee ---------- */
function Marquee() {
  const items = ["Roasted Not Fried", "High Protein", "Rich in Fiber", "Low Calorie", "Premium Quality", "Gluten-Free", "Guilt-Free Snacking"];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{items.map((t, i) => <span key={i}>{t}</span>)}</span>
        <span>{items.map((t, i) => <span key={"b" + i}>{t}</span>)}</span>
      </div>
    </div>
  );
}

/* ---------- why ---------- */
function Why() {
  return (
    <section className="section why" id="why">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Why MekBites</span>
          <h2 className="display">Snacking that loves you back</h2>
          <p>We sweat the small stuff so every handful delivers crunch, nutrition and joy — without compromise.</p>
        </Reveal>
        <div className="why-grid">
          {WHY.map((w, i) => (
            <Reveal key={w.title} className="why-card" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="ic" style={{ background: w.bg + "22", color: w.bg }}>{w.icon}</span>
              <h3 className="display">{w.title}</h3>
              <p>{w.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- products ---------- */
function Products({ onEnquire }) {
  return (
    <section className="section products" id="products">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Our Products</span>
          <h2 className="display">Six ways to crunch</h2>
          <p>From pure raw fox nuts to bold roasted flavours — pick your craving.</p>
        </Reveal>
        <div className="prod-grid">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} className="prod-card" style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="prod-top" style={{ background: p.grad }}>
                <span className="prod-tag">{p.tag}</span>
                <span className="emoji">{p.emoji}</span>
              </div>
              <div className="prod-body">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="prod-foot">
                  <span className="size">{p.size}</span>
                  <button onClick={() => onEnquire(p.name)}>Enquire →</button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- benefits ---------- */
function Benefits() {
  return (
    <section className="section benefits" id="benefits">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Benefits of Makhana</span>
          <h2 className="display">Tiny seed, mighty goodness</h2>
          <p>Behind every crunch is a snack that's been nourishing India for centuries.</p>
        </Reveal>
        <div className="ben-grid">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} className="ben-item" style={{ transitionDelay: `${i * 50}ms` }}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h4 className="display">{b.title}</h4>
                <p>{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- about ---------- */
function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap about-grid">
        <Reveal className="about-visual" aria-hidden="true">
          <span className="ring a" />
          <span className="ring b" />
          <span className="big-nut">🥣</span>
        </Reveal>
        <Reveal className="about-text">
          <span className="eyebrow">About MekBites</span>
          <h2 className="display">Healthy snacking should never be boring</h2>
          <p>
            At MekBites, we believe snacking and wellness belong together. We carefully select premium-quality makhana
            and craft delicious flavours that combine nutrition with exceptional taste.
          </p>
          <p>
            Every bite is designed to deliver crunch, satisfaction and goodness — a modern snack built for real, everyday life.
          </p>
          <p className="sig">— Crafted with care, for the way you snack today.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */
function Testimonials() {
  return (
    <section className="section testi">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Loved by Snackers</span>
          <h2 className="display">Don't just take our word</h2>
          <p>Real people, real cravings, real reviews from across India.</p>
        </Reveal>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} className="testi-card" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="quote">&ldquo;</div>
              <div className="stars">★★★★★</div>
              <p className="body">{t.text}</p>
              <div className="testi-who">
                <span className="av" style={{ background: t.avBg }}>{t.av}</span>
                <div><b>{t.name}</b><span>{t.role}</span></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- instagram ---------- */
function Instagram() {
  return (
    <section className="section insta">
      <div className="wrap">
        <Reveal className="insta-head">
          <span className="eyebrow" style={{ justifyContent: "center" }}>On Instagram</span>
          <h2 className="display">Follow the crunch</h2>
          <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer">@{BRAND.instagram}</a>
        </Reveal>
        <Reveal className="insta-grid">
          {INSTA_TILES.map((t, i) => (
            <a key={i} href={BRAND.instagramUrl} target="_blank" rel="noreferrer" className="insta-cell" style={{ background: t.bg }}>
              {t.e}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */
function Contact({ prefill, clearPrefill }) {
  const [form, setForm] = useState({ name: "", email: "", product: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (prefill) {
      setForm((f) => ({ ...f, product: prefill, message: `Hi MekBites, I'd love to know more about ${prefill}.` }));
      setSent(false);
    }
  }, [prefill]);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = () => {
    if (!form.name || !form.email) return;
    setSent(true);
    if (clearPrefill) clearPrefill();
  };

  const waText = encodeURIComponent("Hi MekBites! I'd like to enquire about your makhana snacks.");

  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-grid">
        <Reveal className="contact-info">
          <span className="eyebrow">Get in Touch</span>
          <h2 className="display">Let's talk snacks</h2>
          <p>Questions, bulk orders or just want to say hi? We'd love to hear from you.</p>
          <div className="contact-rows">
            <a className="c-row" href={`tel:${BRAND.phoneRaw}`}>
              <span className="ic" style={{ background: "var(--orange)" }}>📞</span>
              <div><span>Call us</span><b>{BRAND.phone}</b></div>
            </a>
            <a className="c-row" href={`mailto:${BRAND.email}`}>
              <span className="ic" style={{ background: "var(--teal)" }}>✉️</span>
              <div><span>Email</span><b>{BRAND.email}</b></div>
            </a>
            <a className="c-row" href={BRAND.instagramUrl} target="_blank" rel="noreferrer">
              <span className="ic" style={{ background: "var(--green)" }}>📸</span>
              <div><span>Instagram</span><b>@{BRAND.instagram}</b></div>
            </a>
          </div>
          <div className="c-actions">
            <a className="btn btn-teal" href={`https://wa.me/${BRAND.phoneRaw}?text=${waText}`} target="_blank" rel="noreferrer">💬 WhatsApp</a>
            <a className="btn btn-ghost" href={`tel:${BRAND.phoneRaw}`}>📞 Call Now</a>
          </div>
        </Reveal>

        <Reveal className="contact-form">
          <h3>Product Enquiry</h3>
          <p>Drop your details and we'll get back within 24 hours.</p>
          {sent && <div className="form-success">✓ Thanks! Your enquiry is in. We'll reach out soon.</div>}
          <div className="field">
            <label htmlFor="cf-name">Your name</label>
            <input id="cf-name" type="text" placeholder="Your full name" value={form.name} onChange={update("name")} />
          </div>
          <div className="field">
            <label htmlFor="cf-email">Email</label>
            <input id="cf-email" type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} />
          </div>
          <div className="field">
            <label htmlFor="cf-product">Interested in</label>
            <select id="cf-product" value={form.product} onChange={update("product")}>
              <option value="">Select a product…</option>
              {PRODUCTS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
              <option value="Bulk / Wholesale">Bulk / Wholesale</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="cf-msg">Message</label>
            <textarea id="cf-msg" placeholder="Tell us what you're looking for…" value={form.message} onChange={update("message")} />
          </div>
          <button className="btn btn-primary" style={{ width: "100%" }} onClick={submit}>Send Enquiry</button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- faq ---------- */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="wrap">
        <Reveal className="section-head" style={{ margin: "0 auto 48px", textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Good to Know</span>
          <h2 className="display">Frequently asked</h2>
        </Reveal>
        <div className="faq-grid">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                {f.q}<span className="plus">+</span>
              </button>
              <div className="faq-a" style={{ maxHeight: open === i ? "240px" : "0" }}>
                <p>{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- newsletter ---------- */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="section news">
      <div className="wrap">
        <Reveal>
          <h2>Get 10% off your first crunch</h2>
          <p>Join the MekBites club for fresh flavour drops, snack tips and members-only offers.</p>
          {done ? (
            <div className="news-thanks">🎉 You're in! Check your inbox for the good stuff.</div>
          ) : (
            <div className="news-form">
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button onClick={() => email && setDone(true)}>Subscribe</button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a href="#top" className="logo">
              <span className="logo-mark" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 13 q7 -9 14 0 q-7 9 -14 0Z" fill="#F8F3EA"/><circle cx="12" cy="13" r="3" fill="#5FBF4A"/></svg>
              </span>
              Mek<b style={{ color: "var(--orange)" }}>Bites</b>
            </a>
            <p className="footer-about">Premium Indian makhana, roasted not fried. Modern day snacking for taste, nutrition and everyday goodness.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <div className="footer-links">
              <a href="#top">Home</a>
              <a href="#products">Products</a>
              <a href="#about">About Us</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <div>
            <h4>Connect</h4>
            <div className="footer-links">
              <a href={BRAND.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
              <a href={`https://wa.me/${BRAND.phoneRaw}`} target="_blank" rel="noreferrer">WhatsApp</a>
              <a href={`mailto:${BRAND.email}`}>Email</a>
              <a href={`tel:${BRAND.phoneRaw}`}>Call</a>
            </div>
          </div>
          <div>
            <h4>Legal</h4>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MekBites. All rights reserved.</span>
          <span>Made with crunch in Pune, India 🇮🇳</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- whatsapp float ---------- */
function WhatsAppFloat() {
  const text = encodeURIComponent("Hi MekBites! I'd like to know more about your snacks.");
  return (
    <a className="wa-float" href={`https://wa.me/${BRAND.phoneRaw}?text=${text}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <span className="pulse" />
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.12c-.24.68-1.42 1.32-1.95 1.36-.5.04-.5.4-3.16-.66-2.66-1.06-4.32-3.78-4.45-3.95-.13-.17-1.06-1.41-1.06-2.69 0-1.28.67-1.91.91-2.17.24-.26.52-.33.69-.33.17 0 .35 0 .5.01.16.01.38-.06.59.45.24.59.81 2.03.88 2.18.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.13-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.25.09 1.58.75 1.85.89.27.13.45.2.52.31.07.11.07.65-.17 1.33Z"/></svg>
    </a>
  );
}

/* ---------- app ---------- */
export default function App() {
  const [prefill, setPrefill] = useState("");
  const handleEnquire = (name) => {
    setPrefill(name);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Why />
      <Products onEnquire={handleEnquire} />
      <Benefits />
      <About />
      <Testimonials />
      <Instagram />
      <Contact prefill={prefill} clearPrefill={() => setPrefill("")} />
      <Faq />
      <Newsletter />
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
