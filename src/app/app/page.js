"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./app.module.css";

export default function TeleprompterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [text, setText] = useState(`Welcome to your Professional Teleprompter! 🚀

Let's get you ready for a perfect take with these quick tips:

💡 THE LIGHTING SECRET
Before you hit Play, turn your screen brightness to the MAXIMUM! 🌟 By doing this, your screen acts as a soft lightbox, illuminating your face beautifully while you look directly at the lens. It's the best way to look professional without extra equipment!

⚡ ADJUST YOUR PACE
Use the SPEED slider below to find your natural rhythm. Start slow (Level 2-3), and as you get more comfortable, feel free to speed it up! 

🎨 PERSONALIZE YOUR VIEW
Click the color picker to change the background. 🌈 Whether you prefer a classic dark mode or a bright white "Light Box" effect, our smart contrast logic will automatically flip the text color to keep it crystal clear.

🖥️ GO FULL SCREEN
For a distraction-free experience, hit the "FULL" button. This will hide your browser tabs and keep you focused on your message.

🔄 READY TO SHINE?
Paste your own script here or practice with this one. When you're ready, hit PLAY, wait for the countdown, and give it your best! ✨`);
  const [speed, setSpeed] = useState(4);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isStarted, setIsStarted] = useState(false); 
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
    
    if (isScrolling) { 
      setIsScrolling(false); 
      return; 
    }
    
    setIsStarted(true);
    
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

  if (status === "loading") return <div className={styles.container}><p>Cargando...</p></div>;
  if (!session || !session.user.isPro) return <div className={styles.container} />;

  return (
    <div className={styles.container} style={{ backgroundColor: bgColor }}>
      
      {/* 1. TEXTO DEL PROMPTER (CAPA DE FONDO) */}
      <div className={styles.prompterArea} ref={scrollRef}>
        <div 
          className={styles.scrollingText} 
          style={{ 
            color: contrastColor,
            opacity: isStarted ? 1 : 0 
          }}
        >
          {text}
        </div>
      </div>

      {/* 2. EDITOR DE TEXTO (CAPA MEDIA) */}
      {!isStarted && !countdown && (
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

      {/* 3. COUNTDOWN (CAPA SUPERIOR) */}
      {countdown && (
        <div className={styles.countdownOverlay} style={{ color: contrastColor }}>
          {countdown}
        </div>
      )}

      {/* 4. CONTROLES */}
      <div className={styles.floatingControls} style={{ background: getContrastColor(bgColor, 0.15) }}>
        <button 
          onClick={() => {
            if (isStarted) {
              setIsStarted(false);
              setIsScrolling(false);
              if (scrollRef.current) scrollRef.current.scrollTop = 0; // Reset scroll al editar
            } else {
              router.push('/');
            }
          }} 
          className={styles.textBtn} 
          style={{ color: contrastColor }}
        >
          {isStarted ? "Edit Script" : "Home"}
        </button>

        <button onClick={handlePlay} className={styles.textBtn} style={{ color: isScrolling ? '#ff4757' : contrastColor }}>
          {isScrolling ? "Pause" : "Play"}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.6rem', fontWeight: '900', color: getContrastColor(bgColor, 0.5) }}>SPEED</span>
          <input type="range" min="1" max="10" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} style={{ width: '80px' }} />
        </div>

        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '25px', height: '25px', border: 'none', background: 'none', cursor: 'pointer' }} />
        
        <button onClick={toggleFullScreen} className={styles.textBtn} style={{ color: contrastColor }}>
          {isFullScreen ? "Exit" : "Full"}
        </button>
      </div>
    </div>
  );
}