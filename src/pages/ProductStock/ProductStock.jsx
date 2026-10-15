import { initialProducts } from '../../services/mockData';
import { Search } from 'lucide-react';
import './ProductStock.css';

const stockData = [
  { ...initialProducts[0], piece: 63 },
  { ...initialProducts[1], name: 'Microsoft Headphones', category: 'Digital Product', price: 190.00, piece: 13 },
  { ...initialProducts[2], name: "Women's Dress", category: 'Fashion', price: 640.00, piece: 635 },
  { ...initialProducts[3], name: 'Samsung A50', category: 'Mobile', price: 400.00, piece: 97 },
  { id: 'prod-5', name: 'Camera', category: 'Electronic', price: 420.00, piece: 51, availableColors: ['#000', '#4880FF', '#EF3826', '#884DFF'], image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=80&auto=format&fit=crop&q=80' },
  { id: 'prod-6', name: "Women's Dress", category: 'Fashion', price: 640.00, piece: 100, availableColors: ['#000', '#4880FF', '#00B69B', '#FF9F43', '#E040FB'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=80&auto=format&fit=crop&q=80' },
];

export default function ProductStock() {
  return (
    <div className="page-body">
      <div className="stock-header">
        <h1 className="page-header-title" style={{ marginBottom: 0 }}>Product Stock</h1>
        <div className="stock-search">
          <Search size={16} />
          <input type="text" placeholder="Search product name..." className="inbox-search-input" />
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.name} className="stock-product-img" />
                </td>
                <td className="stock-product-name">{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.piece}</td>
                <td>
                  <div className="stock-colors">
                    {(product.availableColors || []).map((color, i) => (
                      <span key={i} className="stock-color-dot" style={{ backgroundColor: color }}></span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="stock-actions">
                    <button className="stock-action-btn">✏️</button>
                    <button className="stock-action-btn">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
