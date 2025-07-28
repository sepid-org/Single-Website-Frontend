import { lazy } from 'react';

export const templates = {
  OTP: lazy(() => import('./OtpAuth')),
  CLASSIC: lazy(() => import('./ClassicAuth')),
  USERNAME_FIRST: lazy(() => import('./UsernameFirst')),
  OAUTH: lazy(() => import('./OAuth')),
} as const;

export type AuthKey = keyof typeof templates;
