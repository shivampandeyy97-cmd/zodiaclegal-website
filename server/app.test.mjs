import { describe, it, expect, beforeEach } from 'vitest';
import { createApp, resetRateLimitStore } from './app.mjs';

describe('Zodiac Legal Consultation API (/server)', () => {
  let app;

  beforeEach(() => {
    resetRateLimitStore();
    app = createApp();
  });

  it('returns 200 OK from GET /healthz', async () => {
    const res = await app.request('/healthz');
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe('ok');
    expect(json.service).toBe('zodiaclegal-consultation-api');
  });

  it('accepts a valid consultation payload via POST /api/consult', async () => {
    const res = await app.request('/api/consult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Vikramaditya Singh',
        phone: '+91 98390 10163',
        email: 'vikram@example.com',
        organization: 'Awadh Infra Pvt Ltd',
        practiceArea: 'corporate-commercial',
        message: 'We require legal assistance with a commercial lease and UP-RERA compliance in Lucknow.',
        bciConsent: 'accepted',
        website_url: '',
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it('rejects invalid payloads with HTTP 400 and helpful message', async () => {
    const res = await app.request('/api/consult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'A',
        phone: 'invalid',
        email: 'bad-email',
        practiceArea: '',
        message: 'Too short',
        bciConsent: '',
      }),
    });

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.ok).toBe(false);
    expect(json.error).toBeTruthy();
  });

  it('silently neutralizes spam bot submissions that fill the honeypot field', async () => {
    const res = await app.request('/api/consult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Spam Bot',
        phone: '000',
        email: 'spam',
        website_url: 'https://malicious-bot.example',
      }),
    });

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });

  it('enforces IP rate limiting after 5 requests in the window', async () => {
    const payload = JSON.stringify({
      fullName: 'Vikramaditya Singh',
      phone: '+91 98390 10163',
      email: 'vikram@example.com',
      practiceArea: 'contracts-agreements',
      message: 'Requesting contract vetting for a vendor supply agreement in Lucknow.',
      bciConsent: 'accepted',
    });

    for (let i = 0; i < 5; i++) {
      const r = await app.request('/api/consult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': '203.0.113.42',
        },
        body: payload,
      });
      expect(r.status).toBe(200);
    }

    const sixth = await app.request('/api/consult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '203.0.113.42',
      },
      body: payload,
    });
    expect(sixth.status).toBe(429);
  });
});
