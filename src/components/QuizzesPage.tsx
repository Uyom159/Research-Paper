import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Plus,
  RotateCcw,
  Send,
  XCircle,
} from 'lucide-react';
import { QuizModule, SubmittedQuizScore } from '../types';
import { QUIZ_MODULES, generateCustomQuiz } from '../data/quizCatalog';
import { formatDuration } from '../data/simulationScenarios';

interface QuizzesPageProps {
  userName: string;
  userSection: string;
  onUpdateUserProfile: (name: string, section: string) => void;
  submittedScores: SubmittedQuizScore[];
  onSubmitQuizScore: (record: SubmittedQuizScore) => void;
}

type DayFilter = 'all' | 'w1' | 'w2_4' | 'w5_8' | 'w9_11';

export const QuizzesPage: React.FC<QuizzesPageProps> = ({
  userName,
  userSection,
  onUpdateUserProfile,
  submittedScores,
  onSubmitQuizScore,
}) => {
  const [viewMode, setViewMode] = useState<'hub' | 'active' | 'scores'>('hub');
  const [dayFilter, setDayFilter] = useState<DayFilter>('all');
  const [activeQuiz, setActiveQuiz] = useState<QuizModule | null>(null);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [customCount, setCustomCount] = useState<5 | 10 | 15>(5);
  const [customTopic, setCustomTopic] = useState<string>('all');

  // Quiz runner state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Score submission form state
  const [submitName, setSubmitName] = useState(userName);
  const [submitSection, setSubmitSection] = useState(userSection);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  useEffect(() => {
    setSubmitName(userName);
    setSubmitSection(userSection);
  }, [userName, userSection]);

  useEffect(() => {
    if (viewMode !== 'active' || isCompleted) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [viewMode, isCompleted]);

  const startQuiz = (quiz: QuizModule) => {
    setActiveQuiz(quiz);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setElapsedSeconds(0);
    setScoreSubmitted(false);
    setShowCustomBuilder(false);
    setViewMode('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateCustomQuiz = () => {
    const custom = generateCustomQuiz(customCount, customTopic);
    startQuiz(custom);
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (selectedAnswers[questionId] !== undefined) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const computeScore = () => {
    if (!activeQuiz) return { correct: 0, total: 0, pct: 0 };
    const total = activeQuiz.questions.length;
    const correct = activeQuiz.questions.filter(
      (q) => selectedAnswers[q.id] === q.correctIndex
    ).length;
    const pct = total === 0 ? 0 : Math.round((correct / total) * 100);
    return { correct, total, pct };
  };

  const handleFinalSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuiz || scoreSubmitted) return;
    const { correct, total, pct } = computeScore();
    const cleanName = submitName.trim() || 'Guest Student';
    const cleanSection = submitSection.trim() || 'Grade 11 CSS';

    if (submitName.trim()) {
      onUpdateUserProfile(submitName.trim(), submitSection.trim());
    }

    const record: SubmittedQuizScore = {
      id: `score-${Date.now()}`,
      submittedAt: new Date().toLocaleString(),
      studentName: cleanName,
      section: cleanSection,
      quizId: activeQuiz.id,
      quizCode: activeQuiz.code,
      quizTitle: activeQuiz.title,
      score: correct,
      totalQuestions: total,
      percentage: pct,
      timeSeconds: elapsedSeconds,
    };

    onSubmitQuizScore(record);
    setScoreSubmitted(true);
  };

  const bestScoreByQuizId = useMemo(() => {
    const map = new Map<string, SubmittedQuizScore>();
    for (const s of submittedScores) {
      const prev = map.get(s.quizId);
      if (!prev || s.percentage > prev.percentage) {
        map.set(s.quizId, s);
      }
    }
    return map;
  }, [submittedScores]);

  // Day filter logic
  const filteredQuizzes = useMemo(
    () =>
      QUIZ_MODULES.filter((quiz) => {
        const day = quiz.dayNumber ?? 0;
        if (dayFilter === 'w1') return day >= 1 && day <= 5;
        if (dayFilter === 'w2_4') return day >= 6 && day <= 14;
        if (dayFilter === 'w5_8') return day >= 15 && day <= 20;
        if (dayFilter === 'w9_11') return day >= 21 && day <= 30;
        return true;
      }),
    [dayFilter]
  );

  const completedDayIds = useMemo(() => {
    const validIds = new Set(QUIZ_MODULES.map((q) => q.id));
    return new Set(submittedScores.filter((s) => validIds.has(s.quizId)).map((s) => s.quizId));
  }, [submittedScores]);

  const nextDayQuiz =
    activeQuiz?.dayNumber && activeQuiz.dayNumber < 30
      ? QUIZ_MODULES.find((q) => q.dayNumber === activeQuiz.dayNumber! + 1) ?? null
      : null;

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-700 mb-1">
              DepEd Grade 11/12 TechPro ICT-CSS
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              30-Day CSS Quizzes
            </h1>
          </div>

          <div className="inline-flex flex-wrap items-center p-1 bg-slate-100 rounded-lg self-start lg:self-auto gap-0.5">
            <button
              type="button"
              onClick={() => setViewMode('hub')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'hub' || viewMode === 'active'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              30-Day Quizzes ({QUIZ_MODULES.length})
            </button>
            <button
              type="button"
              onClick={() => setViewMode('scores')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'scores'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Submitted Scores ({submittedScores.length})
            </button>
          </div>
        </div>
      </div>

      {/* ================= HUB VIEW: 30-DAY PROGRESSIVE QUIZZES + "+" CARD ================= */}
      {viewMode === 'hub' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 space-y-6">
          {/* Compact 30-Day Progress Banner */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-900">
                  30-Day CSS Quiz Progression (5 Questions / Day · Lv.1–30)
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Difficulty increases daily across OHS, hardware assembly, OS installation, networking, Windows Server, and troubleshooting.
              </p>
            </div>
            <div className="font-mono text-xs font-semibold text-blue-700 tabular-nums shrink-0">
              {completedDayIds.size} / 30 Completed
            </div>
          </div>

          {/* Week / Level Filter Row */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'all', label: 'All 30 Days (Lv.1–30)' },
                { id: 'w1', label: 'Week 1 · Days 1–5 (Lv.1–5)' },
                { id: 'w2_4', label: 'Weeks 2–4 · Days 6–14 (Lv.6–14)' },
                { id: 'w5_8', label: 'Weeks 5–8 · Days 15–20 (Lv.15–20)' },
                { id: 'w9_11', label: 'Weeks 9–11 · Days 21–30 (Lv.21–30)' },
              ] as { id: DayFilter; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setDayFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  dayFilter === tab.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 2-Column Quiz Cards + "+" Custom Quiz Generator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuizzes.map((quiz) => {
              const best = bestScoreByQuizId.get(quiz.id) ?? null;
              const levelTierColor =
                quiz.difficulty === 'Advanced'
                  ? 'text-red-700'
                  : quiz.difficulty === 'Intermediate'
                    ? 'text-amber-700'
                    : 'text-emerald-700';

              return (
                <div
                  key={quiz.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-5 transition-colors flex flex-col justify-between space-y-3.5"
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-mono font-bold text-blue-700">
                        {quiz.code} · {quiz.weekRef}
                      </span>
                      <span className="text-slate-500">
                        <strong className={levelTierColor}>{quiz.difficulty}</strong> · {quiz.questions.length} Qs
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {quiz.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {quiz.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="text-xs font-mono tabular-nums">
                      {best ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>
                            Best: {best.score}/{best.totalQuestions} ({best.percentage}%)
                          </span>
                        </span>
                      ) : (
                        <span className="text-slate-500">Not yet taken</span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => startQuiz(quiz)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>{best ? `Retake Day ${quiz.dayNumber}` : `Start Day ${quiz.dayNumber}`}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* "+" Card from Webmap: Custom Practice Quiz Generator */}
            <div className="bg-slate-100/80 rounded-xl border-2 border-dashed border-slate-300 p-5 flex flex-col justify-between space-y-4">
              {!showCustomBuilder ? (
                <button
                  type="button"
                  onClick={() => setShowCustomBuilder(true)}
                  className="w-full h-full min-h-[156px] flex flex-col items-center justify-center text-center space-y-2 cursor-pointer group"
                >
                  <div className="w-11 h-11 rounded-full bg-white border border-slate-300 group-hover:border-blue-600 group-hover:text-blue-700 text-slate-600 flex items-center justify-center transition-colors">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-blue-700">
                    Create Custom Practice Quiz
                  </div>
                  <p className="text-xs text-slate-600 max-w-xs">
                    Draw 5, 10, or 15 randomized questions from the 150-question DepEd CSS lesson bank.
                  </p>
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">Custom Practice Quiz</h3>
                    <button
                      type="button"
                      onClick={() => setShowCustomBuilder(false)}
                      className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Question Count
                      </label>
                      <select
                        value={customCount}
                        onChange={(e) => setCustomCount(Number(e.target.value) as 5 | 10 | 15)}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value={5}>5 Questions</option>
                        <option value={10}>10 Questions</option>
                        <option value={15}>15 Questions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Lesson Focus
                      </label>
                      <select
                        value={customTopic}
                        onChange={(e) => setCustomTopic(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value="all">All 30 Days (Mixed)</option>
                        <option value="Week 1">Week 1 · Fundamentals &amp; Assembly</option>
                        <option value="Week 2">Week 2 · Bootable USB &amp; OS Setup</option>
                        <option value="Weeks 3">Weeks 3–4 · Testing &amp; Networking</option>
                        <option value="Weeks 5-8">Weeks 5–8 · Server, ADDS, DNS, DHCP, IIS</option>
                        <option value="Weeks 9-11">Weeks 9–11 · Repair, Maintenance &amp; JSO</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCreateCustomQuiz}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Launch Custom Quiz</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= ACTIVE QUIZ RUNNER ================= */}
      {viewMode === 'active' && activeQuiz && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setViewMode('hub')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to 30-Day Quizzes</span>
            </button>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-600 tabular-nums">
              <span className="font-bold text-blue-700">
                {activeQuiz.code}
                {activeQuiz.weekRef ? ` · ${activeQuiz.weekRef}` : ''}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatDuration(elapsedSeconds)}
              </span>
            </div>
          </div>

          {!isCompleted ? (
            (() => {
              const q = activeQuiz.questions[currentIdx];
              const picked = selectedAnswers[q.id];
              const hasAnswered = picked !== undefined;
              const isCorrect = picked === q.correctIndex;

              return (
                <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-900">{activeQuiz.title}</span>
                      <span className="font-mono tabular-nums">
                        Question {currentIdx + 1} of {activeQuiz.questions.length}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-700 transition-all duration-200"
                        style={{
                          width: `${((currentIdx + 1) / activeQuiz.questions.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h2>

                  <div className="space-y-3">
                    {q.options.map((opt, idx) => {
                      let btnClasses =
                        'border-slate-200 bg-white text-slate-800 hover:border-blue-400 hover:bg-blue-50/40';
                      if (hasAnswered) {
                        if (idx === q.correctIndex) {
                          btnClasses = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                        } else if (idx === picked) {
                          btnClasses = 'border-red-500 bg-red-50 text-red-950';
                        } else {
                          btnClasses = 'border-slate-200 bg-slate-50 text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={`${q.id}-${idx}`}
                          type="button"
                          disabled={hasAnswered}
                          onClick={() => handleSelectOption(q.id, idx)}
                          className={`w-full text-left p-4 rounded-lg border text-sm transition-colors flex items-start justify-between gap-3 ${btnClasses} ${
                            hasAnswered ? 'cursor-default' : 'cursor-pointer'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="font-mono text-xs font-bold mt-0.5">
                              {String.fromCharCode(65 + idx)}.
                            </span>
                            <span>{opt}</span>
                          </div>
                          {hasAnswered && idx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          )}
                          {hasAnswered && idx === picked && idx !== q.correctIndex && (
                            <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {hasAnswered && (
                    <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                      <div
                        className={`text-xs font-bold ${
                          isCorrect ? 'text-emerald-700' : 'text-red-700'
                        }`}
                      >
                        {isCorrect ? 'Correct Answer' : 'Incorrect: Review Lesson Rationale'}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{q.explanation}</p>
                      <div className="text-xs text-blue-700 font-medium pt-1">
                        DepEd CSS Competency: {q.sysmodPrinciple}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {hasAnswered ? 'Ready to continue' : 'Select an answer to see rationale'}
                    </span>
                    <button
                      type="button"
                      disabled={!hasAnswered}
                      onClick={() => {
                        if (currentIdx + 1 < activeQuiz.questions.length) {
                          setCurrentIdx((prev) => prev + 1);
                        } else {
                          setIsCompleted(true);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg cursor-pointer transition-colors"
                    >
                      <span>
                        {currentIdx + 1 < activeQuiz.questions.length
                          ? 'Next Question'
                          : 'Finish & Submit Score'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()
          ) : (
            /* ================= QUIZ COMPLETION & SCORE SUBMISSION ================= */
            (() => {
              const { correct, total, pct } = computeScore();
              return (
                <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                    <div>
                      <div className="text-xs font-semibold text-blue-700">
                        Quiz Completed · {activeQuiz.code}
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mt-0.5">{activeQuiz.title}</h2>
                      <div className="text-xs text-slate-500 mt-1">
                        Time Elapsed: {formatDuration(elapsedSeconds)}
                        {activeQuiz.weekRef ? ` · ${activeQuiz.weekRef}` : ''}
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900">
                        {correct} / {total}
                      </div>
                      <div className="text-sm font-semibold text-blue-700 font-mono tabular-nums">
                        {pct}% Score
                      </div>
                    </div>
                  </div>

                  {!scoreSubmitted ? (
                    <form onSubmit={handleFinalSubmitScore} className="space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">Submit Your Quiz Score</h3>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Record your score in the Submitted Scores ledger for classroom verification.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Student Name
                          </label>
                          <input
                            type="text"
                            value={submitName}
                            onChange={(e) => setSubmitName(e.target.value)}
                            placeholder="Guest Student (Optional)"
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Grade &amp; Section
                          </label>
                          <input
                            type="text"
                            value={submitSection}
                            onChange={(e) => setSubmitSection(e.target.value)}
                            placeholder="e.g., Grade 11 CSS-A"
                            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer transition-colors"
                        >
                          <Send className="w-4 h-4" />
                          <span>Submit Score</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => startQuiz(activeQuiz)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Retake Quiz</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Score Submitted Successfully</span>
                      </div>
                      <p className="text-xs text-emerald-900">
                        Recorded for <strong>{submitName.trim() || 'Guest Student'}</strong> ({submitSection.trim() || 'Grade 11 CSS'}) —{' '}
                        <strong>
                          {correct}/{total} ({pct}%)
                        </strong>
                        .
                      </p>
                      <div className="flex flex-wrap items-center gap-2.5 pt-1">
                        {nextDayQuiz && (
                          <button
                            type="button"
                            onClick={() => startQuiz(nextDayQuiz)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
                          >
                            <span>Next: Day {nextDayQuiz.dayNumber} (Lv.{nextDayQuiz.level})</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setViewMode('scores')}
                          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg cursor-pointer"
                        >
                          View Submitted Scores
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode('hub')}
                          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg cursor-pointer"
                        >
                          Back to 30-Day Quizzes
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()
          )}
        </div>
      )}

      {/* ================= SUBMITTED SCORES LEDGER ================= */}
      {viewMode === 'scores' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Submitted Quiz Scores</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved locally in your browser session for student self-tracking and instructor verification.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('hub')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
            >
              Take Another Quiz
            </button>
          </div>

          {submittedScores.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center space-y-3">
              <ClipboardCheck className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-base font-bold text-slate-900">No Quiz Scores Submitted Yet</div>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Complete any day from the 30-Day Progressive Quiz and click Submit Score to record your results here.
              </p>
              <button
                type="button"
                onClick={() => setViewMode('hub')}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
              >
                Browse 30-Day Quizzes
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-600">
                    <th className="py-3 px-4 font-bold">Student Name</th>
                    <th className="py-3 px-4 font-bold">Section</th>
                    <th className="py-3 px-4 font-bold">Quiz</th>
                    <th className="py-3 px-4 font-bold">Score</th>
                    <th className="py-3 px-4 font-bold">Time</th>
                    <th className="py-3 px-4 font-bold">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {submittedScores.map((rec) => (
                    <tr key={rec.id}>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{rec.studentName}</td>
                      <td className="py-3.5 px-4 text-slate-600">{rec.section}</td>
                      <td className="py-3.5 px-4 text-slate-800">
                        <span className="font-mono text-xs text-blue-700 mr-2">{rec.quizCode}</span>
                        {rec.quizTitle}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold tabular-nums text-slate-900">
                        {rec.score}/{rec.totalQuestions} ({rec.percentage}%)
                      </td>
                      <td className="py-3.5 px-4 font-mono tabular-nums text-slate-600">
                        {formatDuration(rec.timeSeconds)}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500">{rec.submittedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
