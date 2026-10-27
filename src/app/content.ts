export type Link = { label: string; href: string };

export type Entry = {
  id?: string;
  // Primary projects get a full card with a screenshot; the rest are listed compactly beneath them.
  primary?: boolean;
  title: string;
  context: string;
  role?: string;
  heading?: string;
  year?: string;
  kind?: string;
  summary: string;
  points?: string[];
  tags?: string[];
  links?: Link[];
  image?: { src: string; alt: string; width: number; height: number };
};

export type Degree = { degree: string; focus?: string; status: string };

// width and height are the image file's pixel size, so the strip can keep each photo's natural shape.
export type Photo = { src: string; location: string; date: string; alt: string; width: number; height: number };

export const interests = [
  "CrossFit competitor",
  "Trained Urasenke tea ceremony practitioner and co-founder of Stanford Sadō",
  "Cellist and former member of the Stanford Chinese Music Ensemble",
];

// The three-column Interests strip between the hero and Projects.
export const interestAreas = [
  { title: "Engineering", summary: "Building thoughtful software and intelligent systems that address real-world problems." },
  { title: "Healthcare", summary: "Exploring how AI and technology can make healthcare more accessible and personalised." },
  { title: "Exploration", summary: "Discovering new places, cultures, and perspectives through travel, food, and new experiences." },
];

