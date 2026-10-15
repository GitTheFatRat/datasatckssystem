import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import './CalendarPage.css';

const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const events = [
  { id: 1, title: 'Design Conference', date: '2019-10-07', time: 'Today 07:19 AM', location: '56 Davion Mission Suite 157', color: '#4880FF' },
  { id: 2, title: 'Weekend Festival', date: '2019-10-03', time: '10 October 2019 at 5:49 PM', location: '853 Moore Flats Suite 158', color: '#FF9F43' },
  { id: 3, title: 'Glastonbury Festival', date: '2019-10-16', time: '01-13 October 2019 at 8:29 PM', location: '646 Walter Road Apt 571', color: '#EF3826' },
  { id: 4, title: 'Ultra Europe 2019', date: '2019-10-23', time: '25 October 2019 at 8:00 PM', location: '660 Saberdield Terrace Apt 763', color: '#00B69B' },
];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(9);
  const [currentYear, setCurrentYear] = useState(2019);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', time: '', date: '', address: '', contactNumber: '' });

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    setShowAddEvent(false);
    setNewEvent({ name: '', time: '', date: '', address: '', contactNumber: '' });
  };

  return (
    <div className="page-body">
      <div className="calendar-top">
        <h1 className="page-header-title" style={{ marginBottom: 0 }}>Calendar</h1>
        <button className="btn-primary" onClick={() => setShowAddEvent(true)}>
          <Plus size={16} /> Add New Event
        </button>
      </div>

      <div className="calendar-layout">
        {/* Sidebar events */}
        <div className="calendar-events-sidebar">
          <h3 className="calendar-events-title">You are going to</h3>
          {events.map((event) => (
            <div key={event.id} className="calendar-event-card">
              <div className="calendar-event-dot" style={{ backgroundColor: event.color }}></div>
              <div>
                <h4 className="calendar-event-name">{event.title}</h4>
                <p className="calendar-event-meta">{event.time}</p>
                <p className="calendar-event-meta">{event.location}</p>
              </div>
            </div>
          ))}
          <button className="btn-secondary calendar-see-more">See More</button>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid-container">
          <div className="calendar-nav">
            <button className="calendar-nav-label">Today</button>
            <div className="calendar-nav-center">
              <button className="calendar-nav-arrow" onClick={prevMonth}><ChevronLeft size={18} /></button>
              <span className="calendar-nav-month">{monthNames[currentMonth]} {currentYear}</span>
              <button className="calendar-nav-arrow" onClick={nextMonth}><ChevronRight size={18} /></button>
            </div>
            <div className="calendar-view-toggle">
              <button className="calendar-view-btn">Day</button>
              <button className="calendar-view-btn">Week</button>
              <button className="calendar-view-btn calendar-view-btn--active">Month</button>
            </div>
          </div>

          <div className="calendar-grid">
            {daysOfWeek.map((day) => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {calendarDays.map((day, idx) => (
              <div key={idx} className={`calendar-cell ${day ? '' : 'calendar-cell--empty'}`}>
                {day && <span className="calendar-cell-number">{day}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="orders-modal-overlay" onClick={() => setShowAddEvent(false)}>
          <div className="orders-modal" style={{ minWidth: 500 }} onClick={(e) => e.stopPropagation()}>
            <h3 className="orders-modal-title">Add New Event</h3>
            <form onSubmit={handleSubmitEvent} className="calendar-form">
              <div className="calendar-form-upload">
                <div className="calendar-form-avatar">📷</div>
                <span className="calendar-form-upload-label">Upload Cover Photo</span>
              </div>
              <div className="calendar-form-row">
                <label className="calendar-form-group">
                  <span>Event Name</span>
                  <input className="input-field" placeholder="Enter event name" value={newEvent.name} onChange={(e) => setNewEvent({...newEvent, name: e.target.value})} />
                </label>
                <label className="calendar-form-group">
                  <span>Time</span>
                  <input className="input-field" placeholder="12:04 BST" value={newEvent.time} onChange={(e) => setNewEvent({...newEvent, time: e.target.value})} />
                </label>
              </div>
              <div className="calendar-form-row">
                <label className="calendar-form-group">
                  <span>Date</span>
                  <input className="input-field" type="date" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} />
                </label>
                <label className="calendar-form-group">
                  <span>Address</span>
                  <input className="input-field" placeholder="Address" value={newEvent.address} onChange={(e) => setNewEvent({...newEvent, address: e.target.value})} />
                </label>
              </div>
              <label className="calendar-form-group">
                <span>Contact Number</span>
                <input className="input-field" placeholder="Enter your Contact Number" value={newEvent.contactNumber} onChange={(e) => setNewEvent({...newEvent, contactNumber: e.target.value})} />
              </label>
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 8 }}>Add New</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
