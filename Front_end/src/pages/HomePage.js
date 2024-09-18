import React from 'react';
import TopNav from '../components/home/TopNav';
import Header from '../components/home/Header';
import HeroCarousel from '../components/home/HeroCarousel';
import Categories from '../components/home/Categories';
import Footer from '../components/home/Footer';
import { Element } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleGoShop = () => {
    navigate('/products');
  };

  return (
    <div className="App">
    
      <Header />
      <HeroCarousel />
      <Element name="categories">
        <Categories onGoShop={handleGoShop} />
      </Element>
      <Element name="footer">
        <Footer />
      </Element>
    </div>
  );
}

export default Home;
