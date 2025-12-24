export default function DadPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="text-center p-12 bg-white rounded-2xl shadow-2xl max-w-lg mx-4">
        <div className="text-8xl mb-6">📚</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Hey Dad!
        </h1>
        <p className="text-2xl text-gray-600 mb-6">
          Time to update your Goodreads!
        </p>
        <div className="text-6xl animate-bounce">👆</div>
        <a
          href="https://www.goodreads.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white text-xl font-semibold rounded-full transition-colors"
        >
          Go to Goodreads →
        </a>
      </div>
    </div>
  );
}
