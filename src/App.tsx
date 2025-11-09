import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone } from "lucide-react";
import { Logo } from "./components/Logo";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Dashboard } from "./components/Dashboard";

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAuth(false);
    setShowEmailForm(false);
    setEmail("");
    setPassword("");
  };

  const handleEmailSignIn = () => {
    setIsLoggedIn(true);
  };

  // If logged in, show dashboard
  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="size-full min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 animate-gradient">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 via-transparent to-slate-200/50 animate-gradient-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 size-full flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {!showAuth ? (
            // Splash Screen
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              >
                <Logo />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 bg-gradient-to-r from-blue-600 to-slate-700 bg-clip-text text-transparent"
              >
                TrustCircle
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-3 text-slate-600 max-w-sm"
              >
                Building financial trust, one connection at a time
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-12"
              >
                <Button
                  onClick={() => setShowAuth(true)}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200/50 px-12"
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            // Login/Signup Screen
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-slate-200/50 p-8"
            >
              <div className="flex flex-col items-center mb-8">
                <Logo />
                <h2 className="mt-6">Welcome Back</h2>
                <p className="mt-2 text-muted-foreground">
                  Choose your preferred sign-in method
                </p>
              </div>

              {!showEmailForm ? (
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowEmailForm(true)}
                    variant="outline"
                    size="lg"
                    className="w-full justify-start gap-3 h-14 border-2 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                  >
                    <Mail className="size-5 text-blue-600" />
                    <span>Sign in with Email</span>
                  </Button>

                  <Button
                    onClick={() => setIsLoggedIn(true)}
                    variant="outline"
                    size="lg"
                    className="w-full justify-start gap-3 h-14 border-2 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                  >
                    <svg className="size-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </Button>

                  <Button
                    onClick={() => setIsLoggedIn(true)}
                    variant="outline"
                    size="lg"
                    className="w-full justify-start gap-3 h-14 border-2 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                  >
                    <Phone className="size-5 text-blue-600" />
                    <span>Continue with Phone</span>
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 h-12"
                      onKeyDown={(e) => e.key === "Enter" && handleEmailSignIn()}
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 h-12"
                      onKeyDown={(e) => e.key === "Enter" && handleEmailSignIn()}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowEmailForm(false);
                        setEmail("");
                        setPassword("");
                      }}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleEmailSignIn}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      Sign In
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground pt-2">
                    Demo: Use any email/password for user access
                  </p>
                </motion.div>
              )}

              <p className="mt-8 text-center text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <button className="underline hover:text-foreground transition-colors">
                  Terms of Service
                </button>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes gradient-slow {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.4;
          }
          33% { 
            transform: translate(5%, -5%) rotate(2deg);
            opacity: 0.6;
          }
          66% { 
            transform: translate(-5%, 5%) rotate(-2deg);
            opacity: 0.5;
          }
        }
        
        .animate-gradient {
          animation: gradient 8s ease-in-out infinite;
        }
        
        .animate-gradient-slow {
          animation: gradient-slow 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
