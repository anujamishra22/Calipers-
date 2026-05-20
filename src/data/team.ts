export type LeadershipMember = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  bio?: string;
};

export const leadership: LeadershipMember[] = [
  {
    name: "Prarthana Gupta",
    role: "Chairperson & Managing Director",
    /** Do not change this `image` URL unless you explicitly request a new asset. */
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=aryan",
    linkedin: "https://www.linkedin.com/in/prarthana-gupta-112510a5/",
  },
  {
    name: "Shraddha Gupta",
    role: "Chief Executive Officer",
    image: "/team/divya-sharma.png",
    linkedin: "https://www.linkedin.com/in/shraddha--gupta/",
  },
];
