import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PageRoute } from '../types';
import { RESEARCH_INFO } from '../data/manuscriptData';
import { getRouteHref } from '../utils/routes';

interface SiteFooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, page: PageRoute) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <div className="font-display text-sm font-bold text-slate-900">
              SYSMOD-CSS · Computer Systems Servicing Learning Platform
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Open diagnostic platform for all CSS students. Based on research conducted at NCST Senior High School ({RESEARCH_INFO.location} · {RESEARCH_INFO.date}).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <a href={getRouteHref('main')} onClick={(e) => handleLink(e, 'main')} className="hover:text-blue-700 cursor-pointer">
              Mainweb
            </a>
            <a href={getRouteHref('subpage1')} onClick={(e) => handleLink(e, 'subpage1')} className="hover:text-blue-700 cursor-pointer">
              Overview
            </a>
            <a href={getRouteHref('subpage2')} onClick={(e) => handleLink(e, 'subpage2')} className="hover:text-blue-700 cursor-pointer">
              Motivation
            </a>
            <a href={getRouteHref('subpage3')} onClick={(e) => handleLink(e, 'subpage3')} className="hover:text-blue-700 cursor-pointer">
              Framework
            </a>
            <a href={getRouteHref('simulations')} onClick={(e) => handleLink(e, 'simulations')} className="hover:text-blue-700 cursor-pointer">
              Simulation Page
            </a>
            <a href={getRouteHref('quizzes')} onClick={(e) => handleLink(e, 'quizzes')} className="hover:text-blue-700 cursor-pointer">
              Quizzes Page
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>
            Researchers: Baterna · Caday · Dadivas · Escuadro · Suhillo · Tobias
          </div>
          <div>
            For All CSS Students · TESDA CSS NC II · SYSMOD Framework
          </div>
        </div>
      </div>
    </footer>
  );
};
