// ─── Services ────────────────────────────────────────────────────────────────
export const services = [
  {
    id: 'gateway',
    name: 'API Gateway',
    icon: '⬡',
    color: '#f0a500',
    x: 360,
    y: 60,
    description:
      'Single entry point for all client requests. Handles routing, rate limiting, and auth token validation before forwarding to downstream services.',
    responsibilities: ['Request routing', 'Rate limiting', 'SSL termination', 'Auth token check'],
    tech: ['Kong', 'AWS API Gateway', 'Nginx'],
  },
  {
    id: 'auth',
    name: 'Auth Service',
    icon: '⬡',
    color: '#e05c5c',
    x: 100,
    y: 220,
    description:
      'Manages user identity, login, signup, JWT issuance, and OAuth flows. Other services verify tokens but never issue them.',
    responsibilities: ['Login / signup', 'JWT issuance', 'OAuth / SSO', 'Password reset'],
    tech: ['Node.js', 'Passport.js', 'Auth0'],
  },
  {
    id: 'user',
    name: 'User Service',
    icon: '⬡',
    color: '#5c9ee0',
    x: 300,
    y: 220,
    description:
      'Owns user profile data. Separate from Auth so profile changes don't affect authentication. Other services call this via REST to get user info.',
    responsibilities: ['User profiles', 'Preferences', 'Avatars', 'Account settings'],
    tech: ['Node.js / Go', 'PostgreSQL'],
  },
  {
    id: 'billing',
    name: 'Billing Service',
    icon: '⬡',
    color: '#5ce0a0',
    x: 500,
    y: 220,
    description:
      'Handles subscriptions, payments, and invoices. Publishes events (e.g. "subscription.upgraded") that other services consume asynchronously.',
    responsibilities: ['Subscriptions', 'Payments', 'Invoices', 'Plan limits'],
    tech: ['Stripe SDK', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'notification',
    name: 'Notification Service',
    icon: '⬡',
    color: '#a05ce0',
    x: 700,
    y: 220,
    description:
      'Listens to events from other services via a message broker and sends emails, SMS, or push notifications. Never called directly — purely event-driven.',
    responsibilities: ['Email', 'SMS', 'Push notifications', 'Templates'],
    tech: ['SendGrid', 'Twilio', 'RabbitMQ consumer'],
  },
  {
    id: 'core',
    name: 'Core App Service',
    icon: '⬡',
    color: '#e0885c',
    x: 300,
    y: 400,
    description:
      'The main business logic of your SaaS product. Calls User and Billing services via REST. Publishes domain events to the message broker.',
    responsibilities: ['Core features', 'Business logic', 'Data processing', 'Domain events'],
    tech: ['Your stack', 'PostgreSQL / MongoDB'],
  },
  {
    id: 'broker',
    name: 'Message Broker',
    icon: '⬡',
    color: '#5ce0d8',
    x: 560,
    y: 400,
    description:
      'Decouples services via async messaging. Services publish events; others subscribe. This prevents tight coupling and improves resilience.',
    responsibilities: ['Async events', 'Event sourcing', 'Dead-letter queues', 'Fan-out'],
    tech: ['RabbitMQ', 'Kafka', 'AWS SQS/SNS'],
  },
]

// ─── Connections ──────────────────────────────────────────────────────────────
export const connections = [
  { from: 'gateway', to: 'auth',         type: 'sync',  label: 'REST' },
  { from: 'gateway', to: 'user',         type: 'sync',  label: 'REST' },
  { from: 'gateway', to: 'billing',      type: 'sync',  label: 'REST' },
  { from: 'gateway', to: 'core',         type: 'sync',  label: 'REST' },
  { from: 'core',    to: 'user',         type: 'sync',  label: 'REST' },
  { from: 'core',    to: 'broker',       type: 'async', label: 'publish' },
  { from: 'billing', to: 'broker',       type: 'async', label: 'publish' },
  { from: 'broker',  to: 'notification', type: 'async', label: 'subscribe' },
]

// ─── Communication patterns ───────────────────────────────────────────────────
export const commPatterns = [
  {
    id: 'sync',
    name: 'Synchronous REST',
    icon: '↔',
    color: '#f0a500',
    description:
      'Service A calls Service B and waits for a response. Use when you need the result immediately (e.g., fetching a user profile during a request).',
    pros: ['Simple to implement', 'Immediate response', 'Easy to debug'],
    cons: ['Tight coupling', 'Cascading failures', 'Latency adds up'],
    when: 'Real-time data needs, user-facing requests',
  },
  {
    id: 'async',
    name: 'Async Messaging',
    icon: '→',
    color: '#5ce0d8',
    description:
      'Service A publishes an event to a broker; Service B consumes it later. Use for non-critical side effects (e.g., sending a welcome email after signup).',
    pros: ['Loose coupling', 'Resilient to failures', 'Scalable fan-out'],
    cons: ['Eventual consistency', 'Harder to debug', 'More infrastructure'],
    when: 'Notifications, analytics, background jobs',
  },
  {
    id: 'grpc',
    name: 'gRPC',
    icon: '⚡',
    color: '#e05c5c',
    description:
      'High-performance RPC using Protocol Buffers. Best for internal service-to-service calls where speed and type safety matter.',
    pros: ['Very fast', 'Strongly typed', 'Streaming support'],
    cons: ['Complex setup', 'Not browser-native', 'Binary format'],
    when: 'High-throughput internal calls, polyglot services',
  },
]

// ─── Checklist phases ─────────────────────────────────────────────────────────
export const checklistPhases = [
  {
    phase: 'Phase 1 — Foundation',
    color: '#f0a500',
    items: [
      'Start with a monolith first — don\'t over-architect early',
      'Identify natural domain boundaries (auth, billing, core features)',
      'Set up an API Gateway as your single public entry point',
      'Add an Auth Service to centralize identity & JWT issuance',
    ],
  },
  {
    phase: 'Phase 2 — Split & Connect',
    color: '#5c9ee0',
    items: [
      'Extract Billing into its own service (it changes independently)',
      'Give each service its own database — no shared DB!',
      'Use REST for synchronous needs (user reads, real-time UI)',
      'Add a message broker (RabbitMQ/SQS) for async events',
    ],
  },
  {
    phase: 'Phase 3 — Resilience',
    color: '#5ce0a0',
    items: [
      'Add circuit breakers (e.g. Resilience4j) for REST calls',
      'Implement health check endpoints on every service',
      'Use distributed tracing (e.g. Jaeger, Datadog) to debug calls',
      'Add dead-letter queues for failed async messages',
    ],
  },
  {
    phase: 'Phase 4 — Scale',
    color: '#a05ce0',
    items: [
      'Containerise each service with Docker',
      'Use Kubernetes or ECS to orchestrate & scale independently',
      'Define SLAs per service — not all need the same uptime',
      'Document your service contracts with OpenAPI specs',
    ],
  },
]
