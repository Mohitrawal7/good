# SaaS Microservices Designer

An interactive visual tool for learning and designing microservices architecture.

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

## Project Structure

```
src/
├── data.js                        # All content: services, connections, patterns, checklist
├── main.jsx                       # React entry point
├── index.css                      # Global styles
├── App.jsx                        # Root component + tab routing
└── components/
    ├── ArchitectureDiagram.jsx    # SVG diagram with clickable hexagons
    ├── ServiceDetail.jsx          # Right-panel detail for selected service
    ├── CommunicationPatterns.jsx  # REST / async / gRPC pattern explorer
    └── Checklist.jsx              # Interactive getting-started checklist
```

## Customising

### Add a new service
In `src/data.js`, add an entry to the `services` array:

```js
{
  id: 'search',
  name: 'Search Service',
  icon: '⬡',
  color: '#e05ca0',
  x: 200,          // SVG x position
  y: 400,          // SVG y position
  description: 'Handles full-text search via Elasticsearch.',
  responsibilities: ['Indexing', 'Full-text search', 'Faceted filters'],
  tech: ['Elasticsearch', 'Node.js'],
}
```

Then add connections in the `connections` array:

```js
{ from: 'core', to: 'search', type: 'sync', label: 'REST' }
```

### Add a checklist phase
Append to the `checklistPhases` array in `src/data.js`.

## Build for production

```bash
npm run build
# Output goes to dist/
```
