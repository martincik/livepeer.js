import { beforeAll, describe, expect, it } from 'vitest';

import { addMediaMetrics } from './metrics';
import { MockedVideoElement, resetDateNow, setupClient } from '../../../test';

// const playbackUrl =
//   'https://livepeercdn.com/recordings/9b8a9c59-e5c6-4ba8-9f88-e400b0f9153f/index.m3u8';

describe('addMediaMetrics', () => {
  beforeAll(() => {
    setupClient();
    resetDateNow();
  });

  describe('event listeners', () => {
    it('should initialize to base state', async () => {
      const element = new MockedVideoElement();

      const { metrics } = addMediaMetrics(element);

      const metricsSnapshot = metrics?.getMetrics();

      expect(metricsSnapshot?.current?.userAgent).toBeTruthy();

      if (metricsSnapshot?.current?.userAgent)
        metricsSnapshot.current.userAgent = 'UA';

      expect(metricsSnapshot?.current).toMatchInlineSnapshot(`
        {
          "autoplay": "standard",
          "duration": 0,
          "firstPlayback": 0,
          "nError": 0,
          "nStalled": 0,
          "nWaiting": 0,
          "pageUrl": "http://localhost:3000/",
          "playbackScore": null,
          "player": "unknown",
          "playerHeight": null,
          "playerWidth": null,
          "preloadTime": 0,
          "sourceType": "unknown",
          "sourceUrl": null,
          "timeStalled": 0,
          "timeUnpaused": 0,
          "timeWaiting": 0,
          "ttff": 0,
          "uid": "",
          "userAgent": "UA",
          "videoHeight": null,
          "videoWidth": null,
        }
      `);
    });

    it('should update time unpaused and first playback', async () => {
      const element = new MockedVideoElement();

      const { metrics } = addMediaMetrics(element);

      element.dispatchEvent(new Event('playing'));

      const metricsSnapshot = metrics?.getMetrics();

      expect(metricsSnapshot?.current?.userAgent).toBeTruthy();

      if (metricsSnapshot?.current?.userAgent)
        metricsSnapshot.current.userAgent = 'UA';

      expect(metricsSnapshot?.current).toMatchInlineSnapshot(`
      {
        "autoplay": "standard",
        "duration": 0,
        "firstPlayback": 0,
        "nError": 0,
        "nStalled": 0,
        "nWaiting": 0,
        "pageUrl": "http://localhost:3000/",
        "playbackScore": null,
        "player": "unknown",
        "playerHeight": null,
        "playerWidth": null,
        "preloadTime": 0,
        "sourceType": "unknown",
        "sourceUrl": null,
        "timeStalled": 0,
        "timeUnpaused": 0,
        "timeWaiting": 0,
        "ttff": 0,
        "uid": "",
        "userAgent": "UA",
        "videoHeight": null,
        "videoWidth": null,
      }
    `);
    });

    it('should update time waiting and waiting count', async () => {
      const element = new MockedVideoElement();

      const { metrics } = addMediaMetrics(element);

      element.dispatchEvent(new Event('waiting'));

      const metricsSnapshot = metrics?.getMetrics();

      expect(metricsSnapshot?.current?.userAgent).toBeTruthy();

      if (metricsSnapshot?.current?.userAgent)
        metricsSnapshot.current.userAgent = 'UA';

      expect(metricsSnapshot?.current).toMatchInlineSnapshot(`
          {
            "autoplay": "standard",
            "duration": 0,
            "firstPlayback": 0,
            "nError": 0,
            "nStalled": 0,
            "nWaiting": 0,
            "pageUrl": "http://localhost:3000/",
            "playbackScore": null,
            "player": "unknown",
            "playerHeight": null,
            "playerWidth": null,
            "preloadTime": 0,
            "sourceType": "unknown",
            "sourceUrl": null,
            "timeStalled": 0,
            "timeUnpaused": 0,
            "timeWaiting": 0,
            "ttff": 0,
            "uid": "",
            "userAgent": "UA",
            "videoHeight": null,
            "videoWidth": null,
          }
        `);
    });

    it('should update time stalled and stalled count', async () => {
      const element = new MockedVideoElement();

      const { metrics } = addMediaMetrics(element);

      expect(element.dispatchEvent.mock.calls).toMatchInlineSnapshot('[]');

      element.dispatchEvent(new Event('stalled'));

      const metricsSnapshot = metrics?.getMetrics();

      expect(metricsSnapshot?.current?.userAgent).toBeTruthy();

      if (metricsSnapshot?.current?.userAgent)
        metricsSnapshot.current.userAgent = 'UA';

      expect(metricsSnapshot?.current).toMatchInlineSnapshot(`
                  {
                    "autoplay": "standard",
                    "duration": 0,
                    "firstPlayback": 0,
                    "nError": 0,
                    "nStalled": 0,
                    "nWaiting": 0,
                    "pageUrl": "http://localhost:3000/",
                    "playbackScore": null,
                    "player": "unknown",
                    "playerHeight": null,
                    "playerWidth": null,
                    "preloadTime": 0,
                    "sourceType": "unknown",
                    "sourceUrl": null,
                    "timeStalled": 0,
                    "timeUnpaused": 0,
                    "timeWaiting": 0,
                    "ttff": 0,
                    "uid": "",
                    "userAgent": "UA",
                    "videoHeight": null,
                    "videoWidth": null,
                  }
                `);
    });
  });

  it('should replace user agent special characters', async () => {
    const element = new MockedVideoElement();

    (navigator as any)?.['__defineGetter__']?.('userAgent', function () {
      return '\\"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36"';
    });

    const { metrics } = addMediaMetrics(element);

    const metricsSnapshot = metrics?.getMetrics();

    expect(metricsSnapshot?.current?.userAgent).toBeTruthy();

    expect(metricsSnapshot?.current).toMatchInlineSnapshot(`
                      {
                        "autoplay": "standard",
                        "duration": 0,
                        "firstPlayback": 0,
                        "nError": 0,
                        "nStalled": 0,
                        "nWaiting": 0,
                        "pageUrl": "http://localhost:3000/",
                        "playbackScore": null,
                        "player": "unknown",
                        "playerHeight": null,
                        "playerWidth": null,
                        "preloadTime": 0,
                        "sourceType": "unknown",
                        "sourceUrl": null,
                        "timeStalled": 0,
                        "timeUnpaused": 0,
                        "timeWaiting": 0,
                        "ttff": 0,
                        "uid": "",
                        "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36",
                        "videoHeight": null,
                        "videoWidth": null,
                      }
                    `);
  });
});
