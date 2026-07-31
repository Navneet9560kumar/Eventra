const features = [
  {
    icon: '📅',
    title: 'Easy Scheduling',
    description: 'Plan and organize your events with our intuitive calendar interface.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '👥',
    title: 'Guest Management',
    description: 'Invite, track, and manage attendees with automated confirmations.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: '💰',
    title: 'Ticketing System',
    description: 'Sell tickets easily with multiple payment options integrated.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'Get real-time insights and detailed reports about your events.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: '🎨',
    title: 'Custom Branding',
    description: 'Customize your event pages with your own logos and colors.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: '🔔',
    title: 'Smart Notifications',
    description: 'Keep attendees informed with timely reminders and updates.',
    color: 'from-pink-500 to-rose-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="gradient-text text-4xl md:text-5xl font-bold text-center mb-6">
          Powerful Features
        </h2>
        <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto text-lg">
          Everything you need to create and manage extraordinary events
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass group card-hover rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50"
            >
              <div className={`inline-block text-4xl mb-4 p-3 rounded-lg bg-gradient-to-br ${feature.color}/20`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
