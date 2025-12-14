import React, { useState } from 'react';
import { Question } from '../types';
import { CheckCircle2, XCircle, Lightbulb, ArrowRight } from 'lucide-react';
import { generateExplanation } from '../services/gemini';
import Diagram from './Diagram';

interface QuizCardProps {
  question: Question;
  onNext: (correct: boolean) => void;
  isLast: boolean;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onNext, isLast }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (isRevealed) return;
    setSelectedOption(option);
  };

  const checkAnswer = async () => {
    setIsRevealed(true);
    // Fetch explanation dynamically if not present
    if (!explanation) {
        const exp = await generateExplanation(question.question, question.correctAnswer);
        setExplanation(exp);
    }
  };

  const handleNext = () => {
    onNext(selectedOption === question.correctAnswer);
    setSelectedOption(null);
    setIsRevealed(false);
    setExplanation(null);
  };

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Question Column */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                    Question {question.id}
                </span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
                {question.question}
            </h2>

            <div className="space-y-3">
                {question.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrectOption = option === question.correctAnswer;
                    
                    let cardClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ";
                    
                    if (isRevealed) {
                        if (isCorrectOption) cardClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
                        else if (isSelected && !isCorrectOption) cardClass += "border-red-500 bg-red-50 text-red-900";
                        else cardClass += "border-slate-100 opacity-50";
                    } else {
                        if (isSelected) cardClass += "border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-600";
                        else cardClass += "border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-700";
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleSelect(option)}
                            disabled={isRevealed}
                            className={cardClass}
                        >
                            <span className="font-medium">{option}</span>
                            {isRevealed && isCorrectOption && <CheckCircle2 className="text-emerald-600" size={20} />}
                            {isRevealed && isSelected && !isCorrectOption && <XCircle className="text-red-600" size={20} />}
                        </button>
                    );
                })}
            </div>

            <div className="mt-8 flex items-center justify-between">
                {!isRevealed ? (
                    <button
                        onClick={checkAnswer}
                        disabled={!selectedOption}
                        className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Check Answer
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl shadow-lg hover:bg-slate-800 transition-all ml-auto"
                    >
                        {isLast ? "Finish Quiz" : "Next Question"} <ArrowRight size={18} />
                    </button>
                )}
            </div>
        </div>
        
        {/* Explanation Block */}
        {isRevealed && (
             <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-6 animate-fade-in-up">
                <div className="flex items-start gap-3">
                    <Lightbulb className="text-amber-500 shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="font-bold text-amber-900 mb-1">Explanation</h4>
                        <p className="text-amber-800 leading-relaxed">
                            {explanation || "Loading explanation..."}
                        </p>
                    </div>
                </div>
             </div>
        )}
      </div>

      {/* Diagram / Visual Column */}
      <div className="lg:col-span-1">
        {isRevealed && (
            <Diagram topic={question.correctAnswer} context={question.question} />
        )}
        {!isRevealed && (
            <div className="h-full min-h-[300px] bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-200 mb-4 animate-pulse"></div>
                <p className="text-sm font-medium">Visual illustration will appear after you answer.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
