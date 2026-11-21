import { QuizModule, QuizQuestionItem } from '../types';
import { BOW_QUIZZES_DAYS_1_TO_15 } from './bowQuizzesPart1';
import { BOW_QUIZZES_DAYS_16_TO_30 } from './bowQuizzesPart2';

// Complete 30-Day Progressive CSS Quiz (5 questions/day = 150 questions, Level 1 -> Level 30)
// Grounded in DepEd Grade 11/12 TechPro ICT - Computer Systems Servicing Budget of Work (BOW)
export const QUIZ_MODULES: QuizModule[] = [
  ...BOW_QUIZZES_DAYS_1_TO_15,
  ...BOW_QUIZZES_DAYS_16_TO_30,
];

export const ALL_QUIZ_QUESTIONS: QuizQuestionItem[] = QUIZ_MODULES.flatMap(
  (module) => module.questions
);

function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const TOPIC_DISPLAY_LABELS: Record<string, string> = {
  'Week 1': 'Week 1',
  'Week 2': 'Week 2',
  'Weeks 3': 'Weeks 3–4',
  'Weeks 5-8': 'Weeks 5–8',
  'Weeks 9-11': 'Weeks 9–11',
};

export function generateCustomQuiz(
  questionCount: 5 | 10 | 15,
  topicFilter: string
): QuizModule {
  const pool =
    topicFilter === 'all'
      ? ALL_QUIZ_QUESTIONS
      : QUIZ_MODULES.filter((m) => {
          const day = m.dayNumber ?? 0;
          if (topicFilter === 'Weeks 5-8') return day >= 15 && day <= 20;
          if (topicFilter === 'Weeks 9-11') return day >= 21 && day <= 30;
          return (
            m.topic.toLowerCase().includes(topicFilter.toLowerCase()) ||
            (m.weekRef && m.weekRef.toLowerCase().includes(topicFilter.toLowerCase()))
          );
        }).flatMap((m) => m.questions);

  const source = pool.length >= questionCount ? pool : ALL_QUIZ_QUESTIONS;
  const shuffled = shuffleArray(source).slice(0, questionCount);
  const displayTopic = TOPIC_DISPLAY_LABELS[topicFilter] ?? topicFilter;

  return {
    id: `quiz-custom-${Date.now()}`,
    code: 'CUSTOM',
    title:
      topicFilter === 'all'
        ? `Custom Mixed CSS Practice (${questionCount} Qs)`
        : `Custom ${displayTopic} Practice (${questionCount} Qs)`,
    topic: topicFilter === 'all' ? 'Mixed DepEd CSS BOW' : displayTopic,
    difficulty: questionCount === 15 ? 'Advanced' : questionCount === 10 ? 'Intermediate' : 'Foundational',
    estimatedMinutes: Math.max(3, Math.round(questionCount * 0.7)),
    description:
      'Randomized practice assessment drawn directly from the 30-Day DepEd Grade 11/12 ICT-CSS Budget of Work question bank.',
    questions: shuffled,
    isCustom: true,
  };
}
