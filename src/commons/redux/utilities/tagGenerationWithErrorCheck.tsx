import { TagDescription } from '@reduxjs/toolkit/query';

export const tagTypes = [
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
  // Filmbazi
  'Game',
  'filmbazi-discount-code',
  'filmbazi-film',
  'filmbazi-seat',
  'filmbazi-seat-selection',
]

// Define a type for the tag types used in your app
type TagTypes = typeof tagTypes[number];

// Helper function to create a tag with an optional id
const createTag = (type: TagTypes, id?: string | number): TagDescription<TagTypes> =>
  id ? { type, id } : { type };

// Updated helper function
const tagGenerationWithErrorCheck = (
  tags: TagTypes[] | ((result: any, error: any, arg: any) => TagDescription<TagTypes>[])
) =>
  (result: any, error: any, arg: any): TagDescription<TagTypes>[] => {
    if (!error && typeof tags === 'function') {
      return tags(result, error, arg);
    }
    if (!error && typeof tags === 'object') {
      return tags.map(tag => createTag(tag));
    }
    return [];
  }

export default tagGenerationWithErrorCheck;