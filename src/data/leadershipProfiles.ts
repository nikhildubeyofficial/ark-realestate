export type LeadershipProfile = {
  name: string;
  designation: string;
  email?: string;
  image: string;
};

const LEADERS_BASE = "/final%20images/Leaders";

export const leadershipProfiles: LeadershipProfile[] = [
  {
    name: "Karan Hotchandani",
    designation: "Founder",
    image: `${LEADERS_BASE}/karan boss (1).png`,
  },
  {
    name: "Vinay Chelani",
    designation: "Founder",
    image: `${LEADERS_BASE}/vinay boss.png`,
  },
  {
    name: "Arpana Singh",
    designation: "Vice President",
    image: `${LEADERS_BASE}/Arpana.JPG`,
  },
  {
    name: "Vinit Chelani",
    designation: "Vice President",
    image: `${LEADERS_BASE}/vinat sir.jpg.jpeg`,
  },
];
