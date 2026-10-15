import { useState } from 'react';
import { Printer, Send, Download } from 'lucide-react';
import './Invoice.css';

const invoiceItems = [
  { id: 1, description: 'Children Sleeping Bag', quantity: 2, unitPrice: 60.00, total: 120.00 },
  { id: 2, description: 'Electronic Toothbrush', quantity: 1, unitPrice: 190.00, total: 190.00 },
  { id: 3, description: 'Modern Desk Lamp', quantity: 3, unitPrice: 35.00, total: 105.00 },
  { id: 4, description: 'Wireless Bluetooth Headphone', quantity: 2, unitPrice: 89.00, total: 178.00 },
];

export default function Invoice() {
  const subtotal = invoiceItems.reduce((acc, item) => acc + item.total, 0);
  const discount = 25.00;
  const vat = 45.00;
  const grandTotal = subtotal - discount + vat;

  const [statusMessage, setStatusMessage] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setStatusMessage('Invoice #INV-879201 PDF downloaded successfully.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleSend = () => {
    setStatusMessage('Invoice #INV-879201 has been dispatched to moni.roy@example.com.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="page-body">
      {statusMessage && (
        <div style={{
          marginBottom: '16px',
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(0,182,155,0.15)',
          border: '1px solid var(--color-success)',
          color: 'var(--color-success)',
          fontSize: '14px',
          fontWeight: 500
        }}>
          {statusMessage}
        </div>
      )}
      <div className="invoice-header">
        <h1 className="page-header-title" style={{ marginBottom: 0 }}>Invoice</h1>
        <div className="invoice-header-actions">
          <button className="btn-secondary" onClick={handlePrint}>
            <Printer size={16} /> Print
          </button>
          <button className="btn-secondary" onClick={handleDownload}>
            <Download size={16} /> Download
          </button>
          <button className="btn-primary" onClick={handleSend}>
            <Send size={16} /> Send Invoice
          </button>
        </div>
      </div>

      <div className="dash-card invoice-card">
        {/* Top Info */}
        <div className="invoice-meta-row">
          <div>
            <span className="invoice-tag">Invoice From</span>
            <h3 className="invoice-party-name">DashStack Inc.</h3>
            <p className="invoice-party-address">
              4517 Washington Ave. Manchester, Kentucky 39495<br />
              info@dashstack.com | +1 (234) 567-890
            </p>
          </div>

          <div className="invoice-to-col">
            <span className="invoice-tag">Invoice To</span>
            <h3 className="invoice-party-name">Moni Roy</h3>
            <p className="invoice-party-address">
              8502 Preston Rd. Inglewood, Maine 98380<br />
              moni.roy@example.com | +1 (987) 654-321
            </p>
          </div>

          <div className="invoice-dates-col">
            <div className="invoice-date-item">
              <span className="invoice-date-label">Invoice Date:</span>
              <span className="invoice-date-val">12 Nov 2024</span>
            </div>
            <div className="invoice-date-item">
              <span className="invoice-date-label">Due Date:</span>
              <span className="invoice-date-val">25 Nov 2024</span>
            </div>
            <div className="invoice-date-item">
              <span className="invoice-date-label">Invoice ID:</span>
              <span className="invoice-date-val">#INV-879201</span>
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="invoice-table-wrapper">
          <table className="dashboard-table invoice-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>#</th>
                <th>Item Description</th>
                <th style={{ textAlign: 'center' }}>Quantity</th>
                <th style={{ textAlign: 'right' }}>Base Cost</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td className="invoice-item-desc">{item.description}</td>
                  <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right' }}>${item.unitPrice.toFixed(2)}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>${item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Summary */}
        <div className="invoice-summary-section">
          <div className="invoice-payment-info">
            <span className="invoice-tag">Payment Info</span>
            <p>Bank Account: **** **** **** 4829</p>
            <p>Account Name: DashStack Solutions LLC</p>
            <p>Swift Code: DSSUS33XXX</p>
          </div>

          <div className="invoice-totals">
            <div className="invoice-total-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="invoice-total-row">
              <span>Discount:</span>
              <span className="invoice-discount">-${discount.toFixed(2)}</span>
            </div>
            <div className="invoice-total-row">
              <span>VAT (10%):</span>
              <span>${vat.toFixed(2)}</span>
            </div>
            <div className="invoice-total-row invoice-grand-total">
              <span>Grand Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
