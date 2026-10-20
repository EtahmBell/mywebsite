const essentials = [
  { icon: "🐾", title: "Make time for play", text: "A favorite toy, a little fresh air, and your undivided attention. The best moments are often the simplest." },
  { icon: "🌳", title: "Take the scenic route", text: "Turn your everyday walk into a small adventure. Leave a little extra time for all the interesting smells." },
  { icon: "🏡", title: "Feel right at home", text: "A cozy corner and a familiar routine make a happy place for your four-legged family member." },
];

export default function Home() {
  return (
    <div className="site">
      <header className="header">
        <a className="brand" href="#" aria-label="Website4Dog home"><span aria-hidden="true">🐾</span> website4dog<span className="brand-dot">.</span></a>
        <a className="nav-link" href="#essentials">The everyday essentials <span aria-hidden="true">↗</span></a>
      </header>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">FOR DOGS. AND THEIR PEOPLE.</p>
            <h1 id="hero-title">Life is better<br />with a <em>dog.</em></h1>
            <p className="intro">More muddy paws. More everyday adventures. More unconditional love. A little space to celebrate life with your best friend.</p>
            <a className="button" href="#essentials">Explore the essentials <span aria-hidden="true">↓</span></a>
          </div>
          <div className="dog-card" aria-label="Illustration of a happy dog">
            <span className="card-caption">GOOD COMPANY, EVERY DAY</span>
            <div className="dog" aria-hidden="true">🐶</div>
            <div className="dog-note"><span className="status-dot" /> Always happy to see you.</div>
            <span className="sparkle" aria-hidden="true">✦</span>
          </div>
        </section>
        <section className="essentials" id="essentials" aria-labelledby="essentials-title">
          <div className="section-heading"><p className="eyebrow">THE GOOD STUFF</p><h2 id="essentials-title">Small things. Happy tails.</h2><p>A good day together starts with the basics.</p></div>
          <div className="grid">{essentials.map((item, index) => <article className="essential" key={item.title}><div className="card-top"><span className="icon" aria-hidden="true">{item.icon}</span><span className="number">0{index + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </section>
      </main>
      <footer><a className="brand" href="#">website4dog<span className="brand-dot">.</span></a><p>Made for a life full of wagging tails.</p><a href="#">Back to top ↑</a></footer>
    </div>
  );
}
