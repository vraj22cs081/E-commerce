import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';

function Header() {
  const navigate = useNavigate();

  const handleScrollToFooter = () => {
    scroller.scrollTo('footer', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  const handleScrollToCategories = () => {
    scroller.scrollTo('categories', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:9000/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are included for session management
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Logout failed:', errorData);
        alert('Logout failed: ' + errorData.message);
      } else {
        alert('Logout successful!');
        navigate('/login'); // Redirect to login page after logout
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      alert('An error occurred during logout. Please try again later.');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center text-decoration-none">
          <img src="/assets/company_logo/logo.png" alt="Maruti Enterprise Logo" width="90" />
          <h1 className="mb-0 pb-0 mt-0 pt-0 navbar-brand h2 logo text-dark font-weight-bold">
            Maruti<br />Enterprise
          </h1>
        </div>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#templatemo_main_nav"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between"
          id="templatemo_main_nav"
        >
          <div className="flex-fill">
            <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/homepage">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleScrollToFooter}>
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleScrollToCategories}>
                  Shop
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar align-self-center d-flex">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
