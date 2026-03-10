import { useState } from 'react'
import { commPatterns } from '../data'

export default function CommunicationPatterns() {
  const [activePattern, setActivePattern] = useState('sync')
  const selected = commPatterns.find((p) => p.id === activePattern)

  return (
    <div style={{ display: 'flex', gap: 0, minHeight: 480 }}>

      {/* Sidebar */}
      <div
        style={{
          width: 260,
          borderRight: '1px solid #1a1e28',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {commPatterns.map((p) => (
          <div
            key={p.id}
            className={`pattern-card ${activePattern === p.id ? 'active' : ''}`}
            style={{ '--card-color': p.color }}
            onClick={() => setActivePattern(p.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 20, color: p.color }}>{p.icon}</span>
              <span
                style={{
                  fontSize: 13,
                  color: activePattern === p.id ? p.color : '#aab',
                  fontWeight: 500,
                }}
              >
                {p.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail */}
      {selected && (
        <div style={{ flex: 1, padding: '32px 36px' }} className="fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <span style={{ fontSize: 36, color: selected.color }}>{selected.icon}</span>
            <div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 22, fontWeight: 800, color: '#fff',
                }}
              >
                {selected.name}
              </h2>
              <span style={{ fontSize: 11, color: '#445', letterSpacing: '0.1em' }}>
                COMMUNICATION PATTERN
              </span>
            </div>
          </div>

          <p
            style={{
              fontSize: 13, lineHeight: 1.8, color: '#8899aa',
              maxWidth: 560, marginBottom: 28,
            }}
          >
            {selected.description}
          </p>

          <div
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 20, maxWidth: 560, marginBottom: 28,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10, color: '#5ce0a0',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                Pros
              </div>
              {selected.pros.map((p) => (
                <div key={p}>
                  <span className="pill pro">✓ {p}</span>
                </div>
              ))}
            </div>
            <div>
              <div
                style={{
                  fontSize: 10, color: '#e05c5c',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                Cons
              </div>
              {selected.cons.map((c) => (
                <div key={c}>
                  <span className="pill con">✗ {c}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: '#12151d',
              border: '1px solid #1a1e28',
              borderRadius: 8,
              padding: '16px 20px',
              maxWidth: 560,
            }}
          >
            <div
              style={{
                fontSize: 10, color: '#556',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              When to use in your SaaS
            </div>
            <p style={{ fontSize: 13, color: '#aab', lineHeight: 1.7 }}>{selected.when}</p>
          </div>
        </div>
      )}
    </div>
  )
}
