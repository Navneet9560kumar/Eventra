const upcomingEvents = [
  {
    id: 1,
    title: 'Tech Conference 2024',
    date: 'Aug 15, 2024',
    time: '09:00 AM',
    location: 'San Francisco, CA',
    attendees: 1250,
    image: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    category: 'Conference',
  },
  {
    id: 2,
    title: 'Digital Marketing Summit',
    date: 'Aug 22, 2024',
    time: '10:00 AM',
    location: 'New York, NY',
    attendees: 890,
    image: 'bg-gradient-to-br from-purple-500 to-pink-500',
    category: 'Summit',
  },
  {
    id: 3,
    title: 'Web Development Workshop',
    date: 'Aug 28, 2024',
    time: '02:00 PM',
    location: 'Austin, TX',
    attendees: 320,
    image: 'bg-gradient-to-br from-green-500 to-emerald-500',
    category: 'Workshop',
  },
];

export default function Events() {
  return (
    <section id="events" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="gradient-text text-4xl md:text-5xl font-bold text-center mb-6">
          Upcoming Events
        </h2>
        <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto text-lg">
          Discover and join amazing events happening near you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="glass group rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 card-hover">
              <div className={`h-48 ${event.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition duration-300"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full text-sm font-semibold text-white">
                  {event.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition duration-300">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                    </svg>
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                    </svg>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-2 rounded-lg font-semibold transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="glass px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition duration-300 border border-purple-500/50">
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
}
