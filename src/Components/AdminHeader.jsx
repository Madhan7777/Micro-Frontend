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
};

function AdminHeader() {
  return (
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
            <li className="nav-item">
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
            </li>
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
  );
}

export default AdminHeader;
