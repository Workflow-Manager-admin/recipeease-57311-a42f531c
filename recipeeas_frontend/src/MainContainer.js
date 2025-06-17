import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * MainContainer – Main layout for RecipeEase
 * Features:
 *   - Sidebar with navigation (Browse, Search, Profile, Auth)
 *   - Responsive layout with sidebar drawer for mobile
 *   - Main content area with placeholder regions for features
 *   - Light modern theme; uses RecipeEase brand colors
 * Usage: import and render as the root container in App.js
 */
function MainContainer() {
  // State for sidebar in mobile view
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Active section (can be 'browse', 'search', 'profile', 'auth')
  const [activeSection, setActiveSection] = useState("browse");

  // Sidebar navigation items
  const navItems = [
    { key: "browse", label: "Browse Recipes", icon: "🥗" },
    { key: "search", label: "Search", icon: "🔍" },
    { key: "profile", label: "Profile", icon: "👤" },
    { key: "auth", label: "Sign In/Up", icon: "🔐" },
  ];

  // Main content region switcher
  function renderMainContent() {
    switch (activeSection) {
      case "browse":
        return <div className="content-placeholder">[Recipe List Placeholder]</div>;
      case "search":
        return <div className="content-placeholder">[Search Component Placeholder]</div>;
      case "profile":
        return <div className="content-placeholder">[User Profile Placeholder]</div>;
      case "auth":
        return <div className="content-placeholder">[Authentication Placeholder]</div>;
      default:
        return <div className="content-placeholder">[Welcome to RecipeEase]</div>;
    }
  }

  return (
    <div className="re-main-container">
      {/* Sidebar – collapsible on small screens */}
      <aside
        className={`re-sidebar${sidebarOpen ? " open" : ""}`}
        aria-label="Main navigation"
      >
        <div className="re-logo">
          <span className="re-logo-symbol">🍳</span>
          <span className="re-logo-text">RecipeEase</span>
        </div>
        <nav>
          <ul className="re-nav-list">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  className={`re-nav-btn${activeSection === item.key ? " active" : ""}`}
                  onClick={() => {
                    setActiveSection(item.key);
                    setSidebarOpen(false);
                  }}
                  aria-current={activeSection === item.key ? "page" : undefined}
                >
                  <span className="re-nav-icon">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="re-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}
      {/* Layout topbar for mobile: Hamburger menu */}
      <header className="re-header">
        <button
          className="re-menu-btn"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Open navigation"
        >
          <span />
          <span />
          <span />
        </button>
        <span className="re-header-title">{navItems.find(n => n.key === activeSection)?.label || "RecipeEase"}</span>
      </header>
      {/* Main Content */}
      <main className="re-main-content">
        {renderMainContent()}
      </main>
      {/* Inline Style Tag for RecipeEase MainContainer (scoped) */}
      <style>{`
        /* Theme Colors */
        :root {
          --re-primary: #4CAF50;
          --re-secondary: #FFC107;
          --re-accent: #FF5722;
          --re-bg: #f9fafc;
          --re-text-primary: #111;
          --re-sidebar-width: 230px;
          --re-border-radius: 12px;
        }
        .re-main-container {
          display: flex;
          min-height: 100vh;
          background: var(--re-bg);
          color: var(--re-text-primary);
          font-family: 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif;
        }
        .re-sidebar {
          background: white;
          width: var(--re-sidebar-width);
          box-shadow: 2px 0 10px rgba(44,62,80,0.07);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem 1.5rem 1.5rem;
          border-top-right-radius: var(--re-border-radius);
          border-bottom-right-radius: var(--re-border-radius);
          z-index: 20;
          position: relative;
          min-width: var(--re-sidebar-width);
          transition: left 0.25s;
        }
        .re-logo {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 2rem;
          display: flex;
          gap: 0.5rem;
          align-items: center;
          color: var(--re-primary);
        }
        .re-logo-symbol {
          font-size: 1.7rem;
        }
        .re-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .re-nav-btn {
          width: 100%;
          background: none;
          border: 0;
          border-radius: 6px;
          padding: 0.85em 0.7em;
          font-size: 1.04rem;
          color: #333;
          text-align: left;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.95em;
          transition: background 0.13s;
        }
        .re-nav-btn.active, .re-nav-btn:hover {
          background: var(--re-primary);
          color: #fff;
        }
        .re-nav-icon {
          font-size: 1.3em;
          line-height: 1em;
        }
        /* Sidebar overlay for mobile */
        .re-sidebar-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(60,60,60,0.13);
          z-index: 10;
          animation: fadeIn 0.2s;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        /* Header (mobile) */
        .re-header {
          position: fixed;
          width: 100vw;
          left: 0; top: 0; z-index: 9;
          background: #fff;
          box-shadow: 0 1px 7px rgba(46, 64, 86, 0.08);
          height: 64px;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-left: 1rem;
        }
        .re-menu-btn {
          background: none;
          border: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px 8px 12px 0;
          cursor: pointer;
        }
        .re-menu-btn span {
          width: 24px;
          height: 3px;
          background: var(--re-primary);
          display: block;
          border-radius: 3px;
          transition: all 0.2s;
        }
        .re-header-title {
          font-size: 1.18rem;
          font-weight: 600;
          color: var(--re-primary);
          letter-spacing: 0.01em;
        }
        /* Main content area */
        .re-main-content {
          flex: 1;
          margin-left: var(--re-sidebar-width);
          margin-top: 0;
          padding: 2.5rem 2.5rem 1.5rem 2.5rem;
          min-height: 100vh;
          box-sizing: border-box;
          transition: margin-left 0.2s;
        }
        .content-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 70vh;
          font-size: 1.45rem;
          color: #888;
          background: #fff;
          border-radius: 10px;
          border: 1.5px solid #edf2fa;
          box-shadow: 0 0.5px 2.5px 0px rgba(60,60,60,0.05);
        }
        /* Responsive styles */
        @media (max-width: 1000px) {
          .re-main-content {
            padding: 1.5rem 1rem;
          }
        }
        @media (max-width: 720px) {
          .re-sidebar {
            position: fixed;
            left: -110vw;
            top: 0; bottom: 0;
            height: 100vh;
            transition: left 0.22s;
            z-index: 29;
          }
          .re-sidebar.open {
            left: 0;
            box-shadow: 2px 0 16px rgba(40,60,90,0.2);
          }
          .re-main-content {
            margin-left: 0;
            margin-top: 64px;
            min-height: calc(100vh - 64px);
            padding-top: 2rem;
          }
          .re-header {
            position: fixed;
            top: 0; left: 0;
            width: 100vw;
          }
        }
      `}</style>
    </div>
  );
}

export default MainContainer;
