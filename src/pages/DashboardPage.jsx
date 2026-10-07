import Icon from '../components/Icon'
import IncidentRow from '../components/IncidentRow'
import { responders } from '../data/campusData'

export default function DashboardPage({ incidents, notifications, onNavigateQueue, onOpenIncident, onUpdateIncident, auditLog }) {
  const openCount = incidents.filter((incident) => incident.status !== 'Resolved').length
  const respondingCount = incidents.filter((incident) => incident.status === 'Responding').length
  const resolvedCount = incidents.filter((incident) => incident.status === 'Resolved').length
  const criticalCount = incidents.filter((incident) => incident.priority === 'Critical').length
  const stats = [
    { label: 'Open Incidents', value: openCount, badge: `${criticalCount} critical`, icon: 'incidents', tone: 'blue' },
    { label: 'Responding', value: respondingCount, badge: 'Live', icon: 'clock', tone: 'amber' },
    { label: 'Resolved', value: resolvedCount, badge: 'Today', icon: 'check', tone: 'green' },
    { label: 'Notifications', value: notifications.length, badge: 'New', icon: 'bell', tone: 'blue' },
  ]

  return <>
    <section className="quick-actions">
      <button type="button" onClick={() => onNavigateQueue('Active')}>Open Queue</button>
      <button type="button" onClick={() => onNavigateQueue('Under Review')}>Review Pending</button>
      <button type="button" onClick={() => onNavigateQueue('Responding')}>Monitor Response</button>
    </section>
    <section className="stats-grid">{stats.map((stat) => <article className="stat-card" key={stat.label}><div className={`stat-icon ${stat.tone}`}><Icon name={stat.icon} /></div><span className={`stat-badge ${stat.tone}`}>{stat.badge}</span><p>{stat.label}</p><strong>{stat.value}</strong></article>)}</section>
    <section className="dashboard-layout">
      <article className="panel recent-panel"><div className="panel-title"><h2>Priority Queue</h2><button type="button" onClick={() => onNavigateQueue('All')}>View All</button></div><div className="incident-list">{incidents.slice(0, 4).map((incident) => <IncidentRow incident={incident} key={incident.id} onOpen={onOpenIncident} onUpdate={onUpdateIncident} compact />)}</div></article>
      <aside className="side-stack">
        <article className="panel response-card"><h2>Avg Response Time</h2><div><strong>4.2</strong><span>minutes</span></div><p>12% faster than last week</p></article>
        <article className="panel responders-card"><h2>Active Responders</h2><div className="responders-count"><Icon name="users" /><strong>{responders.length}</strong><span>Teams ready</span></div><dl><dt>Available</dt><dd>{responders.filter((item) => item.status === 'Available').length}</dd><dt>Responding</dt><dd>{responders.filter((item) => item.status === 'Responding').length}</dd></dl></article>
        <article className="panel responder-list"><h2>Audit Log</h2>{auditLog.slice(0, 4).map((entry) => <div key={entry.id}><span>{entry.action}</span><strong>{entry.time}</strong></div>)}</article>
      </aside>
    </section>
  </>
}
