"use client";

import Head from 'next/head';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"; // Added signOut
import styles from "./page.module.css";
import Image from 'next/image'
import { Zap, FlipHorizontal, MonitorSmartphone, Lamp} from 'lucide-react';


export default function Home() {
  const { data: session, status } = useSession();

  // Simple component for a primary button
  const PrimaryButton = ({ href, children }) => (
    <Link href={href} className={styles.primaryButton}>
      {children}
    </Link>
  );

  // Simple component for a feature card
  const FeatureCard = ({ title, description, icon: Icon }) => (
  <div className={styles.featureCard}>
    <div className={styles.iconContainer}>
      <Icon size={24} strokeWidth={2} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);


  return (
    <div className="container">
      <div className={styles.blobBlue}></div>
    <div className={styles.blobPurple}></div>
      <Head>
        <title>Prompterio</title>
        <meta name="description" content="Simple, web-based teleprompter app with customizable speed, size, and mirroring." />
         <meta name="google-site-verification" content="googlefebe8713c01f3b80" />
      </Head>

      {/* --- 1. Navigation Bar (Dynamic) --- */}
  <nav className={styles.navbar}>
  <h1>Prompterio</h1>
  <div className={styles.navLinks}>
    {status === "loading" ? (
      <span>...</span>
    ) : session ? (
      <div className={styles.userMenu}>
        <span className={styles.welcomeText}>
          Hi, {session.user.name?.split(' ')[0] || "User"}
        </span>
        <Link href="/app" className={styles.appLink}>
          Open App
        </Link>
        <button onClick={() => signOut()} className={styles.signoutBtn}>
          Logout
        </button>
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
         <p style={{color: '#999', fontSize: '0.9rem'}}>
          <Image src="/5.png" alt="App Preview" width={650} height={400

          } />
          </p>
         
        </div>
      </header>
   <div className={styles.blobBlue}></div>
    <div className={styles.blobPurple}></div>
      {/* --- 3. Features Section --- */}
      <section className={styles.featuresSection}>
        <h2>Why Prompterio?</h2>
        <div className={styles.featuresGrid}>
  <FeatureCard 
    icon={Lamp}
    title="Soft-Box Light" 
    description="Set your screen brightness to MAX, illuminating your face perfectly while you read."
  />
  <FeatureCard 
    icon={Zap}
    title="Customizable Speed" 
    description="Adjust the scrolling rate precisely to match your speaking pace, ensuring a natural delivery."
  />
  <FeatureCard 
    icon={FlipHorizontal}
    title="Smart Contrast" 
    description= "Change the background color to match your environment, and our AI will automatically flip the text color for crystal-clear readability."
  />
  <FeatureCard 
    icon={MonitorSmartphone}
    title="Any Device, Any Time" 
    description="Since it's browser-based, access your scripts from your laptop, tablet, or phone."
  />
</div>
      </section>

      <section className={styles.howItWorks}>
  <div className={styles.sectionHeader}>
    <span className={styles.badge}>Process</span>
    <h2>Master your video in 3 steps</h2>
  </div>

  <div className={styles.stepsGrid}>
    <div className={styles.stepCard}>
      <div className={styles.stepNumber}>1</div>
      <h3>Write or Paste</h3>
      <p>Import your script into our editor. Clean, simple, and distraction-free.</p>
    </div>

    <div className={styles.stepLine}></div> {/* Línea decorativa entre pasos */}

    <div className={styles.stepCard}>
      <div className={styles.stepNumber}>2</div>
      <h3>Brightness</h3>
      <p>Turn your screen brightness to the max. Your monitor will act as a professional light source.</p>
    </div>
     <div className={styles.stepLine}></div> {/* Línea decorativa entre pasos */}

    <div className={styles.stepCard}>
      <div className={styles.stepNumber}>3</div>
      <h3>Set your Pace</h3>
      <p>Adjust the scroll speed.</p>
    </div>

    <div className={styles.stepLine}></div>

    <div className={styles.stepCard}>
      <div className={styles.stepNumber}>4</div>
      <h3>Record & Shine</h3>
      <p>Hit play and maintain perfect eye contact with your audience every time.</p>
    </div>
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