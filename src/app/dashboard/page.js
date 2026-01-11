"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    router.push("/auth");
    return null;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Welcome, {session.user.name}!</h1>
      
      {/* SECCIÓN DE ESTADO DE CUENTA */}
      <div style={{ background: "#f4f4f4", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <p>Status: <strong>{session.user.isPro ? "PRO Plan" : "Free Plan"}</strong></p>
        
        {!session.user.isPro && (
          <Link href="/pricing" style={{ color: "blue", fontWeight: "bold" }}>
            🚀 Upgrade to Pro to save unlimited scripts
          </Link>
        )}
      </div>

      {/* AQUÍ IRÍAN LOS GUIONES DEL USUARIO */}
      <div>
        <h2>Your Scripts</h2>
        <button onClick={() => router.push("/teleprompter")}>+ New Script</button>
      </div>
    </div>
  );
}