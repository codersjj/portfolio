import { BiHomeSmile } from "react-icons/bi"

export const navItems = [
  { name: "Home", link: "/", icon: BiHomeSmile },
  { name: "About", link: "#about"},
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
]

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    imgLightMode: '/b1-light.png',
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
    title: "Currently building a Web3 knowledge-sharing rewards platform",
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
    className: "lg:col-span-2 md:col-span-3 md:row-span-1 md:min-h-30 lg:min-h-50",
    imgClassName: "",
    titleClassName: "justify-start md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "TSender UI - A Gas-Optimized ERC20 Airdrop Frontend",
    des: "This project focuses on creating a user interface for a highly gas-optimized smart contract designed for efficiently airdropping ERC20 tokens to multiple recipients simultaneously.",
    img: "/t-sender.png",
    iconLists: [["/next.svg", "/next-dark.svg"], "/tail.svg", "/ts.svg"],
    link: "https://tsender-rho.vercel.app/",
  },
  {
    id: 2,
    title: "Decentralized Lottery",
    des: "A decentralized lottery application leveraging blockchain technology for transparency and fairness, built with Next.js and Solidity.",
    img: "/nextjs-smartcontract-lottery.png",
    iconLists: [["/next.svg", "/next-dark.svg"], "/tail.svg", "/ts.svg"],
    link: "https://nextjs-smartcontract-lottery-fcc-five.vercel.app/",
  },
  {
    id: 3,
    title: "Crowd Funding DApp",
    des: "A decentralized crowdfunding platform that enables users to create and contribute to funding campaigns using Ethereum smart contracts.",
    img: "/crowd-funding.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg"],
    link: "https://thirdweb-crowd-funding.vercel.app/",
  }
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
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];