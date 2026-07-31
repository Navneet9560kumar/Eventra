import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const stats = [
  { label: 'Total Events', value: '24', icon: '📅', color: 'from-blue-500 to-cyan-500' },
  { label: 'Total Attendees', value: '5,420', icon: '👥', color: 'from-purple-500 to-pink-500' },
  { label: 'Revenue', value: '$125,450', icon: '💰', color: 'from-green-500 to-emerald-500' },
  { label: 'Success Rate', value: '98%', icon: '✅', color: 'from-orange-500 to-red-500' },
];

const recentEvents = [
  { name: 'Tech Summit 2024', date: 'Aug 15', status: 'Active', attendees: 1250 },
  { name: 'Marketing Workshop', date: 'Aug 10', status: 'Completed', attendees: 450 },
  { name: 'Startup Pitch Event', date: 'Aug 8', status: 'Completed', attendees: 320 },
  { name: 'Design Conference', date: 'Aug 22', status: 'Scheduled', attendees: 890 },
];

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Eventra</title>
        <meta name="description" content="Your Eventra dashboard" />
      </Head>

      <main className="min-h-screen">
        <Header />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-8">
            <h1 className="gradient-text text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-300">Welcome back! Here&apos;s your event overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`glass rounded-2xl p-6 border border-purple-500/20 bg-gradient-to-br ${stat.color}/10`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{stat.icon}</div>
                  <div className={`text-2xl font-bold`}>
                    {stat.value}
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="glass rounded-2xl p-8 border border-purple-500/20">
              <h2 className="text-xl font-bold mb-6">Attendance Trends</h2>
              <div className="h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-end justify-around px-4 py-8">
                {[40, 60, 45, 75, 55, 80, 70].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 mx-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg opacity-70 hover:opacity-100 transition"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-400">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 border border-purple-500/20">
              <h2 className="text-xl font-bold mb-6">Event Distribution</h2>
              <div className="flex items-center justify-center h-64">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 200 200" className="transform -rotate-90">
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#grad1)"
                      strokeWidth="40"
                      strokeDasharray="125.66 251.33"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#grad2)"
                      strokeWidth="40"
                      strokeDasharray="75.4 251.33"
                      strokeDashoffset="-125.66"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#grad3)"
                      strokeWidth="40"
                      strokeDasharray="50.27 251.33"
                      strokeDashoffset="-201.06"
                    />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                      <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-gray-400">Events</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-8 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                  <span>Conferences (50%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <span>Workshops (30%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                  <span>Meetups (20%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Events Table */}
          <div className="glass rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-xl font-bold mb-6">Recent Events</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Event Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Attendees</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.map((event, index) => (
                    <tr key={index} className="border-b border-purple-500/10 hover:bg-white/5 transition">
                      <td className="py-3 px-4 font-medium">{event.name}</td>
                      <td className="py-3 px-4 text-gray-400">{event.date}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            event.status === 'Active'
                              ? 'bg-green-500/20 text-green-300'
                              : event.status === 'Completed'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-purple-500/20 text-purple-300'
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{event.attendees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
