import { useState } from 'react'
import { Sidebar, PageHeader } from '../components/AppLayout'
import { IncidentDetails, IncidentForm, NotificationsPanel } from '../components/IncidentDialogs'
import { initialIncidents, initialMessages } from '../data/campusData'
import AccountsPage from './AccountsPage'
import ChatPage from './ChatPage'
import DashboardPage from './DashboardPage'
import IncidentsPage from './IncidentsPage'
import ReportsPage from './ReportsPage'

export default function AdminDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('dashboard')
  const [incidentList, setIncidentList] = useState(initialIncidents)
  const [statusFilter, setStatusFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [auditLog, setAuditLog] = useState([{ id: 'AUD-1', incidentId: 'INC-1048', action: 'Medical Team assigned', time: '12 mins ago' }, { id: 'AUD-2', incidentId: 'INC-1047', action: 'Moved to Under Review', time: '22 mins ago' }])
  const notifications = incidentList.filter((incident) => incident.priority === 'Critical' || incident.status === 'Active').map((incident) => ({ id: incident.id, title: incident.title, message: `${incident.priority} priority at ${incident.location}` }))
  const logAction = (incidentId, action) => setAuditLog((current) => [{ id: `AUD-${Date.now()}`, incidentId, action, time: 'Just now' }, ...current])
  const updateIncident = (id, updates, action = 'Incident updated') => { setIncidentList((current) => current.map((incident) => incident.id === id ? { ...incident, ...updates } : incident)); setSelectedIncident((current) => current?.id === id ? { ...current, ...updates } : current); logAction(id, action) }
  const navigateQueue = (status) => { setStatusFilter(status); setActivePage('incidents') }
  const createIncident = (form) => {
    const id = `INC-${1050 + incidentList.length}`
    const incident = { id, ...form, time: 'Just now', status: 'Active', evidence: 'No attachment', notes: 'Awaiting first response.' }
    setIncidentList((current) => [incident, ...current]); logAction(id, 'Incident created'); setShowForm(false); setSelectedIncident(incident); setStatusFilter('Active'); setActivePage('incidents')
  }
  const sendMessage = (threadId, message) => setMessages((current) => current.map((thread) => thread.id === threadId ? { ...thread, preview: message, messages: [...thread.messages, message] } : thread))
  return <main className="admin-shell">
    <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={onLogout} />
    <section className="content-area">
      <PageHeader activePage={activePage} notificationCount={notifications.length} onNewIncident={() => setShowForm(true)} onToggleNotifications={() => setShowNotifications(true)} />
      {activePage === 'dashboard' && <DashboardPage incidents={incidentList} notifications={notifications} onNavigateQueue={navigateQueue} onOpenIncident={setSelectedIncident} onUpdateIncident={updateIncident} auditLog={auditLog} />}
      {activePage === 'incidents' && <IncidentsPage incidents={incidentList} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} onUpdateIncident={updateIncident} onOpenIncident={setSelectedIncident} />}
      {activePage === 'reports' && <ReportsPage incidents={incidentList} />}{activePage === 'accounts' && <AccountsPage />}{activePage === 'chat' && <ChatPage messages={messages} onSendMessage={sendMessage} />}
    </section>
    {showForm && <IncidentForm onClose={() => setShowForm(false)} onSubmit={createIncident} />}
    {selectedIncident && <IncidentDetails incident={selectedIncident} auditLog={auditLog} onClose={() => setSelectedIncident(null)} onUpdate={updateIncident} />}
    {showNotifications && <NotificationsPanel notifications={notifications} onClose={() => setShowNotifications(false)} />}
  </main>
}
