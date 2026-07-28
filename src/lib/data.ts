/**
 * Demo data for the UI reference build.
 * In production this comes from PostgreSQL via Prisma — see README.
 * Everything here is clearly fictional and labelled as demo content.
 */

export type Member = {
  id: string;
  name: string;
  handle: string;
  headline: string;
  roles: string[];
  city: string;
  rating: number;
  reviews: number;
  jobsDone: number;
  onTimePct: number;
  responseTime: string;
  verified: boolean;
  topSkill: string;
  skills: string[];
  creditsEarned: number;
  avatarHue: number;
  memberSince: string;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  credits: number;
  postedMinutesAgo: number;
  mode: "Remote" | "Onsite" | "Hybrid";
  kind: "Digital" | "Physical" | "Hybrid";
  city?: string;
  deadlineDays: number;
  applications: number;
  maxProviders: number;
  verifiedPoster: boolean;
  urgent: boolean;
  status: "Open" | "Almost filled" | "In discussion" | "Assigned" | "Closed";
  posterId: string;
  effort: string;
  experience: "Entry" | "Intermediate" | "Expert";
  deliverables: string[];
  budgetType: "Fixed" | "Open to proposals";
};

export type Service = {
  id: string;
  title: string;
  category: string;
  providerId: string;
  startingCredits: number;
  deliveryDays: number;
  revisions: number;
  rating: number;
  orders: number;
  badge?: "Top Rated" | "Rising Talent" | "Sponsored";
  coverHue: number;
  packages: { name: string; credits: number; deliveryDays: number; features: string[] }[];
};

export const members: Member[] = [
  { id: "m1", name: "Ananya Iyer", handle: "ananya-designs", headline: "Brand & UI designer for early-stage startups", roles: ["Designer", "Freelancer"], city: "Bengaluru", rating: 4.9, reviews: 87, jobsDone: 112, onTimePct: 98, responseTime: "~1 hr", verified: true, topSkill: "Brand Identity", skills: ["Figma", "Brand Identity", "UI Design", "Design Systems"], creditsEarned: 184_500, avatarHue: 265, memberSince: "Mar 2025" },
  { id: "m2", name: "Rahul Menon", handle: "rahul-dev", headline: "Full-stack developer — Next.js, Supabase, Razorpay", roles: ["Developer", "Consultant"], city: "Kochi", rating: 4.8, reviews: 64, jobsDone: 78, onTimePct: 96, responseTime: "~2 hrs", verified: true, topSkill: "Next.js", skills: ["Next.js", "TypeScript", "PostgreSQL", "API Integration"], creditsEarned: 152_300, avatarHue: 205, memberSince: "Jan 2025" },
  { id: "m3", name: "Priya Sharma", handle: "priyacreates", headline: "Instagram creator · 180K followers · lifestyle & D2C", roles: ["Influencer/Creator"], city: "Mumbai", rating: 4.9, reviews: 132, jobsDone: 156, onTimePct: 99, responseTime: "~30 min", verified: true, topSkill: "Reels", skills: ["Reels", "Brand Collabs", "UGC", "Story Campaigns"], creditsEarned: 221_000, avatarHue: 340, memberSince: "Feb 2025" },
  { id: "m4", name: "Arjun Kapoor", handle: "arjun-edits", headline: "Video editor — ads, reels, YouTube long-form", roles: ["Freelancer"], city: "Delhi", rating: 4.7, reviews: 51, jobsDone: 66, onTimePct: 94, responseTime: "~3 hrs", verified: true, topSkill: "Video Editing", skills: ["Premiere Pro", "After Effects", "Motion Graphics"], creditsEarned: 98_700, avatarHue: 25, memberSince: "Apr 2025" },
  { id: "m5", name: "Sneha Reddy", handle: "sneha-writes", headline: "SEO content writer & LinkedIn ghostwriter", roles: ["Freelancer", "Marketer"], city: "Hyderabad", rating: 4.8, reviews: 73, jobsDone: 91, onTimePct: 97, responseTime: "~1 hr", verified: true, topSkill: "SEO Writing", skills: ["SEO", "Ghostwriting", "Copywriting"], creditsEarned: 87_200, avatarHue: 155, memberSince: "Mar 2025" },
  { id: "m6", name: "Vikram Singh", handle: "vikram-ca", headline: "Chartered accountant for startups — GST, compliance", roles: ["Professional", "Consultant"], city: "Jaipur", rating: 4.9, reviews: 45, jobsDone: 58, onTimePct: 100, responseTime: "~4 hrs", verified: true, topSkill: "GST Filing", skills: ["GST", "Bookkeeping", "Startup Compliance"], creditsEarned: 76_400, avatarHue: 190, memberSince: "May 2025" },
  { id: "m7", name: "Meera Nair", handle: "meera-hr", headline: "Tech recruiter — engineering & design hires", roles: ["Consultant", "Agency"], city: "Pune", rating: 4.6, reviews: 38, jobsDone: 44, onTimePct: 93, responseTime: "~2 hrs", verified: false, topSkill: "Tech Hiring", skills: ["Recruitment", "Sourcing", "Interviewing"], creditsEarned: 64_100, avatarHue: 290, memberSince: "Jun 2025" },
  { id: "m8", name: "Karan Bhatia", handle: "karan-growth", headline: "Performance marketer — Meta & Google ads", roles: ["Marketer", "Founder"], city: "Gurugram", rating: 4.7, reviews: 59, jobsDone: 71, onTimePct: 95, responseTime: "~1 hr", verified: true, topSkill: "Meta Ads", skills: ["Meta Ads", "Google Ads", "CRO", "Analytics"], creditsEarned: 109_800, avatarHue: 45, memberSince: "Feb 2025" },
];

