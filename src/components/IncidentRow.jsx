import Icon from './Icon'
import StatusSelect from './StatusSelect'
import { slug } from '../utils/formatters'

export default function IncidentRow({ incident, onOpen, onUpdate, compact = false }) {
  return (
    <div className="incident-row">
      <button className="incident-icon" type="button" onClick={() => onOpen(incident)}><Icon name="incidents" /></button>
      <button className="incident-main" type="button" onClick={() => onOpen(incident)}>
        <strong>{incident.title}</strong>
        <span><Icon name="pin" /> {incident.id} • {incident.location} • {incident.time} • {incident.assigned}</span>
      </button>
      <span className={`priority ${slug(incident.priority)}`}>{incident.priority}</span>
      {compact ? <span className={`status ${slug(incident.status)}`}>{incident.status}</span> : (
        <StatusSelect value={incident.status} onChange={(status) => onUpdate(incident.id, { status }, `Status changed to ${status}`)} />
      )}
    </div>
  )
}
