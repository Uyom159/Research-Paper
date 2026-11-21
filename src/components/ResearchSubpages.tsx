import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookMarked, CheckCircle2, Cpu, Layers, ShieldAlert } from 'lucide-react';
import { PageRoute } from '../types';
import {
  ADVANCED_IMPACT_EVIDENCE,
  ADVANCED_TROUBLESHOOTING_EFFECTS,
  ALL_REFERENCES,
  EMPIRICAL_EVIDENCE,
  IPO_FRAMEWORK,
  PEDAGOGICAL_FOUNDATIONS,
  RESEARCH_ABSTRACT,
  RESEARCH_INFO,
  RESEARCH_OBJECTIVES,
  RESEARCHERS,
  SIX_STEP_METHOD,
  STATEMENT_OF_THE_PROBLEM,
  SYSMOD_CORE_PRINCIPLES,
  UNSTRUCTURED_EFFECTS,
} from '../data/manuscriptData';

interface ResearchSubpagesProps {
  activeSubpage: 'subpage1' | 'subpage2' | 'subpage3';
  onNavigate: (page: PageRoute) => void;
}

export const ResearchSubpages: React.FC<ResearchSubpagesProps> = ({ activeSubpage, onNavigate }) => {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const subpage1Refs = ALL_REFERENCES.filter(
    (r) => r.category === 'SYSMOD' || r.category === 'Curriculum'
  );
  const subpage2Refs = ALL_REFERENCES.filter(
    (r) => r.category === 'Unstructured Evidence' || r.category === 'Curriculum'
  );
  const subpage3Refs = ALL_REFERENCES.filter(
    (r) =>
      r.category === 'SYSMOD' ||
      r.category === 'Advanced Troubleshooting' ||
      r.category === 'Curriculum'
  );

  const activeStepObj = SIX_STEP_METHOD.find((s) => s.number === selectedStep) || SIX_STEP_METHOD[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Subpage Navigation Strip */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('main')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-700 cursor-pointer transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Main Web</span>
            </button>
            <span className="text-slate-300" aria-hidden="true">/</span>
            <span className="text-sm font-semibold text-slate-900">
              {activeSubpage === 'subpage1' && 'Overview & Abstract'}
              {activeSubpage === 'subpage2' && 'Problem & Motivation'}
              {activeSubpage === 'subpage3' && 'SYSMOD Framework'}
            </span>
          </div>

          <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg self-start md:self-auto">
            {(
              [
                { id: 'subpage1', label: 'Overview' },
                { id: 'subpage2', label: 'Motivation' },
                { id: 'subpage3', label: 'Framework' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeSubpage === tab.id
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview & Abstract */}
      {activeSubpage === 'subpage1' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
          <header className="space-y-2.5">
            <div className="text-xs font-semibold text-blue-700">
              Research Study · Conducted at NCST Senior High School
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
              SYSMOD Integration, Abstract &amp; Credits
            </h1>
          </header>

          {/* 1. SYSMOD Integration to the Research */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">SYSMOD Integration</h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                This study is anchored exclusively on{' '}
                <strong className="text-slate-900">
                  SYSMOD – The Systems Modeling Toolbox: Pragmatic MBSE with SysML (3rd Edition)
                </strong>{' '}
                by Tim Weilkiens (2016, 2020). Complemented by Outcomes-Based Education (CHED CMO No. 46, 2012; Spady, 1994; Biggs &amp; Tang, 2013), DepEd Classroom Assessment Guidelines (DepEd Order No. 8, 2015), and Cognitive Load Theory (Sweller, 2011; Damschroder et al., 2022), SYSMOD frames a computer as interconnected hardware, operating system, driver, and network subsystems so learners diagnose faults systematically rather than guessing.
              </p>
            </div>

            {/* Pedagogical & Theoretical Foundations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PEDAGOGICAL_FOUNDATIONS.map((item) => (
                <div key={item.title} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="text-xs font-semibold text-blue-700">{item.category}</div>
                  <div className="text-sm font-bold text-slate-900">{item.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
                </div>
              ))}
            </div>

            {/* Conceptual IPO Paradigm */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Conceptual Framework (Input–Process–Output Paradigm)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[IPO_FRAMEWORK.input, IPO_FRAMEWORK.process, IPO_FRAMEWORK.output].map((col, idx) => (
                  <div key={col.label} className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-blue-700">
                        0{idx + 1}. {col.label}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">{col.heading}</div>
                    <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-blue-700 font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Objectives & Statement of the Problem */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">Statement of the Problem</h3>
                <ol className="space-y-2.5 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
                  {STATEMENT_OF_THE_PROBLEM.map((sop) => (
                    <li key={sop}>{sop}</li>
                  ))}
                </ol>
              </div>
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">Research Objectives</h3>
                <ol className="space-y-2.5 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
                  {RESEARCH_OBJECTIVES.map((obj) => (
                    <li key={obj}>{obj}</li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Abstract */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Abstract</h2>
              <div className="text-xs text-slate-500">
                Convergent Mixed Methods · NCST-SHS · {RESEARCH_INFO.date}
              </div>
            </div>
            <div className="text-sm font-semibold text-slate-900 pt-1">{RESEARCH_INFO.title}</div>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {RESEARCH_ABSTRACT.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-200 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Keywords:</span> SYSMOD, Model-Based Systems Engineering (MBSE), SysML, Computer Systems Servicing (CSS) NC II, Clean Lab Paradox, Cognitive Load Theory, Outcomes-Based Education, Standardized Diagnostic Framework, Mean Time to Repair (MTTR).
            </div>
          </section>

          {/* Credits & Literature */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-blue-700" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Researchers &amp; References
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">Research Authors (NCST-SHS)</h3>
                <ul className="space-y-1 text-sm text-slate-700">
                  {RESEARCHERS.map((r) => (
                    <li key={r.name}>
                      <span className="font-semibold text-slate-900">{r.name}</span> — {r.role}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-slate-500 pt-2">
                  Research Adviser: {RESEARCH_INFO.adviser} · NCST IIRT-SHS Vice Principal:{' '}
                  {RESEARCH_INFO.vicePrincipal} · {RESEARCH_INFO.location} ({RESEARCH_INFO.date})
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900">SYSMOD, Policy &amp; Theoretical Literature Cited</h3>
                <ul className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
                  {subpage1Refs.map((ref) => (
                    <li key={ref.id} className="pl-4 -indent-4">
                      {ref.citation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => onNavigate('main')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Web</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('subpage2')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer transition-colors"
            >
              <span>Next: Problem &amp; Motivation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Problem & Motivation */}
      {activeSubpage === 'subpage2' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
          <header className="space-y-2.5">
            <div className="text-xs font-semibold text-blue-700">
              Review of Related Literature
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
              Unstructured Troubleshooting &amp; Research Motivation
            </h1>
          </header>

          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Meaning and Effects of Unstructured Troubleshooting
              </h2>
              <p className="text-sm sm:text-base text-slate-700 mt-2 leading-relaxed">
                <strong className="text-slate-900">Unstructured Troubleshooting</strong> is an ad-hoc approach to technical repair marked by random component swapping, unsystematic guessing, trial-and-error without fault isolation, and defaulting to hard drive reformatting before identifying the root cause.
              </p>
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
                In Philippine Senior High School laboratories, this behavior is reinforced by the{' '}
                <strong className="text-slate-900">Clean Lab Paradox</strong> (EDCOM II, 2024; Bascuguin &amp; Generoso, 2026): because equipment is scarce and must stay operational for daily classes, learners repeat linear assembly but rarely face authentic breakdowns, leading to working-memory overload (Sweller, 2011) under real faults.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {UNSTRUCTURED_EFFECTS.map((effect) => (
                <div
                  key={effect.title}
                  className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-900">{effect.title}</h3>
                    <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{effect.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Local &amp; Foreign Motivation
              </h2>
            </div>

            {/* 3 Highlight Pillars from PR-Group-3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-2">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-lg font-extrabold font-mono text-slate-900">EDCOM II (2024)</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">
                  National TVL Equipment Deficit
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Documented shortages of functional laboratory equipment and practical skill gaps across secondary TVL tracks.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-lg font-extrabold font-mono text-slate-900">Region IV-A (2026)</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">
                  Laguna &amp; Batangas Clean Lab Proof
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Padilla (2026) &amp; Bascuguin &amp; Generoso (2026) confirm strong routine assembly vs. severe difficulty in non-routine fault diagnosis.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-lg font-extrabold font-mono text-slate-900">Cognitive Load</div>
                <div className="text-xs font-semibold text-slate-700 mt-1">
                  Trial-and-Error Overload
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Sweller (2011) &amp; Yang et al. (2024) prove unguided debugging saturates working memory and drives persistent novice errors.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-200 border-t border-slate-200">
              {EMPIRICAL_EVIDENCE.map((study) => (
                <article key={study.id} className="py-5 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-slate-900">
                      {study.authors} ({study.year})
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-blue-700">{study.rrlGroup}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.context}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{study.finding}</p>
                  {study.metrics && (
                    <div className="text-xs font-medium text-slate-600 pt-0.5">{study.metrics}</div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* References */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-blue-700" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">References (APA 7th)</h2>
            </div>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed pt-1">
              {subpage2Refs.map((ref) => (
                <li key={ref.id} className="pl-6 -indent-6">
                  {ref.citation}
                </li>
              ))}
            </ul>
          </section>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => onNavigate('subpage1')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: Overview</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('subpage3')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer transition-colors"
            >
              <span>Next: SYSMOD Framework</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SYSMOD Framework */}
      {activeSubpage === 'subpage3' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
          <header className="space-y-2.5">
            <div className="text-xs font-semibold text-blue-700">
              Standardized Diagnostic Framework
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ textWrap: 'balance' }}>
              Proposed SYSMOD Principles &amp; Diagnostic Impact
            </h1>
          </header>

          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Four SYSMOD Principles</h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
                Adapted from Weilkiens (2016, 2020) and Rashid (2020) for PC hardware, operating systems, drivers, and local area networks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SYSMOD_CORE_PRINCIPLES.map((principle) => (
                <div
                  key={principle.index}
                  className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono font-bold text-blue-700">Principle {principle.index}</span>
                    <span>{principle.sysmlView}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{principle.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{principle.description}</p>
                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-700">
                    <span className="font-semibold text-slate-900">CSS Lab Application: </span>
                    {principle.labApplication}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive 6-Step Standardized Diagnostic Method */}
            <div className="pt-6 border-t border-slate-200 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Operationalized 6-Step Standardized Diagnostic Method
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select any stage below to inspect its SYSMOD mapping, concrete lab actions, and verification gate.
                  </p>
                </div>
                <Layers className="w-5 h-5 text-blue-700 hidden sm:block" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {SIX_STEP_METHOD.map((step) => (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setSelectedStep(step.number)}
                    className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                      selectedStep === step.number
                        ? 'bg-blue-700 border-blue-700 text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-blue-400'
                    }`}
                  >
                    <div
                      className={`text-xs font-mono font-semibold ${
                        selectedStep === step.number ? 'text-blue-200' : 'text-blue-700'
                      }`}
                    >
                      Step 0{step.number}
                    </div>
                    <div className="text-xs font-bold mt-1 leading-snug">{step.title}</div>
                  </button>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div>
                  <div className="text-xs font-semibold text-blue-700">
                    Step 0{activeStepObj.number} · {activeStepObj.sysmodMapping}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mt-0.5">{activeStepObj.title}</h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{activeStepObj.summary}</p>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-2">
                  <div className="md:col-span-8 space-y-2">
                    <div className="text-xs font-semibold text-slate-900">Required Diagnostic Actions</div>
                    <ul className="space-y-1.5 text-sm text-slate-600">
                      {activeStepObj.actions.map((action) => (
                        <li key={action} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-4 p-4 rounded-lg bg-white border border-slate-200">
                    <div className="text-xs font-semibold text-slate-900">Exit Verification Criteria</div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {activeStepObj.verification}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparative Impact */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Impact of Structured Troubleshooting
              </h2>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs text-slate-700">
                    <th className="py-3 px-4 font-bold">Diagnostic Dimension</th>
                    <th className="py-3 px-4 font-bold">Unstructured Trial-and-Error</th>
                    <th className="py-3 px-4 font-bold text-blue-800">Advanced SYSMOD Troubleshooting</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {ADVANCED_TROUBLESHOOTING_EFFECTS.map((row) => (
                    <tr key={row.dimension} className="bg-white">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 align-top whitespace-nowrap">
                        {row.dimension}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 align-top">{row.unstructured}</td>
                      <td className="py-3.5 px-4 text-slate-800 font-medium align-top">
                        {row.advancedSysmod}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-200 border-t border-slate-200">
              {ADVANCED_IMPACT_EVIDENCE.map((ev) => (
                <article key={ev.id} className="py-4 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-slate-900">
                      {ev.authors} ({ev.year})
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-blue-700">{ev.rrlGroup}</span>
                    <span aria-hidden="true">·</span>
                    <span>{ev.context}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{ev.finding}</p>
                  {ev.metrics && <div className="text-xs font-semibold text-emerald-700">{ev.metrics}</div>}
                </article>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold">Start Troubleshooting Practice</div>
                <p className="text-xs text-slate-300 mt-1">
                  Apply structured diagnostics on hardware and software faults and track your MTTR, turnarounds, and accuracy.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('simulations')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer transition-colors whitespace-nowrap shrink-0"
              >
                <Cpu className="w-4 h-4" />
                <span>Open Simulations</span>
              </button>
            </div>
          </section>

          {/* References */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-blue-700" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">References (APA 7th)</h2>
            </div>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed pt-1">
              {subpage3Refs.map((ref) => (
                <li key={ref.id} className="pl-6 -indent-6">
                  {ref.citation}
                </li>
              ))}
              <li className="pl-6 -indent-6">
                Baterna, J. B., Caday, T. L., Dadivas, R. T., Escuadro, K. E. D., Suhillo, K. Z. D., &amp; Tobias, V. A. M. (2026).{' '}
                <em>
                  Applying SYSMOD principles to advanced troubleshooting deficits among Senior High School Computer Systems Servicing students: Basis for a standardized diagnostic framework.
                </em>{' '}
                National College of Science and Technology (NCST), Senior High School, Dasmariñas City, Cavite.
              </li>
            </ul>
          </section>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => onNavigate('subpage2')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: Problem &amp; Motivation</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('simulations')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer transition-colors"
            >
              <span>Open Simulation Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
