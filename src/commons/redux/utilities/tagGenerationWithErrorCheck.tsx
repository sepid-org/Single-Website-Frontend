import { TagDescription } from '@reduxjs/toolkit/query';

export const tagTypes = [
  // Meetings
  'Meetings',
  // Party Management
  'UserAuthentication',
  // Website Management
  'Website',
  // Content Management
  'Hint',
  'WidgetHint',
  'Program',
  'FSM',
  'Treasury',
  'Resource',
  'program-admins',
  'fsm-states',
  'fsm-state',
  'fsm-state-edges',
  'fsm-edges',
  'fsm-edge',
  'fsm-mentors',
  'widget',
  'paper',
  'articles',
  'article',
  'form',
  'forms',
  'registration-receipt',
  'registration-receipts',
  'answer-sheet',
  'answer-sheets',
  'player',
  'player-transited-path',
  'website-profile',
  'institutes',
  'schools',
  'merchandises',
  'merchandise',
  'discount-codes',
  'currencies',
  'teams',
  'team',
  'my-invitations',
  'team-invitations',
  'Position',
  // Bank
  'Balances',
  // Ashbaria
  'question',
  'questions',
  'Scenarios',
  'Profile',
  'Network',
  'Missions',
  'MissionProgress',
  'BookCode',
  'RewardCode',
  // Filmbazi
  'Game',
  'CardsGame-Mission',
  'CardsGame-Card',
  'filmbazi-discount-code',
  'filmbazi-film',
  'filmbazi-seat',
  'filmbazi-seat-selection',
]

// Define a type for the tag types used in your app
type TagTypes = typeof tagTypes[number];

const createTag = <T extends TagTypes>(tag: T | { type: T, id?: string | number }): TagDescription<T> =>
  typeof tag === 'string'
    ? { type: tag }
    : { type: tag.type, id: tag.id };

const tagGenerationWithErrorCheck = <T extends TagTypes>(
  tags: (T | { type: T, id?: string | number })[] | ((result: any, error: any, arg: any) => TagDescription<T>[])
) =>
  (result: any, error: any, arg: any): TagDescription<T>[] => {
    if (!error && typeof tags === 'function') {
      return tags(result, error, arg);
    }
    if (!error && Array.isArray(tags)) {
      return tags.map(tag => createTag(tag));
    }
    return [];
  }

export default tagGenerationWithErrorCheck;