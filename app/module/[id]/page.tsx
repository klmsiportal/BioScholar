'use client';

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'next/navigation'; // Correct import for App Router
import LinkComponent from 'next/link';
import { BIO_MODULES } from '@/lib/data';
import QuizCard from '@/components/QuizCard';
import { generateMoreQuestionsAction } from '@/app/actions'; // Import Server Action
import { Trophy, BrainCircuit } from 'lucide-react';
import { Question } from '@/lib/types';

export default function ModulePage() {
    const params = useParams();
    const id = params?.id as string;
    
    // Find module - in a real app this might be a DB call, here it's static data
    const moduleData = BIO_MODULES.find(m => m.id === id);
    
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [generating, setGenerating] = useState(false);

    // Initialize questions
    useEffect(() => {
        if (moduleData) {
            setQuestions(moduleData.questions);
        }
    }, [moduleData]);

    if (!moduleData) return <div className="p-8 text-center">Module not found</div>;
    if (questions.length === 0) return <div className="p-8 text-center">Loading questions...</div>;

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
        try {
            // Call Server Action
            const newQuestions = await generateMoreQuestionsAction(moduleData.title, 5);
            if (newQuestions && newQuestions.length > 0) {
                setQuestions(prev => [...prev, ...newQuestions]);
                alert(`Added ${newQuestions.length} new AI-generated questions!`);
                setShowResults(false);
                setCurrentIndex(questions.length); 
            } else {
                alert("Failed to generate questions. Check connection or quota.");
            }
        } catch (e) {
            console.error(e);
            alert("Error generating questions.");
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
                    <LinkComponent href="/" className="text-sm text-slate-500 hover:text-indigo-600 mb-2 inline-block">&larr; Back to Modules</LinkComponent>
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
}
