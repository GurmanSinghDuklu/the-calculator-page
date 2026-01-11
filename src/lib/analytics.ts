// Privacy-first analytics setup
// Using Plausible for GDPR-compliant, cookie-free analytics

interface PlausibleEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export const analytics = {
  // Track custom events
  track: (eventName: string, props?: Record<string, string | number | boolean>) => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, { props });
    }
  },

  // Track calculator usage
  trackCalculator: (calculatorName: string, inputs?: Record<string, string | number>) => {
    analytics.track('Calculator Used', {
      calculator: calculatorName,
      ...inputs
    });
  },

  // Track article completion
  trackArticleComplete: (articleSlug: string) => {
    analytics.track('Article Completed', {
      article: articleSlug
    });
  },

  // Track progress milestones
  trackMilestone: (milestone: string, value: number) => {
    analytics.track('Milestone Reached', {
      milestone,
      value
    });
  },

  // Track feature usage
  trackFeature: (featureName: string, action: string) => {
    analytics.track('Feature Used', {
      feature: featureName,
      action
    });
  }
};

// Add Plausible script to page
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;
  
  // Check if script already exists
  if (document.querySelector('script[data-domain]')) return;
  
  const script = document.createElement('script');
  script.defer = true;
  script.setAttribute('data-domain', window.location.hostname);
  script.src = 'https://plausible.io/js/script.js';
  
  document.head.appendChild(script);
};
