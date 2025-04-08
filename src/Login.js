"use client"

import { useState } from "react"
import { supabase } from "./supaBaseClient"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import "./Login.css"

function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isLogin, setIsLogin] = useState(true) // true = login, false = signup
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        // const { data, error } = await supabase.auth.signInWithPassword({
        //   email,
        //   password,
        // })

        
        const { data, error} = await supabase
      .from("users")
      .select("*")
      .eq("email", email) 
      .eq("password", password) 
      .single(); 
        setUser(data.user)
        navigate("/home")
      }
      
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + "/auth/callback",
        },
      })

      if (error) throw error
    } catch (error) {
      alert(error.message)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email address")
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      })

      if (error) throw error
      alert("Password reset link sent to your email")
    } catch (error) {
      alert(error.message)
    }
  }

  const handleNavigateToSignup = () => {
    navigate("/register")
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card-inner">
          <div className="auth-decoration-top"></div>
          <div className="auth-decoration-bottom"></div>

          <div className="auth-header">
            <h1>{isLogin ? "Welcome back" : "Create account"}</h1>
            <p>Please enter your details to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label htmlFor="password">Password</label>
                {isLogin && (
                  <button type="button" onClick={handleForgotPassword} className="forgot-password">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Processing...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="auth-divider">
              <span>Or continue with</span>
            </div>

            <div className="social-buttons">
              <button type="button" className="social-button facebook" onClick={() => handleSocialLogin("facebook")}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4383 21.879V14.89H7.89831V12H10.4383V9.797C10.4383 7.291 11.9313 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1923C13.9503 8.562 13.5623 9.333 13.5623 10.124V12H16.3363L15.8933 14.89H13.5623V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" />
                </svg>
                <span>Facebook</span>
              </button>
              <button type="button" className="social-button google" onClick={() => handleSocialLogin("google")}>
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                <span>Google</span>
              </button>
            </div>

            <div className="auth-footer">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  className="text-button"
                  onClick={isLogin ? handleNavigateToSignup : () => setIsLogin(true)}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
