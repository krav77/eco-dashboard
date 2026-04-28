'use client';

export type EventName =
  | 'station_viewed'
  | 'map_marker_click'
  | 'map_zoom_changed'
  | 'chart_viewed'
  | 'filter_applied'
  | 'data_exported'
  | 'page_view'
  | 'session_duration';

type EventProperties = Record<string, string | number | boolean | null | undefined>;

const isBrowser = typeof window !== 'undefined';

export const trackEvent = (
  eventName: EventName,
  properties: EventProperties = {}
) => {
  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    path: isBrowser ? window.location.pathname : '',
    ...properties,
  };
  console.log('📊 ANALYTICS EVENT:', eventData);

  if (isBrowser && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...properties,
      event_name: eventName,
    });
  }
};

export const trackPageView = (title?: string) => {
  trackEvent('page_view', {
    title: title ?? document.title,
  });
};