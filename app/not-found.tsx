import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
        <p className="text-gray-600 mb-8">Could not find requested resource</p>
        <Link href="/" className="bg-banknote-navy text-white px-6 py-3 rounded-md hover:opacity-90">
          Return Home
        </Link>
      </div>
    </div>
  );
}
