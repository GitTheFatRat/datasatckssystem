import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { initialProducts } from '../../services/mockData';
import './Products.css';

const bannerSlides = [
  { title: 'Enjoy free home delivery in this summer', subtitle: 'Designer Dresses - Pick from trendy Designer Dress.', dateRange: 'September 12-22' },
  { title: 'New arrivals are here', subtitle: 'Check out the latest collection of tech accessories.', dateRange: 'October 1-15' },
];

export default function Products() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);

  return (
    <div className="page-body">
      <h1 className="page-header-title">Products</h1>

      {/* Banner Carousel */}
      <div className="products-banner">
        <button className="products-banner-nav products-banner-nav--prev" onClick={prevSlide}>
          <ChevronLeft size={20} />
        </button>
        <div className="products-banner-content">
          <span className="products-banner-date">{bannerSlides[currentSlide].dateRange}</span>
          <h2 className="products-banner-title">{bannerSlides[currentSlide].title}</h2>
          <p className="products-banner-subtitle">{bannerSlides[currentSlide].subtitle}</p>
          <button className="btn-primary products-banner-cta">
            <ShoppingCart size={16} /> Get Started
          </button>
        </div>
        <button className="products-banner-nav products-banner-nav--next" onClick={nextSlide}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Product Grid */}
      <div className="products-grid">
        {initialProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-card-image-wrapper">
              <img src={product.image} alt={product.name} className="product-card-image" />
              <button className="product-card-nav product-card-nav--prev">
                <ChevronLeft size={16} />
              </button>
              <button className="product-card-nav product-card-nav--next">
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="product-card-body">
              <h3 className="product-card-name">{product.name}</h3>
              <span className="product-card-price">${product.price.toFixed(2)}</span>
              <div className="product-card-rating">
                <span className="product-card-stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                <span className="product-card-reviews">({product.reviewsCount})</span>
              </div>
              <button className="btn-primary product-card-edit">Edit Product</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
