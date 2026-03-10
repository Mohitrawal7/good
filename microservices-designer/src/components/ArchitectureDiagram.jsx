import { services, connections } from '../data'

// Centre of each hexagon (hex is 110×100, positioned at service.x/y)
function hexCenter(service) {
  return { cx: service.x + 55, cy: service.y + 50 }
}

function getServiceById(id) {
  return services.find((s) => s.id === id)
}

export default function ArchitectureDiagram({ activeService, onServiceClick }) {
  return (
    <div style={{ flex: 1, padding: '24px 16px' }}>
      <svg width="100%" viewBox="0 0 860 520" style={{ display: 'block' }}>

        {/* Connection lines */}
        {connections.map((conn, i) => {
          const from = getServiceById(conn.from)
          const to   = getServiceById(conn.to)
          const f    = hexCenter(from)
          const t    = hexCenter(to)
          const isAsync = conn.type === 'async'
          return (
            <g key={i}>
              <line
                x1={f.cx} y1={f.cy}
                x2={t.cx} y2={t.cy}
                stroke={isAsync ? '#5ce0d8' : '#f0a500'}
                strokeWidth={isAsync ? 1.5 : 2}
                strokeOpacity={0.35}
                className={isAsync ? 'conn-async' : ''}
              />
              <text
                x={(f.cx + t.cx) / 2}
                y={(f.cy + t.cy) / 2 - 5}
                fill={isAsync ? '#5ce0d8' : '#f0a500'}
                fontSize="9"
                textAnchor="middle"
                opacity={0.7}
              >
                {conn.label}
              </text>
            </g>
          )
        })}

        {/* Service hexagons */}
        {services.map((s) => {
          const isActive = activeService === s.id
          const pts = '55,5 100,30 100,75 55,100 10,75 10,30'
          return (
            <g
              key={s.id}
              className="service-hex"
              transform={`translate(${s.x}, ${s.y})`}
              onClick={() => onServiceClick(isActive ? null : s.id)}
            >
              <polygon
                points={pts}
                fill={isActive ? s.color : '#12151d'}
                stroke={s.color}
                strokeWidth={isActive ? 2.5 : 1.5}
                strokeOpacity={isActive ? 1 : 0.6}
                style={{
                  filter: isActive ? `drop-shadow(0 0 12px ${s.color}66)` : 'none',
                  transition: 'all 0.2s',
                }}
              />
              <text
                x="55" y="48"
                textAnchor="middle"
                fill={isActive ? '#000' : s.color}
                fontSize="18"
                opacity={0.9}
              >
                {s.icon}
              </text>
              <text
                x="55" y="64"
                textAnchor="middle"
                fill={isActive ? '#000' : '#c8cdd8'}
                fontSize="9"
                fontWeight={isActive ? 'bold' : 'normal'}
              >
                {s.name}
              </text>
            </g>
          )
        })}

        {/* Client node */}
        <g>
          <rect x="330" y="0" width="60" height="28" rx="5" fill="#1a1e28" stroke="#333" strokeWidth="1" />
          <text x="360" y="18" textAnchor="middle" fill="#778" fontSize="10">Client</text>
          <line x1="360" y1="28" x2="415" y2="60" stroke="#445" strokeWidth="1.5" strokeDasharray="3 3" />
        </g>

        {/* Legend */}
        <g transform="translate(20, 490)">
          <line x1="0" y1="8" x2="28" y2="8" stroke="#f0a500" strokeWidth="2" />
          <text x="34" y="12" fill="#778" fontSize="10">REST (sync)</text>
          <line x1="110" y1="8" x2="138" y2="8" stroke="#5ce0d8" strokeWidth="1.5" strokeDasharray="5 4" />
          <text x="144" y="12" fill="#778" fontSize="10">Events (async)</text>
        </g>
      </svg>
    </div>
  )
}
