import * as Sentry from '@sentry/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import { persianMessages } from 'commons/redux/utilities/messages';

// Comprehensive error type definition
interface ErrorResponse {
  status: number | string;
  data?: {
    code?: string;
    detail?: string;
    [key: string]: any;
  };
  message?: string;
}

// Type guard to convert FetchBaseQueryError to ErrorResponse
const normalizeFetchError = (error: FetchBaseQueryError): ErrorResponse => {
  // Handle different FetchBaseQueryError scenarios
  if ('status' in error) {
    return {
      status: error.status,
      data: error.data as ErrorResponse['data'],
      message: error.status === 'FETCH_ERROR'
        ? 'خطا در برقراری ارتباط با سرور'
        : undefined
    };
  }

  // Fallback for unexpected error formats
  return {
    status: 'unknown',
    message: 'خطای نامشخص'
  };
};

// Field translation mapping
const FIELD_TRANSLATIONS: Record<string, string> = {
  'price': 'قیمت',
  'discounted_price': 'قیمت تخفیف‌خورده',
  'name': 'نام',
  'email': 'ایمیل',
  'phone': 'شماره تلفن',
};

// Token expiration paths
const TOKEN_EXPIRATION_PATHS: Record<string, string> = {
  'filmbazi': '/program/filmbazi/token-expiration/',
  'ashbaria': '/program/ashbaria/token-expiration/',
  'default': '/token-expiration/'
};

// Centralized token expiration handling
const handleTokenExpiration = (dispatch: (action: { type: string }) => void) => {
  const currentPath = window.location.pathname;

  // Determine appropriate redirection path
  const redirectPath = Object.entries(TOKEN_EXPIRATION_PATHS)
    .find(([key]) => currentPath.includes(key))?.[1]
    || TOKEN_EXPIRATION_PATHS.default;

  // Redirect and logout
  window.location.href = redirectPath;
  dispatch({ type: 'account/logout' });
};

// Get localized error message
const getLocalizedErrorMessage = (errorData?: NonNullable<ErrorResponse['data']>): string => {
  if (!errorData) return 'خطای نامشخص';

  return (
    persianMessages[errorData.code as string] ||
    persianMessages[errorData.detail as string] ||
    errorData.detail ||
    errorData.code ||
    'خطای نامشخص'
  );
};

// Handle form field-specific errors
const handleFieldErrors = (error: ErrorResponse): boolean => {
  if (!error.data) return false;

  const fieldErrors = Object.entries(error.data)
    .filter(([_, fieldError]) => fieldError && (fieldError as any).code);

  if (fieldErrors.length > 0) {
    fieldErrors.forEach(([field, fieldError]) => {
      const translatedField = FIELD_TRANSLATIONS[field] || field;
      const message = getLocalizedErrorMessage(fieldError as NonNullable<ErrorResponse['data']>);
      toast.error(`فیلد ${translatedField}: ${message}`);
    });
    return true;
  }

  return false;
};

// Main error handling utility
const handleError = ({
  error,
  dispatch,
}: {
  error: FetchBaseQueryError | ErrorResponse | any;
  dispatch: (action: { type: string }) => void;
  errorMessage?: string;
}) => {
  // Normalize the error if it's a FetchBaseQueryError
  const normalizedError = error && 'status' in error
    ? normalizeFetchError(error as FetchBaseQueryError)
    : error as ErrorResponse;

  // Log the full error for debugging
  console.error('API Error:', normalizedError);

  // Handle no error scenario
  if (!normalizedError) {
    toast.error('ارتباط با سرور دچار مشکل شده است.');
    Sentry.captureException(new Error('No error provided (unknown error)'));
    return;
  }

  // Send error details to Sentry for tracking
  Sentry.captureException(new Error(`API Error: ${normalizedError.message || 'Unknown error'}`), {
    tags: {
      status: normalizedError.status,
      message: normalizedError.message || 'No message available',
    },
    extra: {
      data: normalizedError.data,
    }
  });

  // Handle token-related errors
  if (
    normalizedError.data?.code &&
    [
      'user_not_found',
      'token_not_valid',
      'token_expired',
      'authentication_failed',
      'bad_authorization_header',
      'not_authenticated',
      'token_blacklisted',
      'user_inactive',
      'user_deleted',
      'invalid_token',
    ].includes(normalizedError.data.code)
  ) {
    handleTokenExpiration(dispatch);
    return;
  }

  // Handle form field errors
  if (handleFieldErrors(normalizedError)) {
    return;
  }

  // Handle HTTP status code errors
  const handleStatusCodeErrors = (error: ErrorResponse) => {
    switch (error.status) {
      case 400:
        toast.error('درخواست نامعتبر');
        break;
      case 401:
        break;
      case 403:
        toast.error('دسترسی غیرمجاز');
        break;
      case 404:
        break;
      case 500:
        toast.error('یه خطای سروری پیش اومده! لطفاً بهمون خبر بده.');
        break;
      case 502:
        toast.error('مشکلی در ارتباط با سرور پیش اومده. لطفاً یه کم بعد دوباره امتحان کن.');
        break;
      case 503:
        toast.error('سرویس به خاطر شلوغی یا تعمیرات موقت در دسترس نیست. لطفاً یه کم بعد دوباره امتحان کن.');
        break;
      case 504:
        toast.error('سرور جواب نداد. لطفاً یه کم بعد دوباره امتحان کن.');
        break;
      default:
        toast.error(error.message || 'خطای نامشخص در ارتباط با سرور');
    }
  };

  // Handle HTTP status code errors
  handleStatusCodeErrors(normalizedError);
};

export default handleError;