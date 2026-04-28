'use client';

import { useEffect } from 'react';
import logger from '@/lib/logger';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error({
      message: 'NEXTJS_ERROR_PAGE',
      error: error.message,
      digest: error.digest ?? null,
      stack: error.stack ?? null,
      url: typeof window !== 'undefined' ? window.location.href : 'server',
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md space-y-4">
        <h2 className="text-3xl font-semibold text-red-600">
          Щось пішло не так
        </h2>

        <p className="text-gray-600 break-words">
          {error.message || 'Невідома помилка'}
        </p>

        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
        >
          Спробувати ще раз
        </button>
      </div>
    </div>
  );
}