export type Link = { label: string; href: string };

export type Entry = {
  id?: string;
  featured?: boolean;
  title: string;
  context: string;
  role?: string;
  heading?: string;
  year?: string;
  summary: string;
  points?: string[];
  tags?: string[];
  links?: Link[];
  image?: { src: string; alt: string; width: number; height: number };
};

export const projects: Entry[] = [
  {
    id: "lamina",
    featured: true,
    title: "Lamina",
    context: "1st place · YC × Medplum Hackathon",
    summary:
      "A physician-agent network for specialty care. Each physician’s agent represents their practice and consults other physicians’ agents about a patient, returning a grounded, inspectable referral recommendation.",
    points: [
      "Started as a “LinkedIn for physician AI agents” and won 1st place at the YC × Medplum Hackathon",
      "Built a searchable directory of U.S. physicians from public CMS NPPES data, with a reserved agent identity for each",
      "Uses Medplum (FHIR) for clinical context; demos run on synthetic patients only",
    ],
    tags: ["Python", "FastAPI", "React", "FHIR"],
    links: [
      { label: "Live demo", href: "https://lamina-health-r3yw.vercel.app" },
      { label: "GitHub", href: "https://github.com/EtahmBell/lamina-health" },
      { label: "Hackathon version", href: "https://github.com/EtahmBell/lamina" },
    ],
    image: { src: "/projects/lamina.jpg", alt: "Lamina physician dashboard", width: 1400, height: 765 },
  },
  {
    title: "TCMNet",
    context: "Machine learning",
    summary:
      "A concept-guided neural network that predicts Traditional Chinese Medicine syndromes from symptoms and recommends herbs, with an interpretable layer of medical concepts.",
    points: [
      "Multi-task model mapping 1,869 symptoms to 14 medical concepts, 228 syndromes and 596 ranked herbs",
      "86.9% syndrome accuracy (98.2% top-5), compared with 58.1% for a Tree-Augmented Naive Bayes baseline, on synthetic cases built from the SymMap knowledge graph",
    ],
    tags: ["PyTorch", "NumPy", "NetworkX"],
    links: [
      { label: "Live demo", href: "https://tcmnet-nine.vercel.app" },
      { label: "GitHub", href: "https://github.com/liannecha/tcmnet" },
    ],
    image: { src: "/projects/tcmnet.jpg", alt: "TCMNet website", width: 1200, height: 750 },
  },
  {
    title: "CoughSync",
    context: "Digital Health · iOS",
    summary:
      "An iPhone app that detects coughs overnight with machine learning and turns them into daily, weekly and monthly trends.",
    points: [
      "Built background audio recording in Swift that keeps collecting while the phone charges with the screen off",
      "Helped train the cough-detection model",
      "Built the notifications that remind users to start recording",
    ],
    tags: ["Swift", "Machine learning"],
    links: [{ label: "GitHub", href: "https://github.com/CS342/2025-CoughSync" }],
    image: { src: "/projects/coughsync.jpg", alt: "CoughSync summary and trends screens", width: 1200, height: 750 },
  },
  {
    title: "Lucky Day",
    context: "Human-Computer Interaction",
    summary:
      "An event planner that supports the mental health of older adults, especially in immigrant communities, by helping them find, join and create events around shared interests.",
    points: [
      "Did the early research and needfinding, and helped shape the concept",
      "Designed the task flow and the low- and mid-fidelity prototypes in Figma",
      "Edited the product pitch video",
    ],
    tags: ["Figma", "UX research"],
    links: [
      { label: "Final app video", href: "https://drive.google.com/file/d/1KCM-c0_NkoJ5DpFM2GkrxH2dN2Y1r0iR/view?usp=sharing" },
    ],
    image: { src: "/projects/lucky-day.jpg", alt: "Lucky Day calendar and recommended events screens", width: 1200, height: 750 },
  },
  {
    title: "Fiyu",
    context: "Machine Learning",
    summary:
      "Finds independent, under-the-radar restaurants by combining local-language research, machine learning and your own feedback. Live in Tokyo.",
    tags: ["React", "Supabase", "Python"],
    links: [
      { label: "Live site", href: "https://fiyu.vercel.app" },
      { label: "GitHub", href: "https://github.com/EtahmBell/fiyu" },
    ],
    image: { src: "/projects/fiyu.jpg", alt: "Fiyu website", width: 1200, height: 750 },
  },
];

export const experience: Entry[] = [
  {
    title: "Tata Consultancy Services",
    role: "AI Engineer Intern",
    // TODO: add dates
    context: "Tokyo, Japan · [Dates]",
    heading: "Kampo prescription model",
    summary:
      "Built a machine learning model that suggests Kampo (traditional Japanese medicine) alternatives to conventional medicine.",
    points: [
      "Led the project end to end: collected and prepared the data, then built and tuned XGBoost and deep-learning classifiers",
      "Reached 99.7% accuracy identifying diseases from observed and patient-reported symptoms",
    ],
    tags: ["Python", "XGBoost", "Deep learning"],
    links: [{ label: "LinkedIn post", href: "https://www.linkedin.com/feed/update/urn:li:activity:7239330494629212162/" }],
  },
  {
    title: "ESO Fund",
    role: "Software Engineer Intern",
    // TODO: add dates
    context: "San Mateo, CA · [Dates]",
    heading: "Grant equity calculator",
    summary: "Automated how grant data is pulled from client documents for ESO Fund’s grant equity calculator.",
    points: [
      "Led the project and fine-tuned a model to extract key grant details from client documents",
      "Built a linear regression model that predicts grant amounts from client and company variables",
      "Wrote the pipeline end to end: finding new grant files, preparing documents, training and validation, and syncing results to a master spreadsheet through APIs",
    ],
    tags: ["Python", "Machine learning"],
  },
];

export const research: Entry[] = [
  {
    title: "Assessment of ventilation in low-resource healthcare settings: Montserrado County, Liberia, 2022–2023",
    context: "Antimicrobial Stewardship & Healthcare Epidemiology",
    year: "2023",
    role: "Undergraduate Research Assistant",
    summary:
      "Assessed ventilation in Liberian healthcare facilities to find high-risk spaces needing intervention, and developed a low-cost continuous CO₂ sensor.",
    points: [
      "Analysed ventilation data and identified natural-ventilation strategies",
      "Helped build the CO₂ sensor, including its protective case and internal Python code",
    ],
    links: [{ label: "Read the paper", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10594113/" }],
    image: { src: "/research/co2-sensor.jpg", alt: "Low-cost CO₂ sensors built for the study", width: 961, height: 276 },
  },
  {
    title: "The role of indigenous healers in treating surgical conditions in the rural Eastern Cape of South Africa",
    context: "World Journal of Surgery",
    year: "2024",
    role: "Undergraduate Research Assistant",
    summary:
      "Studied how traditional healers treat surgical conditions in Xhosa communities, to support integrating traditional medicine with the national health system.",
    points: [
      "Collected data through interviews and analysed it",
      "Built an offline survey tool in Python for data collection in the field",
    ],
    links: [{ label: "Read the paper", href: "https://onlinelibrary.wiley.com/doi/10.1002/wjs.12356" }],
  },
];

export const awards: Entry[] = [
  {
    title: "1st place, YC × Medplum Hackathon",
    context: "Lamina",
    summary: "Won with Lamina, a network of AI agents that represent physicians.",
    links: [{ label: "See project", href: "#lamina" }],
  },
];
