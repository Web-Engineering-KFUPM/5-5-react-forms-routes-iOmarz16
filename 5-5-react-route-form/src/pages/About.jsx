export default function About() {
  return (
    <section>
      <h1>About the Portal</h1>
      <p>
        This demo app simulates a small university portal used to practice
        navigation and form handling in React.
      </p>

      <div className="grid-2">
        <div className="card">
          <h3>What You’ll Learn</h3>
          <ul className="list">
            <li>⚙️ Setting up client-side routing</li>
            <li>🧠 Controlled inputs with <code>useState</code></li>
            <li>✅ Validating user input and showing errors</li>
          </ul>
        </div>

        <div className="card">
          <h3>Lab Scenario</h3>
          <p>
            You’re helping the school launch online registration. Start with a
            basic email field, then extend the form to collect secure and
            complete information.
          </p>
          <div className="keyline">
            <span className="key">Task</span>
            <span className="value">Build routes → expand form → validate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
