import PostHog from 'posthog-react-native'
import Constants from 'expo-constants'

// Configuration loaded from app.config.js extras via expo-constants
// Environment variables are read at build time in app.config.js
const apiKey = Constants.expoConfig?.extra?.posthogProjectToken as string | undefined
const host = Constants.expoConfig?.extra?.posthogHost as string | undefined
const isPostHogConfigured = !!apiKey

if (__DEV__) {
  console.log('PostHog config:', {
    apiKey: apiKey ? 'SET' : 'NOT SET',
    host: host ? 'SET' : 'NOT SET',
    isConfigured: isPostHogConfigured,
  })
}

if (!isPostHogConfigured) {
  console.warn(
    'PostHog project token not configured. Analytics will be disabled. ' +
      'Set POSTHOG_PROJECT_TOKEN in your .env file to enable analytics.'
  )
}

export const posthog = new PostHog(apiKey || 'placeholder_key', {
  host,

  // Disable PostHog if project token is not configured
  disabled: !isPostHogConfigured,

  // Capture app lifecycle events
  captureAppLifecycleEvents: true,

  // Enable debug mode in development
  debug: __DEV__,

  // Batching settings
  flushAt: 20,
  flushInterval: 10000,
  maxBatchSize: 100,
  maxQueueSize: 1000,

  // Feature flags
  preloadFeatureFlags: true,
  sendFeatureFlagEvent: true,
  featureFlagsRequestTimeoutMs: 10000,

  // Network settings
  requestTimeout: 10000,
  fetchRetryCount: 3,
  fetchRetryDelay: 3000,
})
