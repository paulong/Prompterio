"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./pricing.module.css";

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Tu URL de producto (Asegúrate que sea la de 'Checkout' de la pestaña Share)
  const GUMROAD_URL = "https://aenema.gumroad.com/l/prompterio?wanted=true";

  return (
    <div className={styles.container}>
      {/* QUITAMOS EL SCRIPT DE AQUÍ PORQUE YA ESTÁ EN EL LAYOUT */}

      <h1 className={styles.title}>Upgrade to Prompterio Pro</h1>
      <p className={styles.subtitle}>Unlock the full potential of your teleprompter.</p>

      <div className={styles.card}>
        <div className={styles.price}>$9.99<span>/mo</span></div>
        <ul className={styles.featureList}>
          <li>Unlimited Saved Scripts</li>
          <li>Mirror Mode (Teleprompter Glass)</li>
          <li>Adjustable Scroll Speed</li>
          <li>Remote Control Access</li>
        </ul>
        
        <a 
          className={styles.buyButton} 
          href={session ? GUMROAD_URL : "/auth"}
          data-gumroad-overlay-checkout="true"
        >
          {session ? "Get Pro Now" : "Sign In to Upgrade"}
        </a>
      </div>

      <button className={styles.backButton} onClick={() => router.push("/")}>
        Back
      </button>
    </div>
  );
}