import Head from 'next/head';
import Link from 'next/link';
import styles from "./page.module.css";

export default function Home() {
  // Simple component for a primary button
const PrimaryButton = ({ href, children }) => (
 <Link href={href} passHref>
   
      {children}
   
    </Link>
 
);

// Simple component for a feature card
const FeatureCard = ({ title, description }) => (
  <div className={styles.featureCard}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);
  return (
    <div className="container">
      <Head>
        <title>Promterio</title>
        <meta name="description" content="Simple, web-based teleprompter app with customizable speed, size, and mirroring." />
      </Head>

      {/* --- 1. Navigation Bar (Simple) --- */}
      <nav className={styles.navbar}>
        <h1>Prompterio</h1>
        <div className={styles.navLinks}>
          <Link href="/auth"> Log In </Link>
             
        </div>
      </nav>

      {/* --- 2. Hero Section --- */}
      <header className={styles.hero}>
        <h1>Deliver Your Message with **Confidence**.</h1>
        <h2>The simplest web-based teleprompter, built for video creators and speakers.</h2>
        
        {/* Main Call-to-Action */}
        <PrimaryButton href="/pricing">Get Started Now</PrimaryButton>
        
        <p className={styles.heroSubtext}>No downloads. Works on any device.</p>

        {/* Placeholder for an app screenshot or short video */}
        <div className={styles.appPreviewPlaceholder}>
          
        </div>
      </header>

      {/* --- 3. Features Section --- */}
      <section className={styles.featuresSection}>
        <h2>Why Prompterio?</h2>
        <div className={styles.featuresGrid}>
          <FeatureCard 
            title="Customizable Speed" 
            description="Adjust the scrolling rate precisely to match your speaking pace, ensuring a natural delivery."
          />
          <FeatureCard 
            title="Mirror Mode" 
            description="Essential for camera setups. Flip the text horizontally so it reads correctly when reflected."
          />
          <FeatureCard 
            title="Any Device, Any Time" 
            description="Since it's browser-based, access your scripts from your laptop, tablet, or phone."
          />
        </div>
      </section>

      {/* --- 4. Final Call-to-Action --- */}
      <section className={styles.ctaFinal}>
        <h2>Ready to Master Your Delivery?</h2>
        <p>Unlock all features with our simple, affordable subscription.</p>
        <PrimaryButton href="/pricing">View Pricing Plans</PrimaryButton>
      </section>
      
      {/* --- 5. Footer (Minimal) --- */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} ProPrompter. All rights reserved.</p>
      </footer>
      </div>
  );
}
