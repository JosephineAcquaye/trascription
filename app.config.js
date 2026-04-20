const appJson = require("./app.json");

export default {
  expo: {
    ...appJson.expo,
    extra: {
      ...(appJson.expo?.extra || {}),
      posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
      posthogHost: process.env.POSTHOG_HOST,
      eas: {
        projectId: "a4565ac3-30a5-4cfd-a10a-cf6db304ed7d",
      },
    },
  },
  ios: {
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
};
