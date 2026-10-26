import fs from "node:fs";
import path from "node:path";
import Contour from "./contours";
import ElsewhereGallery from "./elsewhere";
import SiteHeader from "./site-header";
import { awards, education, elsewhere, experience, interestAreas, interests, projects, research, type Entry, type Link } from "./content";

function context(entry: Entry) {
  return entry.role ? `${entry.context} · ${entry.role}` : entry.context;
}

function Links({ links }: { links?: Link[] }) {
  if (!links) return null;
  return (
    <div className="entry-links">
      {links.map(({ label, href }) => {
        const external = href.startsWith("http");
        return (
          <a className="text-link" href={href} key={href} {...(external && { target: "_blank", rel: "noreferrer" })}>
            {label} <span aria-hidden="true">{external ? "↗" : "↑"}</span>
          </a>
        );
      })}
    </div>
  );
}

function Points({ points }: { points?: string[] }) {
  if (!points) return null;
  return <ul className="entry-points">{points.map((point) => <li key={point}>{point}</li>)}</ul>;
}

function Tags({ tags }: { tags?: string[] }) {
  return tags ? <p className="entry-tags">{tags.join(" · ")}</p> : null;
}

function ProjectCard({ entry }: { entry: Entry }) {
  return (
    <article className="card" id={entry.id}>
      <figure className="card-visual">
        {entry.image ? (
          <img src={entry.image.src} alt={entry.image.alt} width={entry.image.width} height={entry.image.height} loading="lazy" />
        ) : (
          <span className="card-visual-placeholder" aria-hidden="true">{entry.title}</span>
        )}
      </figure>
      <div className="card-body">
        <p className="card-context">{context(entry)}</p>
        <h3>{entry.title}</h3>
        <p className="card-summary">{entry.summary}</p>
        <Tags tags={entry.tags} />
        {entry.points && (
          <details className="card-details">
            <summary>What I did <span aria-hidden="true">+</span></summary>
            <Points points={entry.points} />
          </details>
        )}
        <Links links={entry.links} />
      </div>
    </article>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <h2 className="section-title" id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}

function RowList({ entries }: { entries: Entry[] }) {
  return (
    <div className="rows">
      {entries.map((entry) => (
        <article className="row" id={entry.id} key={entry.title}>
          <div className="row-head">
            <h3>{entry.title}</h3>
            {entry.role && <p className="row-role">{entry.role}</p>}
            <p className="row-meta">{entry.context}</p>
          </div>
          <div className="row-body">
            {entry.heading && <h4 className="row-heading">{entry.heading}</h4>}
            <p className="entry-summary">{entry.summary}</p>
            <Points points={entry.points} />
            <div className="row-foot">
              <Tags tags={entry.tags} />
              <Links links={entry.links} />
            </div>
            {entry.image && (
              <figure className="row-visual">
                <img src={entry.image.src} alt={entry.image.alt} width={entry.image.width} height={entry.image.height} loading="lazy" />
              </figure>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function PublicationList({ entries }: { entries: Entry[] }) {
  return (
    <div className="rows">
      {entries.map((entry) => {
        const paper = entry.links?.[0];
        return (
          <article className="row pub" id={entry.id} key={entry.title}>
            <div className="pub-meta">
              <p className="pub-year">{entry.year}</p>
              <p className="pub-venue">{entry.context}</p>
              {entry.kind && <p className="row-meta pub-kind">{entry.kind}</p>}
              {entry.role && <p className="row-role">{entry.role}</p>}
              {entry.image && (
                <figure className="pub-visual">
                  <img src={entry.image.src} alt={entry.image.alt} width={entry.image.width} height={entry.image.height} loading="lazy" />
                </figure>
              )}
            </div>
            <div className="row-body">
              <h3 className="pub-title">
                {paper ? <a href={paper.href} target="_blank" rel="noreferrer">{entry.title}</a> : entry.title}
              </h3>
              <p className="entry-summary">{entry.summary}</p>
              <Points points={entry.points} />
              <Links links={entry.links} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

// Only photographs whose file exists in public/ are shown, so a typo never becomes a broken image.
const photos = elsewhere.filter(({ src }) => src && fs.existsSync(path.join(process.cwd(), "public", src)));

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="page">
        <SiteHeader />
        <main id="main">
          <section className="hero" id="about" aria-labelledby="intro-title">
            <Contour variant="hero" />
            <div className="intro">
              <p className="eyebrow">Health · AI · Software</p>
              <h1 id="intro-title">Ethan Bell.</h1>
              <p className="hero-lede">Master’s student in Biomedical Data Science at Stanford University.</p>
              <p className="proof">Currently contributing to <strong>OpenTSLM</strong>.</p>
              <p className="about-text">I’m interested in building technology at the intersection of artificial intelligence, medicine, and human-centred design. Outside of work, I enjoy surfing, basketball, cooking, and travelling.</p>
              <details className="card-details about-more">
                <summary>A little more about me <span aria-hidden="true">+</span></summary>
                <Points points={interests} />
              </details>
              <a className="text-link hero-link" href="#projects">See my work <span aria-hidden="true">↓</span></a>
            </div>
            <figure className="portrait">
              <img src="/ethan-portrait.JPG" alt="Ethan Bell" width="1020" height="1530" fetchPriority="high" />
            </figure>
          </section>
          <section className="interests" id="interests" aria-labelledby="interests-title">
            <h2 className="interests-title" id="interests-title">Interests</h2>
            <div className="interest-grid">
              {interestAreas.map(({ title, summary }) => (
                <div className="interest" key={title}>
                  <h3>{title}</h3>
                  <p>{summary}</p>
                </div>
              ))}
            </div>
          </section>
          <Section id="projects" title="Projects">
            <div className="project-grid">
              {projects.map((entry) => <ProjectCard entry={entry} key={entry.title} />)}
            </div>
          </Section>
          <Section id="experience" title="Experience"><RowList entries={experience} /></Section>
          <Section id="education" title="Education">
            <div className="rows">
              <article className="row">
                <div className="row-head"><h3>{education.school}</h3></div>
                <div className="row-body degrees">
                  {education.degrees.map(({ degree, focus, status }) => (
                    <div className="degree" key={degree}>
                      <h4>{degree}</h4>
                      {focus && <p className="degree-focus">{focus}</p>}
                      <p className="row-heading">{status}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </Section>
          <Section id="research" title="Research"><Contour variant="research" /><PublicationList entries={research} /></Section>
          <Section id="awards" title="Awards"><RowList entries={awards} /></Section>
          {photos.length > 0 ? (
            <Section id="elsewhere" title="Elsewhere"><ElsewhereGallery photos={photos} /></Section>
          ) : process.env.NODE_ENV === "development" && (
            <aside className="dev-note">
              Elsewhere is hidden until it has photographs: add images to <code>public/elsewhere/</code> and entries to <code>elsewhere</code> in <code>src/app/content.ts</code>. This note only appears in development.
            </aside>
          )}
          <section className="section contact" id="contact" aria-labelledby="contact-title">
            <Contour variant="contact" />
            <h2 className="section-title" id="contact-title">Contact</h2>
            <div className="contact-links" aria-label="Contact links">
              <a className="text-link" href="mailto:etahm@stanford.edu">etahm@stanford.edu <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="https://www.linkedin.com/in/ethan-bell-434a47260/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="https://github.com/EtahmBell" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </section>
        </main>
        <footer><span>Ethan Bell <span className="footer-dot" aria-hidden="true">·</span> Software, AI & medicine</span><a href="#">Back to top ↑</a></footer>
      </div>
    </>
  );
}
