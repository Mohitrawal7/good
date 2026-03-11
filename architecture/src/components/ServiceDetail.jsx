import { services } from '../data'

export default function ServiceDetail({ activeService }) {
  const s = services.find((svc) => svc.id === activeService)

  if (!s) {
    return (
      <div style={{ color: '#334', fontSize: 12, lineHeight: 1.8, paddingTop: 20 }}>
        <div style={{ fontSize: 10, color: '#445', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
          How to read this
        </div>
        <p style={{ marginBottom: 12 }}>
          Each hexagon is a{' '}
          <span style={{ color: '#f0a500' }}>microservice</span> — an independent
          deployable unit with its own database.
        </p>
        <p style={{ marginBottom: 12 }}>
          <span style={{ color: '#f0a500' }}>Yellow solid lines</span> = synchronous
          REST calls (caller waits for response).
        </p>
        <p style={{ marginBottom: 12 }}>
          <span style={{ color: '#5ce0d8' }}>Teal dashed lines</span> = async events
          via a message broker (fire and forget).
        </p>
        <p>
          👆 <strong style={{ color: '#667' }}>Click any service</strong> to learn
          what it does.
        </p>
      </div>
    )
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 10, height: 10, borderRadius: '50%',
            background: s.color,
            boxShadow: `0 0 8px ${s.color}`,
          }}
        />
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 16, fontWeight: 700, color: '#fff',
          }}
        >
          {s.name}
        </span>
      </div>

      <p style={{ fontSize: 12, lineHeight: 1.7, color: '#8899aa', marginBottom: 18 }}>
        {s.description}
      </p>

      {/* Responsibilities */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 10, color: '#556',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Responsibilities
        </div>
        {s.responsibilities.map((r) => (
          <div
            key={r}
            style={{
              fontSize: 12, color: '#aab',
              padding: '4px 0',
              borderBottom: '1px solid #1a1e28',
            }}
          >
            → {r}
          </div>
        ))}
      </div>

      {/* Tech */}
      <div>
        <div
          style={{
            fontSize: 10, color: '#556',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Common Tech
        </div>
        <div>
          {s.tech.map((t) => (
            <span key={t} className="pill">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
