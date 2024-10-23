// account
export const refreshTokenUrl = 'auth/accounts/refresh/';

// Article
export const articlesUrl = ({ pageNumber, articleId }) => articleId ? `fsm/article/${articleId}` : `fsm/article/?page=${pageNumber}`;

//////////// RECEIPT /////////////
export const getCertificateUrl = ({ receiptId }) => `/fsm/receipts/${receiptId}/get_certificate/`;
export const allRegistrationReceiptsUrl = ({ registrationFormId, pageNumber }) => `fsm/form/${registrationFormId}/receipts/?page=${pageNumber}`;
export const validateRegistrationReceiptUrl = ({ receiptId }) => `/fsm/receipts/${receiptId}/validate/`;

// Team:
export const registerUsersViaCSVUrl = ({ registrationFormId }) => `fsm/registration_form_admin/${registrationFormId}/register_participants_via_list/`;

// workshop:
export const reviewAnswersUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/review/`;
export const getFSMPlayersUrl = ({ fsmId }) => `fsm/fsm/${fsmId}/players/`;

// fsm:
export const getPlayerFromTeamUrl = ({ id }) => `/fsm/fsm/${id}/get_player_from_team/`;

// response
export const answerCRUDUrl = ({ answerId }) => answerId ? `response/answers/${answerId}/` : 'response/answers/';


// assessment:
export const getAnswerScoresAndCommentsUrl = 'scoring/get_answer_scores_and_comments/';
export const setAnswerScoreUrl = 'scoring/set_answer_score/';
export const createCommentUrl = 'scoring/create_comment/';
