import React from 'react';

const Categories = ({ onGoShop }) => (
  <section className="container py-5">
    <div className="row text-center pt-3">
      <div className="col-lg-6 m-auto">
        <h1 className="h1">Categories of The Month</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-md-4 p-5 mt-3" onClick={onGoShop}>
        <a href="#"><img src="/assets/company_logo/fortune.png" className="rounded-circle img-fluid border"/></a>
        <h3 className="text-center mt-3 mb-3">Fortune</h3>
        <p className="text-center">
          <button className="btn btn-success" onClick={onGoShop}>Go Shop</button>
        </p>
      </div>
      <div className="col-12 col-md-4 p-5 mt-3" >
        <a href="#"><img src="/assets/company_logo/talod2.png" className="rounded-circle img-fluid border" /></a>
        <h3 className="text-center mt-3 mb-3">Talod</h3>
        <p className="text-center">
          <button className="btn btn-success" disabled>Go Shop</button>
        </p>
      </div>
      <div className="col-12 col-md-4 p-5 mt-3">
        <a href="#"><img src="/assets/company_logo/ghadi.png" className="rounded-circle img-fluid border" /></a>
        <h3 className="text-center mt-3 mb-3">Ghadi</h3>
        <p className="text-center">
          <button className="btn btn-success" disabled>Go Shop</button>
        </p>
      </div>
    </div>
  </section>
);

export default Categories;
