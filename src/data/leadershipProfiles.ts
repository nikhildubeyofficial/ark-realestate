export type LeadershipProfile = {
  name: string;
  designation: string;
  email?: string;
  image: string;
};

const LEADERS_BASE = "/final%20images/Leaders";

export const leadershipProfiles: LeadershipProfile[] = [
  {
    name: "Aarti Herekar",
    designation: "International Sales Manager",
    image: `${LEADERS_BASE}/Arti.jpeg`,
  },
  {
    name: "Sumitra",
    designation: "",
    image: `${LEADERS_BASE}/Sumitra.JPG`,
  },
  {
    name: "Ganesh Shankar",
    designation: "Team Lead",
    image: `${LEADERS_BASE}/Ganesh.png`,
  },
  {
    name: "Pranav Anand",
    designation: "Regional Manager",
    image: `${LEADERS_BASE}/Pranav.JPG`,
  },
  {
    name: "Sachin Madhan",
    designation: "Sales Director",
    image: `${LEADERS_BASE}/sachin.JPG`,
  },
  {
    name: "Arpana Singh",
    designation: "Vice President",
    image: `${LEADERS_BASE}/Arpana.JPG`,
  },
  {
    name: "Nikhil",
    designation: "",
    image: `${LEADERS_BASE}/Nikhil.JPG`,
  },
  {
    name: "Anisha Antony",
    designation: "Senior Regional Manager",
    email: "anisha@arkvision.ae",
    image: `${LEADERS_BASE}/anisha.JPG`,
  },
  {
    name: "Krishna Kumar",
    designation: "Director of Sales",
    email: "krishnakumar@arkvision.ae",
    image: `${LEADERS_BASE}/Krishna.jpeg`,
  },
];
