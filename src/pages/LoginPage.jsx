import { sealPath } from '../data/campusData'

export default function LoginPage({ onLogin }) {
  return (
    <main className="login-shell">
      <section className="login-brand-panel">
        <img className="login-seal" src={sealPath} alt="Manuel S. Enverga University Foundation seal" />
        <h1>CampusSafe</h1>
        <p>Manuel S. Enverga University Foundation</p>
        <span>Campus Safety Administration</span>
      </section>
      <section className="login-form-panel">
        <form className="login-card" onSubmit={(event) => { event.preventDefault(); onLogin() }}>
          <h2>Sign in</h2>
          <label>Email<input type="email" defaultValue="admin@mseuf.edu.ph" /></label>
          <label>Password<input type="password" defaultValue="campussafe" /></label>
          <button type="submit" className="primary-button">Sign In</button>
        </form>
      </section>
    </main>
  )
}
