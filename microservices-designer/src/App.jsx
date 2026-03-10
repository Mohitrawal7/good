import { useState } from 'react'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import ServiceDetail        from './components/ServiceDetail'
import CommunicationPatterns from './components/CommunicationPatterns'
import Checklist            from './components/Checklist'

const TABS = [
  { id: 'diagram',   label: '🗺  Architecture'   },
  { id: 'patterns',  label: '⚡ Communication'   },
  { id: 'checklist', label: '✅ Getting Started' },
]

export default function App() {
  const [tab,           setTab]           = useState('diagram')
  const [activeService, setActiveService] = useState(null)

  return (
    <div
      style={{
        fontFamily: "'DM Mono', 'Fira Mono', monospace",
        background: '#0d0f14',
        minHeight: '100vh',
        color: '#c8cdd8',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{ padding: '28px 36px 0', borderBottom: '1px solid #1a1e28' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 4 }}>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 26, fontWeight: 800, color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            SaaS Microservices
          </h1>
          <span style={{ fontSize: 11, color: '#556', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Architecture Designer
          </span>
        </div>

        <p style={{ fontSize: 12, color: '#445', marginBottom: 18 }}>
          Click any service to explore it · Switch tabs to learn communication patterns
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #1a1e28', marginBottom: '-1px' }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ────────────────────────────────────────────────── */}
      {tab === 'diagram' && (
        <div style={{ display: 'flex', gap: 0 }}>
          <ArchitectureDiagram
            activeService={activeService}
            onServiceClick={setActiveService}
          />
          <div
            style={{
              width: 280,
              borderLeft: '1px solid #1a1e28',
              padding: '24px 20px',
              minHeight: 520,
            }}
          >
            <ServiceDetail activeService={activeService} />
          </div>
        </div>
      )}

      {tab === 'patterns' && <CommunicationPatterns />}

      {tab === 'checklist' && <Checklist />}
    </div>
  )
}
