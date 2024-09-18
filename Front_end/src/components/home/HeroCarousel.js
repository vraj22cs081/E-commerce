import React from 'react';

function HeroCarousel() {
  return (
    <div id="template-mo-zay-hero-carousel" className="carousel slide" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
        <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="container">
            <div className="row p-5">
              <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                <img className="img-fluid" src="assets/company_logo/talod.png" alt="Talod" />
              </div>
              <div className="col-lg-6 mb-0 d-flex align-items-center">
                <div className="text-align-left align-self-center">
                  <h1 className="h1 text-success"><b>Talod Instant</b></h1>
                  <h3 className="h2">Talod Foods Products Private Limited</h3>
                  <p>brings you a variety of Ready To Eat And Ready To Cook Food Products. These instant mix products guarantee authentic taste in minimum time with little effort.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="container">
            <div className="row p-5">
              <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                <img className="img-fluid" src="assets/company_logo/adani.png" alt="Adani Wilmar" />
              </div>
              <div className="col-lg-6 mb-0 d-flex align-items-center">
                <div className="text-align-left">
                  <h1 className="h1 text-success"><b>Adani Wilmar</b></h1>
                  <h3 className="h2">Adani Wilmar Limited</h3>
                  <p>Offer an extensive array of edible oil products, including soyabean oil, palm oil, sunflower oil, rice bran oil, mustard oil, groundnut oil, cottonseed oil, blended oil, vanaspati and specialty fats.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="container">
            <div className="row p-5">
              <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                <img className="img-fluid" src="assets/company_logo/MW_LOGO_WHITE.png" alt="Ghadi Detergent powder" />
              </div>
              <div className="col-lg-6 mb-0 d-flex align-items-center">
                <div className="text-align-left">
                  <h1 className="h1 text-success"><b>Ghadi Detergent powder</b></h1>
                  <h3 className="h2">RSPL Limited</h3>
                  <p>"Pehle istemal kare, phir vishwas kare" (First try it, then believe it).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
        <i className="fas fa-chevron-left"></i>
      </a>
      <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
        <i className="fas fa-chevron-right"></i>
      </a>
    </div>
  );
}

export default HeroCarousel;
