import Icon from './Icon'
import { navItems, sealPath } from '../data/campusData'

export function Sidebar({ activePage, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={sealPath} alt="MSEUF seal" />
        <div><strong>CampusSafe</strong><span>Admin Portal</span></div>
      </div>
      <nav className="nav-list" aria-label="Admin navigation">
        {navItems.map((item) => (
          <button key={item.id} className={activePage === item.id ? 'active' : ''} type="button" onClick={() => onNavigate(item.id)}>
            <Icon name={item.icon} className="nav-icon" />{item.label}
          </button>
        ))}
      </nav>
      <button className="logout-button" type="button" onClick={onLogout}>Logout</button>
    </aside>
  )
}

export function PageHeader({ activePage, notificationCount, onNewIncident, onToggleNotifications }) {
  const label = navItems.find((item) => item.id === activePage)?.label ?? 'Dashboard'
  return (
    <header className="page-header">
      <div><h1>{label === 'Dashboard' ? 'Dashboard Overview' : label}</h1><p>Welcome back, Administrator</p></div>
      <div className="header-actions">
        <button type="button" className="ghost-button notification-button" onClick={onToggleNotifications}><Icon name="bell" /> {notificationCount}</button>
        <button type="button" className="ghost-button">Export</button>
        <button type="button" className="primary-button" onClick={onNewIncident}><Icon name="plus" /> New Incident</button>
      </div>
    </header>
  )
}
