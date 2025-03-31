import george from "../src/assets/george.png";
import licoln from "../src/assets/lincoln.png";
import anna from "../src/assets/a.png";
import richard from "../src/assets/r.png";
import jessica from "../src/assets/j.png";
import ut1 from "../src/assets/UT1.png";
import ut2 from "../src/assets/UT2.png";
import overview from "../src/assets/category-2.svg";
import task from "../src/assets/book.svg";
import mentor from "../src/assets/user-octagon.svg";
import message from "../src/assets/message.svg";
import settings from "../src/assets/setting-2.svg";
import taskdetail from "../src/assets/detailtask.png"
import jason from "../src/assets/jason.png";  
import angel from "../src/assets/angel.png";  
import angelie from "../src/assets/angelie.png";  
import jakob from "../src/assets/jakob.png";  
import jeremy from "../src/assets/jeremy.png";  
import nadia from "../src/assets/nadia.png";  
import emery from "../src/assets/emery.png";  

export const SIDEBAR_NAV_ITEMS = [
  {
    icon: overview, 
    label: "Overview",
    path: "/",
  },
  {
    icon: task, 
    label: "Task",
    path: "/task",
    alternativePaths: ["/task", "/detailtask"] 
  },
  {
    icon: mentor,
    label: "Mentors",
    path: "/mentor",
  },
  {
    icon: message, 
    label: "Message",
    path: "/messages",
  },
  {
    icon: settings, 
    label: "Settings",
    path: "/settings",
  },
];

export const HELP_CENTER_CONTENT = {
  title: "Help Center",
  description: "Having Trouble in Learning. Please contact us for more questions.",
  buttonText: "Go To Help Center",
};

export const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const mentors = [
  {
    avatarUrl: jessica,
    name: "Jessica Jane",
    designation: "Web Developer",
    tasks: 40,
    reviews: {
      rating: "4,7",
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
      rating: "4,9",
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
      rating: "4,7",
      count: 750,
    },
    description: "Hi, I'm Curious George. I am a UI/UX Designer with expertise in creating user-centered digital experiences."
  },
  {
    avatarUrl: licoln,
    name: "Alex Stanton",
    designation: "UI Designer",
    tasks: 60,
    reviews: {
      rating: "4,9",
      count: 970,
    },
    description: "Hi, I'm Alex Stanton. I am a doctoral student at Oxford University majoring in UI / UX Design with 3+ years of industry experience."
  },
  {
    avatarUrl: licoln,
    name: "Antoine Griezmann",
    designation: "Android Developer",
    tasks: 50,
    reviews: {
      rating: "4,8",
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
      rating: "4,8",
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
      rating: "4,7",
      count: 730,
    },
    description: "Hi, I'm Richard Kyle. I'm a professional 2D Designer at Photoshop company with expertise in illustration."
  },
  {
    avatarUrl: licoln,
    name: "Julia Philips",
    designation: "UI Designer",
    tasks: 50,
    reviews: {
      rating: "4,9",
      count: 910,
    },
    description: "Hi, I'm Julia Philips. I'm a senior manager at Apple company with expertise in user interface design."
  },
];

export const taskData = [
  { category: "UI/UX Design", title: "Creating Mobile App Design", daysLeft: 3, imageSrc: ut1, progressPercent: 75 },
  { category: "IOS Developer", title: "Creating Perfect IOS Apps", daysLeft: 4, imageSrc: ut2, progressPercent: 85 },
  { category: "Web Developer", title: "Building Responsive Layout", daysLeft: 2, imageSrc: ut2, progressPercent: 90 },
  { category: "ML Engineer", title: "Building and Training ML Model", daysLeft: 5, imageSrc: ut2, progressPercent: 60 },
  { category: "Mobile Development", title: "iOS App Development", daysLeft: 7, imageSrc: ut1, progressPercent: 45 },
  { category: "UI/UX Design", title: "Design System Creation", daysLeft: 2, imageSrc: ut2, progressPercent: 90 },
  { category: "Backend Development", title: "API Integration", daysLeft: 6, imageSrc: ut1, progressPercent: 30 },
  { category: "DevOps", title: "CI/CD Pipeline Setup", daysLeft: 4, imageSrc: ut2, progressPercent: 65 },
];

export interface DataPoint {
  day: string;
  value: number;
  tasks?: number;
}  

export const chartData: DataPoint[] = [
  { day: "S", value: 1 },
  { day: "M", value: 1.7, tasks: 2 },
  { day: "T", value: 1 },
  { day: "W", value: 2 },
  { day: "T", value: 1 },
  { day: "F", value: 1.8 },
  { day: "S", value: 1.4, tasks: 1 },
];

export const timeRanges = ["This Week", "This Month", "This Year"];

export const ASSIGNMENT_DETAILS = {
  title: "Creating Awesome Mobile Apps",
  subtitle: "UI/UX Design · Apps Design",
  description: `Follow the video tutorial above. Understand how to use each tool in the Figma application. Also learn how to make a good and correct design. Starting from spacing, typography, content, and many other design hierarchies. Then try to make it yourself with your imagination and inspiration.`,
  studentsInvolved: 200,
  duration: "1 Hour",
  image: taskdetail,
};

export const ASSESSMENT_ESSENCE = [
  "Understanding the tools in Figma",
  "Understand the basics of making designs",
  "Designing a mobile application using figma",
  "Presenting the design flow",
];

export const STUDENT_DETAILS = {
  name: "Dennis Nzioki",
  class: "MIPA 2",
  number: "10",
  lastModified: "1 July 2022",
};

export const TASK_TITLE = "Creating Awesome Mobile Apps";
export const TASK_SUBTITLE = "UI/UX Designer";
export const PROGRESS_PERCENTAGE = 90;
export const TIME_ESTIMATE = "1 Hour";

export const DETAIL_TASKS = [
  "Understanding the tools in Figma",
  "Understand the basics of making designs",
  "Design a mobile application with figma",
];

export const initialConversations = [
  {
    id: "1",
    name: "Angelie Crison",
    lastMessage: "Thank you very much. I'm glad...",
    time: "1m Ago",
    read: false,
    avatar: angelie,
  },
  {
    id: "2",
    name: "Jakob Saris",
    lastMessage: "Sure! let me tell you about...",
    time: "2m Ago",
    read: true,
    avatar: jakob,
  },
  {
    id: "3",
    name: "Emery Korsgard",
    lastMessage: "Thank's. You are very helpful...",
    time: "3m Ago",
    read: false,
    avatar: emery,
  },
  {
    id: "4",
    name: "Jeremy Zucker",
    lastMessage: "Sure! let me teach you about...",
    time: "4m Ago",
    read: true,
    avatar: jeremy,
  },
  {
    id: "5",
    name: "Nadia Lauren",
    lastMessage: "Is there anything I can help? Just...",
    time: "5m Ago",
    read: false,
    avatar: nadia,
  },
  {
    id: "6",
    name: "Jason Statham",
    lastMessage: "Sure! let me share about...",
    time: "6m Ago",
    read: true,
    avatar: jason,
  },
  {
    id: "7",
    name: "Angel Kimberly",
    lastMessage: "Okay. I know very well about it...",
    time: "7m Ago",
    read: false,
    avatar: angel,
  },
  {
    id: "8",
    name: "Jason Momoa",
    lastMessage: "Sure! let me tell you about...",
    time: "7m Ago",
    read: true,
    avatar: jason,
  },
];

export const INITIAL_CHAT_HISTORY = {
  "1": [
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "other" as const,
      timestamp: new Date().toISOString(),
      type: "text" as const,
    },
  ],
};