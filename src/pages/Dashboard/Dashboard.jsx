import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MetricCard from '../../components/widgets/MetricCard';
import {
  initialMetrics, salesDetailsData, revenueComparisonData
} from '../../services/mockData';
import './Dashboard.css';

const dealsData = [
  { product: 'Apple Watch', location: '6096 Marjolaine Landing', dateTime: '12.09.2019 - 12:53 PM', piece: 423, amount: '$34,295', status: 'Delivered' },
  { product: 'Samsung Galaxy', location: '123 Tech Avenue', dateTime: '11.09.2019 - 10:15 AM', piece: 312, amount: '$22,450', status: 'Pending' },
  { product: 'MacBook Pro', location: '456 Innovation Way', dateTime: '10.09.2019 - 03:45 PM', piece: 156, amount: '$78,900', status: 'Delivered' },
];

const customerDonutData = [
  { name: 'New Customers', value: 34249, color: '#4880FF' },
  { name: 'Repeated Customers', value: 1420, color: '#E0E7FF' },
];

const salesAnalyticsData = [
  { year: '2015', target: 20, current: 30 },
  { year: '2016', target: 60, current: 40 },
  { year: '2017', target: 45, current: 75 },
  { year: '2018', target: 75, current: 85 },
  { year: '2019', target: 90, current: 95 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="dashboard-chart-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [salesPeriod, setSalesPeriod] = useState('October');

  return (
    <div className="page-body">
      <div className="dashboard-top-bar">
        <h1 className="page-header-title" style={{ marginBottom: 0 }}>Dashboard</h1>
        <div className="dashboard-tab-switch">
          <button
            className={`dashboard-tab-btn ${activeTab === 'overview' ? 'dashboard-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`dashboard-tab-btn ${activeTab === 'analytics' ? 'dashboard-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="dashboard-metrics">
        {initialMetrics.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Sales Details Chart (Dark 1) */}
          <div className="dash-card dashboard-chart-card">
            <div className="dashboard-chart-header">
              <h2 className="dashboard-chart-title">Sales Details</h2>
              <select
                className="dashboard-select"
                value={salesPeriod}
                onChange={(e) => setSalesPeriod(e.target.value)}
              >
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
            <div className="dashboard-chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesDetailsData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4880FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4880FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#313D4F" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4880FF"
                    strokeWidth={2.5}
                    fill="url(#salesGradient)"
                    dot={false}
                    activeDot={{ r: 6, stroke: '#4880FF', strokeWidth: 2, fill: '#273142' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Deals Details Table */}
          <div className="dash-card dashboard-deals-card">
            <div className="dashboard-chart-header">
              <h2 className="dashboard-chart-title">Deals Details</h2>
              <select className="dashboard-select">
                <option>October</option>
                <option>November</option>
              </select>
            </div>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Product Name</th>
                  <th>Location</th>
                  <th>Date - Time</th>
                  <th>Piece</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dealsData.map((deal, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="dashboard-deal-icon">
                        <img
                          src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=50&auto=format&fit=crop&q=80"
                          alt="deal"
                          style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'cover' }}
                        />
                      </div>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{deal.product}</td>
                    <td>{deal.location}</td>
                    <td>{deal.dateTime}</td>
                    <td>{deal.piece}</td>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{deal.amount}</td>
                    <td>
                      <span className={`badge-status ${deal.status === 'Delivered' ? 'badge-completed' : 'badge-processing'}`}>
                        {deal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          {/* Revenue Spline Chart */}
          <div className="dash-card dashboard-chart-card">
            <div className="dashboard-chart-header">
              <div>
                <h2 className="dashboard-chart-title">Revenue</h2>
                <div className="revenue-legend">
                  <span className="revenue-legend-item">
                    <span className="revenue-dot" style={{ backgroundColor: '#884DFF' }}></span> Sales
                  </span>
                  <span className="revenue-legend-item">
                    <span className="revenue-dot" style={{ backgroundColor: '#FF9F43' }}></span> Profit
                  </span>
                </div>
              </div>
              <select className="dashboard-select">
                <option>October</option>
                <option>November</option>
              </select>
            </div>
            <div className="dashboard-chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueComparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="salesWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#884DFF" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#884DFF" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="profitWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF9F43" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#FF9F43" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#313D4F" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#273142', borderColor: '#313D4F', color: '#fff' }}
                  />
                  <Area
                    type="natural"
                    dataKey="sales"
                    stroke="#884DFF"
                    strokeWidth={2.5}
                    fill="url(#salesWave)"
                  />
                  <Area
                    type="natural"
                    dataKey="profit"
                    stroke="#FF9F43"
                    strokeWidth={2.5}
                    fill="url(#profitWave)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Overview Grid */}
          <div className="dashboard-dark2-grid">
            {/* Customers Donut */}
            <div className="dash-card">
              <h2 className="dashboard-chart-title">Customers</h2>
              <div style={{ height: 180, position: 'relative', marginTop: 10 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerDonutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      {customerDonutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="customers-stat-row">
                <div className="customers-stat">
                  <span className="customers-stat-val">34,249</span>
                  <span className="customers-stat-lbl">
                    <span className="revenue-dot" style={{ backgroundColor: '#4880FF' }}></span> New Customers
                  </span>
                </div>
                <div className="customers-stat">
                  <span className="customers-stat-val">1,420</span>
                  <span className="customers-stat-lbl">
                    <span className="revenue-dot" style={{ backgroundColor: '#E0E7FF' }}></span> Repeated
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Product */}
            <div className="dash-card featured-product-card">
              <h2 className="dashboard-chart-title">Featured Product</h2>
              <div className="featured-product-content">
                <button className="featured-arrow-btn">
                  <ChevronLeft size={18} />
                </button>
                <div className="featured-product-image-box">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80"
                    alt="Beats Headphone"
                    className="featured-product-img"
                  />
                </div>
                <button className="featured-arrow-btn">
                  <ChevronRight size={18} />
                </button>
              </div>
              <div className="featured-product-meta">
                <h4 className="featured-title">Beats Headphone 2019</h4>
                <div className="featured-price">$89.00</div>
              </div>
            </div>

            {/* Sales Analytics */}
            <div className="dash-card">
              <h2 className="dashboard-chart-title">Sales Analytics</h2>
              <div style={{ height: 210, width: '100%', marginTop: 10 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesAnalyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#313D4F" vertical={false} />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#273142', borderColor: '#313D4F', color: '#fff' }}
                    />
                    <Line type="natural" dataKey="target" stroke="#00B69B" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="natural" dataKey="current" stroke="#4880FF" strokeWidth={2.5} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
