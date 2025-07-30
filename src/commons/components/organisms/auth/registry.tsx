import { lazy } from 'react';

export const templates = {
  otp: lazy(() => import('./OtpAuth')),
  classic: lazy(() => import('./ClassicAuth')),
  username_first: lazy(() => import('./UsernameFirst')),
  OAuth: lazy(() => import('./OAuth')),
  just_login: lazy(() => import('./JustLogin')),
} as const;

export type AuthKey = keyof typeof templates;
