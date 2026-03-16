import { defineStore } from 'pinia';
import { SLIDE_IDS } from '../constants/slideIds';
import type { SlideId } from '../constants/slideIds';

const SLIDE_ORDER: SlideId[] = [
  SLIDE_IDS.TITLE,
  SLIDE_IDS.ProbingLLMs,
  SLIDE_IDS.ECG,
  SLIDE_IDS.DualSG,
  SLIDE_IDS.KAIROS,
  SLIDE_IDS.TimeMosaic,
  SLIDE_IDS.AIGCBench,
  SLIDE_IDS.OKW,
  SLIDE_IDS.PROJECTS,
  SLIDE_IDS.OVERVIEW,
];

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    currentSlide: SLIDE_IDS.TITLE as SlideId,
    isOverviewMode: false,
    totalSlides: SLIDE_ORDER.length,
    slideHistory: [] as string[],
  }),

  getters: {
    currentSlideIndex: (state) => {
      return SLIDE_ORDER.indexOf(state.currentSlide);
    },
    progress(): number {
      return (this.currentSlideIndex + 1) / this.totalSlides;
    },
  },

  actions: {
    setCurrentSlide(slideId: string) {
      this.currentSlide = slideId as SlideId;
      this.slideHistory.push(slideId);
      this.isOverviewMode = slideId === SLIDE_IDS.OVERVIEW;
    },

    toggleOverviewMode() {
      this.isOverviewMode = !this.isOverviewMode;
    },

    navigateToSlide(slideId: string) {
      if ((window as any).impress) {
        const element = document.getElementById(slideId);
        if (element) {
          (window as any).impress().goto(element);
        }
      }
    },
  },
});
