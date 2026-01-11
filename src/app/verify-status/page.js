"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./verify.module.css"; // O usa Tailwind si prefieres

export default function VerifyStatusPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Solo actuamos cuando la sesión ha terminado de cargar
    if (status === "authenticated") {
      if (session?.user?.isPro) {
        // ✅ Es PRO: Al Teleprompter
        router.push("/app");
      } else {
        // ❌ No es PRO: Al Pricing
        router.push("/pricing");
      }
    } else if (status === "unauthenticated") {
      // 🔒 Ni siquiera está logueado: Al Login
      router.push("/auth");
    }
  }, [session, status, router]);

  return (
    <div className={styles.container}>
      <div className={styles.loaderBox}>
        <div className={styles.spinner}></div>
        <h1 className={styles.title}>Verificando tu suscripción</h1>
        <p className={styles.text}>Estamos preparando tu espacio de trabajo profesional...</p>
      </div>
    </div>
  );
}