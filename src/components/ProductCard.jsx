import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const [qty, setQty] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [compareModal, setCompareModal] = useState(false);
  const [compareList, setCompareList] = useState([]);

  const handleShare = (e) => {
    e.preventDefault();
    const url = `${window.location.origin}/product/${product.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2200);
    });
  };

  const getCompareList = () => JSON.parse(sessionStorage.getItem("compareList") || "[]");

  const handleCompare = (e) => {
    e.preventDefault();
    const list = getCompareList();
    if (!list.find((p) => p.id === product.id)) {
      if (list.length >= 3) {
        alert("You can only compare up to 3 products!");
        return;
      }
      list.push(product);
      sessionStorage.setItem("compareList", JSON.stringify(list));
    }
    setCompareList(list);
    setCompareModal(true);
  };

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleQuickAdd = () => {
    // ✅ loop add qty times ដើម្បីគិត qty ត្រឹមត្រូវ
    for (let i = 0; i < qty; i++) {
      add(product);
    }
    setQuickView(false);
    setQty(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const stars = Math.round(product.rating?.rate || 4);
  const discount = product.price > 50 ? Math.floor(Math.random() * 15) + 5 : null;
  const originalPrice = discount ? (product.price / (1 - discount / 100)).toFixed(2) : null;

  return (
    <>
      <div
        className="product-card"
        style={{
          background: "#fff",
          borderRadius: 16,
          overflow: "hidden",
          border: "1.5px solid #f0e8f5",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Sora', 'Inter', sans-serif",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px)";
          e.currentTarget.style.boxShadow = "0 20px 40px rgba(233,30,140,0.13)";
          e.currentTarget.style.borderColor = "#e91e8c30";
          e.currentTarget.querySelector(".overlay-actions").style.opacity = "1";
          e.currentTarget.querySelector(".overlay-actions").style.transform = "translateY(0)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "#f0e8f5";
          e.currentTarget.querySelector(".overlay-actions").style.opacity = "0";
          e.currentTarget.querySelector(".overlay-actions").style.transform = "translateY(8px)";
        }}
      >
        {/* Badges */}
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 3, display: "flex", flexDirection: "column", gap: 4 }}>
          {discount && (
            <span style={{
              background: "#e91e8c",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 6,
              letterSpacing: "0.5px",
            }}>
              -{discount}%
            </span>
          )}
          {product.rating?.count > 200 && (
            <span style={{
              background: "#0ea5e9",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 6,
            }}>
              HOT
            </span>
          )}
        </div>

        {/* ❤️ Wishlist Button — connected to WishlistContext */}
        <button
          onClick={handleWishlist}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 3,
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "none",
            background: wishlisted ? "#fce4f3" : "rgba(255,255,255,0.9)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: wishlisted
              ? "0 2px 12px rgba(233,30,140,0.3)"
              : "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.2s",
            backdropFilter: "blur(4px)",
            transform: wishlisted ? "scale(1.1)" : "scale(1)",
          }}
        >
          <svg
            width="16"
            height="16"
            fill={wishlisted ? "#e91e8c" : "none"}
            stroke={wishlisted ? "#e91e8c" : "#6b7280"}
            strokeWidth="2"
            viewBox="0 0 24 24"
            style={{
              transition: "all 0.2s",
              filter: wishlisted ? "drop-shadow(0 0 3px rgba(233,30,140,0.4))" : "none",
            }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Product Image */}
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none", display: "block" }}>
          <div
            style={{
              height: 200,
              background: "linear-gradient(135deg, #fdf2f8 0%, #f9f0fb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={imgError ? "https://via.placeholder.com/200x200?text=No+Image" : product.image}
              alt={product.title}
              onError={() => setImgError(true)}
              style={{
                maxHeight: 160,
                maxWidth: "100%",
                objectFit: "contain",
                transition: "transform 0.4s ease",
              }}
              className="product-img"
            />
          </div>
        </Link>

        {/* Overlay Actions (appear on hover) */}
        <div
          className="overlay-actions"
          style={{
            position: "absolute",
            bottom: 150,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 8,
            opacity: 0,
            transform: "translateY(8px)",
            transition: "all 0.25s ease",
            zIndex: 5,
            padding: "0 16px",
          }}
        >
          <button
            onClick={(e) => { e.preventDefault(); setQuickView(true); }}
            title="Quick View"
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: 8,
              border: "1.5px solid transparent",
              background: "rgba(255,255,255,0.95)",
              color: "#3b82f6",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3b82f6";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#3b82f6";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(59,130,246,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.95)";
              e.currentTarget.style.color = "#3b82f6";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.12)";
            }}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Quick View
          </button>
          <Link
            to={`/product/${product.id}`}
            title="View Details"
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1.5px solid transparent",
              background: "rgba(255,255,255,0.95)",
              color: "#3b82f6",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
              backdropFilter: "blur(8px)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3b82f6";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#3b82f6";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(59,130,246,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.95)";
              e.currentTarget.style.color = "#3b82f6";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.12)";
            }}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>
        </div>

        {/* Product Info */}
        <div style={{ padding: "14px 14px 10px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            color: "#e91e8c",
            textTransform: "capitalize",
            letterSpacing: "0.3px",
          }}>
            {product.category}
          </span>

          <h3 style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#111827",
            margin: 0,
            lineHeight: 1.4,
            minHeight: "2.8em", /* ✅ កំណត់ height ថេរ 2 rows */
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {product.title}
          </h3>

          {/* Stars */}
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="11" height="11" fill={i < stars ? "#f59e0b" : "#e5e7eb"} viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
            <span style={{ fontSize: 10, color: "#9ca3af", marginLeft: 2 }}>({product.rating?.count})</span>
          </div>

          {/* Spacer — штовхає ціну вниз */}
          <div style={{ flex: 1 }} />

          {/* Price — 2 rows, separate from Add button */}
          <div style={{ marginTop: 4 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#e91e8c", display: "block" }}>
              ${product.price?.toFixed(2)}
            </span>
            {originalPrice && (
              <span style={{ fontSize: 11, color: "#9ca3af", textDecoration: "line-through" }}>
                ${originalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart button — full width */}
          <button
            onClick={handleAddToCart}
            style={{
              width: "100%",
              padding: "8px 0",
              borderRadius: 9,
              border: "none",
              background: added
                ? "linear-gradient(135deg, #10b981, #059669)"
                : "linear-gradient(135deg, #e91e8c, #c2185b)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: added
                ? "0 4px 12px rgba(16,185,129,0.35)"
                : "0 4px 12px rgba(233,30,140,0.35)",
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
                Added
              </>
            ) : (
              <>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                + Add
              </>
            )}
          </button>
        </div>

        {/* Bottom Actions */}
        <div style={{
          borderTop: "1px solid #f9f0fb",
          padding: "6px 8px",
          display: "flex",
          gap: 4,
          position: "relative",
        }}>
          {/* Share Toast */}
          {shareToast && (
            <div style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#1f2937",
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: 8,
              whiteSpace: "nowrap",
              zIndex: 20,
              animation: "slideUp 0.2s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}>
              ✅ Link copied!
            </div>
          )}

          {/* Share Button */}
          <button
            onClick={handleShare}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              gap: 4, padding: "5px 0", borderRadius: 7, border: "none",
              background: "transparent", color: "#9ca3af", fontSize: 11,
              fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#3b82f6"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; }}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>

          {/* Compare Button */}
          <button
            onClick={handleCompare}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              gap: 4, padding: "5px 0", borderRadius: 7, border: "none",
              background: "transparent", color: "#9ca3af", fontSize: 11,
              fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f0fdf4"; e.currentTarget.style.color = "#16a34a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9ca3af"; }}
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
            </svg>
            Compare
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickView && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            backdropFilter: "blur(4px)",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setQuickView(false); }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              maxWidth: 600,
              width: "100%",
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(0,0,0,0.25)",
              animation: "slideUp 0.25s ease",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{
                width: "42%",
                background: "linear-gradient(135deg, #fdf2f8, #f9f0fb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                minHeight: 260,
              }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ maxHeight: 210, maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
              <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                <button
                  onClick={() => setQuickView(false)}
                  style={{
                    alignSelf: "flex-end",
                    background: "#f3f4f6",
                    border: "none",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                    marginBottom: -4,
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#e91e8c", textTransform: "capitalize" }}>
                  {product.category}
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.4 }}>
                  {product.title}
                </h3>
                <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {product.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="13" height="13" fill={i < stars ? "#f59e0b" : "#e5e7eb"} viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>({product.rating?.count})</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#e91e8c" }}>
                  ${product.price?.toFixed(2)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Qty:</span>
                  <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #f0e8f5", borderRadius: 9, overflow: "hidden" }}>
                    <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 32, height: 32, border: "none", background: "transparent", cursor: "pointer", fontSize: 16, color: "#374151", fontWeight: 600 }}>−</button>
                    <span style={{ width: 28, textAlign: "center", fontSize: 13, fontWeight: 700 }}>{qty}</span>
                    <button onClick={() => setQty(qty + 1)} style={{ width: 32, height: 32, border: "none", background: "transparent", cursor: "pointer", fontSize: 16, color: "#374151", fontWeight: 600 }}>+</button>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={handleQuickAdd}
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      borderRadius: 10,
                      border: "none",
                      background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(233,30,140,0.35)",
                    }}
                  >
                    Add to Cart
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setQuickView(false)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 10,
                      border: "1.5px solid #f0e8f5",
                      color: "#374151",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .product-card:hover .product-img {
          transform: scale(1.06);
        }
        @media (max-width: 640px) {
          .overlay-actions { display: none !important; }
          .product-card { border-radius: 12px !important; }
        }
      `}</style>

      {/* Compare Modal */}
      {compareModal && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
            zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20, backdropFilter: "blur(4px)",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setCompareModal(false); }}
        >
          <div style={{
            background: "#fff", borderRadius: 20, width: "100%",
            maxWidth: 860, maxHeight: "85vh", overflow: "auto",
            boxShadow: "0 30px 80px rgba(0,0,0,0.2)", animation: "slideUp 0.25s ease",
          }}>
            {/* Header */}
            <div style={{
              padding: "20px 24px", borderBottom: "1px solid #f0e8f5",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              position: "sticky", top: 0, background: "#fff", zIndex: 2,
            }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}>
                🔄 Compare Products ({compareList.length})
              </h3>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <button
                  onClick={() => {
                    sessionStorage.removeItem("compareList");
                    setCompareList([]);
                    setCompareModal(false);
                  }}
                  style={{
                    padding: "6px 14px", borderRadius: 8, border: "1px solid #fee2e2",
                    background: "#fef2f2", color: "#ef4444", fontSize: 12,
                    fontWeight: 600, cursor: "pointer",
                  }}
                >
                  Clear All
                </button>
                <button
                  onClick={() => setCompareModal(false)}
                  style={{
                    width: 32, height: 32, borderRadius: "50%", border: "none",
                    background: "#f3f4f6", cursor: "pointer", fontSize: 16,
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280",
                  }}
                >✕</button>
              </div>
            </div>

            {/* Products Grid */}
            <div style={{ padding: 24 }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${compareList.length}, 1fr)`,
                gap: 16,
              }}>
                {compareList.map((p) => (
                  <div key={p.id} style={{ border: "1.5px solid #f0e8f5", borderRadius: 14, overflow: "hidden" }}>
                    {/* Remove btn */}
                    <div style={{ position: "relative" }}>
                      <div style={{
                        background: "linear-gradient(135deg, #fdf2f8, #f9f0fb)",
                        padding: 20, display: "flex", alignItems: "center", justifyContent: "center", height: 160,
                      }}>
                        <img src={p.image} alt={p.title} style={{ maxHeight: 130, maxWidth: "100%", objectFit: "contain" }} />
                      </div>
                      <button
                        onClick={() => {
                          const updated = compareList.filter((x) => x.id !== p.id);
                          sessionStorage.setItem("compareList", JSON.stringify(updated));
                          setCompareList(updated);
                          if (updated.length === 0) setCompareModal(false);
                        }}
                        style={{
                          position: "absolute", top: 8, right: 8, width: 24, height: 24,
                          borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.4)",
                          color: "#fff", fontSize: 12, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >✕</button>
                    </div>

                    {/* Info rows */}
                    {[
                      { label: "Name", value: p.title, clamp: true },
                      { label: "Category", value: p.category },
                      { label: "Price", value: `$${p.price?.toFixed(2)}`, color: "#e91e8c" },
                      { label: "Rating", value: `⭐ ${p.rating?.rate} (${p.rating?.count})` },
                    ].map((row) => (
                      <div key={row.label} style={{ padding: "10px 14px", borderTop: "1px solid #f9f0fb" }}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          {row.label}
                        </div>
                        <div style={{
                          fontSize: 13, fontWeight: 600,
                          color: row.color || "#374151",
                          textTransform: "capitalize",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: row.clamp ? 2 : 1,
                          WebkitBoxOrient: "vertical",
                        }}>
                          {row.value}
                        </div>
                      </div>
                    ))}

                    <div style={{ padding: "12px 14px" }}>
                      <button
                        onClick={() => { add(p); }}
                        style={{
                          width: "100%", padding: "9px 0", borderRadius: 8, border: "none",
                          background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                          color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
                          boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
                        }}
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {compareList.length < 3 && (
                <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 13, marginTop: 16 }}>
                  💡 Click Compare on another product to add (max 3)
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}