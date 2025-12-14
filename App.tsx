import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, Link, useParams } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { BIO_MODULES } from './data';
import { Module } from './types';
import Auth from './components/Auth';
import QuizCard from './components/QuizCard';
import { generateMoreQuestions } from './services/gemini';
import { BookOpen, Trophy, Play, Key, GraduationCap, ChevronRight, Activity, Menu, X, BrainCircuit } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                <GraduationCap size={20} />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">BioScholar</span>
            </Link>
            
            <div className="flex items-center gap-4">
               <Auth user={user} />
            </div>
          </div>
        </header>

        <main className="flex-1 bg-slate-50">
          <Routes>
            <Route path="/" element={<HomePage user={user} modules={BIO_MODULES} />} />
            <Route path="/module/:id" element={<ModulePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-slate-200 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} BioScholar. Designed by Akin S. Sokpah.</p>
                <p className="mt-2 text-xs">Educational content provided for biology students.</p>
            </div>
        </footer>
      </div>
    </HashRouter>
  );
}

// --- Page Components ---

const HomePage: React.FC<{ user: User | null, modules: Module[] }> = ({ user, modules }) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Master Biology from Freshman to Senior</h1>
                <p className="text-lg text-slate-600">
                    Comprehensive modules, interactive quizzes, and AI-powered visual explanations to help you ace your exams.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {modules.map((mod) => (
                    <Link to={`/module/${mod.id}`} key={mod.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                        <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{mod.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 line-clamp-2">{mod.description}</p>
                        
                        <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:gap-2 transition-all">
                            Start Module <ChevronRight size={16} />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Stats / CTA Section */}
            <div className="mt-20 bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-20 -ml-16 -mb-16"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Track Your Progress</h2>
                        <p className="text-slate-300 max-w-md">
                            Visualize your learning journey with detailed analytics. Identify weak spots and master complex biological concepts.
                        </p>
                    </div>
                    {/* Dummy Chart */}
                    <div className="w-full md:w-1/3 h-48 bg-white/5 rounded-xl border border-white/10 p-4">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                {name: 'M1', score: 80}, {name: 'M2', score: 65}, {name: 'M3', score: 90}, {name: 'M5', score: 75}, {name: 'M6', score: 85}
                            ]}>
                                <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 10}} axisLine={false} tickLine={false} />
                                <Bar dataKey="score" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ModulePage: React.FC = () => {
    const { id } = useParams();
    
    const moduleData = BIO_MODULES.find(m => m.id === id);
    const [questions, setQuestions] = useState(moduleData?.questions || []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [generating, setGenerating] = useState(false);

    if (!moduleData) return <div className="p-8 text-center">Module not found</div>;

    const handleNext = (correct: boolean) => {
        if (correct) setScore(s => s + 1);
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(i => i + 1);
        } else {
            setShowResults(true);
        }
    };

    const handleGenerateMore = async () => {
        setGenerating(true);
        const newQuestions = await generateMoreQuestions(moduleData.title, 5);
        if (newQuestions.length > 0) {
            // Append new questions and continue quiz
            setQuestions(prev => [...prev, ...newQuestions]);
            alert(`Added ${newQuestions.length} new AI-generated questions!`);
            setShowResults(false);
            setCurrentIndex(questions.length); // Move to the first new question
        } else {
            alert("Failed to generate questions. Check connection or quota.");
        }
        setGenerating(false);
    }

    const restart = () => {
        setScore(0);
        setCurrentIndex(0);
        setShowResults(false);
    }

    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="max-w-2xl mx-auto px-4 py-12 text-center">
                <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-100">
                    <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-200">
                        <Trophy size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Module Completed!</h2>
                    <p className="text-slate-500 mb-8">You have finished {moduleData.title}</p>
                    
                    <div className="flex justify-center items-end gap-2 mb-8">
                        <span className="text-6xl font-bold text-slate-900">{percentage}%</span>
                        <span className="text-lg text-slate-500 mb-2">Score</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={restart} className="py-3 px-6 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                            Retry Quiz
                        </button>
                        <button 
                            onClick={handleGenerateMore} 
                            disabled={generating}
                            className="flex items-center justify-center gap-2 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-70"
                        >
                            {generating ? (
                                <>Generating...</>
                            ) : (
                                <><BrainCircuit size={18} /> Practice More</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link to="/" className="text-sm text-slate-500 hover:text-indigo-600 mb-2 inline-block">&larr; Back to Modules</Link>
                    <h1 className="text-2xl font-bold text-slate-900">{moduleData.title}</h1>
                </div>
                <div className="text-right">
                    <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Progress</div>
                    <div className="text-xl font-bold text-indigo-600">{currentIndex + 1} <span className="text-slate-300">/</span> {questions.length}</div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-200 rounded-full mb-8 overflow-hidden">
                <div 
                    className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                    style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
                ></div>
            </div>

            <QuizCard 
                question={questions[currentIndex]} 
                onNext={handleNext} 
                isLast={currentIndex === questions.length - 1}
            />
        </div>
    );
};

export default App;