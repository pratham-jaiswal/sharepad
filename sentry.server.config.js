// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://c430c4766e66772c14670ad51c410aac@o4508484665147392.ingest.us.sentry.io/4511637929263104",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  dataCollection: {
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#dataCollection
    userInfo: false,
    cookies: false,
    httpBodies: [],
    databaseQueryData: false,
    genAI: {
      inputs: false,
      outputs: false,
    },
  },
});
