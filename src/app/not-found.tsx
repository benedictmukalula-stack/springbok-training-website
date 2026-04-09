import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-brand-gradient mb-4">404</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto mb-8">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold rounded-xl shadow-lg shadow-green-600/20 transition-all duration-300"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gray-300 text-gray-700 hover:bg-green-50 hover:border-green-300 hover:text-[#16a34a] font-semibold rounded-xl transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
