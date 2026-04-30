import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import FullLogo from "../assets/FullLogo.png";

export default function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [heartBounce, setHeartBounce] = useState(false);

  const totalItems = (items || []).reduce((sum, item) => sum + item.qty, 0);
  const totalWishlist = wishlist.length;

  // Trigger heart bounce animation when wishlist count changes
  useEffect(() => {
    if (totalWishlist > 0) {
      setHeartBounce(true);
      const t = setTimeout(() => setHeartBounce(false), 400);
      return () => clearTimeout(t);
    }
  }, [totalWishlist]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 2px 24px rgba(220,38,127,0.10)" : "0 1px 0 #f3e8f0",
        transition: "all 0.3s ease",
        fontFamily: "'Sora', 'Inter', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src={FullLogo}
            alt="ShopNow"
            style={{
              height: 40,
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: isActive(link.path) ? 700 : 500,
                color: isActive(link.path) ? "#e91e8c" : "#374151",
                background: isActive(link.path) ? "#fce4f3" : "transparent",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.background = "#fdf2f8";
                  e.target.style.color = "#e91e8c";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#374151";
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

          {/* ❤️ Wishlist Heart Icon */}
          <Link
            to="/wishlist"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 10,
              border: totalWishlist > 0 ? "1.5px solid #fca5c7" : "1.5px solid #f3e8f0",
              textDecoration: "none",
              color: totalWishlist > 0 ? "#e91e8c" : "#374151",
              background: totalWishlist > 0 ? "#fff0f7" : "#fff",
              transition: "all 0.2s",
              transform: heartBounce ? "scale(1.2)" : "scale(1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#e91e8c";
              e.currentTarget.style.color = "#e91e8c";
              e.currentTarget.style.background = "#fff0f7";
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = totalWishlist > 0 ? "#fca5c7" : "#f3e8f0";
              e.currentTarget.style.color = totalWishlist > 0 ? "#e91e8c" : "#374151";
              e.currentTarget.style.background = totalWishlist > 0 ? "#fff0f7" : "#fff";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {/* Heart SVG — filled when there are items */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={totalWishlist > 0 ? "#e91e8c" : "none"}
              stroke={totalWishlist > 0 ? "#e91e8c" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition: "all 0.3s ease",
                filter: totalWishlist > 0 ? "drop-shadow(0 0 4px rgba(233,30,140,0.4))" : "none",
              }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>

            {/* Badge counter */}
            {totalWishlist > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #fff",
                  boxShadow: "0 2px 8px rgba(233,30,140,0.4)",
                  animation: heartBounce ? "badgePop 0.4s ease" : "none",
                }}
              >
                {totalWishlist > 99 ? "99+" : totalWishlist}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 10,
              border: "1.5px solid #f3e8f0",
              textDecoration: "none",
              color: "#374151",
              background: "#fff",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#e91e8c";
              e.currentTarget.style.color = "#e91e8c";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#f3e8f0";
              e.currentTarget.style.color = "#374151";
            }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  background: "#e91e8c",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #fff",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 10,
                  border: "1.5px solid #f3e8f0",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #e91e8c, #c2185b)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {user.username?.[0]?.toUpperCase() || "U"}
                </div>
                {user.username}
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    border: "1px solid #f3e8f0",
                    minWidth: 160,
                    padding: 6,
                    zIndex: 100,
                  }}
                >
                  {[
                    { label: "My Profile", path: "/profile" },
                    { label: "My Cart", path: "/cart" },
                    { label: "Wishlist", path: "/wishlist" },
                    { label: "Orders", path: "/orders" },
                  ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        display: "block",
                        padding: "9px 12px",
                        borderRadius: 8,
                        textDecoration: "none",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#374151",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#fdf2f8";
                        e.target.style.color = "#e91e8c";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.color = "#374151";
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div style={{ borderTop: "1px solid #f3e8f0", margin: "4px 0" }} />
                  <button
                    onClick={() => { logout(); setDropdownOpen(false); }}
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      borderRadius: 8,
                      border: "none",
                      background: "transparent",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#e91e8c",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { e.target.style.background = "#fce4f3"; }}
                    onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              style={{
                padding: "9px 20px",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                background: "linear-gradient(135deg, #e91e8c 0%, #c2185b 100%)",
                boxShadow: "0 4px 14px rgba(233,30,140,0.35)",
                transition: "all 0.2s",
                letterSpacing: "0.2px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 6px 20px rgba(233,30,140,0.45)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 14px rgba(233,30,140,0.35)";
              }}
            >
              Login
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile-btn"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              border: "1.5px solid #f3e8f0",
              borderRadius: 10,
              background: "#fff",
              cursor: "pointer",
              color: "#374151",
            }}
          >
            {menuOpen ? (
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid #f3e8f0",
            padding: "12px 24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
          className="nav-mobile-menu"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: isActive(link.path) ? 700 : 500,
                color: isActive(link.path) ? "#e91e8c" : "#374151",
                background: isActive(link.path) ? "#fce4f3" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
          {/* Wishlist link in mobile menu */}
          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              color: "#e91e8c",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ❤️ Wishlist
            {totalWishlist > 0 && (
              <span
                style={{
                  background: "#e91e8c",
                  color: "#fff",
                  borderRadius: 99,
                  padding: "1px 7px",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {totalWishlist}
              </span>
            )}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @keyframes badgePop {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
      `}</style>
    </nav>
  );
}