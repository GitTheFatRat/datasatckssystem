import { useState } from 'react';
import { Filter, RotateCcw, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { initialOrders } from '../../services/mockData';
import './Orders.css';

const orderTypes = ['Health & Medicine', 'Book & Stationery', 'Services & Industry', 'Fashion & Beauty', 'Home & Living', 'Electronics', 'Mobile & Phone', 'Accessories'];
const orderStatuses = ['Completed', 'Processing', 'Rejected', 'On Hold', 'In Transit'];

const statusClassMap = {
  'Completed': 'badge-completed',
  'Processing': 'badge-processing',
  'Rejected': 'badge-rejected',
  'On Hold': 'badge-onhold',
  'In Transit': 'badge-transit',
};

export default function Orders() {
  const [orders] = useState(initialOrders);
  const [filterDate, setFilterDate] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const resetFilters = () => {
    setFilterDate('');
    setSelectedTypes([]);
    setSelectedStatuses([]);
  };

  const filteredOrders = orders.filter((order) => {
    if (selectedTypes.length && !selectedTypes.includes(order.type)) return false;
    if (selectedStatuses.length && !selectedStatuses.includes(order.status)) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="page-body">
      <h1 className="page-header-title">Order Lists</h1>

      <div className="dash-card">
        {/* Filter Bar */}
        <div className="orders-filter-bar">
          <Filter size={18} className="orders-filter-icon" />
          <span className="orders-filter-label">Filter By</span>

          <input
            type="date"
            className="orders-filter-date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />

          <button className="orders-filter-btn" onClick={() => setShowTypeModal(!showTypeModal)}>
            Order Type ▾
          </button>

          <button className="orders-filter-btn" onClick={() => setShowStatusModal(!showStatusModal)}>
            Order Status ▾
          </button>

          {(selectedTypes.length > 0 || selectedStatuses.length > 0) && (
            <button className="orders-reset-btn" onClick={resetFilters}>
              <RotateCcw size={14} /> Reset Filter
            </button>
          )}
        </div>

        {/* Active Filter Tags */}
        {(selectedTypes.length > 0 || selectedStatuses.length > 0) && (
          <div className="orders-active-filters">
            {selectedTypes.map((t) => (
              <span key={t} className="orders-filter-tag">
                {t} <X size={12} onClick={() => toggleType(t)} />
              </span>
            ))}
            {selectedStatuses.map((s) => (
              <span key={s} className="orders-filter-tag">
                {s} <X size={12} onClick={() => toggleStatus(s)} />
              </span>
            ))}
          </div>
        )}

        {/* Type Filter Modal */}
        {showTypeModal && (
          <div className="orders-modal-overlay" onClick={() => setShowTypeModal(false)}>
            <div className="orders-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="orders-modal-title">Select Order Type</h3>
              <div className="orders-modal-chips">
                {orderTypes.map((type) => (
                  <button
                    key={type}
                    className={`orders-chip ${selectedTypes.includes(type) ? 'orders-chip--active' : ''}`}
                    onClick={() => toggleType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <p className="orders-modal-hint">*You can choose multiple Order type</p>
              <button className="btn-primary orders-modal-apply" onClick={() => setShowTypeModal(false)}>
                Apply Now
              </button>
            </div>
          </div>
        )}

        {/* Status Filter Modal */}
        {showStatusModal && (
          <div className="orders-modal-overlay" onClick={() => setShowStatusModal(false)}>
            <div className="orders-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="orders-modal-title">Select Order Status</h3>
              <div className="orders-modal-chips">
                {orderStatuses.map((status) => (
                  <button
                    key={status}
                    className={`orders-chip ${selectedStatuses.includes(status) ? 'orders-chip--active' : ''}`}
                    onClick={() => toggleStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <p className="orders-modal-hint">*You can choose multiple Order Status</p>
              <button className="btn-primary orders-modal-apply" onClick={() => setShowStatusModal(false)}>
                Apply Now
              </button>
            </div>
          </div>
        )}

        {/* Orders Table */}
        <table className="dashboard-table orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>DATE</th>
              <th>TYPE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>{order.type}</td>
                <td>
                  <span className={`badge-status ${statusClassMap[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="orders-pagination">
          <span className="orders-pagination-info">
            Showing {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, filteredOrders.length)} of {filteredOrders.length}
          </span>
          <div className="orders-pagination-controls">
            <button
              className="orders-page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="orders-page-btn"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
