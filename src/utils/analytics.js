import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';

/**
 * Log a custom event to Firebase Analytics
 * @param {string} eventName - Name of the event
 * @param {Object} eventParams - Parameters for the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
    try {
        logEvent(analytics, eventName, eventParams);
    } catch (error) {
        console.error('Analytics logEvent failed:', error);
    }
};

/**
 * Log a page view event
 * @param {string} pageName - Name of the page
 */
export const trackPageView = (pageName) => {
    trackEvent('page_view', { page_path: pageName });
};
