/**
 * All site copy. Brand: VIVERE (Latin, "to live"), Performance & Wellness.
 * Coach: Samuel Korgi. Direction: Roman / Stoic / timeless, gold on obsidian.
 * Positioning: health as the core, discipline as the edge.
 * House style: no em-dashes anywhere. Edit words here; sections follow.
 *
 * Layout: home page copy first, then the Wellness Core program page
 * (/wellness-core) and disclosures (/disclosures) at the foot of the file.
 */

export const site = {
  name: "Vivere Performance & Wellness",
  wordmark: "VIVERE",
  sub: "Performance & Wellness",
  coach: "Samuel Korgi",
  url: "https://viverehp.com", // canonical origin; metadata, sitemap, robots
  email: "hello@viverehp.com", // owner inbox (change to real address)
  motto: "Press on. Stay the course.",
  social: {
    instagram: "https://www.instagram.com/ks_samuel1/",
    linkedin: "https://www.linkedin.com/in/samuel-korgi/",
  },
};

export const hero = {
  words: ["Mindset", "Wellness", "Habits", "Lifestyle", "Faith"],
  headline: ["Forge your body.", "Fortify your mind.", "Fuel your future."],
  sub: "Wellness coaching rooted in discipline and faith, for those who want to build health that lasts, not just look fit.",
  motto: "Press on. Stay the course.",
  primaryCta: "Begin the work",
  secondaryCta: "How we work",
};

export const ethos = {
  latin: "vī·ve·re",
  translation: "Latin. To live.",
  headline: ["Health as the core.", "Discipline as the edge."],
  body: "VIVERE is wellness coaching for those who want to stop starting over. We forge the body, fortify the mind, and fuel the future with habits that last.",
  line: "Not just coaching. Lifestyle, health, and values, forged together.",
};

/** Three disciplines. Wellness-first, per the brief. */
export const pillars = {
  title: "Three disciplines. One life.",
  items: [
    {
      numeral: "I",
      verb: "Forge",
      noun: "the Body",
      body: "Wellness-first training. Strength, nutrition, movement, and health habits as the foundation that carries everything else.",
    },
    {
      numeral: "II",
      verb: "Fortify",
      noun: "the Mind",
      body: "Mindset, accountability, and structure. The discipline to stay consistent when motivation fades.",
    },
    {
      numeral: "III",
      verb: "Fuel",
      noun: "the Future",
      body: "Longevity and purpose. Habits that compound for career, family, and faith, not just 90-day challenges.",
    },
  ],
};

/** How the work moves. Four phases, clear exit criteria. */
export const phases = {
  headline: ["We don't build dependence.", "We build self-reliance."],
  lead: "Four phases. Clear exit criteria. You graduate owning your habits.",
  items: [
    {
      n: "01",
      title: "Discovery Audit",
      body: "Biometrics, habits, time, faith rhythm. We find the leak, not just the goal.",
    },
    {
      n: "02",
      title: "Game Plan",
      body: "90-day blueprint: non-negotiables, nutrition, training, mindset reps. Simple enough to do when busy.",
    },
    {
      n: "03",
      title: "Accountability",
      body: "Weekly check-ins, mindset and lifestyle coaching, habit scoring. Discipline is a team sport.",
    },
    {
      n: "04",
      title: "Self-Reliance",
      body: "Systems over motivation. You keep the tools, the standard, and the identity. No lifetime retainer.",
    },
  ],
};

