"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./app.module.css";

export default function TeleprompterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [text, setText] = useState("Your script here...");
  const [speed, setSpeed] = useState(4);
  const [isScrolling, setIsScrolling] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [countdown, setCountdown] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const scrollRef = useRef(null);

  const getContrastColor = (hexcolor, opacity = 0.8) => {
    const r = parseInt(hexcolor.substring(1, 3), 16);
    const g = parseInt(hexcolor.substring(3, 5), 16);
    const b = parseInt(hexcolor.substring(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? `rgba(0,0,0,${opacity})` : `rgba(255,255,255,${opacity})`;
  };

  const contrastColor = getContrastColor(bgColor);

  const handlePlay = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    if (isScrolling) { setIsScrolling(false); return; }
    
    let timer = 3;
    setCountdown(timer);
    const interval = setInterval(() => {
      timer -= 1;
      if (timer > 0) setCountdown(timer);
      else {
        clearInterval(interval);
        setCountdown(null);
        setIsScrolling(true);
      }
    }, 1000);
  }, [isScrolling]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // --- TODOS LOS EFFECTS JUNTOS Y ARRIBA ---
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    } else if (status === "authenticated" && !session?.user?.isPro) {
      router.push("/pricing");
    }
  }, [session, status, router]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space" && document.activeElement.tagName !== 'TEXTAREA') {
        event.preventDefault();
        handlePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePlay]);

  useEffect(() => {
    let frame;
    const move = () => {
      if (isScrolling && scrollRef.current) {
        scrollRef.current.scrollTop += speed / 3;
        frame = requestAnimationFrame(move);
      }
    };
    if (isScrolling) frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [isScrolling, speed]);

  // --- RETORNOS CONDICIONALES AL FINAL ---

  if (status === "loading") return <div className={styles.container}><p>Cargando...</p></div>;
  
  // Si no hay sesión o no es pro, mostramos un div vacío mientras el router redirige
  // Esto evita que React se queje de los hooks
  if (!session || !session.user.isPro) return <div className={styles.container} />;

  return (
    <div className={styles.container} style={{ backgroundColor: bgColor }}>
      {countdown && (
        <div className={styles.countdownOverlay} style={{ color: contrastColor }}>
          {countdown}
        </div>
      )}

      <div className={styles.prompterArea} ref={scrollRef}>
        {!isScrolling && !countdown && (
          <textarea 
            className={styles.glassInput}
            style={{ 
              backgroundColor: getContrastColor(bgColor, 0.05), 
              color: contrastColor, 
              borderColor: getContrastColor(bgColor, 0.1) 
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}
        
        <div 
          className={styles.scrollingText} 
          style={{ 
            color: contrastColor,
            opacity: countdown ? 0.3 : 1 
          }}
        >
          {text}
          <div style={{ height: "60vh" }} />
        </div>
      </div>

      <div className={styles.floatingControls} style={{ background: getContrastColor(bgColor, 0.15) }}>
        <button onClick={() => router.push('/')} className={styles.textBtn} style={{ color: contrastColor }}>Home</button>
        <button onClick={handlePlay} className={styles.textBtn} style={{ color: isScrolling ? '#ff4757' : contrastColor }}>
          {isScrolling ? "Stop" : "Play"}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.6rem', fontWeight: '900', color: getContrastColor(bgColor, 0.5) }}>SPEED</span>
          <input type="range" min="1" max="5" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} style={{ width: '80px' }} />
        </div>
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '25px', height: '25px', border: 'none', background: 'none', cursor: 'pointer' }} />
        <button onClick={toggleFullScreen} className={styles.textBtn} style={{ color: contrastColor }}>
          {isFullScreen ? "Exit" : "Full"}
        </button>
      </div>
    </div>
  );
}