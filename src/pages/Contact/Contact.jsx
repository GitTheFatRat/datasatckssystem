import { useState } from 'react';
import { Mail, Plus, X, Upload } from 'lucide-react';
import { initialContacts } from '../../services/mockData';
import './Contact.css';

const extendedContacts = [
  ...initialContacts,
  {
    id: 'ct-4',
    name: 'Marilyn Workman',
    email: 'marilyn.workman@yahoo.com',
    role: 'Product Designer',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'ct-5',
    name: 'Joshua Small',
    email: 'joshua.small@gmail.com',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 'ct-6',
    name: 'Warren Morales',
    email: 'warren.m@outlook.com',
    role: 'Marketing Lead',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  },
];

export default function Contact() {
  const [contacts, setContacts] = useState(extendedContacts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Designer',
    gender: 'Male',
  });

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContact.firstName || !newContact.email) return;

    const created = {
      id: `ct-${Date.now()}`,
      name: `${newContact.firstName} ${newContact.lastName}`.trim(),
      email: newContact.email,
      role: newContact.role,
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    };

    setContacts([created, ...contacts]);
    setShowAddModal(false);
    setNewContact({ firstName: '', lastName: '', email: '', phone: '', role: 'Designer', gender: 'Male' });
  };

  return (
    <div className="page-body">
      <div className="contact-header">
        <h1 className="page-header-title" style={{ marginBottom: 0 }}>Contact</h1>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} /> Add New Contact
        </button>
      </div>

      <div className="contact-grid">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <div className="contact-avatar-wrapper">
              <img src={contact.image} alt={contact.name} className="contact-avatar" />
            </div>
            <h3 className="contact-name">{contact.name}</h3>
            <p className="contact-email">{contact.email}</p>
            <span className="contact-role-badge">{contact.role}</span>

            <div className="contact-actions">
              <button className="btn-secondary contact-msg-btn">
                <Mail size={16} /> Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Contact Modal */}
      {showAddModal && (
        <div className="orders-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="contact-modal-header">
              <h2>Add New Contact</h2>
              <button className="contact-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="contact-form">
              <div className="contact-upload-avatar">
                <div className="contact-upload-circle">
                  <Upload size={24} />
                </div>
                <span>Upload Photo</span>
              </div>

              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter First Name"
                    className="input-field"
                    value={newContact.firstName}
                    onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
                  />
                </div>
                <div className="contact-form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="input-field"
                    value={newContact.lastName}
                    onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label>Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter Email Address"
                    className="input-field"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  />
                </div>
                <div className="contact-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter Phone Number"
                    className="input-field"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label>Position / Role</label>
                  <input
                    type="text"
                    placeholder="Enter Position"
                    className="input-field"
                    value={newContact.role}
                    onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                  />
                </div>
                <div className="contact-form-group">
                  <label>Gender</label>
                  <select
                    className="input-field"
                    value={newContact.gender}
                    onChange={(e) => setNewContact({ ...newContact, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="contact-modal-footer">
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                  Save Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
