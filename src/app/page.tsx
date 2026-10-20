export default function Home() {
  return (
    <>

  <a className="skip-link" href="#main">Skip to content</a>
  <div className="page">
    <header className="header">
      <a className="wordmark" href="#" aria-label="Ethan Bell, home">Ethan Bell</a>
      <nav aria-label="Main navigation">
        <a href="#about">About</a><a href="#work">Work</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
      </nav>
    </header>
    <main id="main">
      <section className="hero" id="about" aria-labelledby="intro-title">
        <div className="intro">
          <p className="eyebrow">Digital health software engineer & entrepreneur</p>
          <h1 id="intro-title">Technology<br />with a human purpose.</h1>
          <p className="lead">I build software at the intersection of technology and healthcare, with a focus on more accessible, human-centered care.</p>
          <div className="actions"><a className="text-link" href="#experience">Explore my experience <span aria-hidden="true">↗</span></a><a className="text-link" href="#contact">Get in touch <span aria-hidden="true">↗</span></a></div>
        </div>
        <figure className="portrait">
          <svg viewBox="823 90 488 365" role="img" aria-labelledby="portrait-title"><title id="portrait-title">Illustrative black and white portrait, to be replaced with your photo</title><image href="/editorial-reference.png" width="1374" height="1145"/></svg>
          <figcaption>Portrait placeholder · Your photo goes here</figcaption>
        </figure>
      </section>
      <section className="expertise section" id="experience" aria-labelledby="experience-title">
        <div className="section-heading"><h2 className="eyebrow" id="experience-title">Areas of focus</h2><span className="section-number" aria-hidden="true">01 /</span></div>
        <div className="expertise-grid">
          <article><h3>Engineering</h3><p>Thoughtful software that puts people first. An interest in clarity, reliability, and solving the right problem.</p></article>
          <article><h3>Entrepreneurship</h3><p>Exploring ideas at the intersection of technology and care, from understanding a need to shaping a useful product.</p></article>
          <article><h3>Digital health</h3><p>Making healthcare easier to navigate, with technology that supports more accessible, human-centered experiences.</p></article>
        </div>
        <details className="resume"><summary>Experience & résumé <span aria-hidden="true">+</span></summary><div className="resume-content"><p>This section is ready for your roles, organizations, and the work you’re proud of.</p><p className="small">Résumé details will be added here. No employment history has been included yet.</p></div></details>
      </section>
      <section className="section work" id="work" aria-labelledby="work-title">
        <div className="section-heading"><h2 className="eyebrow" id="work-title">Selected work</h2><span className="section-number" aria-hidden="true">02 /</span></div>
        <article className="project">
          <div className="project-visual"><svg viewBox="60 833 694 283" role="img" aria-labelledby="project-image-title"><title id="project-image-title">Illustrative care navigation product interface</title><image href="/editorial-reference.png" width="1374" height="1145"/></svg></div>
          <div className="project-copy"><p className="eyebrow">Concept project</p><h3>Care navigation</h3><p>A product concept for helping people find and access care, with clear guidance, personalized options, and ongoing support.</p><details className="project-details"><summary className="text-link">Explore the concept <span aria-hidden="true">+</span></summary><div><p>The question: how could a digital experience make someone’s next step in healthcare easier to understand?</p><p>This illustrative project explores a simple place to find care, understand options, and keep track of next steps.</p><p className="small">Sample project for this design preview. Replace with your own work and outcomes.</p></div></details></div>
        </article>
      </section>
      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div><p className="eyebrow">Let’s connect</p><h2 id="contact-title">Good things start<br />with a conversation.</h2></div>
        <div className="contact-copy"><p>Interested in thoughtful technology and better experiences in health? There’s plenty to talk about.</p><p className="contact-placeholder">Your email and social links will go here.</p></div>
      </section>
    </main>
    <footer><span>Ethan Bell <span className="footer-dot" aria-hidden="true">·</span> Software & digital health</span><a href="#">Back to top ↑</a></footer>
  </div>

    </>
  );
}
