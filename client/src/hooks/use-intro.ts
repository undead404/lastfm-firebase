import introJs, { IntroJs, Options as IntroOptions } from 'intro.js';
import { useMemo } from 'react';

export default function useIntro(
  introName: string,
  options: IntroOptions,
): IntroJs {
  const intro = useMemo(() => {
    const introInstance = introJs().setOptions(options);
    introInstance.oncomplete(() =>
      localStorage.setItem(`intro:${introName}`, 'completed'),
    );
    introInstance.onexit(() =>
      localStorage.setItem(`intro:${introName}`, 'exited'),
    );
    return introInstance;
  }, [introName, options]);
  return intro;
}
