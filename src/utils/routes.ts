import { PageRoute } from '../types';

export const ROUTE_HASH_MAP: Record<PageRoute, string> = {
  main: '#/mainweb',
  subpage1: '#/research-1',
  subpage2: '#/research-2',
  subpage3: '#/research-3',
  simulations: '#/simulations',
  quizzes: '#/quizzes',
};

export const PAGE_TITLES: Record<PageRoute, string> = {
  main: 'SYSMOD-CSS | Troubleshooting Platform for CSS Students',
  subpage1: 'Research Overview & Abstract | SYSMOD-CSS',
  subpage2: 'Unstructured Troubleshooting & Motivation | SYSMOD-CSS',
  subpage3: 'SYSMOD Diagnostic Framework | SYSMOD-CSS',
  simulations: 'Simulation Page | SYSMOD-CSS',
  quizzes: 'Quizzes Page | SYSMOD-CSS',
};

export function getRouteHref(page: PageRoute): string {
  return ROUTE_HASH_MAP[page];
}

export function getAbsoluteRouteUrl(page: PageRoute): string {
  if (typeof window === 'undefined') return ROUTE_HASH_MAP[page];
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}${ROUTE_HASH_MAP[page]}`;
}

export function resolvePageFromLocation(): PageRoute {
  if (typeof window === 'undefined') return 'main';
  const rawHash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
  const rawPath = window.location.pathname.replace(/^\/+/, '').trim().toLowerCase();
  const token = rawHash || rawPath;

  if (token === 'simulations' || token === 'simulation' || token === 'webpage2') {
    return 'simulations';
  }
  if (token === 'quizzes' || token === 'quiz' || token === 'webpage3') {
    return 'quizzes';
  }
  if (token === 'research-1' || token === 'subpage1' || token === 'subpage-1') {
    return 'subpage1';
  }
  if (token === 'research-2' || token === 'subpage2' || token === 'subpage-2') {
    return 'subpage2';
  }
  if (token === 'research-3' || token === 'subpage3' || token === 'subpage-3') {
    return 'subpage3';
  }
  return 'main';
}
