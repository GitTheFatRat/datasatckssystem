import { useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Edit3, X, Check } from 'lucide-react';
import { initialProducts } from '../../services/mockData';
import './Products.css';

const bannerSlides = [
  { title: 'Enjoy free home delivery in this summer', subtitle: 'Designer Dresses - Pick from trendy Designer Dress.', dateRange: 'September 12-22' },
  { title: 'New arrivals are here', subtitle: 'Check out the latest collection of tech accessories.', dateRange: 'October 1-15' },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '' });
  const [notification, setNotification] = useState('');

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditForm({ name: product.name, price: product.price.toString() });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProducts((prev) =>
      prev.map((item) =>
        item.id === editingProduct.id
          ? { ...item, name: editForm.name, price: parseFloat(editForm.price) || item.price }
          : item
      )
    );

    setNotification(`Updated "${editForm.name}" successfully!`);
    setEditingProduct(null);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="page-body">
      <h1 className="page-header-title">Products</h1>

      {notification && (
        <div style={{
          marginBottom: '20px',
          padding: '12px 18px',
          borderRadius: '8px',
          background: 'rgba(0,182,155,0.15)',
          border: '1px solid var(--color-success)',
          color: 'var(--color-success)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '14px',
          fontWeight: 500
        }}>
          <Check size={18} />
          <span>{notification}</span>
        </div>
      )}

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
        {products.map((product) => (
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
              <button
                className="btn-primary product-card-edit"
                onClick={() => openEditModal(product)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Edit3 size={15} /> Edit Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="orders-modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="contact-modal-header">
              <h2>Edit Product</h2>
              <button className="contact-close-btn" onClick={() => setEditingProduct(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="contact-form" style={{ marginTop: '16px' }}>
              <div className="contact-form-group">
                <label>Product Title</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>

              <div className="contact-form-group">
                <label>Price ($ USD)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="input-field"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
