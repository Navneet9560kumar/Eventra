# Eventra Frontend - Setup Guide

## 🎉 Welcome to Your Beautiful Event Management Frontend!

This is a complete React + Next.js frontend for the Eventra event management platform, built with stunning modern design.

## ⚡ Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Explore the Pages

- **Home** (`/`) - Landing page with features and upcoming events
- **Dashboard** (`/dashboard`) - Analytics and event overview
- **Contact** (`/contact`) - Contact form and info

## 📁 Project Structure

```
frontend/
├── pages/
│   ├── _app.jsx              # Next.js app wrapper
│   ├── index.jsx             # Home/landing page
│   ├── dashboard.jsx         # Dashboard with analytics
│   ├── contact.jsx           # Contact page with form
│   └── _document.jsx         # (optional) Document wrapper
│
├── components/
│   ├── Header.jsx            # Navigation bar
│   ├── Hero.jsx              # Hero section with CTA
│   ├── Features.jsx          # Features grid (6 cards)
│   ├── Events.jsx            # Event listings
│   └── Footer.jsx            # Footer with links
│
├── styles/
│   └── globals.css           # Global styles & animations
│
├── tailwind.config.js        # Tailwind CSS configuration
├── next.config.js            # Next.js configuration
├── postcss.config.js         # PostCSS configuration
├── package.json              # Dependencies
└── README.md                 # Detailed documentation
```

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Cyan/Blue (#0ea5e9)
- **Secondary**: Purple (#a855f7)
- **Accent**: Pink (#ec4899)
- **Accent**: Orange (#f97316)
- **Background**: Dark gradient (#0f172a → #1e293b)

### Design Features
- ✨ **Glassmorphism**: Glass effect cards with blur
- 🌈 **Gradients**: Beautiful gradient text and backgrounds
- ⚡ **Animations**: Smooth fade-in and slide-up effects
- 📱 **Responsive**: Mobile-first responsive design
- ♿ **Accessible**: Semantic HTML and ARIA attributes

## 🔧 Built With

### Technologies
- **React 18** - UI library
- **Next.js 14** - React framework with SSR
- **Tailwind CSS 3** - Utility-first CSS
- **JavaScript** - Language
- **JSX** - React templating

### Key Libraries
- next/link - Client-side navigation
- next/head - Meta tags management
- React hooks (useState) - State management

## 📝 Component Guide

### Header Component
Navigation bar with logo and CTA button. Sticky positioning with glass effect.

### Hero Component
Large banner with gradient text, headline, description, and action buttons.

### Features Component
6-card grid showcasing platform features with icons and descriptions.

### Events Component
Showcase of upcoming events with detailed cards including date, location, and attendees.

### Dashboard Component
Analytics dashboard with:
- Stats cards
- Attendance trends chart
- Event distribution pie chart
- Recent events table

### Contact Component
Contact form with validation, displaying contact info cards above form.

## 🚀 Development Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build           # Build for production
npm start              # Start production server

# Linting
npm run lint           # Run ESLint
```

## 🎯 Usage Examples

### Adding a New Page

1. Create a new file in `pages/newpage.jsx`:
```jsx
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NewPage() {
  return (
    <>
      <Head>
        <title>New Page - Eventra</title>
      </Head>
      <main className="min-h-screen">
        <Header />
        {/* Your content */}
        <Footer />
      </main>
    </>
  );
}
```

### Creating a New Component

1. Create `components/NewComponent.jsx`:
```jsx
export default function NewComponent() {
  return (
    <div className="glass rounded-2xl p-8 border border-purple-500/20">
      <h2 className="gradient-text text-2xl font-bold">Hello</h2>
    </div>
  );
}
```

2. Use in pages:
```jsx
import NewComponent from '../components/NewComponent';

export default function Page() {
  return <NewComponent />;
}
```

## 🎨 Tailwind Classes Reference

### Colors
```
bg-gradient-to-r from-purple-500 to-pink-500  # Gradient bg
text-purple-400                                 # Text color
border-purple-500/20                           # Semi-transparent border
```

### Spacing
```
p-8      # Padding
m-4      # Margin
gap-6    # Gap between items
```

### Responsive
```
md:grid-cols-2   # 2 columns on medium screens
lg:text-xl       # Large text on large screens
```

### Glass Effect
```
glass  # Pre-built glass class in globals.css
```

## 🌐 Connecting to Backend

The frontend is ready to connect to your Python backend:

1. Add API endpoints in environment variables
2. Use fetch or axios for API calls
3. Update components to call backend endpoints

Example:
```jsx
const [data, setData] = useState([]);

useEffect(() => {
  fetch('http://localhost:8000/api/events')
    .then(res => res.json())
    .then(data => setData(data));
}, []);
```

## 📦 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms
The app can be deployed to any Node.js hosting:
- Netlify
- Railway
- Render
- Digital Ocean
- AWS Amplify

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- -p 3001  # Use different port
```

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Styling Not Applied
Clear Tailwind cache:
```bash
rm -rf .next
npm run dev
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [JavaScript MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🤝 Need Help?

1. Check the README.md for detailed info
2. Review component files for usage examples
3. Check browser console for errors
4. Verify all dependencies installed: `npm install`

## 🎉 You're Ready!

Your beautiful Eventra frontend is ready to go. Start customizing and building amazing features!

---

Built with ❤️ using React, Next.js, and Tailwind CSS
