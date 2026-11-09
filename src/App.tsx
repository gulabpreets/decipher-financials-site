import { useEffect, useState } from 'react';
import { CareersPuzzle } from './CareersPuzzle';
import { ADVANTAGES,CAPABILITIES, CAPABILITY_SUMMARY, EMAIL, INSIGHTS, NAV, SOCIAL, STATS } from './content';

const MENU = [...NAV, { label: 'Contact', href: '#contact' }];

function Arrow() {
  return (
    <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8h11.5M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function Logo() {
  return <img className="logo" src="brand/logo.svg" alt="Decipher Financials. Break the complexity." width={190} height={49} />;
}

function Eyebrow({ children }: { children: string }) {
  return <p className="eyebrow">{children}</p>;
}

function SectionNo({ children }: { children: string }) {
  return <p className="section-no">{children}</p>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
        <a href="#top" aria-label="Decipher Financials, back to top" onClick={() => setOpen(false)}>
          <Logo />
        </a>
        <nav className="header__nav" aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="btn btn--small" href="#contact">
            Let’s talk <Arrow />
          </a>
        </nav>
        <button className="header__toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <i />
          <i />
        </button>
      </header>
      <div className={`menu${open ? ' is-open' : ''}`} inert={!open}>
        <nav aria-label="Menu">
          {MENU.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              <small>{String(index + 1).padStart(2, '0')}</small>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>Gurugram · India</span>
        </div>
        <img className="menu__art" src="brand/logo-icon.svg" alt="" />
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid" aria-hidden="true" />
      <div className="wrap hero__main">
        <div>
          <p className="hero__eyebrow">Financial analysis, made clear</p>
          <h1 className="display display--hero">
            Break the
            <em>complexity.</em>
          </h1>
          <p className="hero__lede">Seamless financial analysis and support, tailored to the precise needs of your business.</p>
          <div className="hero__cta">
            <a className="btn" href="#capabilities">
              Explore our expertise <Arrow />
            </a>
            <a className="link" href="#about">
              Discover Decipher <span aria-hidden="true">↘</span>
            </a>
          </div>
        </div>
        <div className="hero__art" aria-hidden="true">
          <div className="hero__orb">
            <i className="hero__blob" />
            <i className="hero__ring hero__ring--outer" />
            <i className="hero__ring hero__ring--inner" />
            <img src="brand/logo-icon.svg" alt="" />
          </div>
          <div className="float-card float-card--status">
            <i className="pulse" />
            <span>
              <small>Workflow status</small>
              <strong>Always in motion</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="wrap hero__foot">
        <span className="hero__scroll">Scroll to decipher</span>
        <span>Asset management support · Global time zones</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <div className="wrap section">
        <SectionNo>01 / Who we are</SectionNo>
        <div className="about__grid reveal">
          <Eyebrow>A sharper perspective</Eyebrow>
          <div>
            <h2 className="display">
              We turn financial intricacy into
              <em>actionable clarity.</em>
            </h2>
            <div className="about__copy">
              <p>Our experienced CFAs, CPAs and postgraduates work closely with asset management companies across the United States—delivering insightful, accurate analysis and dependable support.</p>
              <a className="circle" href="#capabilities" aria-label="See our capabilities">
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="stats reveal">
        {STATS.map((stat) => (
          <div className="stat" key={stat.value}>
            <p className="stat__value">
              {stat.value}
              {stat.unit && <sup>{stat.unit}</sup>}
            </p>
            <p className="stat__label">
              {stat.label[0]}
              <br />
              {stat.label[1]}
            </p>
          </div>
        ))}
        <figure className="stat stat--quote">
          <blockquote>
            “Ownership isn’t just a value.
            <br />
            It is how we work.”
          </blockquote>
          <figcaption>The Decipher standard</figcaption>
        </figure>
      </div>
    </section>
  );
}

function CapabilityIcon({ shape }: { shape: 'hexagon' | 'diamond' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      {shape === 'hexagon' ? <path d="M11 2.5 18.4 6.8v8.4L11 19.5l-7.4-4.3V6.8L11 2.5Z" stroke="currentColor" strokeWidth="1.3" /> : <path d="M11 3.5 18.5 11 11 18.5 3.5 11 11 3.5Z" stroke="currentColor" strokeWidth="1.3" />}
    </svg>
  );
}

function Capabilities() {
  const [active, setActive] = useState(0);
  const current = CAPABILITIES[active];
  return (
    <section className="capabilities" id="capabilities">
      <div className="wrap section">
        <SectionNo>02 / What we do</SectionNo>
        <div className="split-head reveal">
          <div>
            <Eyebrow>Our capabilities</Eyebrow>
            <h2 className="display">
              Depth where it
              <em>matters most.</em>
            </h2>
          </div>
          <p>Specialist thinking, rigorous execution, and flexible support—integrated seamlessly into your workflow.</p>
        </div>
        <div className="cap__grid reveal">
          <div className="cap__list">
            {CAPABILITIES.map((item, index) => (
              <button key={item.title} type="button" className={index === active ? 'is-active' : ''} aria-pressed={index === active} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <span>{item.title}</span>
                {index === active && (
                  <i className="cap__go">
                    <Arrow />
                  </i>
                )}
              </button>
            ))}
          </div>
          <div className="cap__detail" key={active}>
            <div className="cap__icon">
              <CapabilityIcon shape={current.icon} />
            </div>
            <p className="cap__count">
              {String(active + 1).padStart(2, '0')} / {String(CAPABILITIES.length).padStart(2, '0')}
            </p>
            <h3>{current.title}</h3>
            <p className="cap__summary">{CAPABILITY_SUMMARY}</p>
            <ul>
              {current.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <a className="link link--light" href="#contact">
              Discuss this capability <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Advantage() {
  return (
    <section className="advantage">
      <div className="wrap section">
        <SectionNo>03 / The difference</SectionNo>
        <div className="advantage__grid">
          <div className="reveal">
            <Eyebrow>The Decipher advantage</Eyebrow>
            <h2 className="display">
              Built to keep your
              <br />
              business <em className="inline">moving.</em>
            </h2>
          </div>
          <ol>
            {ADVANTAGES.map((item, index) => (
              <li className="reveal" key={item.title}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <img className="advantage__art" src="brand/logo-icon.svg" alt="" />
    </section>
  );
}

function InsightArt({ tone }: { tone: 'navy' | 'peri' | 'pale' }) {
  if (tone === 'peri') {
    return (
      <svg viewBox="0 0 400 332" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="332" fill="#6379c6" />
        <path d="M200-42 408 166 200 374-8 166Z" fill="#6d82cc" />
        <path d="M200 22 344 166 200 310 56 166Z" fill="#7488d0" />
        <path d="M200 76 290 166 200 256 110 166Z" fill="#6379c6" stroke="#8c9cda" />
        <rect x="262" y="194" width="58" height="58" transform="rotate(16 291 223)" fill="#5a6fbb" />
      </svg>
    );
  }
  const colors = tone === 'navy' ? ['#18245c', '#212e68', '#2a3772', '#18245c', '#6379c6', '#7f8dc0'] : ['#dde3f2', '#ced6ea', '#c1cbe4', '#dde3f2', '#6379c6', '#243779'];
  return (
    <svg viewBox="0 0 400 332" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="332" fill={colors[0]} />
      <circle cx="200" cy="166" r="164" fill={colors[1]} />
      <circle cx="200" cy="166" r="128" fill={colors[2]} />
      <circle cx="200" cy="166" r="92" fill={colors[3]} stroke={colors[5]} />
      <rect x="258" y="66" width="62" height="62" transform="rotate(22 289 97)" fill={colors[4]} />
    </svg>
  );
}

function Insights() {
  return (
    <section className="insights" id="insights">
      <div className="wrap section">
        <SectionNo>04 / Thinking</SectionNo>
        <div className="split-head split-head--end reveal">
          <div>
            <Eyebrow>Latest intelligence</Eyebrow>
            <h2 className="display">
              Ideas to see the
              <br />
              market <em className="inline">differently.</em>
            </h2>
          </div>
          <a className="link" href="#insights">
            View all insights <Arrow />
          </a>
        </div>
        <div className="cards">
          {INSIGHTS.map((item, index) => (
            <a className="card reveal" href="#insights" key={item.title}>
              <div className="card__art">
                <span className={item.tone === 'pale' ? 'is-dark' : ''}>{String(index + 1).padStart(2, '0')}</span>
                <InsightArt tone={item.tone} />
              </div>
              <div className="card__meta">
                <span>{item.category}</span>
                <time>{item.date}</time>
              </div>
              <div className="card__title">
                <h3>{item.title}</h3>
                <Arrow />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Careers() {
  return (
    <section className="careers" id="careers">
      <div className="wrap careers__row reveal">
        <div className="careers__lead">
          <h2 className="display">Join our team</h2>
          <h3 className="display">
            Complex
            <br />
            problems need
            <em>curious minds.</em>
          </h3>
        </div>
        <div className="careers__side">
          <CareersPuzzle />
          <div className="careers__cta">
            <p>Join a culture of continuous learning, diverse thinking, and exacting standards.</p>
            <a className="btn btn--white" href="#contact">
              Explore careers <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <img className="contact__art" src="brand/logo-icon.svg" alt="" />
      <div className="contact__body reveal">
        <p className="contact__kicker">Have a complex challenge?</p>
        <h2 className="display">
          Let’s make it
          <em>clear.</em>
        </h2>
        <a className="contact__mail" href={`mailto:${EMAIL}`}>
          {EMAIL} <Arrow />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="wrap footer">
      <div className="footer__top">
        <div>
          <Logo />
          <p>
            Financial analysis and support,
            <br />
            decoded with precision.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          {NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <h4>Connect</h4>
          {SOCIAL.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
              {item.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <address>
          <h4>India</h4>
          Golf View Towers, Tower B
          <br />
          Golf Course Road, Sector 42
          <br />
          Gurugram, Haryana 122002
        </address>
      </div>
      <div className="footer__bar">
        <span>© 2026 Decipher Financials</span>
        <span>
          <a href="#privacy">Privacy</a> · <a href="#terms">Terms</a>
        </span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

export function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Advantage />
        <Insights />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
