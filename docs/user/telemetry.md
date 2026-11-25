# Product usage data

In this fork the product analytics client is a no-op: it queues nothing and makes no network
request, and no analytics endpoint or key is in the source. Agent feedback is never offered to
agents, the Labs control is hidden, and relay tracing is forced off.

What this does not cover:

- Connections you choose to make, such as your AI providers, git hosts and MCP servers.
- Cloud, relay and hosted-pairing code is still present. It talks to a relay or identity provider
  only if you configure one at build time or through environment variables
  (`T3CODE_RELAY_URL`, `T3CODE_CLERK_*`). `.env.example` no longer carries T3's values.
- Update checks: this fork refuses to download upstream release archives unless
  `T3CODE_ALLOW_UPSTREAM_UPDATES=1` is set, because upstream builds include the removed
  telemetry. A desktop build uses the release feed of the repository it was built from.
- Informational links to t3.codes (download page, privacy policy, schema URL) are only opened
  when you click them.

This describes the source in this repository. It is not an audit of third-party dependencies.
