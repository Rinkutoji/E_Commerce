// src/pages/About.jsx
import { Link } from "react-router-dom";

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "30+", label: "Countries" },
  { value: "5+", label: "Years" },
];

const values = [
  {
    emoji: "🏆",
    title: "Quality First",
    desc: "Every product is hand-picked to meet our high standards.",
  },
  {
    emoji: "💚",
    title: "Sustainability",
    desc: "Eco-friendly packaging and responsible sourcing always.",
  },
  {
    emoji: "🤝",
    title: "Customer Trust",
    desc: "Transparency and honesty are at the heart of what we do.",
  },
];

const team = [
  { name: "Alex Johnson", role: "Founder & CEO", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Sarah Williams", role: "Head of Design", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Michael Chen", role: "Lead Developer", img: "https://randomuser.me/api/portraits/men/56.jpg" },
  { name: "Emily Davis", role: "Customer Success", img: "https://randomuser.me/api/portraits/women/68.jpg" },
];

export default function About() {
  return (
    <div style={{ fontFamily: "'Sora', 'Inter', sans-serif", paddingTop: 64, background: "#fff" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #fff0f7 0%, #fdf4ff 50%, #f0f9ff 100%)",
        padding: "80px 24px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(233,30,140,0.08)",
            border: "1px solid rgba(233,30,140,0.18)",
            borderRadius: 100,
            padding: "6px 16px",
            fontSize: 12,
            fontWeight: 600,
            color: "#e91e8c",
            marginBottom: 20,
          }}>
            ✨ Our Story
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 6vw, 52px)",
            fontWeight: 900,
            color: "#0f172a",
            margin: "0 0 16px",
            letterSpacing: "-1px",
            lineHeight: 1.15,
          }}>
            We're Building the{" "}
            <span style={{
              background: "linear-gradient(135deg, #e91e8c 0%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Future of Shopping
            </span>
          </h1>
          <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.7, margin: 0 }}>
            Founded with a simple mission — make quality products accessible to everyone,
            everywhere. We've grown into a platform trusted by thousands.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: "56px 24px", background: "#fff", borderBottom: "1px solid #f3e8f0" }}>
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 24,
          textAlign: "center",
        }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 38, fontWeight: 900, color: "#e91e8c", letterSpacing: "-1px" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section style={{ padding: "72px 24px", background: "#fafafa" }}>
        <div style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 48,
          alignItems: "center",
        }}>
          <div>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#0f172a", margin: "0 0 16px", letterSpacing: "-0.5px" }}>
              How We Started
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.8, margin: "0 0 14px" }}>
              In 2019, we started as a small team with a big dream: bring the best products
              from trusted brands directly to customers — at fair prices, with zero compromise on quality.
            </p>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.8, margin: "0 0 14px" }}>
              Today we ship to over 30 countries, offer 500+ products, and have served
              more than 10,000 happy customers. But our values have never changed.
            </p>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.8, margin: 0 }}>
              We believe great shopping should be easy, enjoyable, and trustworthy — every single time.
            </p>
          </div>
          <div style={{
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(233,30,140,0.10)",
            border: "1.5px solid #f3e8f0",
          }}>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&auto=format&fit=crop"
              alt="Our team"
              style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "72px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
              What We Stand For
            </h2>
            <p style={{ fontSize: 14, color: "#94a3b8" }}>Our core values guide everything we do</p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}>
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  padding: 28,
                  borderRadius: 16,
                  border: "1.5px solid #f0e8f5",
                  background: "#fff",
                  textAlign: "center",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#e91e8c30";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(233,30,140,0.10)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#f0e8f5";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  background: "#fdf2f8",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  margin: "0 auto 16px",
                }}>
                  {v.emoji}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1f2937", margin: "0 0 8px" }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "72px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
              Meet the Team
            </h2>
            <p style={{ fontSize: 14, color: "#94a3b8" }}>The people behind ShopNow</p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
          }}>
            {team.map((m) => (
              <div
                key={m.name}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1.5px solid #f0e8f5",
                  padding: "28px 20px",
                  textAlign: "center",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(233,30,140,0.10)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#e91e8c30";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#f0e8f5";
                }}
              >
                <img
                  src={m.img}
                  alt={m.name}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: 14,
                    border: "3px solid #fce4f3",
                  }}
                />
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1f2937" }}>{m.name}</div>
                <div style={{ fontSize: 12, color: "#e91e8c", fontWeight: 600, marginTop: 4 }}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        margin: "0 24px 72px",
        maxWidth: 1000,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 24,
        background: "linear-gradient(135deg, #e91e8c 0%, #9333ea 100%)",
        padding: "60px 48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 200, height: 200,
          background: "rgba(255,255,255,0.07)", borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: -60, left: -60,
          width: 260, height: 260,
          background: "rgba(255,255,255,0.05)", borderRadius: "50%",
        }} />
        <h2 style={{
          fontSize: 28, fontWeight: 900, color: "#fff",
          margin: "0 0 12px", letterSpacing: "-0.5px", position: "relative",
        }}>
          Ready to Start Shopping?
        </h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", margin: "0 0 28px", position: "relative" }}>
          Discover our curated collection backed by our satisfaction guarantee.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
          <Link
            to="/shop"
            style={{
              padding: "13px 32px",
              borderRadius: 12,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
              color: "#e91e8c",
              background: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; }}
          >
            Browse Shop →
          </Link>
          <Link
            to="/contact"
            style={{
              padding: "13px 32px",
              borderRadius: 12,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              background: "rgba(255,255,255,0.15)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.25)"; }}
            onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.15)"; }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}