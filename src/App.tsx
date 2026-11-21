/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { PageRoute, SubmittedJSO, SubmittedQuizScore } from './types';
import { TopNav } from './components/TopNav';
import { MainWebPage } from './components/MainWebPage';
import { SiteFooter } from './components/SiteFooter';
import { PAGE_TITLES, ROUTE_HASH_MAP, resolvePageFromLocation } from './utils/routes';

const ResearchSubpages = lazy(() =>
  import('./components/ResearchSubpages').then((m) => ({ default: m.ResearchSubpages }))
);
const SimulationsPage = lazy(() =>
  import('./components/SimulationsPage').then((m) => ({ default: m.SimulationsPage }))
);
const QuizzesPage = lazy(() =>
  import('./components/QuizzesPage').then((m) => ({ default: m.QuizzesPage }))
);

const STORAGE_KEYS = {
  userName: 'sysmod_css_user_name',
  userSection: 'sysmod_css_user_section',
  jsos: 'sysmod_css_submitted_jsos_v2',
  scores: 'sysmod_css_submitted_quiz_scores_v2',
};

function readStorageString(key: string): string {
  try {
    return localStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

function readStorageArray<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => resolvePageFromLocation());

  const [userName, setUserName] = useState<string>(() => readStorageString(STORAGE_KEYS.userName));
  const [userSection, setUserSection] = useState<string>(() =>
    readStorageString(STORAGE_KEYS.userSection)
  );

  const [submittedJSOs, setSubmittedJSOs] = useState<SubmittedJSO[]>(() =>
    readStorageArray<SubmittedJSO>(STORAGE_KEYS.jsos)
  );
  const [submittedScores, setSubmittedScores] = useState<SubmittedQuizScore[]>(() =>
    readStorageArray<SubmittedQuizScore>(STORAGE_KEYS.scores)
  );

  useEffect(() => {
    const expectedHash = ROUTE_HASH_MAP[currentPage];
    if (window.location.hash !== expectedHash) {
      window.history.replaceState(null, '', expectedHash);
    }
    document.title = PAGE_TITLES[currentPage];
  }, [currentPage]);

  useEffect(() => {
    const syncFromUrl = () => {
      const nextPage = resolvePageFromLocation();
      setCurrentPage(nextPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', syncFromUrl);
    window.addEventListener('popstate', syncFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncFromUrl);
      window.removeEventListener('popstate', syncFromUrl);
    };
  }, []);

  const handleNavigate = useCallback((page: PageRoute) => {
    const targetHash = ROUTE_HASH_MAP[page];
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSaveUserProfile = useCallback((name: string, section: string) => {
    setUserName(name);
    setUserSection(section);
    try {
      localStorage.setItem(STORAGE_KEYS.userName, name);
      localStorage.setItem(STORAGE_KEYS.userSection, section);
    } catch {
      // Storage unavailable
    }
  }, []);

  const handleSubmitJSO = useCallback((jso: SubmittedJSO) => {
    setSubmittedJSOs((prev) => {
      const next = [jso, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.jsos, JSON.stringify(next));
      } catch {
        // Storage unavailable
      }
      return next;
    });
  }, []);

  const handleSubmitQuizScore = useCallback((score: SubmittedQuizScore) => {
    setSubmittedScores((prev) => {
      const next = [score, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.scores, JSON.stringify(next));
      } catch {
        // Storage unavailable
      }
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <TopNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        userName={userName}
        userSection={userSection}
        onSaveUserProfile={handleSaveUserProfile}
      />

      <main className="flex-1">
        {currentPage === 'main' && (
          <MainWebPage
            onNavigate={handleNavigate}
            jsoCount={submittedJSOs.length}
            quizCount={submittedScores.length}
          />
        )}

        <Suspense
          fallback={
            <div className="max-w-5xl mx-auto px-4 py-20 text-center text-sm text-slate-500">
              Loading...
            </div>
          }
        >
          {(currentPage === 'subpage1' ||
            currentPage === 'subpage2' ||
            currentPage === 'subpage3') && (
            <ResearchSubpages activeSubpage={currentPage} onNavigate={handleNavigate} />
          )}

          {currentPage === 'simulations' && (
            <SimulationsPage
              userName={userName}
              userSection={userSection}
              onUpdateUserProfile={handleSaveUserProfile}
              submittedJSOs={submittedJSOs}
              onSubmitJSO={handleSubmitJSO}
            />
          )}

          {currentPage === 'quizzes' && (
            <QuizzesPage
              userName={userName}
              userSection={userSection}
              onUpdateUserProfile={handleSaveUserProfile}
              submittedScores={submittedScores}
              onSubmitQuizScore={handleSubmitQuizScore}
            />
          )}
        </Suspense>
      </main>

      <SiteFooter onNavigate={handleNavigate} />
    </div>
  );
}
