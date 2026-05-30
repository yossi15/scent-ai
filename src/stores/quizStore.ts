'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type QuizAnswers = {
  scentDirection?: string;
  lovedNotes: string[];
  avoidedNotes: string[];
  occasions: string[];
  seasons: string[];
  projection?: string;
  longevity?: string;
  budget?: string;
  collection: string[];
};

type QuizState = {
  step: number;
  answers: QuizAnswers;
  email?: string;
  marketingConsent: boolean;
  setAnswer: (key: keyof QuizAnswers, value: string | string[]) => void;
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
  setMarketingConsent: (v: boolean) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
};

const defaultAnswers: QuizAnswers = {
  scentDirection: undefined,
  lovedNotes: [],
  avoidedNotes: [],
  occasions: [],
  seasons: [],
  projection: undefined,
  longevity: undefined,
  budget: undefined,
  collection: [],
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      step: 0,
      answers: { ...defaultAnswers },
      email: undefined,
      marketingConsent: false,

      setAnswer: (key, value) =>
        set(s => ({ answers: { ...s.answers, [key]: value } })),

      setStep: step => set({ step }),

      setEmail: email => set({ email }),

      setMarketingConsent: marketingConsent => set({ marketingConsent }),

      next: () => set(s => ({ step: s.step + 1 })),

      back: () => set(s => ({ step: Math.max(0, s.step - 1) })),

      reset: () =>
        set({ step: 0, answers: { ...defaultAnswers }, email: undefined, marketingConsent: false }),
    }),
    {
      name: 'scentory-quiz-v2',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? sessionStorage : localStorage
      ),
    }
  )
);
