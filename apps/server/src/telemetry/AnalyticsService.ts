// This fork sends no analytics. The service keeps its interface so existing call sites compile,
// but every method does nothing: no events are buffered, no identifiers are read for sending,
// and there is no network client in this module.
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

import type { TelemetryOwner } from "./Identify.ts";

export class AnalyticsService extends Context.Service<
  AnalyticsService,
  {
    /** Always false: nothing is queued or sent. */
    readonly record: (
      event: string,
      properties?: Readonly<Record<string, unknown>>,
      options?: { readonly anonymous?: boolean },
    ) => Effect.Effect<boolean>;

    readonly flush: Effect.Effect<void>;

    /** Does nothing. */
    readonly recordOwners: (
      owners: ReadonlyArray<TelemetryOwner>,
      observedBy: "server" | "client",
    ) => Effect.Effect<void>;
  }
>()("t3/telemetry/AnalyticsService") {}

/** @public */
export const make = Effect.succeed(
  AnalyticsService.of({
    record: () => Effect.succeed(false),
    flush: Effect.void,
    recordOwners: () => Effect.void,
  }),
);

export const layer = Layer.effect(AnalyticsService, make);
