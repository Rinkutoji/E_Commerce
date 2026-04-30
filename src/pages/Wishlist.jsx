import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { add } = useCart(); // ✅ fix: add មិនមែន addToCart

  if (wishlist.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "120px 24px", fontFamily: "'Sora', sans-serif" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🤍</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#374151", marginBottom: 8 }}>
          Your wishlist is empty!
        </h2>
        <p style={{ color: "#9ca3af", marginBottom: 24 }}>Add the items you like!</p>
        <Link
          to="/shop"
          style={{
            padding: "10px 24px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #e91e8c, #c2185b)",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 40px", fontFamily: "'Sora', sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#374151", marginBottom: 24 }}>
        ❤️ My Wishlist ({wishlist.length})
      </h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 20,
      }}>
        {wishlist.map((product) => (
          <WishlistCard
            key={product.id}
            product={product}
            onAdd={() => add(product)}
            onRemove={() => removeFromWishlist(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

function WishlistCard({ product, onAdd, onRemove }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const stars = Math.round(product.rating?.rate || 4);

  return (
    <div
      style={{
        border: "1px solid #f3e8f0",
        borderRadius: 14,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(233,30,140,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      }}
    >
      {/* Image */}
      <Link to={`/product/${product.id}`} style={{ display: "block", textDecoration: "none" }}>
        <div style={{
          height: 200,
          background: "linear-gradient(135deg, #fdf2f8, #f9f0fb)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxHeight: 168, maxWidth: "100%", objectFit: "contain", transition: "transform 0.3s" }}
          />
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: "#e91e8c", textTransform: "capitalize" }}>
          {product.category}
        </span>

        {/* Title — fixed 2 rows height ✅ */}
        <p style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#374151",
          margin: 0,
          lineHeight: 1.4,
          minHeight: "2.8em",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {product.title}
        </p>

        {/* Stars */}
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="11" height="11" fill={i < stars ? "#f59e0b" : "#e5e7eb"} viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span style={{ fontSize: 10, color: "#9ca3af", marginLeft: 2 }}>({product.rating?.count})</span>
        </div>

        {/* Spacer — штовхає button ចុះក្រោម ✅ */}
        <div style={{ flex: 1 }} />

        <p style={{ fontSize: 15, fontWeight: 800, color: "#e91e8c", margin: 0 }}>
          ${product.price?.toFixed(2)}
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button
            onClick={handleAdd}
            style={{
              flex: 1,
              padding: "9px 0",
              borderRadius: 8,
              border: "none",
              background: added
                ? "linear-gradient(135deg, #10b981, #059669)"
                : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: added
                ? "0 4px 12px rgba(16,185,129,0.3)"
                : "0 4px 12px rgba(59,130,246,0.3)",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {added ? (
              <>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Add to Cart
              </>
            )}
          </button>

          <button
            onClick={onRemove}
            title="Remove from Wishlist"
            style={{
              padding: "9px 11px",
              borderRadius: 8,
              border: "1.5px solid #f3e8f0",
              background: "#fff",
              color: "#e91e8c",
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fce4f3";
              e.currentTarget.style.borderColor = "#e91e8c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.borderColor = "#f3e8f0";
            }}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}