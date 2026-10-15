import { useState } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import './Table.css';

const sampleTableData = [
  { id: '1', name: 'Christine Brooks', role: 'UI/UX Designer', project: 'DashStack Mobile', status: 'Active', progress: 85, budget: '$12,400' },
  { id: '2', name: 'Rosie Pearson', role: 'Frontend Lead', project: 'E-Commerce Platform', status: 'Pending', progress: 45, budget: '$8,200' },
  { id: '3', name: 'Darrell Caldwell', role: 'Backend Engineer', project: 'API Gateway v2', status: 'Active', progress: 100, budget: '$15,000' },
  { id: '4', name: 'Gilbert Johnston', role: 'DevOps Architect', project: 'Cloud Infrastructure', status: 'Inactive', progress: 20, budget: '$6,500' },
  { id: '5', name: 'Alan Cain', role: 'Product Manager', project: 'Q4 Roadmap', status: 'Active', progress: 60, budget: '$18,300' },
  { id: '6', name: 'Alfred Murray', role: 'Mobile Dev', project: 'iOS Application', status: 'Active', progress: 92, budget: '$14,100' },
];

export default function Table() {
  const [data, setData] = useState(sampleTableData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredData = data.filter((row) => {
    const matchesSearch = row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          row.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || row.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="page-body">
      <div className="table-page-header">
        <h1 className="page-header-title" style={{ marginBottom: 0 }}>Data Table</h1>
        <div className="table-controls">
          <div className="stock-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name or project..."
              className="inbox-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="dashboard-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="dash-card">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Project</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Budget</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td>
                  <span className="table-member-name">{row.name}</span>
                </td>
                <td>{row.role}</td>
                <td>{row.project}</td>
                <td>
                  <span className={`badge-status ${
                    row.status === 'Active' ? 'badge-completed' :
                    row.status === 'Pending' ? 'badge-processing' : 'badge-rejected'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <div className="table-progress-bar-wrapper">
                    <div className="table-progress-bar" style={{ width: `${row.progress}%` }}></div>
                    <span className="table-progress-text">{row.progress}%</span>
                  </div>
                </td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.budget}</td>
                <td>
                  <div className="table-row-actions">
                    <button className="table-action-btn" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button
                      className="table-action-btn table-action-btn--delete"
                      title="Delete"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredData.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No records found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
