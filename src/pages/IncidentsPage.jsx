import { useState } from 'react'
import Icon from '../components/Icon'
import IncidentRow from '../components/IncidentRow'
import { priorityOptions, statusOptions } from '../data/campusData'

export default function IncidentsPage({ incidents, statusFilter, onStatusFilterChange, onUpdateIncident, onOpenIncident }) {
  const [query, setQuery] = useState('')
  const [priority, setPriority] = useState('All')
  const [isLoading, setIsLoading] = useState(false)
  const visibleIncidents = incidents.filter((incident) => {
    const matchesQuery = `${incident.id} ${incident.title} ${incident.location} ${incident.priority} ${incident.assigned}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (statusFilter === 'All' || incident.status === statusFilter) && (priority === 'All' || incident.priority === priority)
  })
  const runRefresh = () => { setIsLoading(true); window.setTimeout(() => setIsLoading(false), 450) }

  return <article className="panel">
    <div className="toolbar">
      <label className="search-field"><Icon name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ID, location, team" /></label>
      <select value={statusFilter} onChange={(event) => onStatusFilterChange(event.target.value)}><option>All</option>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select>
      <select value={priority} onChange={(event) => setPriority(event.target.value)}><option>All</option>{priorityOptions.map((item) => <option key={item}>{item}</option>)}</select>
      <button className="ghost-button" type="button" onClick={runRefresh}>Refresh</button>
    </div>
    <div className="queue-summary">Showing {visibleIncidents.length} of {incidents.length} incidents</div>
    {isLoading && <div className="state-box">Loading latest incident queue...</div>}
    {!isLoading && visibleIncidents.length === 0 && <div className="state-box">No incidents match your filters.</div>}
    {!isLoading && visibleIncidents.length > 0 && <div className="incident-list">{visibleIncidents.map((incident) => <IncidentRow incident={incident} key={incident.id} onOpen={onOpenIncident} onUpdate={onUpdateIncident} />)}</div>}
  </article>
}