/** The three coins, carried as creeds. Front motto, back trigger. */
export const creed = {
  title: "Carried, not framed.",
  lead: "Three coins in your pocket, not on your wall. Discipline you touch daily.",
  note: "Three reminders for the days the wellness work gets heavy. A physical artifact, given after the Discovery Audit. Not merch. Pocket discipline. Faith is the third coin, not preachy, just true.",
  coins: [
    {
      key: "press-on",
      src: "/assets/coin-press-on.webp",
      motto: "Press On",
      trigger: "When resistance shows up",
      body: "When you don't feel like doing the health work, press on. Ground is taken in the grind, not on the good days.",
    },
    {
      key: "stay-course",
      src: "/assets/coin-stay-course.webp",
      motto: "Stay the Course",
      trigger: "When motivation fades",
      body: "Consistency over intensity. Hold the line on the plan when the water turns.",
    },
    {
      key: "philippians",
      src: "/assets/coin-philippians.webp",
      motto: "Philippians 4:13",
      trigger: "When you forget whose strength",
      body: "“I can do all things through Christ who strengthens me.” Faith as the anchor beneath the discipline.",
    },
  ],
};

/**
 * Programs, split into two tracks. `href`/`cta` are optional: only offers with
 * a page of their own carry them (today that is Wellness Core).
 */
type TrackItem = {
  title: string;
  body: string;
  href?: string;
  cta?: string;
};

export const tracks: {
  headline: string[];
  lead: string;
  a: { label: string; name: string; weight: string; badge: string; items: TrackItem[] };
  b: { label: string; name: string; weight: string; badge: string; items: TrackItem[] };
} = {
  headline: ["Choose your track.", "Keep the same standard."],
  lead: "Track A is the foundation. Track B is for those who want the edge carried into business and teams.",
  a: {
    label: "Track A",
    name: "Wellness Core",
    weight: "80%",
    badge: "Foundation",
    items: [
      {
        title: "Wellness Core",
        body: "The flagship. Four phases over 90 days or six months, built around your health. Discovery Audit, Game Plan, Accountability, Self-Reliance.",
        href: "/wellness-core",
        cta: "See the full program",
      },
      {
        title: "Weekly Mindset & Lifestyle",
        body: "Ongoing rhythm for habit maintenance, once the plan is yours to run.",
      },
      {
        title: "Habits Workshop",
        body: "One-day intensive. Identity, environment, execution.",
      },
      {
        title: "Clarity Session",
        body: "Map your health, your habits, and where you are leaking energy. Leave with three next steps. The lightest way in.",
      },
    ],
  },
  b: {
    label: "Track B",
    name: "Performance Extension",
    weight: "20%",
    badge: "Edge",
    items: [
      {
        title: "Bi-Weekly Executive",
        body: "For founders and leaders who need health and performance in the same room.",
      },
      {
        title: "Teams & Guest Speaking",
        body: "The keynote version of Three Disciplines. Brings discipline culture to organizations.",
      },
    ],
  },
};

export const about = {
  title: "The man behind the mark",
  paragraphs: [
    "VIVERE is led by Samuel Korgi, a lifelong advocate in the world of wellness and human performance. His practice is rooted in psychology, empathy, and proven strategy, and in a simple belief: people are capable of far more than they settle for.",
    "Born in Decatur, Georgia, his foundation was shaped by family, faith in Christ, education, and sport. Soccer carried him to international competition as a teenager and, in time, to the collegiate level, where discipline stopped being a word and became a way of living.",
    "He earned a Bachelor of Business and continued through professional programs with UPenn and Dartmouth. Beyond the field and the classroom, his interests in writing, psychology, and wellness continue to shape how he coaches: the whole person, body and mind, held to a standard.",
  ],
  mission:
    "To raise the quality of a life through discipline, faith, and habits built to last.",
  creed: ["Discipline", "Faith", "Consistency", "Longevity", "Integrity"],
};

export const testimonial = {
  quote:
    "I wasn't just given tactics. I was inspired by character. The focus was always on my growth, never on earning a client.",
  name: "Daniel H.",
  role: "Transitioning Navy Veteran",
  detail:
    "Samuel helped me build accountability, establish new routines, and put life-changing practices in place. I am in a far better place today.",
};

export const contact = {
  title: "Begin the work.",
  lead: "Tell me where you stand and what you are building toward. I read every note and reply within a day. No mail app required.",
  motto: "Press on. Stay the course.",
};

