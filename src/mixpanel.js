import mixpanel from 'mixpanel-browser';
import { MIXPANEL_TOKEN } from './mixpanelConfig';

// Initialize Mixpanel
mixpanel.init(MIXPANEL_TOKEN, { debug: true });

export default mixpanel;
