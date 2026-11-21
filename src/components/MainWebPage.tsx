import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Cpu,
  ClipboardCheck,
} from 'lucide-react';
import { PageRoute } from '../types';
import { RESEARCH_INFO, RESEARCHERS } from '../data/manuscriptData';
import { getAbsoluteRouteUrl, getRouteHref } from '../utils/routes';

interface MainWebPageProps {
  onNavigate: (page: PageRoute) => void;
  jsoCount: number;
  quizCount: number;
}

export const MainWebPage: React.FC<MainWebPageProps> = ({
  onNavigate,
  jsoCount,
  quizCount,
}) => {
  const [copiedPage, setCopiedPage] = useState<PageRoute | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: PageRoute) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(page);
  };

  const handleCopyDirectLink = (e: React.MouseEvent, page: PageRoute) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getAbsoluteRouteUrl(page);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    setCopiedPage(page);
    copyTimerRef.current = window.setTimeout(() => {
      copyTimerRef.current = null;
      setCopiedPage((curr) => (curr === page ? null : curr));
    }, 1800);
  };

  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-5">
          <div className="text-xs font-semibold text-blue-700">
            For Computer Systems Servicing Students · Research Conducted at NCST-SHS ({RESEARCH_INFO.date})
          </div>

          <div className="space-y-3">
            <h1
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.16]"
              style={{ textWrap: 'balance' }}
            >
              Applying SYSMOD Principles to Advanced Troubleshooting Deficits Among Senior High School CSS Students
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              An open practice platform for all Computer Systems Servicing (CSS) students. Build structured PC diagnostic habits with Tim Weilkiens’ SYSMOD method through hardware and software practice simulations, Job Service Orders, and 30-day curriculum quizzes, based on research conducted at NCST Senior High School.
            </p>
          </div>
        </div>
      </section>

      {/* Practice & Research Links */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-5 flex flex-col justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-blue-400">Practice</span>
                <span className="font-mono tabular-nums">
                  {jsoCount} {jsoCount === 1 ? 'JSO' : 'JSOs'} Submitted
                </span>
              </div>
              <h2 className="text-lg font-bold text-white">Simulation Page</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Diagnose and repair hardware and software PC faults across 27 scenarios and file a rated Job Service Order.
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 pt-1">
              <a
                href={getRouteHref('simulations')}
                onClick={(e) => handleLinkClick(e, 'simulations')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300"
              >
                <Cpu className="w-4 h-4" />
                <span>Open Simulations</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={(e) => handleCopyDirectLink(e, 'simulations')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer"
              >
                {copiedPage === 'simulations' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-blue-700">DepEd CSS Curriculum</span>
                <span className="font-mono tabular-nums">
                  {quizCount} {quizCount === 1 ? 'Score' : 'Scores'} Submitted
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">Quizzes Page</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                30-day progressive quizzes (5 questions/day) with instant explanations and a custom practice quiz builder.
              </p>
            </div>
            <div className="flex items-center justify-between gap-2 pt-1">
              <a
                href={getRouteHref('quizzes')}
                onClick={(e) => handleLinkClick(e, 'quizzes')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Open Quizzes</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={(e) => handleCopyDirectLink(e, 'quizzes')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md cursor-pointer"
              >
                {copiedPage === 'quizzes' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Research Chapters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(
            [
              { page: 'subpage1' as PageRoute, tag: 'Part 1', title: 'Overview, Abstract & Credits' },
              { page: 'subpage2' as PageRoute, tag: 'Part 2', title: 'Unstructured Effects & Motivation' },
              { page: 'subpage3' as PageRoute, tag: 'Part 3', title: 'SYSMOD Principles & Impact' },
            ] as const
          ).map((sub) => (
            <a
              key={sub.page}
              href={getRouteHref(sub.page)}
              onClick={(e) => handleLinkClick(e, sub.page)}
              className="group bg-white rounded-xl border border-slate-200 hover:border-blue-400 px-4 py-3.5 transition-colors flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-[11px] font-semibold text-blue-700">{sub.tag}</div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                  {sub.title}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
            </a>
          ))}
        </div>
      </section>

      {/* The Researchers */}
      <section className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">The Researchers</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Study conducted at NCST Senior High School · {RESEARCH_INFO.location}
              </p>
            </div>
            <div className="text-xs text-slate-500 sm:text-right">
              Adviser: <strong className="text-slate-800">{RESEARCH_INFO.adviser}</strong> · Vice Principal:{' '}
              <strong className="text-slate-800">{RESEARCH_INFO.vicePrincipal}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {RESEARCHERS.map((researcher) => (
              <div
                key={researcher.name}
                className="px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
              >
                <div className="text-sm font-bold text-slate-900">{researcher.name}</div>
                <span className="text-[11px] font-semibold text-slate-500 shrink-0">NCST-SHS CSS</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
