import george from "../src/assets/george.png";
import licoln from "../src/assets/lincoln.png";
import anna from "../src/assets/lincoln.png";
import richard from "../src/assets/lincoln.png";
import julia from "../src/assets/lincoln.png";
import alex from "../src/assets/lincoln.png";
import antoine from "../src/assets/lincoln.png";
import jessica from "../src/assets/lincoln.png";
import ut1 from "../src/assets/UT1.png";
import ut2 from "../src/assets/UT2.png";

export const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const mentors = [
  {
    avatarUrl: jessica,
    name: "Jessica Jane",
    designation: "Web Developer",
    tasks: 40,
    reviews: {
      rating: 4.7,
      count: 750,
    },
    description: "Hi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web Development with 5+ years of industry experience."
  },
  {
    avatarUrl: licoln,
    name: "Abraham Lincoln",
    designation: "3D Design",
    tasks: 32,
    reviews: {
      rating: 4.9,
      count: 510,
    },
    description: "Hi, I'm Abraham Lincoln. I am a professional 3D Designer at Blender company with expertise in modeling and animation."
  },
  {
    avatarUrl: george,
    name: "Curious George",
    designation: "UI UX Design",
    tasks: 40,
    reviews: {
      rating: 4.7,
      count: 750,
    },
    description: "Hi, I'm Curious George. I am a UI/UX Designer with expertise in creating user-centered digital experiences."
  },
  {
    avatarUrl: alex,
    name: "Alex Stanton",
    designation: "UI Designer",
    tasks: 60,
    reviews: {
      rating: 4.9,
      count: 970,
    },
    description: "Hi, I'm Alex Stanton. I am a doctoral student at Oxford University majoring in UI / UX Design with 3+ years of industry experience."
  },
  {
    avatarUrl: antoine,
    name: "Antoine Griezmann",
    designation: "Android Developer",
    tasks: 50,
    reviews: {
      rating: 4.8,
      count: 830,
    },
    description: "Hi, I'm Antoine Griezmann. I'm an Android Developer at Google company with expertise in Kotlin and Java."
  },
  {
    avatarUrl: anna,
    name: "Anna White",
    designation: "3D Design",
    tasks: 40,
    reviews: {
      rating: 4.8,
      count: 870,
    },
    description: "Hi, I'm Anna White. I'm a professional 3D Designer at Blender company with expertise in character modeling."
  },
  {
    avatarUrl: richard,
    name: "Richard Kyle",
    designation: "2D Design",
    tasks: 60,
    reviews: {
      rating: 4.7,
      count: 730,
    },
    description: "Hi, I'm Richard Kyle. I'm a professional 2D Designer at Photoshop company with expertise in illustration."
  },
  {
    avatarUrl: julia,
    name: "Julia Philips",
    designation: "UI Designer",
    tasks: 50,
    reviews: {
      rating: 4.9,
      count: 910,
    },
    description: "Hi, I'm Julia Philips. I'm a senior manager at Apple company with expertise in user interface design."
  },
];

export const taskData = [
  { category: "UI/UX Design", title: "Creating Mobile App Design", daysLeft: 3, imageSrc: ut1, progressPercent: 75 },
  { category: "Web Developer", title: "Creating Perfect Website", daysLeft: 4, imageSrc: ut2, progressPercent: 85 },
  { category: "Web Developer", title: "Building Responsive Layout", daysLeft: 5, imageSrc: ut2, progressPercent: 60 },
];

export interface DataPoint {
  day: string;
  value: number;
  tasks?: number;
}  

export const chartData: DataPoint[] = [
  { day: "S", value: 1 },
  { day: "M", value: 2, tasks: 2 },
  { day: "T", value: 1 },
  { day: "W", value: 1 },
  { day: "T", value: 2 },
  { day: "F", value: 1.8 },
  { day: "S", value: 1.7 },
];

export const timeRanges = ["This Week", "This Month", "This Year"];