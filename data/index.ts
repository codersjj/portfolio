import { BiHomeSmile } from "react-icons/bi";

export const navItems = [
  { name: "Home", link: "/", icon: BiHomeSmile },
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    imgLightMode: "/b1-light.png",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start items-center text-center",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
    spareImgLightMode: "/b4-light.svg",
  },

  {
    id: 5,
    title:
      "Currently building a Full Stack E-Commerce App with React Native",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className:
      "lg:col-span-2 md:col-span-3 md:row-span-1 md:min-h-30 lg:min-h-50",
    imgClassName: "",
    titleClassName: "justify-start md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Expo Ecommerce - Full-Stack Mobile Shopping Suite",
    des: "A production-ready full-stack e-commerce solution featuring a high-performance cross-platform mobile app (iOS/Android), a web-based admin dashboard, and a robust Node.js backend. Implements secure payment processing with Stripe, unified authentication with Clerk, background jobs with Inngest, and Sentry monitoring.",
    img: "/expo-ecommerce-pic.png",
    iconLists: [
      "/MongoDB_Logomark_SpringGreen.svg",
      "/expressjs-favicon.png",
      "/re.svg",
      "/jsIconGreen.svg",
      ['/expo-logo-type-a-for-dark.svg', "/expo-logo-type-a.svg"],
      "/tail.svg",
      "/ts.svg",
      ["/clerk-dark.svg", "/clerk-light.svg"],
      "tanstack-logo-color-100.png",
    ],
    link: "https://expo-ecommerce-rose.vercel.app/",
  },
  {
    id: 2,
    title: "VC Interview Platform - Real-time Technical Interview System",
    des: "A full-stack technical interview platform simulating real remote coding interviews. Supports real-time video/audio calls, live chat, and a collaborative code editor. Features secure authentication, event-driven background jobs, comprehensive testing (unit & E2E), and a modern responsive UI optimized for interview scenarios.",
    img: "/vc-interview.png",
    iconLists: [
      "/MongoDB_Logomark_SpringGreen.svg",
      "/expressjs-favicon.png",
      "/re.svg",
      "/jsIconGreen.svg",
      "/tail.svg",
      "/ts.svg",
      ["clerk-dark.svg", "/clerk-light.svg"],
      "tanstack-logo-color-100.png",
      "getstream-icon.png",
    ],
    link: "https://vc-interview.vercel.app",
  },
  {
    id: 3,
    title: "LinguoFlow - Premium English Learning Platform",
    des: "A comprehensive full-stack English learning platform with structured curriculum, progress tracking, spaced repetition logic, and admin panel. Features SSR/SSG, email-based authentication with OTP verification, daily streak calculations, fuzzy search, and analytics dashboard. Implements secure file uploads, concurrent-safe progress updates, and optimized database queries.",
    img: "/linguo-flow.png",
    iconLists: [
      ["/next.svg", "/next-dark.svg"],
      "/tail.svg",
      "/ts.svg",
      ["/better-auth-dark.svg", "better-auth.svg"],
      ["prisma-dark.svg", "prisma.svg"],
      "fusejs-logo.png",
    ],
    link: "https://linguo-flow.vercel.app/",
  },
  {
    id: 4,
    title: "Wave AI - A Full Stack Second Brain AI Agent",
    des: "Capture, organize, and connect your thoughts with intelligent AI assistance. Transform scattered ideas into actionable.",
    img: "/wave-ai.png",
    iconLists: [
      ["/next.svg", "/next-dark.svg"],
      "/tail.svg",
      "/ts.svg",
      ["shadcn-ui_dark.svg", "shadcn-ui.svg"],
      "tanstack-logo-color-100.png",
      ["/better-auth-dark.svg", "better-auth.svg"],
      "hono-logo.svg",
      "neon-logo.svg",
      ["prisma-dark.svg", "prisma.svg"],
    ],
    link: "https://wave-ai-agent-ruddy.vercel.app/",
  },
  {
    id: 5,
    title: "AI Fusion Lab - A Full Stack AI Multi Model App",
    des: "AI Fusion Lab is a Next.js 15 application that provides a multi-AI model chat interface. Users can interact with multiple AI models (GPT, Gemini, DeepSeek, etc.) simultaneously through a unified interface with authentication, rate limiting, and user preferences stored in Firebase.",
    img: "/ai-fusion-lab.png",
    iconLists: [
      ["/next.svg", "/next-dark.svg"],
      "/tail.svg",
      "/ts.svg",
      ["shadcn-ui_dark.svg", "shadcn-ui.svg"],
      ["/coderabbit-dark.svg", "/coderabbit-light.svg"],
      ["/arcjet-dark.png", "/arcjet-light.png"],
      ["/clerk-dark.svg", "/clerk-light.svg"],
      "/firebase.svg",
    ],
    link: "https://ai-fusion-lab-theta.vercel.app/",
  },
  {
    id: 6,
    title: "TSender UI - A Gas-Optimized ERC20 Airdrop Frontend",
    des: "This project focuses on creating a user interface for a highly gas-optimized smart contract designed for efficiently airdropping ERC20 tokens to multiple recipients simultaneously.",
    img: "/t-sender.png",
    iconLists: [["/next.svg", "/next-dark.svg"], "/tail.svg", "/ts.svg"],
    link: "https://tsender-rho.vercel.app/",
  },
  {
    id: 7,
    title: "Decentralized Lottery",
    des: "A decentralized lottery application leveraging blockchain technology for transparency and fairness, built with Next.js and Solidity.",
    img: "/nextjs-smartcontract-lottery.png",
    iconLists: [["/next.svg", "/next-dark.svg"], "/tail.svg", "/ts.svg"],
    link: "https://nextjs-smartcontract-lottery-fcc-five.vercel.app/",
  },
  {
    id: 8,
    title: "Crowd Funding DApp",
    des: "A decentralized crowdfunding platform that enables users to create and contribute to funding campaigns using Ethereum smart contracts.",
    img: "/crowd-funding.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg"],
    link: "https://thirdweb-crowd-funding.vercel.app/",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Web Development Engineer Intern",
    desc: "Assisted in the development of a web-based platform using Vue.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Web Development Engineer",
    desc: "Designed and developed responsive web applications.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Frontend Developer",
    desc: "Collaborated with designers to implement user-friendly web interfaces.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Lead Frontend Developer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/codersjj",
  },
  {
    id: 2,
    img: "/twit.svg",
    link: "https://x.com/codersjj",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/junjie-sha-778109357/",
  },
];