export const jobs: Job[] = [
  { id: "j1", title: "Create a 45-second product launch video for our D2C skincare brand", description: "We are launching a new vitamin-C serum and need a polished launch video for Instagram and our website. You will receive raw product footage, brand guidelines and reference videos. We need colour-graded, subtitled, vertical and square exports.", category: "Video Production", skills: ["Premiere Pro", "Colour Grading", "Reels"], credits: 6000, postedMinutesAgo: 4, mode: "Remote", kind: "Digital", deadlineDays: 5, applications: 2, maxProviders: 1, verifiedPoster: true, urgent: false, status: "Open", posterId: "m8", effort: "10–15 hrs", experience: "Intermediate", deliverables: ["45s master video", "9:16 and 1:1 exports", "Subtitle file", "Project files"], budgetType: "Fixed" },
  { id: "j2", title: "Build a landing page with waitlist form for a fintech startup", description: "Design and build a fast, responsive landing page in Next.js with a waitlist form, basic analytics and SEO metadata. Copy and brand colours provided. Deploy to Vercel with our domain.", category: "Development", skills: ["Next.js", "Tailwind", "Vercel"], credits: 15000, postedMinutesAgo: 11, mode: "Remote", kind: "Digital", deadlineDays: 7, applications: 5, maxProviders: 1, verifiedPoster: true, urgent: false, status: "Open", posterId: "m6", effort: "20–25 hrs", experience: "Expert", deliverables: ["Deployed landing page", "Source repository", "Setup notes"], budgetType: "Fixed" },
  { id: "j3", title: "Promote our productivity app in 2 Instagram reels", description: "Looking for a creator with 50K+ followers in the tech/productivity niche. Two reels, each 20–30 seconds, with our key messaging. Content stays live for at least 90 days. Proof-of-post screenshots required.", category: "Influencer Promotion", skills: ["Reels", "Tech Niche", "UGC"], credits: 8000, postedMinutesAgo: 23, mode: "Remote", kind: "Digital", deadlineDays: 10, applications: 9, maxProviders: 2, verifiedPoster: true, urgent: true, status: "Open", posterId: "m2", effort: "4–6 hrs", experience: "Intermediate", deliverables: ["2 published reels", "Proof-of-post", "90-day live guarantee"], budgetType: "Fixed" },
  { id: "j4", title: "Design a pitch deck for our seed round (12–15 slides)", description: "We are a B2B SaaS startup raising a seed round. Need a clean, investor-ready deck designed from our draft content. Must match our brand system and be delivered as Figma + PDF.", category: "Graphic Design", skills: ["Figma", "Pitch Decks", "Storytelling"], credits: 9000, postedMinutesAgo: 38, mode: "Remote", kind: "Digital", deadlineDays: 6, applications: 7, maxProviders: 1, verifiedPoster: false, urgent: false, status: "Open", posterId: "m7", effort: "12–18 hrs", experience: "Expert", deliverables: ["Figma source", "PDF export", "One revision round"], budgetType: "Open to proposals" },
  { id: "j5", title: "Photograph our café menu — 30 dishes, on location in Indiranagar", description: "Full-day food photography shoot at our café in Indiranagar, Bengaluru. Natural light preferred, 30 dishes, minimum 3 final edits per dish. Bring your own equipment.", category: "Photography", skills: ["Food Photography", "Lightroom"], credits: 7500, postedMinutesAgo: 55, mode: "Onsite", kind: "Physical", city: "Bengaluru", deadlineDays: 14, applications: 3, maxProviders: 1, verifiedPoster: true, urgent: false, status: "Open", posterId: "m1", effort: "1 day + editing", experience: "Intermediate", deliverables: ["90+ edited photos", "Web-optimised exports", "Usage rights"], budgetType: "Fixed" },
  { id: "j6", title: "Write 8 SEO blog posts for a developer-tools company", description: "Eight 1,500-word posts targeting given keywords. Technical audience — must be comfortable with developer topics. Briefs, keyword research and examples provided.", category: "Content Writing", skills: ["SEO", "Technical Writing"], credits: 12000, postedMinutesAgo: 87, mode: "Remote", kind: "Digital", deadlineDays: 21, applications: 14, maxProviders: 2, verifiedPoster: true, urgent: false, status: "Almost filled", posterId: "m2", effort: "30–40 hrs", experience: "Intermediate", deliverables: ["8 posts in Google Docs", "Meta descriptions", "1 revision each"], budgetType: "Fixed" },
  { id: "j7", title: "Set up GST registration and first filing for a new LLP", description: "We just incorporated an LLP and need GST registration, invoice format setup and our first monthly filing handled end-to-end.", category: "Finance & Accounting", skills: ["GST", "Compliance"], credits: 5000, postedMinutesAgo: 130, mode: "Remote", kind: "Digital", deadlineDays: 12, applications: 4, maxProviders: 1, verifiedPoster: true, urgent: true, status: "Open", posterId: "m3", effort: "6–8 hrs", experience: "Expert", deliverables: ["GST registration", "Invoice template", "First filing"], budgetType: "Fixed" },
  { id: "j8", title: "Source and screen 5 React developer candidates", description: "We need a recruiter to source, screen and shortlist 5 strong React developers (3–6 yrs) ready for final interviews within 3 weeks. JD and scorecard provided.", category: "HR & Recruitment", skills: ["Tech Sourcing", "Screening"], credits: 18000, postedMinutesAgo: 210, mode: "Remote", kind: "Digital", deadlineDays: 21, applications: 6, maxProviders: 1, verifiedPoster: true, urgent: false, status: "In discussion", posterId: "m8", effort: "25–30 hrs", experience: "Expert", deliverables: ["5 screened candidates", "Screening notes", "Scheduling support"], budgetType: "Open to proposals" },
];

