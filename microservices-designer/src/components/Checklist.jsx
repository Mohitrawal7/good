import { useState } from 'react'
import { checklistPhases } from '../data'

export default function Checklist() {
  // Track checked items: { "Phase 1 — Foundation:0": true, ... }
  const [checked, setChecked] = useState({})

  function toggle(phase, idx) {
    const key = `${phase}:${idx}`
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const totalItems  = checklistPhases.reduce((acc, p) => acc + p.items.length, 0)
  const doneItems   = Object.values(checked).filter(Boolean).length
  const progressPct = Math.round((doneItems / totalItems) * 100)

  return (
    <div style={{ padding: '32px 36px', maxWidth: 720 }}>
      <h2
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6,
        }}
      >
        Your Getting Started Checklist
      </h2>
      <p style={{ fontSize: 12, color: '#556', marginBottom: 20 }}>
        A pragmatic path from monolith → microservices for SaaS beginners
      </p>

      {/* Progress bar */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: '#556' }}>Progress</span>
          <span style={{ fontSize: 11, color: '#f0a500' }}>{doneItems} / {totalItems}</span>
        </div>
        <div
          style={{
            height: 4, background: '#1a1e28', borderRadius: 4, overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #f0a500, #5ce0a0)',
              borderRadius: 4,
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      {checklistPhases.map(({ phase, color, items }) => (
        <div key={phase} style={{ marginBottom: 28 }}>
          {/* Phase header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 4, height: 20, background: color, borderRadius: 2 }} />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 14, fontWeight: 700, color,
              }}
            >
              {phase}
            </span>
          </div>

          {/* Items */}
          {items.map((item, i) => {
            const key     = `${phase}:${i}`
            const isDone  = !!checked[key]
            return (
              <div
                key={i}
                onClick={() => toggle(phase, i)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '10px 14px', marginBottom: 6,
                  background: isDone ? '#0d1a10' : '#12151d',
                  borderRadius: 6,
                  border: `1px solid ${isDone ? '#1e3a22' : '#1a1e28'}`,
                  fontSize: 13,
                  color: isDone ? '#5ce0a0' : '#8899aa',
                  lineHeight: 1.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  userSelect: 'none',
                }}
              >
                <span
                  style={{
                    marginTop: 1, flexShrink: 0,
                    color: isDone ? '#5ce0a0' : color,
                    fontSize: 14,
                  }}
                >
                  {isDone ? '✓' : '◆'}
                </span>
                <span style={{ textDecoration: isDone ? 'line-through' : 'none', opacity: isDone ? 0.6 : 1 }}>
                  {item}
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
