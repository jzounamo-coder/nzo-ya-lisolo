import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion, Proverb } from '../types';
import { MOCK_QUIZ, MOCK_PROVERBS } from '../constants';
import { Check, X, Trophy, RefreshCw, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = MOCK_QUIZ[currentQuestionIndex];
  const associatedProverb = MOCK_PROVERBS.find(p => p.id === currentQuestion?.proverbId);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < MOCK_QUIZ.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="bg-white border-3 border-brand-ink p-12 text-center brutal-shadow-jungle max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-brand-savannah border-3 border-brand-ink flex items-center justify-center mx-auto mb-6 brutal-shadow">
          <Trophy size={40} />
        </div>
        <h2 className="text-4xl font-serif font-black italic mb-4">Quiz Terminé !</h2>
        <p className="text-2xl font-black mb-8">
          Ton score : <span className="text-brand-clay">{score}</span> / {MOCK_QUIZ.length}
        </p>
        <button 
          onClick={resetQuiz}
          className="bg-brand-ink text-white px-10 py-4 font-black uppercase tracking-widest flex items-center gap-2 mx-auto hover:bg-brand-clay transition-all brutal-shadow"
        >
          <RefreshCw size={20} />
          Recommencer
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-black italic text-brand-ink">Défis Sagesse</h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mt-1">Échauffe ton esprit avec nos proverbes</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-clay">Question</span>
          <p className="text-xl font-black leading-none">{currentQuestionIndex + 1} / {MOCK_QUIZ.length}</p>
        </div>
      </div>

      <div className="bg-white border-3 border-brand-ink p-10 brutal-shadow relative">
        <div className="absolute -top-4 -left-4 bg-brand-clay text-white px-4 py-1 text-xs font-black uppercase tracking-widest border-2 border-brand-ink">
          Que signifie ce proverbe ?
        </div>

        <div className="mb-8 pt-4">
          <p className="text-2xl font-serif italic font-bold text-brand-earth mb-2">
            "{associatedProverb?.text}"
          </p>
          <p className="text-sm text-stone-500 font-medium">Origine : {associatedProverb?.originCountryName || 'Inconnue'}</p>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctAnswerIndex;
            const isSelected = index === selectedOption;
            
            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered}
                className={cn(
                  "w-full p-4 text-left border-3 transition-all flex items-center justify-between group",
                  !isAnswered && "border-brand-ink hover:bg-stone-50 hover:translate-x-1",
                  isAnswered && isCorrect && "border-brand-jungle bg-brand-jungle/10",
                  isAnswered && isSelected && !isCorrect && "border-brand-clay bg-brand-clay/10",
                  isAnswered && !isSelected && !isCorrect && "border-stone-200 opacity-50"
                )}
              >
                <span className={cn(
                  "font-bold uppercase tracking-wide text-sm",
                  isAnswered && isCorrect ? "text-brand-jungle" : "text-brand-ink"
                )}>
                  {option}
                </span>

                <AnimatePresence>
                  {isAnswered && isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="text-brand-jungle" size={20} />
                    </motion.div>
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <X className="text-brand-clay" size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t-2 border-brand-ink/10"
          >
            <div className="flex-1">
              <p className={cn(
                "text-sm font-black uppercase tracking-widest mb-1",
                selectedOption === currentQuestion.correctAnswerIndex ? "text-brand-jungle" : "text-brand-clay"
              )}>
                {selectedOption === currentQuestion.correctAnswerIndex ? "Bravo !" : "Oups ..."}
              </p>
              <p className="text-xs text-stone-500 font-medium leading-relaxed italic">
                {associatedProverb?.explanation}
              </p>
            </div>
            <button 
              onClick={handleNext}
              className="bg-brand-ink text-white px-8 py-3 font-black uppercase tracking-widest flex items-center gap-2 hover:bg-brand-clay transition-all brutal-shadow shrink-0"
            >
              {currentQuestionIndex === MOCK_QUIZ.length - 1 ? "Voir les résultats" : "Suivant"}
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
