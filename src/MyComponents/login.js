import "../App.css"; 
import { useSpeechSynthesis } from "react-speech-kit";
import { useState, useEffect } from "react";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import logo from './../images/bluelogo.png'
 
function Login() { 
  // auth is already initialized in firebase.js, no need to call getAuth again
  const { speak } = useSpeechSynthesis()
  const { signin, signup, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [displayName, setDisplayName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const emailinp = 'Enter your email'
  const pass = 'Enter the password'
  const name = 'Enter your full name'
  const acc = 'Create Account'
  const signin_text = 'Sign In'
   const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    try {
      await signup(email, password, displayName);
      toast.success("Account created successfully!");
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    try {
      await signin(email, password);
      toast.success("Signed in successfully!");
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }  };
  
  return ( 
    <div className="App">
      <Toaster position="top-right" />
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="Saarthi Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {isSignUp ? 'Create your account' : 'Sign in to your account'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign in here
                  </button>
                </>
              ) : (
                <>
                  Or{' '}
                  <button 
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    create a new account
                  </button>
                </>
              )}
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-4">
              {isSignUp && (
                <div>
                  <label className="sr-only">
                    Full Name
                  </label>
                  <input
                    id="display-name"
                    name="displayName"
                    type="text"
                    onMouseOver={() => speak({ text: name })}
                    autoComplete="name"
                    required={isSignUp}
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Full Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  onMouseOver={() => speak({ text: emailinp })}                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  onMouseOver={() => speak({ text: pass })}
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                onMouseOver={() => speak({ text: isSignUp ? acc : signin_text })}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </button>
            </div></form>
        </div>
      </div>
    </div>
  ); 
} 
 
export default Login;