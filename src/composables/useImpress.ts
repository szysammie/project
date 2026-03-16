import { onMounted, onUnmounted } from 'vue';
import { useNavigationStore } from '../stores/navigation';
import { SLIDE_IDS } from '../constants/slideIds';
import { IMPRESS_CONFIG } from '../constants/impressConfig';

export function useImpress() {
  const navigationStore = useNavigationStore();

  const handleStepEnter = (event: Event) => {
    const currentStepId = (event.target as Element).id;
    navigationStore.setCurrentSlide(currentStepId);

    if (currentStepId === SLIDE_IDS.OVERVIEW) {
      resetAllStepsOpacity();
    } else {
      updateSlideOpacity(currentStepId);
    }
  };

  const handleStepLeave = (event: Event) => {
    if (!navigationStore.isOverviewMode) {
      const leavingStepId = (event.target as Element).id;
      const leavingStep = document.getElementById(leavingStepId);
      if (leavingStep && leavingStepId !== SLIDE_IDS.OVERVIEW) {
        leavingStep.classList.add('transitioning');
        setTimeout(() => {
          leavingStep.classList.remove('transitioning');
        }, 1000);
      }
    }
  };

  const updateSlideOpacity = (activeStepId: string) => {
    if (activeStepId === SLIDE_IDS.OVERVIEW) return;

    const allSteps = document.querySelectorAll('.step');
    allSteps.forEach((step) => {
      const stepElement = step as HTMLElement;
      stepElement.classList.remove('transitioning');

      if (stepElement.id === activeStepId) {
        stepElement.style.opacity = '1';
        stepElement.style.transition = 'opacity 0.8s ease-out';
        stepElement.style.pointerEvents = 'auto';
      } else {
        stepElement.style.opacity = '0.4';
        stepElement.style.transition = 'opacity 0.6s ease-out';
        stepElement.style.pointerEvents = 'none';
      }
    });
  };

  const resetAllStepsOpacity = () => {
    const allSteps = document.querySelectorAll(`.step:not(#${SLIDE_IDS.OVERVIEW})`);
    allSteps.forEach((step) => {
      const stepElement = step as HTMLElement;
      stepElement.style.opacity = '1';
      stepElement.style.transition = 'opacity 0.3s ease';
      stepElement.style.pointerEvents = 'auto';
    });
  };

  const updateImpressDimensions = () => {
    const impressElement = document.getElementById('impress');
    if (impressElement) {
      impressElement.setAttribute('data-width', IMPRESS_CONFIG.WIDTH);
      impressElement.setAttribute('data-height', IMPRESS_CONFIG.HEIGHT);
    }
  };

  const handleResize = () => {
    updateImpressDimensions();
  };

  onMounted(() => {
    document.addEventListener('impress:stepenter', handleStepEnter);
    document.addEventListener('impress:stepleave', handleStepLeave);
    window.addEventListener('resize', handleResize);

    const impressAPI = (window as any).impress();
    if (impressAPI) {
      impressAPI.init();
    }

    updateImpressDimensions();
  });

  onUnmounted(() => {
    document.removeEventListener('impress:stepenter', handleStepEnter);
    document.removeEventListener('impress:stepleave', handleStepLeave);
    window.removeEventListener('resize', handleResize);
  });

  return {
    navigateToSlide: navigationStore.navigateToSlide,
  };
}
