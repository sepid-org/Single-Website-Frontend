import { lazy } from 'react';

export const templates = {
  ashbaria: lazy(() => import('./Ashbaria')),
  classic: lazy(() => import('./Classic')),
} as const;

export type ChoiceTemplateKey = keyof typeof templates;
