import { priorityOptions } from '../data/campusData'

export default function ReportsPage({ incidents }) {
  const resolved = incidents.filter((incident) => incident.status === 'Resolved').length
  const resolutionRate = Math.round((resolved / incidents.length) * 100)
  const locations = ['Library', 'Dorm B', 'Parking C', 'Gym', 'Main Gate']
  const priorities = priorityOptions.map((priority) => ({ label: priority, count: incidents.filter((incident) => incident.priority === priority).length }))
  return <>
    <section className="stats-grid">
      <article className="stat-card"><p>Total Incidents</p><strong>{incidents.length}</strong></article>
      <article className="stat-card"><p>Critical Cases</p><strong>{incidents.filter((incident) => incident.priority === 'Critical').length}</strong></article>
      <article className="stat-card"><p>Resolution Rate</p><strong>{resolutionRate}%</strong></article>
      <article className="stat-card"><p>Busiest Area</p><strong>Library</strong></article>
    </section>
    <section className="report-grid">
      <article className="panel report-summary"><h2>Weekly Summary</h2><p>Focus patrol visibility on Library, Dorm B, and Parking C. Critical response is currently assigned to Medical Team.</p></article>
      <article className="panel chart-panel"><h2>By Priority</h2>{priorities.map((item) => <div className="bar-line" key={item.label}><span>{item.label}</span><meter min="0" max="5" value={item.count}></meter><strong>{item.count}</strong></div>)}</article>
      <article className="panel chart-panel"><h2>Hot Locations</h2>{locations.map((location) => <div className="bar-line" key={location}><span>{location}</span><meter min="0" max="4" value={incidents.filter((incident) => incident.location === location).length}></meter><strong>{incidents.filter((incident) => incident.location === location).length}</strong></div>)}</article>
    </section>
  </>
}
