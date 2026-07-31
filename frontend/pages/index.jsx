import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Events from '../components/Events';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Eventra - Your Event Management Platform</title>
        <meta name="description" content="Create and manage amazing events with Eventra" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <Header />
        <Hero />
        <Features />
        <Events />
        <Footer />
      </main>
    </>
  );
}
