// import * as Sentry from "@sentry/browser";

function init() {
  // Sentry.init({
  //   dsn: "https://f3eb93b35ca94ff3b2d8122fe323cdb3@sentry.io/1393396",
  //   release: "react-test-application@1.0.0",
  //   environment: "development-test"
  // });
}

function log(error) {
  console.log(error);
  // Sentry.captureException(error);
}

export default {
  init,
  log
};
