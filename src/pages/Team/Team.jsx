import { useState } from 'react';
import { Plus, Mail, Phone, MoreHorizontal, X } from 'lucide-react';
import './Team.css';

const initialTeamMembers = [
  {
    id: 'team-1',
    name: 'Jason Price',
    role: 'Product Designer',
    department: 'Design',
    email: 'jason.price@dashstack.com',
    phone: '+1 234 567 8901',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    status: 'Active',
  },
  {
    id: 'team-2',
    name: 'Duane Dean',
    role: 'Lead Architect',
    department: 'Engineering',
    email: 'duane.dean@dashstack.com',
    phone: '+1 234 567 8902',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    status: 'Active',
  },
  {
    id: 'team-3',
    name: 'Jonathan Barker',
    role: 'Full Stack Engineer',
    department: 'Engineering',
    email: 'j.barker@dashstack.com',
    phone: '+1 234 567 8903',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    status: 'Active',
  },
  {
    id: 'team-4',
    name: 'Rosie Todd',
    role: 'QA Specialist',
    department: 'Testing',
    email: 'rosie.todd@dashstack.com',
    phone: '+1 234 567 8904',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    status: 'On Leave',
  },
];

export default function Team() {
  const [team, setTeam] = useState(initialTeamMembers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    department: 'Engineering',
    email: '',
    phone: '',
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;

    const created = {
      id: `team-${Date.now()}`,
      name: newMember.name,
      role: newMember.role || 'Member',
      department: newMember.department,
      email: newMember.email,
      phone: newMember.phone || '+1 555 0192',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      status: 'Active',
    };

    setTeam([created, ...team]);
    setShowAddModal(false);
    setNewMember({ name: '', role: '', department: 'Engineering', email: '', phone: '' });
  };

  return (
    <div className="page-body">
      <div className="team-header">
        <h1 className="page-header-title" style={{ marginBottom: 0 }}>Team</h1>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} /> Add New Member
        </button>
      </div>

      <div className="team-grid">
        {team.map((member) => (
          <div key={member.id} className="team-card">
            <div className="team-card-top">
              <span className={`team-status-dot ${member.status === 'Active' ? 'team-status--active' : 'team-status--leave'}`}>
                {member.status}
              </span>
              <button className="team-more-btn">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="team-avatar-wrapper">
              <img src={member.avatar} alt={member.name} className="team-avatar" />
            </div>

            <h3 className="team-member-name">{member.name}</h3>
            <span className="team-member-role">{member.role}</span>
            <span className="team-dept-badge">{member.department}</span>

            <div className="team-contact-info">
              <div className="team-contact-row">
                <Mail size={14} /> <span>{member.email}</span>
              </div>
              <div className="team-contact-row">
                <Phone size={14} /> <span>{member.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="orders-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-header">
              <h2>Add New Member</h2>
              <button className="contact-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="contact-form">
              <div className="contact-form-group" style={{ marginBottom: '16px' }}>
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  className="input-field"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
              </div>

              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Designer"
                    className="input-field"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  />
                </div>
                <div className="contact-form-group">
                  <label>Department</label>
                  <select
                    className="input-field"
                    value={newMember.department}
                    onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Testing">Testing</option>
                  </select>
                </div>
              </div>

              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="email@dashstack.com"
                    className="input-field"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  />
                </div>
                <div className="contact-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="input-field"
                    value={newMember.phone}
                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-modal-footer">
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
