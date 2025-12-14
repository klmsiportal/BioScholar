import React, { useState } from 'react';
import { signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { LogIn, LogOut, User as UserIcon, CreditCard, X } from 'lucide-react';

interface AuthProps {
  user: User | null;
}

const Auth: React.FC<AuthProps> = ({ user }) => {
  const [showManual, setShowManual] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Check console.");
    }
  };

  const handleLogout = () => signOut(auth);

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-sm font-medium text-slate-700">{user.displayName}</span>
             <span className="text-xs text-slate-500">Student</span>
          </div>
          {user.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-slate-200" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
               <UserIcon size={20} />
            </div>
          )}
          <button 
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
            <button
                onClick={handleGoogleLogin}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-50 transition-all text-sm font-medium text-slate-700"
            >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                Sign in
            </button>
            <button
                onClick={() => setShowManual(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all text-sm font-medium"
            >
                Sign Up
            </button>
        </div>
      )}

      {/* Manual Signup Modal */}
      {showManual && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative animate-fade-in-up">
                <button 
                    onClick={() => setShowManual(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                    <X size={24} />
                </button>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Manual Registration</h2>
                <p className="text-slate-600 mb-6">
                    Don't have a Google account? You can register directly by contacting the administrator or making a payment via the methods below.
                </p>

                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                        <CreditCard size={18} /> Payment Methods
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-indigo-100">
                            <span className="font-medium text-slate-700">MoMo (Liberia)</span>
                            <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">+231 889 183 557</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-indigo-100">
                            <span className="font-medium text-slate-700">UBA Account</span>
                            <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">53020710015394</span>
                        </div>
                    </div>
                    <div className="mt-3 text-xs text-indigo-600 text-center">
                        Account Name: Akin S. Sokpah
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-slate-500 mb-4">
                        After payment, please contact support with your transaction ID to activate your account.
                    </p>
                    <a 
                        href="tel:+231889183557"
                        className="inline-block w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
