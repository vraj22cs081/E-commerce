import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark" id="tempaltemo_footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 pt-5">
            <h2 className="h2 text-success border-bottom pb-3 border-light logo">Maruti Enterprise</h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li><i className="fas fa-map-marker-alt fa-fw"></i> Maruti Enterprise,College Road,Santrampur</li>
              <li><i className="fa fa-phone fa-fw"></i>02675-299219</li>
              <li><i className="fa fa-envelope fa-fw"></i>MarutiEnterprise@gmail.com</li>
            </ul>
          </div>

          <div className="col-md-4 pt-5">
            <h2 className="h2 text-light border-bottom pb-3 border-light">Products</h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li><a className="text-decoration-none" href="#">Fortune Oil</a></li>
              <li><a className="text-decoration-none" href="#">Talod Intant</a></li>
              <li><a className="text-decoration-none" href="#">Ghadi Powder</a></li>
            </ul>
          </div>

          <div className="col-md-4 pt-5">
            <h2 className="h2 text-light border-bottom pb-3 border-light">Further Info</h2>
            <ul className="list-unstyled text-light footer-link-list">
              <li><a className="text-decoration-none" href="#">Home</a></li>
              <li><a className="text-decoration-none" href="#">About Us</a></li>
              <li><a className="text-decoration-none" href="https://maps.app.goo.gl/rhN7NCZBPF2L3Pq18">Shop Locations</a></li>
              <li><a className="text-decoration-none" href="#">FAQs</a></li>
              <li><a className="text-decoration-none" href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="row text-light mb-4">
          <div className="col-12 mb-3">
            <div className="w-100 my-3 border-top border-light"></div>
          </div>
          <div className="col-auto me-auto">
            <ul className="list-inline text-left footer-icons">
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a className="text-light text-decoration-none" target="_blank" href="http://facebook.com/"><i className="fab fa-facebook-f fa-lg fa-fw"></i></a>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a className="text-light text-decoration-none" target="_blank" href="https://www.instagram.com/"><i className="fab fa-instagram fa-lg fa-fw"></i></a>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a className="text-light text-decoration-none" target="_blank" href="https://twitter.com/"><i className="fab fa-twitter fa-lg fa-fw"></i></a>
              </li>
              <li className="list-inline-item border border-light rounded-circle text-center">
                <a className="text-light text-decoration-none" target="_blank" href="https://www.linkedin.com/"><i className="fab fa-linkedin fa-lg fa-fw"></i></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-100 bg-black py-3">
          <div className="container">
            <div className="row pt-2">
              <div className="col-12">
                <p className="text-left text-light">
                  © 2004 Maruti Enterprise | Designed by <a rel="sponsored" href="https://templatemo.com" target="_blank">Vraj And Utsav</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
