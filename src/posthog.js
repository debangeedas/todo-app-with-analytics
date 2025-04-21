import posthog from 'posthog-js';
import { POSTHOG_KEY, POSTHOG_HOST } from './posthogConfig';

posthog.init(POSTHOG_KEY, {
  api_host: POSTHOG_HOST,
  session_recording: true,
  debug: true,
});

export default posthog;
