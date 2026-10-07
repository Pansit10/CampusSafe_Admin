import { useState } from 'react'
import Icon from './Icon'
import StatusSelect from './StatusSelect'
import { incidentTypes, priorityOptions, responders } from '../data/campusData'

export function IncidentForm({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title: '', type: 'Security', reporter: '', contact: '', location: '', priority: 'Medium', assigned: 'Gate Patrol', description: '' })
  const [error, setError] = useState('')
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const submit = (event) => { event.preventDefault(); if (!form.title || !form.location || !form.reporter) { setError('Title, location, and reporter are required.'); return } onSubmit(form) }
  return <div className="modal-backdrop" role="presentation"><form className="modal-card" onSubmit={submit}>
    <div className="modal-header"><h2>Create Incident</h2><button type="button" onClick={onClose}><Icon name="close" /></button></div>
    {error && <div className="error-box">{error}</div>}
    <div className="form-grid">
      <label>Title<input value={form.title} onChange={(event) => update('title', event.target.value)} /></label>
      <label>Type<select value={form.type} onChange={(event) => update('type', event.target.value)}>{incidentTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
      <label>Reporter<input value={form.reporter} onChange={(event) => update('reporter', event.target.value)} /></label>
      <label>Contact<input value={form.contact} onChange={(event) => update('contact', event.target.value)} /></label>
      <label>Location<input value={form.location} onChange={(event) => update('location', event.target.value)} /></label>
      <label>Priority<select value={form.priority} onChange={(event) => update('priority', event.target.value)}>{priorityOptions.map((priority) => <option key={priority}>{priority}</option>)}</select></label>
      <label>Assigned Team<select value={form.assigned} onChange={(event) => update('assigned', event.target.value)}>{responders.map((responder) => <option key={responder.name}>{responder.name}</option>)}</select></label>
      <label className="span-2">Description<textarea value={form.description} onChange={(event) => update('description', event.target.value)} /></label>
    </div>
    <div className="modal-actions"><button className="ghost-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Create Incident</button></div>
  </form></div>
}

export function IncidentDetails({ incident, auditLog, onClose, onUpdate }) {
  const entries = auditLog.filter((entry) => entry.incidentId === incident.id)
  return <aside className="details-drawer">
    <div className="modal-header"><h2>{incident.id}</h2><button type="button" onClick={onClose}><Icon name="close" /></button></div>
    <h3>{incident.title}</h3><p>{incident.description}</p>
    <dl className="details-list"><dt>Reporter</dt><dd>{incident.reporter}</dd><dt>Contact</dt><dd>{incident.contact}</dd><dt>Type</dt><dd>{incident.type}</dd><dt>Location</dt><dd>{incident.location}</dd><dt>Evidence</dt><dd>{incident.evidence}</dd><dt>Assigned</dt><dd>{incident.assigned}</dd></dl>
    <label>Status<StatusSelect value={incident.status} onChange={(status) => onUpdate(incident.id, { status }, `Status changed to ${status}`)} /></label>
    <section className="timeline"><h4>Timeline</h4>{entries.length === 0 ? <p>No audit entries yet.</p> : entries.map((entry) => <div key={entry.id}><strong>{entry.time}</strong><span>{entry.action}</span></div>)}</section>
  </aside>
}

export function NotificationsPanel({ notifications, onClose }) {
  return <aside className="notifications-panel"><div className="modal-header"><h2>Notifications</h2><button type="button" onClick={onClose}><Icon name="close" /></button></div>{notifications.length === 0 ? <div className="state-box">No new notifications.</div> : notifications.map((item) => <div className="notification-item" key={item.id}><strong>{item.title}</strong><span>{item.message}</span></div>)}</aside>
}
