import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productsService";

const features = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#e91e8c" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Free Shipping",
    desc: "On all orders over $50. Delivered fast to your door.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#e91e8c" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="7.5 4.21 12 6.81 16.5 4.21" /><polyline points="7.5 19.79 7.5 14.6 3 12" /><polyline points="21 12 16.5 14.6 16.5 19.79" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Quality Products",
    desc: "Curated selection of top-quality products from trusted brands.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#e91e8c" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M1 4h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      </svg>
    ),
    title: "Easy Returns",
    desc: "30-day hassle-free returns. No questions asked.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="#e91e8c" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Secure Payment",
    desc: "Your payment info is always safe and encrypted.",
  },
];

const categories = [
  { name: "Electronics", emoji: "💻", color: "#dbeafe", accent: "#3b82f6", query: "electronics" },
  { name: "Clothing", emoji: "👗", color: "#fce7f3", accent: "#e91e8c", query: "women's clothing" },
  { name: "Jewelery", emoji: "💎", color: "#fef3c7", accent: "#d97706", query: "jewelery" },
  { name: "Men's", emoji: "👔", color: "#dcfce7", accent: "#16a34a", query: "men's clothing" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.slice(0, 8));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ fontFamily: "'Sora', 'Inter', sans-serif", paddingTop: 64 }}>

      {/* Hero Section */}
      <section
        style={{
          minHeight: "88vh",
          background: "linear-gradient(135deg, #fff0f7 0%, #fdf4ff 50%, #f0f9ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "60px 24px",
        }}
      >
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: -100, right: -100, width: 400, height: 400,
          background: "radial-gradient(circle, rgba(233,30,140,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: -80, width: 350, height: 350,
          background: "radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", top: "30%", left: "10%", width: 200, height: 200,
          background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />

        <div style={{ maxWidth: 700, textAlign: "center", position: "relative", zIndex: 2 }}>
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
            marginBottom: 24,
            letterSpacing: "0.3px",
          }}>
            ✨ New Arrivals Every Week
          </div>

          <h1 style={{
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 900,
            color: "#0f172a",
            lineHeight: 1.1,
            margin: "0 0 20px",
            letterSpacing: "-2px",
          }}>
            Shop The{" "}
            <span style={{
              background: "linear-gradient(135deg, #e91e8c 0%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Latest Trends
            </span>
          </h1>

          <p style={{
            fontSize: 18,
            color: "#64748b",
            lineHeight: 1.7,
            margin: "0 0 40px",
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Quality products at great prices. Discover thousands of curated items from top brands — delivered to your door.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/shop"
              style={{
                padding: "15px 36px",
                borderRadius: 14,
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                boxShadow: "0 8px 30px rgba(233,30,140,0.4)",
                transition: "all 0.25s",
                letterSpacing: "0.2px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 40px rgba(233,30,140,0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 8px 30px rgba(233,30,140,0.4)";
              }}
            >
              Shop Now →
            </Link>
            <Link
              to="/about"
              style={{
                padding: "15px 36px",
                borderRadius: 14,
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
                color: "#374151",
                background: "rgba(255,255,255,0.9)",
                border: "1.5px solid #e5e7eb",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#e91e8c";
                e.target.style.color = "#e91e8c";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.color = "#374151";
              }}
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex",
            gap: 40,
            justifyContent: "center",
            marginTop: 56,
            paddingTop: 40,
            borderTop: "1px solid rgba(0,0,0,0.06)",
            flexWrap: "wrap",
          }}>
            {[
              { value: "10K+", label: "Products" },
              { value: "50K+", label: "Customers" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", letterSpacing: "-1px" }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500, marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "72px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
          }}>
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  padding: 28,
                  borderRadius: 16,
                  border: "1.5px solid #f0e8f5",
                  background: "#fff",
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
                  width: 54,
                  height: 54,
                  background: "#fdf2f8",
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1f2937", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: "60px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", margin: "0 0 10px", letterSpacing: "-0.5px" }}>
              Shop by Category
            </h2>
            <p style={{ fontSize: 14, color: "#94a3b8" }}>Find what you're looking for faster</p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/shop?category=${encodeURIComponent(cat.query)}`}
                style={{
                  padding: "28px 20px",
                  borderRadius: 16,
                  border: `1.5px solid ${cat.color}`,
                  background: cat.color,
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "all 0.25s",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 12px 30px ${cat.accent}25`;
                  e.currentTarget.style.borderColor = cat.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = cat.color;
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>{cat.emoji}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: cat.accent }}>{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "72px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-0.5px" }}>
                Featured Products
              </h2>
              <p style={{ fontSize: 14, color: "#94a3b8", margin: 0 }}>Hand-picked top picks just for you</p>
            </div>
            <Link
              to="/shop"
              style={{
                padding: "10px 24px",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 700,
                color: "#e91e8c",
                border: "1.5px solid #e91e8c",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#e91e8c";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#e91e8c";
              }}
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ height: 340, borderRadius: 16, background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        margin: "0 24px 72px",
        maxWidth: 1100,
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
          position: "absolute", top: -40, right: -40, width: 200, height: 200,
          background: "rgba(255,255,255,0.07)", borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: -60, left: -60, width: 260, height: 260,
          background: "rgba(255,255,255,0.05)", borderRadius: "50%",
        }} />
        <h2 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.5px", position: "relative" }}>
          Get 20% Off Your First Order
        </h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", margin: "0 0 32px", position: "relative" }}>
          Sign up today and unlock exclusive deals, early access to sales & more.
        </p>
        <Link
          to="/register"
          style={{
            padding: "14px 36px",
            borderRadius: 12,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 700,
            color: "#e91e8c",
            background: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            transition: "all 0.2s",
            position: "relative",
          }}
          onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; }}
        >
          Create Free Account →
        </Link>
      </section>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}