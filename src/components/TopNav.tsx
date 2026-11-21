import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Menu, X } from 'lucide-react';
import { PageRoute } from '../types';
import { getRouteHref } from '../utils/routes';

interface TopNavProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  userName: string;
  userSection: string;
  onSaveUserProfile: (name: string, section: string) => void;
}

const BlankProfileIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="8.5" r="3.75" />
    <path d="M4.5 19.5c0-3.45 3.36-5.75 7.5-5.75s7.5 2.3 7.5 5.75v.5h-15v-.5z" />
  </svg>
);

const FIRST_VISIT_PROMPT_KEY = 'sysmod_css_who_do_we_call_you_seen_v1';

const shouldShowFirstVisitPrompt = (existingName: string): boolean => {
  if (existingName.trim()) return false;
  try {
    return localStorage.getItem(FIRST_VISIT_PROMPT_KEY) !== '1';
  } catch {
    return false;
  }
};

const markFirstVisitPromptSeen = () => {
  try {
    localStorage.setItem(FIRST_VISIT_PROMPT_KEY, '1');
  } catch {
    // Storage unavailable
  }
};

export const TopNav: React.FC<TopNavProps> = ({
  currentPage,
  onNavigate,
  userName,
  userSection,
  onSaveUserProfile,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isFirstVisitPrompt, setIsFirstVisitPrompt] = useState<boolean>(() =>
    shouldShowFirstVisitPrompt(userName)
  );
  const [profileOpen, setProfileOpen] = useState<boolean>(() =>
    shouldShowFirstVisitPrompt(userName)
  );
  const [nameInput, setNameInput] = useState(userName);
  const [sectionInput, setSectionInput] = useState(userSection);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const saveTimerRef = useRef<number | null>(null);

  const clearSaveTimer = () => {
    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearSaveTimer();
  }, []);

  const handleCloseProfile = () => {
    clearSaveTimer();
    markFirstVisitPromptSeen();
    setIsFirstVisitPrompt(false);
    setSavedFeedback(false);
    setProfileOpen(false);
  };

  useEffect(() => {
    setNameInput(userName);
    setSectionInput(userSection);
  }, [userName, userSection]);

  useEffect(() => {
    if (!profileOpen && !mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (profileOpen) {
        clearSaveTimer();
        markFirstVisitPromptSeen();
        setIsFirstVisitPrompt(false);
        setSavedFeedback(false);
        setProfileOpen(false);
        return;
      }
      if (mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [profileOpen, mobileOpen]);

  const isResearchActive =
    currentPage === 'subpage1' || currentPage === 'subpage2' || currentPage === 'subpage3';

  const mobileNavItems: { label: string; target: PageRoute; active: boolean }[] = [
    { label: 'Home', target: 'main', active: currentPage === 'main' },
    { label: 'Open Simulation Page', target: 'simulations', active: currentPage === 'simulations' },
    { label: 'Open Quizzes Page', target: 'quizzes', active: currentPage === 'quizzes' },
    { label: 'Read the Research', target: 'subpage1', active: isResearchActive },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: PageRoute) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(target);
    setMobileOpen(false);
  };

  const handleOpenProfile = () => {
    clearSaveTimer();
    setNameInput(userName);
    setSectionInput(userSection);
    setSavedFeedback(false);
    setIsFirstVisitPrompt(false);
    setProfileOpen(true);
    setMobileOpen(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    clearSaveTimer();
    onSaveUserProfile(nameInput.trim(), sectionInput.trim());
    markFirstVisitPromptSeen();
    setIsFirstVisitPrompt(false);
    setSavedFeedback(true);
    saveTimerRef.current = window.setTimeout(() => {
      saveTimerRef.current = null;
      setSavedFeedback(false);
      setProfileOpen(false);
    }, 650);
  };

  const handleClearProfile = () => {
    setNameInput('');
    setSectionInput('');
    onSaveUserProfile('', '');
    setSavedFeedback(false);
  };

  const hasSavedProfile = Boolean(userName.trim() || userSection.trim());

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Wordmark (navigates home) */}
          <a
            href={getRouteHref('main')}
            onClick={(e) => handleLinkClick(e, 'main')}
            className="font-display text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer hover:text-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            SYSMOD-CSS
          </a>

          {/* Moved Primary Actions + Blank Profile Popup Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <nav className="hidden md:flex items-center gap-2.5" aria-label="Primary">
              <a
                href={getRouteHref('simulations')}
                onClick={(e) => handleLinkClick(e, 'simulations')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                  currentPage === 'simulations'
                    ? 'text-white bg-blue-800 ring-2 ring-blue-300'
                    : 'text-white bg-blue-700 hover:bg-blue-800'
                }`}
              >
                <span>Open Simulation Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={getRouteHref('quizzes')}
                onClick={(e) => handleLinkClick(e, 'quizzes')}
                className={`inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                  currentPage === 'quizzes'
                    ? 'text-blue-700 bg-blue-50 border border-blue-200'
                    : 'text-slate-800 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                <span>Open Quizzes Page</span>
              </a>

              <a
                href={getRouteHref('subpage1')}
                onClick={(e) => handleLinkClick(e, 'subpage1')}
                className={`inline-flex items-center gap-1 px-2.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  isResearchActive
                    ? 'text-blue-800 underline underline-offset-4'
                    : 'text-blue-700 hover:underline underline-offset-4'
                }`}
              >
                <span>Read the Research →</span>
              </a>
            </nav>

            <button
              type="button"
              onClick={handleOpenProfile}
              title={
                userName
                  ? `${userName}${userSection ? ` (${userSection})` : ''} · Click to edit`
                  : 'Who do we call you?'
              }
              aria-label="Who do we call you?"
              className={`w-10 h-10 rounded-full border flex items-center justify-center overflow-hidden transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                hasSavedProfile
                  ? 'bg-blue-50 border-blue-400 text-blue-700 hover:bg-blue-100'
                  : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200 hover:border-slate-400 hover:text-slate-700'
              }`}
            >
              <BlankProfileIcon className="w-6 h-6 translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
            {mobileNavItems.map((item) => (
              <a
                key={item.label}
                href={getRouteHref(item.target)}
                onClick={(e) => handleLinkClick(e, item.target)}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                  item.active
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* "Who do we call you?" Popup (auto-opens on first visit + blank profile icon click) */}
      {profileOpen && (
        <div
          className="fixed inset-0 z-[70] bg-slate-950/35 backdrop-blur-[1px] flex items-center justify-center p-4 no-print"
          onClick={handleCloseProfile}
          role="dialog"
          aria-modal="true"
          aria-labelledby="who-do-we-call-you-modal-title"
        >
          <div
            className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                  <BlankProfileIcon className="w-6 h-6 translate-y-0.5" />
                </div>
                <div className="min-w-0">
                  <h2 id="who-do-we-call-you-modal-title" className="text-base font-bold text-white leading-tight">
                    Who do we call you?
                  </h2>
                  <p className="text-xs text-slate-300 truncate mt-0.5">
                    {userName || 'Guest Technician'}
                    {userSection ? ` · ${userSection}` : ''}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseProfile}
                className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer transition-colors shrink-0"
                aria-label="Close popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveProfile} className="p-5 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Optional details automatically filled on your Job Service Orders and quiz scores.
              </p>

              <div className="space-y-3">
                <div>
                  <label htmlFor="popup-user-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Name (Optional)
                  </label>
                  <input
                    id="popup-user-name"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g., Juan Dela Cruz"
                    autoFocus
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="popup-user-section" className="block text-xs font-semibold text-slate-700 mb-1">
                    School / Section (Optional)
                  </label>
                  <input
                    id="popup-user-section"
                    type="text"
                    value={sectionInput}
                    onChange={(e) => setSectionInput(e.target.value)}
                    placeholder="e.g., Grade 11 CSS"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between gap-2">
                {(userName || userSection || nameInput || sectionInput) ? (
                  <button
                    type="button"
                    onClick={handleClearProfile}
                    className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                  >
                    Clear Profile
                  </button>
                ) : (
                  <span className="text-xs text-slate-400">Saved locally on this device</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCloseProfile}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
                  >
                    {isFirstVisitPrompt ? 'Skip' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer transition-colors"
                  >
                    {savedFeedback && <Check className="w-3.5 h-3.5" />}
                    <span>{savedFeedback ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
