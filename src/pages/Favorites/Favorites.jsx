import { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { initialProducts } from '../../services/mockData';
import './Favorites.css';

export default function Favorites() {
  const [favoriteList, setFavoriteList] = useState(
    initialProducts.map((p) => ({ ...p, isFavorite: true }))
  );

  const toggleFavorite = (id) => {
    setFavoriteList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  return (
    <div className="page-body">
      <div className="favorites-header">
        <h1 className="page-header-title" style={{ marginBottom: 0 }}>Favorites</h1>
        <span className="favorites-count">{favoriteList.filter(f => f.isFavorite).length} items saved</span>
      </div>

      <div className="products-grid">
        {favoriteList
          .filter((p) => p.isFavorite)
          .map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-card-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-card-image"
                />
                <button
                  className="favorite-heart-btn favorite-heart-btn--active"
                  onClick={() => toggleFavorite(product.id)}
                  title="Remove from favorites"
                >
                  <Heart size={18} fill="#EF3826" color="#EF3826" />
                </button>
              </div>

              <div className="product-card-body">
                <h3 className="product-card-title">{product.name}</h3>
                <div className="product-card-price">${product.price.toFixed(2)}</div>

                <div className="product-card-rating">
                  <div className="product-card-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.floor(product.rating) ? '#FF9F43' : 'transparent'}
                        color="#FF9F43"
                      />
                    ))}
                  </div>
                  <span className="product-card-reviews">({product.reviewsCount})</span>
                </div>

                <button className="btn-secondary product-edit-btn" style={{ width: '100%', marginTop: '12px' }}>
                  View Details
                </button>
              </div>
            </div>
          ))}
      </div>

      {favoriteList.filter((f) => f.isFavorite).length === 0 && (
        <div className="favorites-empty">
          <Heart size={48} className="favorites-empty-icon" />
          <h3>No favorite items yet</h3>
          <p>Mark items as favorites to quickly find them here.</p>
        </div>
      )}
    </div>
  );
}
