import { useEffect, useState, type ReactNode } from 'react';

const SEEN_KEY = 'decipher:intro-seen';
/** Keep in step with the bar animation in styles.css. */
const FILL_MS = 1800;
const EXIT_MS = 500;

type Phase = 'loading' | 'leaving' | 'done';

function shouldPlay() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(SEEN_KEY) === null;
  } catch {
    return true;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Without storage the intro simply plays again on the next load.
  }
}

/** Plays once per browser session, then fades into the site. */
export function Preloader({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>(() => (shouldPlay() ? 'loading' : 'done'));

  useEffect(() => {
    if (phase === 'done') return;
    const timer = setTimeout(
      () => {
        if (phase === 'loading') markSeen();
        setPhase(phase === 'loading' ? 'leaving' : 'done');
      },
      phase === 'loading' ? FILL_MS : EXIT_MS,
    );
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <>
      {phase !== 'loading' && children}
      {phase !== 'done' && (
        <div className={`preloader${phase === 'leaving' ? ' is-leaving' : ''}`} role="status" aria-label="Loading Decipher Financials">
          <div className="preloader__emblem" aria-hidden="true">
            <span className="preloader__orbit preloader__orbit--outer">
              <i />
            </span>
            <span className="preloader__orbit preloader__orbit--inner">
              <i />
            </span>
            <img src="brand/logo-icon.svg" alt="" width={82} height={78} />
          </div>
          <div className="preloader__track" aria-hidden="true">
            <span />
          </div>
          <p className="preloader__tag">Breaking the complexity</p>
        </div>
      )}
    </>
  );
}
