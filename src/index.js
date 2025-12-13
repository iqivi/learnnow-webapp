import React from 'react';
import ReactDOM from 'react-dom/client';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f4f8 0%, #e0e7ee 100%)',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  card: {
    background: 'white',
    padding: '40px 60px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
  },
  icon: {
    fontSize: '60px',
    marginBottom: '20px',
    color: '#00bcd4', 
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '10px',
    fontWeight: '700',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: '1.2em',
    color: '#7f8c8d',
    marginBottom: '30px',
  },
  projectInfo: {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid #ecf0f1',
    fontSize: '0.9em',
    color: '#95a5a6',
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '600',
    margin: '0 10px',
  }
};

const UnderConstructionPage = () => {
  const [uptime, setUptime] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const fetchUptime = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/uptime");  
      const text = await response.text();
      setUptime(text);
    } catch (err) {
      setUptime("Error fetching uptime");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>🚧</div>

        <h1 style={styles.title}>Strona w Budowie</h1>

        {/* Links */}
        <p>For devs:</p>
        <div style={{ marginTop: "15px" }}>
          <a style={styles.link} href="https://github.com/iqivi">Github Repositories</a>
          <a style={styles.link} href="https://jenkins.learnnow.ovh">Jenkins CI/CD</a>
        </div>

        {/* Backend uptime */}
        <div style={{ marginTop: "40px" }}>
          <button
            style={{
              padding: "10px 20px",
              background: "#00bcd4",
              border: "none",
              borderRadius: "8px",
              color: "white",
              fontSize: "1em",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
            onClick={fetchUptime}
          >
            {loading ? "Loading..." : "Check Backend Uptime"}
          </button>

          {/* uptime text output */}
          {uptime && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                background: "#ecf9ff",
                borderRadius: "8px",
                color: "#006b78",
                fontWeight: "600"
              }}
            >
              Backend uptime: {uptime}
            </div>
          )}
        </div>

        <p style={styles.projectInfo}>
          Projekt realizowany z wykorzystaniem Docker, Nginx, React, Java Spring, Jenkins i Gerrit.
        </p>
      </div>
    </div>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UnderConstructionPage />
  </React.StrictMode>
);
