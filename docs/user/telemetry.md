# Product usage data

This fork sends no product usage data and no agent feedback. The analytics client is a no-op:
it queues nothing and makes no network requests, and no endpoint or key for one is in the source.
Agent feedback tools are never offered to agents and the Labs control is hidden.

Other network traffic is unrelated to telemetry: your AI provider connections, and update and
install downloads from the upstream project's GitHub releases. An operator can still point the
server at their own relay or OTLP collector through environment variables; nothing is configured
by default.