/* ------------------------------------------------------------------ *
 * WELLNESS CORE, the program page (/wellness-core).
 * Public-facing copy only. The operational half of the framework
 * (habit-scoring rubrics, internal exit checklists, coach setup lists)
 * is deliberately kept off the site.
 * ------------------------------------------------------------------ */

export const wellnessCore = {
  label: "Wellness Core",
  eyebrow: "The flagship program",
  headline: ["A coaching program", "designed to end."],
  lead: "Wellness Core is four phases of performance and wellness coaching, run over 90 days or six months. Most programs are built to keep you. This one is built to graduate you.",
  keyLine:
    "We don't build dependence. We build self-reliance. In 90 days, you will own your habits.",

  /** Ideal client profile, turned outward. */
  who: {
    title: "Who this is for",
    lead: "This is built for people who already take responsibility for their health and are willing to change the way they live to protect it.",
    quote:
      "I know what to do, but I can't stay consistent. I need accountability.",
    quoteNote: "If that sentence is yours, this is the right program.",
    items: [
      {
        title: "Twenties through sixties",
        body: "Busy professionals, founders, athletes, and anyone carrying more than they have capacity for.",
      },
      {
        title: "Chasing energy, not just aesthetics",
        body: "Energy, performance, longevity, and preventive health. Looking better is a side effect, not the goal.",
      },
      {
        title: "Willing to change habits",
        body: "You are not looking for a plan to admire. You are looking for one you will actually run.",
      },
    ],
    notFor:
      "This is coaching for generally healthy adults. It is not medical treatment, and it is not a substitute for care from your physician.",
  },

  /** The four phases in full. The home page carries the short version. */
  phases: {
    title: "Four phases. One graduation.",
    lead: "Each phase has a job and a clear finish line. You do not move on until the one you are in is holding.",
    items: [
      {
        n: "01",
        title: "Discovery Audit",
        window: "Week 1",
        objective: "Find the leak, not just the goal.",
        body: "Before anything gets prescribed, we establish where you actually stand. Most people are not missing information. They are missing an honest baseline.",
        detail: [
          "Biometric screening: body composition, resting heart rate, blood pressure.",
          "Habit audit across seven pillars: sleep, nutrition, movement, stress, focus, relationships, and faith.",
          "Time architecture: where your time actually goes, against where you think it goes.",
          "Values alignment: what matters most, and what your real non-negotiables are.",
          "Baseline biomarker panel at the end of the week.",
        ],
        outcome:
          "You leave knowing your true starting point, with the leak identified and your baseline numbers on record.",
      },
      {
        n: "02",
        title: "Game Plan",
        window: "Weeks 2 to 6",
        objective: "Simple enough to do when busy.",
        body: "A plan that only works on your best week is not a plan. We build for the week where work runs late, the kids are sick, and you are travelling.",
        detail: [
          "Three non-negotiable pillars, drawn from your audit and nobody else's.",
          "Nutrition on an 80/20 rule: what to eat, what to avoid, when to eat it.",
          "Training matched to your real capacity, three to four sessions a week.",
          "Sleep protocol: bedtime routine, light exposure, temperature.",
          "One primary recovery practice, plus a supplementation protocol.",
          "Weekly implementation coaching, adjusted for real friction as it appears.",
        ],
        outcome:
          "You leave with a written plan you can actually run, and an accountability structure around it.",
      },
      {
        n: "03",
        title: "Accountability",
        window: "Weeks 7 to 13",
        objective: "Discipline is a team sport.",
        body: "This is the phase where most people quit on their own. Weekly contact is what turns a good plan into a lived one.",
        detail: [
          "Weekly 45-minute check-ins reviewing the week you actually had.",
          "Habit scoring across each pillar, so progress is measured rather than felt.",
          "Problem-solving the real barriers: motivation dips, schedule collisions, social pressure, cravings.",
          "Identity work. The difference between “I am someone who sleeps eight hours” and “I try to sleep eight hours.”",
          "Environment design, so the good choice becomes the easy choice.",
          "An optional biomarker check around day 60 to confirm the plan is working.",
        ],
        outcome:
          "You leave with habits holding steady and visible change in energy, sleep, or mood.",
      },
      {
        n: "04",
        title: "Self-Reliance",
        window: "Week 14 onward",
        objective: "Systems over motivation.",
        body: "Contact deliberately drops off. You start running the protocol yourself while support is still within reach, rather than after it disappears.",
        detail: [
          "Monthly 30-minute check-ins while you self-monitor.",
          "Quarterly reviews once the basics are automatic.",
          "Final biomarker panel, compared against your baseline.",
          "Your Graduation Playbook, delivered and walked through in full.",
        ],
        outcome:
          "You leave owning it. No lifetime retainer, and an open door if life derails you later.",
      },
    ],
  },

  /** 3-month vs 6-month. Rendered as a table on desktop, cards on mobile. */
  durations: {
    title: "Choose your depth.",
    lead: "The same four phases, run at two different speeds. One is not a lesser version of the other, they suit different people.",
    a: {
      name: "3 Month",
      badge: "Intensive",
      summary:
        "High motivation, clear goals, and a reason to move now. Compressed, weekly throughout, roughly 25 to 30 coaching hours.",
    },
    b: {
      name: "6 Month",
      badge: "Comprehensive",
      summary:
        "Deeper transformation and habit mastery, with a gradual handover. Roughly 40 to 50 coaching hours.",
    },
    rows: [
      { label: "Discovery Audit", a: "Week 1", b: "Week 1" },
      { label: "Game plan design", a: "Weeks 1 to 2, fast", b: "Weeks 2 to 6, extended and refined" },
      { label: "Accountability phase", a: "Weeks 2 to 8, weekly", b: "Weeks 7 to 13, weekly" },
      { label: "Biomarker testing", a: "Baseline and final", b: "Baseline, mid-point, and final" },
      { label: "Final panel", a: "Week 12", b: "Week 24" },
      { label: "Self-reliance transition", a: "Weeks 9 to 12", b: "Weeks 14 to 20" },
      { label: "Check-in frequency", a: "Weekly throughout", b: "Weekly, then monthly" },
      { label: "Recovery practices", a: "One or two, chosen", b: "Three or four, integrated" },
      { label: "Coaching hours", a: "25 to 30", b: "40 to 50" },
      {
        label: "Best for",
        a: "Clear goals and a deadline",
        b: "Deep change and long-term mastery",
      },
      {
        label: "At graduation",
        a: "Habits established, playbook ready",
        b: "Habits deeply set, advanced autonomy",
      },
    ],
  },

  /** The graduation playbook. */
  playbook: {
    title: "What you walk away with",
    lead: "Every client graduates with a written playbook in their own terms, not a login that expires.",
    items: [
      "Your nutrition rules: what to eat, what to avoid, and when.",
      "Your training protocol, scaled for busy weeks and good ones.",
      "Your sleep and recovery routine.",
      "Your habit and wellness tracking system.",
      "A maintenance plan for any recovery practices you kept.",
      "A quarterly self-audit checklist, so you can catch yourself drifting.",
    ],
    close: "You now own this. You don't need me anymore.",
    door: "And if life derails you a year from now, the door is open for a four-week tune-up.",
  },

  /** Pricing posture. No numbers exist in the framework yet. */
  investment: {
    title: "Investment",
    lead: "Programs are priced to scope, because a three-month intensive and a six-month build are not the same commitment. Tell me where you stand and I will send the detail.",
    notes: [
      "Lab work is ordered and billed through the lab directly, not through coaching.",
      "Recovery practices are optional and paid to the provider you choose.",
    ],
    cta: "Ask about pricing",
  },
};

