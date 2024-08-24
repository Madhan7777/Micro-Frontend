import React from 'react';



const styles = {
  navbar: {
    backgroundColor: '#000', 
    padding: '0.5rem 1rem', 
  },
  navbarBrand: {
    fontSize: '1.75rem', 
    fontWeight: 'bold', 
    color: '#fff', 
    textTransform: 'uppercase', 
    textDecoration: 'none', 
    transition: 'color 0.3s ease', 
  },
  navbarBrandHover: {
    color: '#FFD700',
  },
  navLink: {
    color: '#fff', 
    padding: '0.5rem 1rem', 
    transition: 'color 0.3s ease, background-color 0.3s ease', 
  },
  navLinkHover: {
    color: '#FFD700', 
    textDecoration: 'underline', 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
  },
  navbarToggler: {
    border: 'none', 
    background: '#FFD700', 
    borderRadius: '0.25rem', 
  },
  centerText: {
    fontSize: '1.5rem',
    fontWeight: '700', 
    color: '#FFD700', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', 
    margin: '0',
  },
  centeredMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '84vh', 
    padding: '20px',
    fontSize: '4.9rem',
    color: 'black', 
    textAlign: 'center', 
    background: 'url("https://static.vecteezy.com/system/resources/previews/020/115/455/non_2x/food-background-breakfast-with-yogurt-granola-or-muesli-strawberries-banner-image-for-website-photo.jpg") no-repeat center center', // Background image
    backgroundSize: 'cover', 
    position: 'relative', 
    zIndex: 1, 
    
  },
  centeredMessageOverlay: {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', 
    zIndex: -1, 
  },
  carousel: {
    position: 'relative',
    width: '100vw', 
    height: '60vh', 
    maxHeight: '500px', 
    overflow: 'hidden', 
  },
  carouselItem: {
    height: '100%',
  },
  carouselImage: {
    objectFit: 'cover', 
    width: '100%',
    height: '100%',
    transition: 'opacity 1s ease', 
  },
  carouselControl: {
    width: '5%', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: '50%', 
  },
  carouselControlIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    borderRadius: '50%',
  },
  carouselIndicator: {
    backgroundColor: '#fff', 
  },
  carouselIndicatorActive: {
    backgroundColor: '#FFD700', 
  },
  footer: {
    backgroundColor: '#222', 
    color: '#fff', 
    padding: '1rem', 
    textAlign: 'center', 
    position: 'relative', 
    bottom: 0,
    width: '100%',
  },
  footerText: {
    margin: '0', 
    fontSize: '0.875rem', 
  },
};

function AdminNavbar() {
  return (
    <div>
      <nav style={styles.navbar} className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">
          <a 
            style={styles.navbarBrand} 
            className="navbar-brand" 
            href="/adminnavbar"
            onMouseOver={(e) => e.target.style.color = styles.navbarBrandHover.color}
            onMouseOut={(e) => e.target.style.color = styles.navbarBrand.color}
          >
            Admin
          </a>
          <button style={styles.navbarToggler} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <a 
                  style={styles.navLink} 
                  className="nav-link" 
                  aria-current="page" 
                  href="/adminnavbar"
                  onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
                  onMouseOut={(e) => e.target.style.color = styles.navLink.color}
                >
                  Home
                </a>
              </li> */}
              <li className="nav-item">
                <a 
                  style={styles.navLink} 
                  className="nav-link" 
                  href="/add"
                  onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
                  onMouseOut={(e) => e.target.style.color = styles.navLink.color}
                >
                  Add Products
                </a>
              </li>
              <li className="nav-item">
                <a 
                  style={styles.navLink} 
                  className="nav-link" 
                  href="/viewproduct"
                  onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
                  onMouseOut={(e) => e.target.style.color = styles.navLink.color}
                >
                  View Products
                </a>
              </li>
              <li className="nav-item">
                <a 
                  style={styles.navLink} 
                  className="nav-link" 
                  href="/order"
                  onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
                  onMouseOut={(e) => e.target.style.color = styles.navLink.color}
                >
                  View Orders
                </a>
              </li>
              <li className="nav-item">
                <a 
                  style={styles.navLink} 
                  className="nav-link" 
                  href="/tracking"
                  onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
                  onMouseOut={(e) => e.target.style.color = styles.navLink.color}
                >
                  Order Management
                </a>
              </li>
              <li className="nav-item">
                <a 
                  style={styles.navLink} 
                  className="nav-link" 
                  href="/"
                  onMouseOver={(e) => e.target.style.color = styles.navLinkHover.color}
                  onMouseOut={(e) => e.target.style.color = styles.navLink.color}
                >
                  Logout
                </a>
              </li>
            </ul>
            <div className="navbar-text mx-auto text-center">
              <span style={styles.centerText}>Welcome to the Admin Dashboard</span>
            </div>
          </div>
        </div>
      </nav>
      <div style={styles.centeredMessage}>
        <div style={styles.centeredMessageOverlay}></div>
        <p style={styles.centerText}>Food And Beverages Supply System</p>
      </div>
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2024 Food And Beverages Supply System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminNavbar;
