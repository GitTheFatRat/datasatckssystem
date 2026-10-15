import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './UIElements.css';

const lineData = [
  { name: 'Jan', uv: 4000, pv: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398 },
  { name: 'Mar', uv: 2000, pv: 9800 },
  { name: 'Apr', uv: 2780, pv: 3908 },
  { name: 'May', uv: 1890, pv: 4800 },
  { name: 'Jun', uv: 2390, pv: 3800 },
  { name: 'Jul', uv: 3490, pv: 4300 },
];

const barData = [
  { name: '2018', sales: 45, profit: 32 },
  { name: '2019', sales: 78, profit: 53 },
  { name: '2020', sales: 62, profit: 45 },
  { name: '2021', sales: 90, profit: 70 },
  { name: '2022', sales: 110, profit: 85 },
];

const pieData = [
  { name: 'Desktop', value: 45, color: '#4880FF' },
  { name: 'Mobile', value: 35, color: '#00B69B' },
  { name: 'Tablet', value: 20, color: '#FF9F43' },
];

export default function UIElements() {
  const [toggleActive, setToggleActive] = useState(true);

  return (
    <div className="page-body">
      <h1 className="page-header-title">UI Elements & Visual Components</h1>

      {/* Charts Section */}
      <div className="ui-grid-2">
        <div className="dash-card">
          <h3 className="ui-card-title">Performance Trend (Line Chart)</h3>
          <div style={{ height: 260, width: '100%' }}>
            <ResponsiveContainer>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#313D4F" />
                <XAxis dataKey="name" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#273142', borderColor: '#313D4F', color: '#fff' }}
                />
                <Line type="monotone" dataKey="pv" stroke="#4880FF" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="uv" stroke="#00B69B" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card">
          <h3 className="ui-card-title">Annual Revenue (Bar Chart)</h3>
          <div style={{ height: 260, width: '100%' }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#313D4F" />
                <XAxis dataKey="name" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#273142', borderColor: '#313D4F', color: '#fff' }}
                />
                <Bar dataKey="sales" fill="#4880FF" radius={[6, 6, 0, 0]} />
                <Bar dataKey="profit" fill="#884DFF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="ui-grid-3" style={{ marginTop: '24px' }}>
        {/* Donut Chart */}
        <div className="dash-card">
          <h3 className="ui-card-title">Traffic Share (Donut)</h3>
          <div style={{ height: 200, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#273142', borderColor: '#313D4F', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="donut-legend">
            {pieData.map((item) => (
              <div key={item.name} className="donut-legend-item">
                <span className="donut-dot" style={{ backgroundColor: item.color }}></span>
                <span>{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons Gallery */}
        <div className="dash-card">
          <h3 className="ui-card-title">Button Variants</h3>
          <div className="ui-elements-stack">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-primary" style={{ backgroundColor: 'var(--color-success)' }}>
              Success Button
            </button>
            <button className="btn-primary" style={{ backgroundColor: 'var(--color-danger)' }}>
              Danger Button
            </button>
            <button className="btn-primary" style={{ backgroundColor: 'var(--color-warning)' }}>
              Warning Button
            </button>
          </div>
        </div>

        {/* Badges and Toggles */}
        <div className="dash-card">
          <h3 className="ui-card-title">Status Badges & Controls</h3>
          <div className="ui-badge-list">
            <span className="badge-status badge-completed">Completed</span>
            <span className="badge-status badge-processing">Processing</span>
            <span className="badge-status badge-rejected">Rejected</span>
            <span className="badge-status badge-onhold">On Hold</span>
            <span className="badge-status badge-transit">In Transit</span>
          </div>

          <div style={{ marginTop: '24px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              Interactive Toggle Switch
            </span>
            <button
              className={`ui-switch ${toggleActive ? 'ui-switch--on' : ''}`}
              onClick={() => setToggleActive(!toggleActive)}
            >
              <span className="ui-switch-handle"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
