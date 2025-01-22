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
        : error.data?.['error'] || undefined
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

const DOMAIN_TO_PATH_MAP: Record<string, string> = {
  'filmbazi.ir': '/program/filmbazi/token-expiration/',
  'ashbaria.ir': '/program/ashbaria/token-expiration/',
  'default': '/token-expiration/',
};

const navigateTo = (url: string) => {
  try {
    window.location.href = url;
  } catch (error) {
    toast.error('Redirection failed:', error);
  }
};

const handleTokenExpiration = (dispatch: (action: { type: string }) => void) => {
  const currentDomain = window.location.hostname;

  const redirectPath = DOMAIN_TO_PATH_MAP[currentDomain] || DOMAIN_TO_PATH_MAP.default;

  // Redirect and logout
  navigateTo(redirectPath);
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

// Check if error should be reported to Sentry
const shouldReportToSentry = (status: number | string): boolean => {
  if (typeof status === 'number') {
    // Don't report 4xx errors
    return status < 400 || status >= 500;
  }
  // Report all non-numeric status codes (like 'FETCH_ERROR' or 'unknown')
  return true;
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

  // Only send to Sentry if it's not a 4xx error
  if (shouldReportToSentry(normalizedError.status)) {
    Sentry.captureException(new Error(`API Error: ${normalizedError.message || 'Unknown error'}`), {
      tags: {
        status: normalizedError.status,
        message: normalizedError.message || 'No message available',
      },
      extra: {
        data: normalizedError.data,
      }
    });
  }

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

  // Handle specific error codes or details
  if (normalizedError.data?.code) {
    toast.error(getLocalizedErrorMessage(normalizedError.data));
    return;
  }

  // todo: forms-related errors should be handled by form component
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