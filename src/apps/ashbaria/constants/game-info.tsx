export const ASHBARIA_COIN = 'ashbaria-coin';
export const ASHBARIA_DOCUMENT_TYPE = 'ashbaria-document';
export const ASHBARIA_CHELO_TYPE = 'ashbaria-chelo';
export const ASHBARIA_BOOK_COIN_REWARD = 200;
export const ASHBARIA_SUBMIT_FRIENDSHIP_CODE = (isMinimal = false) => {
  if (isMinimal) {
    return 1;
  }
  return 5;
}