export const sealPath = '/mseuf-seal.svg'

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'incidents', label: 'Incidents', icon: 'incidents' },
  { id: 'reports', label: 'Reports', icon: 'reports' },
  { id: 'accounts', label: 'Account', icon: 'account' },
  { id: 'chat', label: 'Chat', icon: 'chat' },
]

export const initialIncidents = [
  { id: 'INC-1049', title: 'Suspicious Activity', type: 'Security', reporter: 'Jay Ann Porter', contact: '0917-555-1049', description: 'Unidentified person was seen repeatedly checking classroom doors near the library wing.', evidence: 'CCTV still attached', location: 'Library', time: '5 mins ago', priority: 'High', status: 'Active', assigned: 'Gate Patrol', notes: 'Verify CCTV and patrol the library hallway.' },
  { id: 'INC-1048', title: 'Medical Emergency', type: 'Medical', reporter: 'Rica Santos', contact: '0918-555-1048', description: 'Student reported dizziness and shortness of breath inside Dorm B lobby.', evidence: 'Nurse report pending', location: 'Dorm B', time: '12 mins ago', priority: 'Critical', status: 'Responding', assigned: 'Medical Team', notes: 'Medical team dispatched. Keep route clear.' },
  { id: 'INC-1047', title: 'Theft Report', type: 'Property', reporter: 'Mark Dela Cruz', contact: '0919-555-1047', description: 'Missing laptop bag reported near Parking C waiting area.', evidence: 'Photo of area attached', location: 'Parking C', time: '25 mins ago', priority: 'Medium', status: 'Under Review', assigned: 'Investigation', notes: 'Review parking CCTV from 2:00 PM to 2:30 PM.' },
  { id: 'INC-1046', title: 'Vandalism', type: 'Facilities', reporter: 'Lara Mateo', contact: '0920-555-1046', description: 'Graffiti found on gym hallway wall after afternoon classes.', evidence: 'Photo attached', location: 'Gym', time: '1 hour ago', priority: 'Low', status: 'Resolved', assigned: 'Facilities', notes: 'Facilities cleaned the affected wall.' },
]

export const initialAccounts = [
  { name: 'John Smith', role: 'Admin', email: 'john.smith@gmail.com', status: 'Active' },
  { name: 'Olivia Bennett', role: 'User', email: 'olivia@email.com', status: 'Active' },
  { name: 'Daniel Moreno', role: 'User', email: 'dmoreno@gmail.com', status: 'Pending' },
  { name: 'Chloe Hayes', role: 'Staff', email: 'chloeh@gmail.com', status: 'Active' },
  { name: 'Marcus Reed', role: 'Viewer', email: 'mreed877@gmail.com', status: 'Disabled' },
]

export const responders = [
  { name: 'Gate Patrol', status: 'Available' },
  { name: 'Medical Team', status: 'Responding' },
  { name: 'Roving Unit', status: 'Available' },
  { name: 'Investigation', status: 'Available' },
  { name: 'Facilities', status: 'Available' },
]

export const initialMessages = [
  { id: 'medical', name: 'Medical Team', preview: 'Arriving at Dorm B now.', messages: ['Arriving at Dorm B now.', 'Please update case INC-1048 after assessment.'] },
  { id: 'gate', name: 'Gate Patrol', preview: 'Library patrol started.', messages: ['Library patrol started.', 'Check west entrance first.'] },
  { id: 'student', name: 'Student Support', preview: 'Reporter is waiting near lobby.', messages: ['Reporter is waiting near lobby.', 'Ask them to stay with the duty officer.'] },
]

export const rolePermissions = {
  Admin: ['Manage incidents', 'Manage accounts', 'View reports', 'Export data'],
  Staff: ['Update incidents', 'Assign responders', 'View reports'],
  User: ['Submit reports', 'View own reports'],
  Viewer: ['View dashboard', 'View reports'],
}

export const statusOptions = ['Active', 'Responding', 'Under Review', 'Resolved']
export const priorityOptions = ['Critical', 'High', 'Medium', 'Low']
export const incidentTypes = ['Security', 'Medical', 'Property', 'Facilities', 'Conduct']
