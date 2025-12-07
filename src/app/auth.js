
import { useState } from 'react';
import { signIn, useSession } from 'next-auth/client'; 
import { useRouter } from 'next/router';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login/Sign-up
  const [error, setError] = useState(null);
  
  const [session, loading] = useSession();
  const router = useRouter();

  // Redirect authenticated users immediately
  if (session) {
    router.push('/app');
    return null; // Or show a loading state
  }
  
  // 1. The core handler for both login and sign-up
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // If it's a login attempt
    if (isLogin) {
      // 1a. NextAuth signIn function handles the POST request to the API route
      const result = await signIn('credentials', {
        redirect: false, // Prevents automatic redirect on success/failure
        email: email,
        password: password,
      });

      if (result.error) {
        setError('Login failed. Check your email and password.');
      } else {
        // Login successful, redirect to the main app
        router.push('/app');
      }
    } else {
      // If it's a sign-up attempt (we'll implement the actual sign-up API in a moment)
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Success: Try to log them in immediately after sign-up
          alert('Sign-up successful! Logging you in...');
          await signIn('credentials', { email, password, callbackUrl: '/app' });
        } else {
          setError(data.message || 'Sign-up failed. Please try a different email.');
        }
      } catch (e) {
        setError('An unexpected error occurred during sign-up.');
      }
    }
  };

  return (
    <div className="className={styles.AUTH_CONTAINER}">
      <h1 className="className={styles.TITLE}">
        {isLogin ? 'Welcome Back' : 'Create Your Account'}
      </h1>
      <form onSubmit={handleSubmit} className="className={styles.AUTH_FORM}">
        
        <div className="className={styles.FORM_GROUP}">
          <label htmlFor="email" className="className={styles.LABEL}">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="className={styles.INPUT}"
            required
          />
        </div>

        <div className="className={styles.FORM_GROUP}">
          <label htmlFor="password" className="className={styles.LABEL}">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="className={styles.INPUT}"
            required
          />
        </div>

        {error && <p className="className={styles.ERROR_MESSAGE}">{error}</p>}

        <button 
          type="submit" 
          disabled={loading}
          className="className={styles.BUTTON_PRIMARY}"
        >
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(prev => !prev)}
        className="className={styles.TOGGLE_BUTTON}"
      >
        {isLogin 
          ? "Don't have an account? Sign Up" 
          : "Already have an account? Log In"
        }
      </button>
    </div>
  );
}