/** Biomarker testing. Framed as education, never as diagnosis. */
export const biomarkers = {
  title: "Data, not guesswork.",
  lead: "Most coaching runs on how you say you feel. Wellness Core runs on that plus what your bloodwork says, measured at the start and again at the end, so progress is demonstrated rather than assumed.",
  panelTitle: "What gets measured",
  panel: [
    "Metabolic markers: fasting glucose, insulin, and a full lipid panel.",
    "Thyroid function: TSH, free T3, and free T4.",
    "Hormonal status, selected against your goals.",
    "Inflammation markers: hs-CRP and homocysteine.",
    "Micronutrient status: vitamin D, B12, folate, and iron.",
    "Additional optimization markers where your goals call for them.",
  ],
  timeline: {
    title: "Three touchpoints",
    items: [
      {
        n: "01",
        title: "Baseline",
        when: "Week 1",
        body: "Run only if you have not had comprehensive blood work in the last four to five months. Recent results can serve as your baseline instead.",
      },
      {
        n: "02",
        title: "Mid-point",
        when: "Around day 60",
        body: "A shorter check to confirm the plan is moving the markers it should. Standard on the six-month program, optional on the three.",
      },
      {
        n: "03",
        title: "Final",
        when: "Final week",
        body: "A full repeat of the baseline panel, set side by side with where you started.",
      },
    ],
  },
  process: {
    title: "How it works",
    items: [
      "You order your panel through a certified lab. I will point you to the right one and the right markers.",
      "Lab costs are billed by the lab, separately from coaching.",
      "We sit down together and go through what each marker means for your energy, training, and recovery.",
      "Your nutrition and training get adjusted against what the results show.",
    ],
  },
  /** The framing that keeps this educational. Rendered inline, not buried. */
  disclaimer: {
    title: "Read this part carefully",
    body: "Samuel is a performance and wellness coach, not a physician. Reviewing your results is educational interpretation to inform your coaching, and it is not medical advice, diagnosis, or treatment. AI-assisted analysis may be used to help structure that review, and a coach reads and explains every result with you. Markers show correlation with lifestyle, not causation.",
    referral:
      "For medical interpretation, diagnosis, or treatment, Samuel works alongside a Functional Medicine Specialist and can refer you. Anything abnormal or concerning goes to your physician, not to your coach.",
  },
};

