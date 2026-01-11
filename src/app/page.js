"use client";

import Head from 'next/head';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"; // Added signOut
import styles from "./page.module.css";

export default function Home() {
  const { data: session, status } = useSession();

  // Simple component for a primary button
  const PrimaryButton = ({ href, children }) => (
    <Link href={href} className={styles.primaryButton}>
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
        <title>Prompterio</title>
        <meta name="description" content="Simple, web-based teleprompter app with customizable speed, size, and mirroring." />
      </Head>

      {/* --- 1. Navigation Bar (Dynamic) --- */}
      <nav className={styles.navbar}>
        <h1>Prompterio</h1>
        <div className={styles.navLinks}>
          {status === "loading" ? (
            <span>...</span>
          ) : session ? (
            <div className={styles.userMenu}>
              <span className={styles.welcomeText}>Hi, {session.user.name?.split(' ')[0] || "User"}</span>
              <Link href="/app" className={styles.appLink}>Open App</Link>
              <button onClick={() => signOut()} className={styles.signoutBtn}>Logout</button>
            </div>
          ) : (
            <Link href="/auth" className={styles.loginBtn}> Log In </Link>
          )}
        </div>
      </nav>

      {/* --- 2. Hero Section --- */}
      <header className={styles.hero}>
        <h1>The Teleprompter That You Need</h1>
        <h2>The simplest web-based teleprompter, built for video creators and speakers.</h2>
        
        {/* Dynamic CTA: If logged in, send them straight to the app */}
        <PrimaryButton href={session ? "/app" : "/pricing"}>
          {session ? "Go to My Prompter" : "Get Started Now"}
        </PrimaryButton>
        
        <p className={styles.heroSubtext}>No downloads. Works on any device.</p>

        <div className={styles.appPreviewPlaceholder}>
          {/* Your preview image or video goes here */}
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
      
      {/* --- 5. Footer --- */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Prompterio. All rights reserved.</p>
      </footer>
    </div>
  );
}