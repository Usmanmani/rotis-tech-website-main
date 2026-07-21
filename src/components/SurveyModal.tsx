/**
 * =============================================================================
 *  PROJECT       : ROTIS - Rotis Tech (Private) Limited
 *  FILE          : src/components/SurveyModal.tsx
 *  DESCRIPTION   : Market-research survey modal - submits responses via Netlify Forms.
 * -----------------------------------------------------------------------------
 *  DEVELOPED BY  : dotwasi
 *  CEO & OWNER   : Usman Yaseen
 * -----------------------------------------------------------------------------
 *  COPYRIGHT (c) 2026 Rotis Tech (Private) Limited. All Rights Reserved.
 *
 *  This source code is the confidential and proprietary property of
 *  Rotis Tech (Private) Limited. Unauthorized copying, modification,
 *  distribution, or use of this file, via any medium, is strictly
 *  prohibited without prior written permission from the owner.
 * =============================================================================
 */

// ========================================================================
// START OF FILE: src/components/SurveyModal.tsx (FINAL, COMPLETE, AND CORRECTED)
// ========================================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Survey.css';

// --- All Survey Questions and Data ---
const surveyQuestions = [
    { id: 1, type: 'checkbox', question: 'What type of food business do you operate?', options: ['Restaurant', 'Café', 'Takeaway', 'Fast Food / QSR', 'Cloud Kitchen', 'Hotel Restaurant', 'Catering Business', 'Other'] },
    { id: 2, type: 'radio', question: 'How many locations do you currently operate?', options: ['1', '2-5', '6-20', 'More than 20'] },
    { id: 3, type: 'radio', question: 'Approximately how many employees do you have?', options: ['1-10', '11-25', '26-50', 'More than 50'] },
    { id: 4, type: 'checkbox', question: 'Which operational challenges affect your business the most? (Select up to 5)', options: ['Rising food costs', 'Food waste', 'Staff shortages', 'Labour scheduling', 'Inventory management', 'Customer retention', 'Profitability', 'Sales forecasting', 'Manual reporting', 'Too many disconnected software systems', 'Other'] },
    { id: 5, type: 'checkbox', question: 'Which software do you currently use?', options: ['Lightspeed', 'Toast', 'Square', 'Epos Now', 'Zonal', 'Oracle MICROS', 'MarketMan', 'Nory AI', 'Tenzo', 'Other', 'No dedicated software'] },
    { id: 6, type: 'rating', question: 'Overall, how satisfied are you with your current software?', options: ['1', '2', '3', '4', '5'], labels: { '1': 'Very Dissatisfied', '5': 'Very Satisfied'} },
    { id: 7, type: 'checkbox', question: 'Which AI capabilities would provide the greatest value to your business?', options: ['Predict food demand', 'Reduce food waste', 'Optimise staff scheduling', 'Predict sales', 'Increase profitability', 'Inventory optimisation', 'AI business recommendations', 'Voice AI assistant', 'Automatic operational alerts', 'Customer behaviour analysis'] },
    { id: 8, type: 'radio', question: 'If you could simply ask your software: "Why are sales down today?" or "How can I reduce food waste?", would this be valuable?', options: ['Extremely Valuable', 'Valuable', 'Neutral', 'Not Valuable'] },
    { id: 9, type: 'radio', question: 'Would you trust an AI assistant to recommend operational decisions while leaving the final decision to you?', options: ['Yes', 'Maybe', 'No'] },
    { id: 10, type: 'radio', question: 'Which statement best describes your preference?', options: ['I prefer reports and dashboards.', 'I prefer AI recommendations.', 'I prefer a combination of both.'] },
    { id: 11, type: 'rating', question: 'If a platform could reduce food waste, improve profits, and provide an AI assistant, how interested would you be?', options: ['1', '2', '3', '4', '5'], labels: { '1': 'Not Interested', '5': 'Extremely Interested'} },
    { id: 12, type: 'radio', question: 'What monthly subscription would you consider reasonable?', options: ['Less than £100', '£100-£199', '£200-£299', '£300-£499', 'More than £500'] },
    { id: 13, type: 'radio', question: 'Would you be interested in participating in a free pilot programme?', options: ['Yes', 'Maybe', 'No'] },
    { id: 14, type: 'textarea', question: 'In your opinion, what is the biggest operational challenge facing UK restaurants today?' },
    { id: 15, type: 'textarea', question: 'If you could add one feature to future restaurant software, what would it be?' },
    { id: 16, type: 'contact', question: 'Thank you! Would you like to be contacted for future product trials?' },
];

