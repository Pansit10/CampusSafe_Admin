import { useState } from 'react'
import { initialAccounts, rolePermissions } from '../data/campusData'
import { slug } from '../utils/formatters'

export default function AccountsPage() {
  const [role, setRole] = useState('All')
  const visibleAccounts = initialAccounts.filter((account) => role === 'All' || account.role === role)
  return <section className="account-layout">
    <article className="panel accounts-panel">
      <div className="panel-title"><h2>Manage Account</h2><button type="button">Add Account</button></div>
      <div className="toolbar"><span className="queue-summary">{visibleAccounts.length} accounts</span><select value={role} onChange={(event) => setRole(event.target.value)}><option>All</option><option>Admin</option><option>Staff</option><option>User</option><option>Viewer</option></select></div>
      <table><thead><tr><th>Name</th><th>Role</th><th>Email</th><th>Status</th><th>Action</th></tr></thead><tbody>{visibleAccounts.map((account) => <tr key={account.email}><td>{account.name}</td><td>{account.role}</td><td>{account.email}</td><td><span className={`status ${slug(account.status)}`}>{account.status}</span></td><td><button type="button">Edit</button></td></tr>)}</tbody></table>
    </article>
    <article className="panel permissions-panel"><h2>Role Permissions</h2>{Object.entries(rolePermissions).map(([roleName, permissions]) => <div key={roleName}><strong>{roleName}</strong><span>{permissions.join(' • ')}</span></div>)}</article>
  </section>
}
