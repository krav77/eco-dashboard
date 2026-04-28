import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-7xl font-extrabold text-gray-800">404</h1>

        <p className="text-xl text-gray-600">
          Сторінку не знайдено
        </p>

        <p className="text-sm text-gray-400">
          Можливо, вона була видалена або ви перейшли за неправильним посиланням
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
}