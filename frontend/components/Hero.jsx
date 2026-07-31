export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
      <div className="animate-fade-in">
        <h2 className="gradient-text text-4xl md:text-6xl font-bold mb-6">
          Create Unforgettable Events
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Eventra helps you plan, organize, and manage events with ease. From intimate gatherings to large-scale conferences, we&apos;ve got you covered.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition duration-300">
            Start Planning
          </button>
          <button className="glass px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition duration-300 border border-purple-500/50">
            Watch Demo
          </button>
        </div>

        <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden glass card-hover">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
                <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                </svg>
              </div>
              <p className="text-white font-semibold">See Eventra in Action</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