export const services: Service[] = [
  { id: "s1", title: "I will design a complete brand identity — logo, palette, typography & guidelines", category: "Graphic Design", providerId: "m1", startingCredits: 12000, deliveryDays: 7, revisions: 3, rating: 4.9, orders: 43, badge: "Top Rated", coverHue: 265, packages: [ { name: "Starter", credits: 12000, deliveryDays: 7, features: ["Logo + 2 concepts", "Colour palette", "Basic guidelines PDF"] }, { name: "Growth", credits: 20000, deliveryDays: 10, features: ["Everything in Starter", "Typography system", "Social media kit", "Business card"] }, { name: "Full Brand", credits: 32000, deliveryDays: 14, features: ["Everything in Growth", "Full brand book", "Pitch deck template", "3 revision rounds"] } ] },
  { id: "s2", title: "I will build a production-ready Next.js web app with auth and payments", category: "Development", providerId: "m2", startingCredits: 25000, deliveryDays: 14, revisions: 2, rating: 4.8, orders: 27, badge: "Top Rated", coverHue: 205, packages: [ { name: "MVP", credits: 25000, deliveryDays: 14, features: ["Up to 5 pages", "Auth + database", "Deployed to Vercel"] }, { name: "Startup", credits: 40000, deliveryDays: 21, features: ["Up to 10 pages", "Razorpay integration", "Admin panel", "Tests"] } ] },
  { id: "s3", title: "I will promote your brand to my 180K Instagram audience", category: "Influencer Promotion", providerId: "m3", startingCredits: 8000, deliveryDays: 5, revisions: 1, rating: 4.9, orders: 88, badge: "Sponsored", coverHue: 340, packages: [ { name: "Story Pack", credits: 8000, deliveryDays: 5, features: ["3 story frames", "Link sticker", "48-hr highlights"] }, { name: "Reel", credits: 15000, deliveryDays: 7, features: ["1 dedicated reel", "90 days live", "Usage rights"] }, { name: "Campaign", credits: 28000, deliveryDays: 14, features: ["2 reels + 5 stories", "Post insights report", "Usage rights"] } ] },
  { id: "s4", title: "I will edit your YouTube videos with motion graphics and thumbnails", category: "Video Production", providerId: "m4", startingCredits: 5000, deliveryDays: 4, revisions: 2, rating: 4.7, orders: 61, coverHue: 25, packages: [ { name: "Basic Edit", credits: 5000, deliveryDays: 4, features: ["Up to 10-min video", "Cuts + captions", "1 thumbnail"] }, { name: "Pro Edit", credits: 9000, deliveryDays: 6, features: ["Up to 20-min video", "Motion graphics", "Sound design", "2 thumbnails"] } ] },
  { id: "s5", title: "I will ghostwrite your LinkedIn posts for 30 days", category: "Content Writing", providerId: "m5", startingCredits: 10000, deliveryDays: 30, revisions: 2, rating: 4.8, orders: 34, badge: "Rising Talent", coverHue: 155, packages: [ { name: "Momentum", credits: 10000, deliveryDays: 30, features: ["12 posts", "Content calendar", "Hooks + CTAs"] }, { name: "Authority", credits: 18000, deliveryDays: 30, features: ["20 posts", "Profile rewrite", "Engagement strategy"] } ] },
  { id: "s6", title: "I will run and optimise your Meta ad campaigns for a month", category: "Performance Marketing", providerId: "m8", startingCredits: 15000, deliveryDays: 30, revisions: 1, rating: 4.7, orders: 22, coverHue: 45, packages: [ { name: "Launch", credits: 15000, deliveryDays: 30, features: ["Campaign setup", "3 ad sets", "Weekly reporting"] }, { name: "Scale", credits: 26000, deliveryDays: 30, features: ["Full-funnel setup", "Creative testing", "CRO recommendations"] } ] },
];

export const categories = [
  { name: "Development", icon: "💻", jobs: 214 },
  { name: "Graphic Design", icon: "🎨", jobs: 187 },
  { name: "Influencer Promotion", icon: "📣", jobs: 156 },
  { name: "Video Production", icon: "🎬", jobs: 142 },
  { name: "Content Writing", icon: "✍️", jobs: 128 },
  { name: "Performance Marketing", icon: "📈", jobs: 117 },
  { name: "UI/UX", icon: "🧩", jobs: 98 },
  { name: "Photography", icon: "📷", jobs: 76 },
  { name: "Finance & Accounting", icon: "🧾", jobs: 64 },
  { name: "HR & Recruitment", icon: "🤝", jobs: 51 },
  { name: "Business Consulting", icon: "🧠", jobs: 47 },
  { name: "Local Services", icon: "📍", jobs: 39 },
];

export const memberById = (id: string) => members.find((m) => m.id === id)!;

export const timeAgo = (mins: number) => {
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h} hr${h === 1 ? "" : "s"} ago`;
  return `${Math.floor(h / 24)} day${h < 48 ? "" : "s"} ago`;
};
