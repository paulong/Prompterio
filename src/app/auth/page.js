"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to the app if the user is already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/app");
    }
  }, [status, router]);

  // Loading state to prevent flickering while checking session
  if (status === "loading") {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh",
      textAlign: "center"
    }}>
      <h1 style={{ marginBottom: "10px" }}>Log In to Prompterio</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        Sign in to access your teleprompter and pro features.
      </p>

      <button
        onClick={() => signIn("google")}
        style={{
          padding: "12px 24px",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          transition: "background-color 0.2s"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#357ae8")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4285F4")}
      >
        Continue with Google
      </button>

      <a 
        href="/" 
        style={{ marginTop: "20px", fontSize: "14px", color: "#888", textDecoration: "none" }}
      >
        ← Back to Home
      </a>
    </div>
  );
}