/** Optional recovery practices. Education and referral only. */
export const modalities = {
  title: "Recovery, if you want it.",
  lead: "These are optional. None of them are required to complete the program, and none of them replace the work. Clients choose one or two on the three-month track and three or four over six months, based on what their goals actually call for.",
  items: [
    {
      n: "01",
      name: "Whole-Body Cryotherapy",
      body: "Brief whole-body cold exposure, two to three minutes. Commonly used between hard training blocks to support recovery. Typically two to three times a week.",
    },
    {
      n: "02",
      name: "Hyperbaric Oxygen Therapy",
      body: "Breathing oxygen-enriched air inside a pressurized chamber. Sessions run 60 to 90 minutes, used as a recovery and mental clarity practice.",
    },
    {
      n: "03",
      name: "Red Light Therapy",
      body: "Red and near-infrared light panels, 10 to 20 minutes, no downtime. Commonly used to support recovery and sleep quality.",
    },
    {
      n: "04",
      name: "Infrared Sauna",
      body: "Heats the body directly rather than the air, so sessions run longer at lower temperatures. 30 to 45 minutes, and often paired with red light.",
    },
    {
      n: "05",
      name: "Sauna and Cold Plunge",
      body: "Alternating heat and cold across two or three rounds. We guide the breathing and the timing. Most clients get more out of this than any other practice on the list.",
    },
    {
      n: "06",
      name: "IV Infusions",
      body: "Hydration, vitamins, and minerals administered by a registered nurse at a licensed clinic. 30 to 45 minutes.",
    },
    {
      n: "07",
      name: "Acupuncture and Dry Needling",
      body: "Fine needles used for muscular tension, mobility, and stress. Sessions run 45 to 60 minutes.",
    },
  ],
  note: "Every practice above is delivered by licensed third-party providers, chosen by you and paid to them directly. Samuel provides education, referrals, and help fitting them into your protocol. He does not supervise, prescribe, or administer any of them, and no specific outcome is promised.",
};