export const projects: Entry[] = [
  {
    id: "lamina",
    primary: true,
    title: "Lamina",
    context: "1st place · YC × Medplum Hackathon",
    summary:
      "A physician-agent network for specialty care, where personalised AI agents represent physicians and help coordinate consultations, expertise discovery, and referrals.",
    points: [
      "Started as a “LinkedIn for physician AI agents” at the YC × Medplum Hackathon",
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
    title: "Fiyu",
    primary: true,
    context: "Machine Learning",
    summary:
      "A restaurant discovery app for finding locally loved places in Tokyo, combining a custom restaurant-vetting system with personalised daily picks and taste profiles.",
    tags: ["React", "Supabase", "Python"],
    links: [
      { label: "Website", href: "https://www.fiyuapp.com" },
      { label: "GitHub", href: "https://github.com/EtahmBell/fiyu" },
    ],
    image: { src: "/projects/fiyu.jpg", alt: "Fiyu website", width: 1200, height: 750 },
  },
  {
    id: "opentslm",
    title: "OpenTSLM",
    context: "Research",
    role: "Contributor",
    summary:
      "An open-source research initiative developing time-series language models that can understand and reason over temporal data.",
    points: [
      "Adapted and retrained OpenTSLM for continuous glucose monitoring data",
      "Explored how time-series language models can interpret glucose traces and generate conclusions from physiological measurements",
      "Evaluated approaches for integrating CGM data into language model workflows",
    ],
    tags: ["Python"],
    links: [
      { label: "OpenTSLM", href: "https://www.opentslm.com/" },
      { label: "OpenTSLM GitHub", href: "https://github.com/OpenTSLM/OpenTSLM" },
      { label: "My CGM work", href: "https://github.com/EtahmBell/opentslm-cgm" },
    ],
    image: { src: "/opentslm_website.png", alt: "OpenTSLM website homepage", width: 1922, height: 1178 },
  },
  {
    title: "TCMNet",
    context: "Machine Learning",
    summary:
      "A neural-network-based system exploring computational representations of traditional Chinese medicine, mapping symptoms to interpretable syndrome patterns and potential herbal treatments.",
    points: [
      // TODO: verify against the repo README, which reports 1,861 symptoms and 88.25% accuracy
      "Multi-task model mapping 1,869 symptoms to 14 medical concepts, 228 syndromes and 596 ranked herbs",
      "86.9% syndrome accuracy (98.2% top-5), compared with 58.1% for a Tree-Augmented Naive Bayes baseline, on synthetic cases built from the SymMap knowledge graph",
    ],
    tags: ["PyTorch", "NumPy", "NetworkX"],
    links: [
      { label: "Live demo", href: "https://tcmnet-nine.vercel.app/" },
      { label: "Repository (liannecha)", href: "https://github.com/liannecha/cs229_tcm" },
    ],
    image: { src: "/projects/tcmnet.jpg", alt: "TCMNet website", width: 1200, height: 750 },
  },
  {
    title: "CoughSync",
    context: "Digital Health · iOS",
    summary:
      "An iOS application that uses machine learning to detect and track cough frequency, helping patients and clinicians better understand respiratory symptoms over time.",
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
];

export const experience: Entry[] = [
  {
    title: "Fastino Labs",
    role: "AI Training Data Contractor",
    context: "Oct 2025 – Dec 2025",
    summary:
      "Supported AI model development through multilingual data preparation, translation, and dataset formatting, with an emphasis on consistency and training-data quality.",
  },
  {
    title: "Rem and Company",
    role: "Team Lead",
    context: "Sep 2023 – Nov 2024",
    summary: "Led consulting work providing strategic and financial guidance to small businesses in California.",
  },
  {
    title: "Cardinal Free Clinics",
    role: "Patient Health Navigator",
    context: "Jan 2022 – Oct 2024",
    summary:
      "Volunteered at a free clinic serving uninsured patients in Redwood City, helping patients navigate access to primary care, insurance, medication, laboratory testing, and other medical resources.",
  },
  {
    title: "Tata Consultancy Services",
    // TODO: verify title; newer notes say "AI Engineering Intern"
    role: "AI Engineer Intern",
    context: "Tokyo, Japan · Jun 2024 – Sep 2024",
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
    // TODO: verify title; newer notes say "AI Engineering Intern"
    role: "Software Engineer Intern",
    context: "San Mateo, CA · Jun 2025 – Sep 2025",
    heading: "Grant equity calculator",
    summary: "Automated how grant data is pulled from client documents for ESO Fund’s grant equity calculator.",
    points: [
      "Led the project and fine-tuned a model to extract key grant details from client documents",
      // TODO: verify; newer notes say logistic regression
      "Built a linear regression model that predicts grant amounts from client and company variables",
      "Wrote the pipeline end to end: finding new grant files, preparing documents, training and validation, and syncing results to a master spreadsheet through APIs",
    ],
    tags: ["Python", "Machine learning"],
  },
];

export const education: { school: string; degrees: Degree[] } = {
  school: "Stanford University",
  degrees: [
    { degree: "M.S. in Biomedical Data Science", status: "In progress" },
    {
      degree: "B.S., Individually Designed Major in Engineering",
      focus: "Focused on Computer Science and Digital Health",
      status: "Graduated June 2025",
    },
  ],
};

export const research: Entry[] = [
  {
    title: "Assessment of ventilation in low-resource healthcare settings: Montserrado County, Liberia—2022–2023",
    context: "Antimicrobial Stewardship & Healthcare Epidemiology",
    kind: "Conference abstract",
    year: "2023",
    role: "Undergraduate Research Assistant",
    summary:
      "Assessed ventilation in Liberian healthcare facilities to find high-risk spaces needing intervention, and developed a low-cost continuous CO₂ sensor.",
    points: [
      "Analysed ventilation data and identified natural-ventilation strategies",
      "Helped build the CO₂ sensor, including its protective case and internal Python code",
    ],
    links: [{ label: "Read the abstract", href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10594113/" }],
    image: { src: "/research/co2-sensor.jpg", alt: "Low-cost CO₂ sensors built for the study", width: 961, height: 276 },
  },
  {
    title: "The role of indigenous healers in treating surgical conditions in the rural Eastern Cape of South Africa",
    context: "World Journal of Surgery",
    kind: "Journal article",
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
  {
    title: "Biodesign NEXT Funding — GreenScreen",
    context: "Stanford Byers Center for Biodesign · March 2024",
    summary:
      "Awarded funding through the Stanford Byers Center for Biodesign to develop GreenScreen, an AI-powered visa-navigation tool.",
  },
  {
    title: "Biodesign NEXT Funding — HomeCare Nav",
    context: "Stanford Byers Center for Biodesign · December 2023",
    summary:
      "Received funding through the Stanford Byers Center for Biodesign for HomeCare Nav, a physician-assistance tool designed to help assess eligibility for Hospital at Home programs.",
  },
];

// Elsewhere: one entry per photograph, shown in this order. The order is hand-mixed rather than chronological
// (alternating places, years and portrait/landscape shapes) and fixed, so it is the same on every load.
// Reorder by moving lines. Image files live in public/; entries whose file is missing are skipped.
export const elsewhere: Photo[] = [
  { src: "/Malta-Summer-2025.JPEG", location: "Malta", date: "Summer 2025", width: 3168, height: 4752, alt: "A person in a basketball jersey standing on a stone balcony, pointing out over dry hills" },
  { src: "/Kazakhstan-Summer-2024.JPEG", location: "Kazakhstan", date: "Summer 2024", width: 4752, height: 3168, alt: "A person sitting beside a white yurt on a grassy plain" },
  { src: "/Vincy-Summer-2025.JPEG", location: "Saint Vincent and the Grenadines", date: "Summer 2025", width: 3269, height: 4894, alt: "A person standing on a green hilltop beneath a rainbow and storm clouds" },
  { src: "/ElSalvador-Spring-2025.JPEG", location: "El Salvador", date: "Spring 2025", width: 4894, height: 3269, alt: "Two people walking down a street of colourful houses and parked cars, with green hills beyond" },
  { src: "/Hawaii-Autumn-2024.JPEG", location: "Hawaii", date: "Autumn 2024", width: 1536, height: 2048, alt: "A person in a red jersey standing at a white fence, looking up at steep green mountains" },
  { src: "/HongKong-Winter-2023.JPG", location: "Hong Kong", date: "Winter 2023", width: 2720, height: 1530, alt: "People at the water’s edge on a beach beside a rocky green headland under an overcast sky" },
  { src: "/Kinosaki-Spring-2024.jpg", location: "Kinosaki", date: "Spring 2024", width: 1020, height: 1530, alt: "A person in a dark kimono-style robe on a stone bridge, framed by willow trees on a misty day" },
  { src: "/Kyrgyzstan-Summer-2026.jpg", location: "Kyrgyzstan", date: "Summer 2026", width: 5184, height: 3456, alt: "A group of hikers on a trail across a green hillside, with yaks grazing below forested slopes" },
  { src: "/DominicanRepublic-Spring-2023.jpg", location: "Dominican Republic", date: "Spring 2023", width: 1020, height: 1530, alt: "Colourful houses and rooftop water tanks seen through a window, with trees in the foreground" },
  { src: "/Cooking-Winter-2025.JPEG", location: "Cooking", date: "Winter 2025", width: 6000, height: 4000, alt: "Hands pouring a yellow filling from a measuring jug into pastry cases on a baking tray" },
  { src: "/Japan-Summer-2024.JPEG", location: "Japan", date: "Summer 2024", width: 3265, height: 4898, alt: "A mountain peak rising above a sea of clouds at dusk" },
  { src: "/SouthAfrica-Summer-2023.JPG", location: "South Africa", date: "Summer 2023", width: 2040, height: 1530, alt: "Golden light over rolling hills, with round houses in a valley" },
  { src: "/Korea-Winter-2026.JPEG", location: "Korea", date: "Winter 2026", width: 4284, height: 5712, alt: "Thatched-roof houses in a dry field, with hazy mountains behind" },
];
