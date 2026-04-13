<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Recurrly Expo app. Here is a summary of every change made:

- **`package.json`** — Added `posthog-react-native` (^4.41.1) and `react-native-svg` (^15.15.4, required peer dependency).
- **`.env`** — Added `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` environment variables (values set locally, never committed).
- **`app.config.js`** — Created to replace `app.json` as the Expo config entry point. Passes `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` into `extra` so they are available at runtime via `expo-constants`.
- **`src/config/posthog.ts`** — Created the PostHog client instance, loading credentials from `Constants.expoConfig.extra`. Enables lifecycle event capture, debug logging in dev, and graceful no-op when the token is not set.
- **`app/_layout.tsx`** — Wraps the app in `PostHogProvider` with autocapture and manual screen tracking via `posthog.screen()` on every route change.
- **`app/(auth)/sign-in.tsx`** — Captures `user_signed_in` and `user_sign_in_failed`; calls `posthog.identify()` on successful sign-in.
- **`app/(auth)/sign-up.tsx`** — Captures `user_signed_up` and `user_sign_up_failed`; calls `posthog.identify()` on successful registration.
- **`app/(tabs)/index.tsx`** — Added `subscription_add_modal_opened` when the + button is pressed; existing events `subscription_created`, `subscription_expanded`, `subscription_collapsed` already in place.
- **`app/(tabs)/settings.tsx`** — Captures `user_signed_out` and calls `posthog.reset()` on sign-out.
- **`app/subscriptions/[id].tsx`** — Captures `subscription_details_viewed` on mount with `subscription_id` property.
- **`app/onboarding.tsx`** — Captures `onboarding_viewed` on mount (top of acquisition funnel).

| Event | Description | File |
|---|---|---|
| `user_signed_in` | User successfully signed in | `app/(auth)/sign-in.tsx` |
| `user_sign_in_failed` | Sign-in attempt failed with an error | `app/(auth)/sign-in.tsx` |
| `user_signed_up` | New user completed registration | `app/(auth)/sign-up.tsx` |
| `user_sign_up_failed` | Sign-up attempt failed with an error | `app/(auth)/sign-up.tsx` |
| `onboarding_viewed` | User viewed the onboarding screen | `app/onboarding.tsx` |
| `subscription_add_modal_opened` | User tapped + to open the add-subscription modal | `app/(tabs)/index.tsx` |
| `subscription_created` | User created a new subscription | `app/(tabs)/index.tsx` |
| `subscription_expanded` | User expanded a subscription card | `app/(tabs)/index.tsx` |
| `subscription_collapsed` | User collapsed a subscription card | `app/(tabs)/index.tsx` |
| `subscription_details_viewed` | User viewed a subscription detail page | `app/subscriptions/[id].tsx` |
| `user_signed_out` | User signed out of the app | `app/(tabs)/settings.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/378977/dashboard/1458160
- **Sign-up Funnel: Onboarding → Registered**: https://us.posthog.com/project/378977/insights/ORaEnV2t
- **Sign-in Success vs. Failure**: https://us.posthog.com/project/378977/insights/XjBEWVcr
- **Subscriptions Created Over Time**: https://us.posthog.com/project/378977/insights/NnzhrelH
- **Sign-outs vs. Sign-ins (Churn Signal)**: https://us.posthog.com/project/378977/insights/wdRl7qg0
- **Subscription Engagement Funnel**: https://us.posthog.com/project/378977/insights/nvHNXl4e
- **Subscription Creation Funnel: Modal Opened → Created**: https://us.posthog.com/project/378977/insights/QL50GpyK

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
