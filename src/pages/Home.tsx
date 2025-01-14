import { Weather } from "@/components/Weather";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-black to-green-900">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Task Master Pro
        </h1>
        <p className="text-xl text-green-400 italic mb-8">
          "Productivity is being able to do things that you were never able to do before."
        </p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border border-green-500 rounded-lg">
            <h3 className="text-xl font-semibold text-green-400 mb-3">Task Organization</h3>
            <p className="text-gray-300">Keep your daily tasks organized and prioritized for maximum efficiency.</p>
          </div>
          <div className="p-6 border border-green-500 rounded-lg">
            <h3 className="text-xl font-semibold text-green-400 mb-3">Progress Tracking</h3>
            <p className="text-gray-300">Monitor your productivity and track completion of tasks over time.</p>
          </div>
          <div className="p-6 border border-green-500 rounded-lg">
            <h3 className="text-xl font-semibold text-green-400 mb-3">Smart Reminders</h3>
            <p className="text-gray-300">Never miss a deadline with our intelligent reminder system.</p>
          </div>
        </div>
      </section>

      {/* Weather Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Today's Weather</h2>
          <Weather />
        </div>
      </section>
    </div>
  );
}