const SurveyModal = ({ onClose }: { onClose: () => void }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [status, setStatus] = useState<'filling' | 'submitting' | 'submitted'>('filling');
    const [error, setError] = useState<string | null>(null);

    const currentQuestion = surveyQuestions[currentQuestionIndex];

    const isAnswered = () => {
        const answer = answers[currentQuestion.id];
        if (currentQuestion.type === 'checkbox') return answer && answer.length > 0;
        if (currentQuestion.type === 'textarea') return answer && answer.trim() !== '';
        if (currentQuestion.type === 'contact') return true; // Contact step is optional
        return answer !== undefined && answer !== null && answer !== '';
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (currentQuestionIndex < surveyQuestions.length - 1) {
                    handleNext();
                } else {
                    const form = document.querySelector('form[name="survey"]');
                    if (form) (form as HTMLFormElement).requestSubmit();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentQuestionIndex, answers]);

    const handleAnswerChange = (questionId: number, value: any, key: string) => {
        setError(null);
        if (key.startsWith('contact_')) {
            setAnswers({ ...answers, [key]: value });
        } else if (key === 'checkbox') {
            const existingAnswers = answers[questionId] || [];
            const newAnswers = existingAnswers.includes(value)
                ? existingAnswers.filter((ans: string) => ans !== value)
                : [...existingAnswers, value];
            setAnswers({ ...answers, [questionId]: newAnswers });
        } else {
            setAnswers({ ...answers, [questionId]: value });
        }
    };
    
    const handleNext = () => {
        if (isAnswered()) {
            setError(null);
            if (currentQuestionIndex < surveyQuestions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        } else {
            setError('Please provide an answer to continue.');
        }
    };

    const handleBack = () => {
        setError(null);
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('submitting');
        
        const formData = new FormData();
        formData.append('form-name', 'survey');

        surveyQuestions.forEach(q => {
            const answer = answers[q.id];
            let answerValue = '';

            if (answer) {
                answerValue = Array.isArray(answer) ? answer.join(', ') : String(answer);
            }
            formData.append(q.question, answerValue);
        });

        formData.append('Contact Business Name', answers['contact_business_name'] || '');
        formData.append('Contact Email', answers['contact_email'] || '');

        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as any).toString(),
            });
            setStatus('submitted');
        } catch (error) {
            console.error("Form submission error:", error);
            alert("There was an error submitting your survey. Please try again.");
            setStatus('filling');
        }
    };

    const progress = ((currentQuestionIndex + 1) / surveyQuestions.length) * 100;
    const variants = {
        enter: { opacity: 0, x: 50 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="bg-gray-800 w-full max-w-2xl h-[90vh] max-h-[700px] rounded-lg shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-lg font-bold text-brand-primary">UK Restaurant Technology Survey</h2>
                    <button onClick={onClose} className="text-gray-400 text-3xl leading-none hover:text-white">&times;</button>
                </div>

                <div className="flex-grow p-8 overflow-y-auto relative">
                    <AnimatePresence mode="wait">
                        {status === 'filling' ? (
                            <motion.div
                                key={currentQuestion.id}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-2xl font-semibold text-white mb-2">{currentQuestion.question}</h3>
                                <AnimatePresence>
                                    {error && (
                                        <motion.p 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="text-red-400 text-sm mb-4"
                                        >
                                            {error}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                                
                                <div className="space-y-4 mt-4">
                                    {currentQuestion.type === 'checkbox' && currentQuestion.options?.map(option => (
                                        <label key={option} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-md cursor-pointer hover:bg-gray-700 transition-colors">
                                            <input type="checkbox" name={`q_${currentQuestion.id}`} value={option}
                                                checked={(answers[currentQuestion.id] || []).includes(option)}
                                                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value, 'checkbox')}
                                                className="survey-form-input" style={{'--form-control-color': '#0ea5e9'} as React.CSSProperties} />
                                            <span className="text-gray-200">{option}</span>
                                        </label>
                                    ))}
                                    {currentQuestion.type === 'radio' && currentQuestion.options?.map(option => (
                                        <label key={option} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-md cursor-pointer hover:bg-gray-700 transition-colors">
                                            <input type="radio" name={`q_${currentQuestion.id}`} value={option}
                                                checked={answers[currentQuestion.id] === option}
                                                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value, 'radio')}
                                                className="survey-form-input" style={{'--form-control-color': '#0ea5e9'} as React.CSSProperties} />
                                            <span className="text-gray-200">{option}</span>
                                        </label>
                                    ))}
                                    {currentQuestion.type === 'rating' && (
                                        <div className="flex flex-col items-center">
                                            <div className="rating">
                                                {currentQuestion.options?.slice().reverse().map(value => (
                                                    <React.Fragment key={value}>
                                                        <input type="radio" id={`star${value}_q${currentQuestion.id}`} name={`q_${currentQuestion.id}`} value={value}
                                                            checked={answers[currentQuestion.id] === value}
                                                            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value, 'rating')} />
                                                        <label htmlFor={`star${value}_q${currentQuestion.id}`}>&#9733;</label>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div className="flex justify-between w-full text-xs text-gray-400 mt-2 px-2">
                                                <span>{currentQuestion.labels?.[1]}</span>
                                                <span>{currentQuestion.labels?.[5]}</span>
                                            </div>
                                        </div>
                                    )}
                                    {currentQuestion.type === 'textarea' && (
                                        <textarea
                                            value={answers[currentQuestion.id] || ''}
                                            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value, 'textarea')}
                                            rows={5}
                                            placeholder="Your thoughts..."
                                            className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                        />
                                    )}
                                    {currentQuestion.type === 'contact' && (
                                        <div className="space-y-4">
                                            <p className="text-gray-300">This is optional, but required if you'd like to be contacted about our pilot program.</p>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400">Business Name</label>
                                                <input type="text" value={answers['contact_business_name'] || ''} onChange={(e) => handleAnswerChange(0, e.target.value, 'contact_business_name')} className="mt-1 w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400">Email</label>
                                                <input type="email" value={answers['contact_email'] || ''} onChange={(e) => handleAnswerChange(0, e.target.value, 'contact_email')} className="mt-1 w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} className="text-center flex flex-col items-center justify-center h-full">
                                <h3 className="text-3xl font-bold text-brand-secondary mb-4">Thank You!</h3>
                                <p className="text-gray-300 mb-6 max-w-md mx-auto">Your feedback is invaluable and will help shape the future of AI in the UK hospitality industry.</p>
                                <button onClick={onClose} className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-sky-500 transition-colors">Close</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {status === 'filling' && (
                    <div className="p-6 border-t border-gray-700 space-y-4 flex-shrink-0">
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <motion.div className="bg-brand-primary h-2.5 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeInOut" }} />
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                {currentQuestionIndex > 0 && (
                                    <button onClick={handleBack} className="px-6 py-2 text-gray-400 font-semibold rounded-md hover:bg-gray-700 transition-colors">Back</button>
                                )}
                            </div>
                            
                            <div>
                                {currentQuestionIndex < surveyQuestions.length - 1 ? (
                                    <button onClick={handleNext} className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-md hover:bg-sky-500 transition-colors">Next</button>
                                ) : (
                                    <form name="survey" method="POST" onSubmit={handleSubmit} hidden>
                                        <input type="hidden" name="form-name" value="survey" />
                                    </form>
                                )}
                                {currentQuestionIndex === surveyQuestions.length - 1 && (
                                    <button onClick={() => { const form = document.querySelector('form[name="survey"]'); if (form) (form as HTMLFormElement).requestSubmit(); }} className="px-6 py-2 bg-brand-secondary text-white font-semibold rounded-md hover:bg-teal-500 transition-colors" disabled={status === 'submitting'}>
                                        {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default SurveyModal;

// ========================================================================
// END OF FILE
// ========================================================================