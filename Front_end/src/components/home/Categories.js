import React from 'react';

const Categories = ({ onGoShop }) => (
  <section className="container py-5">
    <div className="row text-center pt-3">
      <div className="col-lg-6 m-auto">
        <h1 className="h1">Categories of The Month</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-md-4 p-5 mt-3">
        <a href="#"><img src="/assets/img/category_img_01.jpg" className="rounded-circle img-fluid border" alt="Watches" /></a>
        <h5 className="text-center mt-3 mb-3">Watches</h5>
        <p className="text-center">
          <button className="btn btn-success" onClick={onGoShop}>Go Shop</button>
        </p>
      </div>
      <div className="col-12 col-md-4 p-5 mt-3">
        <a href="#"><img src="/assets/img/category_img_02.jpg" className="rounded-circle img-fluid border" alt="Shoes" /></a>
        <h2 className="h5 text-center mt-3 mb-3">Shoes</h2>
        <p className="text-center">
          <button className="btn btn-success" disabled>Go Shop</button>
        </p>
      </div>
      <div className="col-12 col-md-4 p-5 mt-3">
        <a href="#"><img src="/assets/img/category_img_03.jpg" className="rounded-circle img-fluid border" alt="Accessories" /></a>
        <h2 className="h5 text-center mt-3 mb-3">Accessories</h2>
        <p className="text-center">
          <button className="btn btn-success" disabled>Go Shop</button>
        </p>
      </div>
    </div>
  </section>
);

export default Categories;