/** /disclosures. Plain-language version of the coaching agreement terms. */
export const disclosures = {
  title: "Disclosures",
  lead: "The honest version of what this is, what it is not, and where the boundaries sit. Worth reading before you begin.",
  updated: "Last updated: August 2026",
  sections: [
    {
      title: "Coaching, not medical care",
      items: [
        "Samuel Korgi is a performance and wellness coach. He is not a physician, and he is not a licensed healthcare provider.",
        "This program does not diagnose, treat, cure, or prevent any disease.",
        "It is designed for generally healthy adults. If you have a medical condition, you need clearance from your physician before starting.",
        "Consult your physician before beginning any new nutrition, training, or health protocol.",
      ],
    },
    {
      title: "Biomarker testing and interpretation",
      items: [
        "You order and pay for your own testing through a licensed lab. Samuel can help you choose one and identify the right markers.",
        "Samuel reviews what your results indicate for your performance and wellness. AI-assisted analysis may be used to help structure that review.",
        "This review is educational and informs coaching decisions. It is not medical advice, medical diagnosis, or treatment.",
        "Results show correlation with lifestyle. They do not establish causation.",
        "Samuel works with a Functional Medicine Specialist and can refer you for medical interpretation, diagnosis, or treatment.",
        "Any abnormal result or medical concern goes to your physician or the referred specialist.",
        "Nutrition and training recommendations may be adjusted within coaching scope. Changes to medical treatment require your physician.",
      ],
    },
    {
      title: "Recovery practices",
      items: [
        "Cryotherapy, hyperbaric oxygen, sauna, cold plunge, IV infusions, and acupuncture are all optional, and all pursued through licensed or certified facilities.",
        "Samuel provides education and referrals. He does not supervise, prescribe, or administer any of them.",
        "You are responsible for disclosing your medical conditions to those providers before use.",
        "You assume full responsibility for any injury or adverse event connected to their use, and no specific outcome is guaranteed.",
      ],
    },
    {
      title: "Assumption of risk",
      items: [
        "Nutrition, training, and recovery practices carry inherent risk, including injury and illness.",
        "You assume full responsibility for any injury or adverse effect arising from participation.",
        "Report any pain, injury, or unusual symptom to both your coach and your physician immediately.",
        "The coach is not liable for injury or medical complications arising from your choices.",
      ],
    },
    {
      title: "Results and guarantees",
      items: [
        "Results vary significantly between individuals. Genetics, age, adherence, and starting point all affect the outcome.",
        "No specific weight loss, body composition change, performance gain, or health improvement is guaranteed.",
        "Progress is measured through markers, adherence, and your own experience. Not every client sees every kind of progress.",
        "Meaningful change usually takes four to twelve weeks to become visible. Patience is part of the protocol.",
      ],
    },
    {
      title: "Confidentiality and privacy",
      items: [
        "All biomarker data, health information, and personal detail shared in coaching is confidential.",
        "Nothing is shared with third parties without your written permission.",
        "The one exception is a disclosure of intent to harm yourself or another person, which carries a mandatory reporting duty.",
      ],
    },
    {
      title: "Termination",
      items: [
        "Either party may end the coaching relationship at any time.",
        "You remain responsible for outstanding fees covering services already delivered.",
        "On termination you keep ownership of all documentation, playbooks, and protocols produced for you.",
      ],
    },
  ],
  closing:
    "Questions about any of the above are welcome before you commit, not after. Ask them.",
};
