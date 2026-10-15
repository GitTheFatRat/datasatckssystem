import { useState } from 'react';
import { Search, Trash2, Edit2 } from 'lucide-react';
import { initialProducts } from '../../services/mockData';
import './ProductStock.css';

const initialStockData = [
  { ...initialProducts[0], piece: 63 },
  { ...initialProducts[1], name: 'Microsoft Headphones', category: 'Digital Product', price: 190.00, piece: 13 },
  { ...initialProducts[2], name: "Women's Dress", category: 'Fashion', price: 640.00, piece: 635 },
  { ...initialProducts[3], name: 'Samsung A50', category: 'Mobile', price: 400.00, piece: 97 },
  { id: 'prod-5', name: 'Camera', category: 'Electronic', price: 420.00, piece: 51, availableColors: ['#000', '#4880FF', '#EF3826', '#884DFF'], image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=80&auto=format&fit=crop&q=80' },
  { id: 'prod-6', name: "Women's Dress", category: 'Fashion', price: 640.00, piece: 100, availableColors: ['#000', '#4880FF', '#00B69B', '#FF9F43', '#E040FB'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=80&auto=format&fit=crop&q=80' },
];

export default function ProductStock() {
  const [stock, setStock] = useState(initialStockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColors, setSelectedColors] = useState({});

  const handleDelete = (id) => {
    setStock((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSelectColor = (productId, color) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  const filteredStock = stock.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-body">
      <div className="stock-header">
        <h1 className="page-header-title" style={{ marginBottom: 0 }}>Product Stock</h1>
        <div className="stock-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search product name or category..."
            className="inbox-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="dash-card">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Piece</th>
              <th>Available Color</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.name} className="stock-product-img" />
                </td>
                <td className="stock-product-name">{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td style={{ fontWeight: 600 }}>{product.piece}</td>
                <td>
                  <div className="stock-colors">
                    {(product.availableColors || []).map((color, i) => {
                      const isSelected = selectedColors[product.id] === color;
                      return (
                        <span
                          key={i}
                          className="stock-color-dot"
                          style={{
                            backgroundColor: color,
                            transform: isSelected ? 'scale(1.3)' : 'scale(1)',
                            boxShadow: isSelected ? '0 0 0 2px #fff' : 'none',
                          }}
                          onClick={() => handleSelectColor(product.id, color)}
                          title={`Select color: ${color}`}
                        />
                      );
                    })}
                  </div>
                </td>
                <td>
                  <div className="stock-actions" style={{ justifyContent: 'center' }}>
                    <button className="stock-action-btn" title="Edit stock">
                      <Edit2 size={14} />
                    </button>
                    <button
                      className="stock-action-btn"
                      title="Delete product"
                      onClick={() => handleDelete(product.id)}
                      style={{ color: 'var(--color-danger)' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStock.length === 0 && (
          <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No stock products match your search.
          </div>
        )}
      </div>
    </div>
  );
}
