import { assert, it } from "@effect/vitest";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";

import * as AnalyticsService from "./AnalyticsService.ts";

it.effect("never queues or sends anything, even if a client is available", () =>
  Effect.gen(function* () {
    const requests: Array<string> = [];
    const client = HttpClient.make((request) =>
      Effect.sync(() => {
        requests.push(request.url);
        return HttpClientResponse.fromWeb(request, new Response(null, { status: 204 }));
      }),
    );
    yield* Effect.gen(function* () {
      const analytics = yield* AnalyticsService.AnalyticsService;
      assert.equal(yield* analytics.record("test.event", { index: 1 }), false);
      assert.equal(yield* analytics.record("test.anonymous", {}, { anonymous: true }), false);
      yield* analytics.recordOwners([{ source: "device", ownerId: "owner-1" }], "client");
      yield* analytics.flush;
    }).pipe(
      Effect.provide(
        AnalyticsService.layer.pipe(Layer.provide(Layer.succeed(HttpClient.HttpClient, client))),
      ),
    );
    assert.deepEqual(requests, []);
  }),
);
