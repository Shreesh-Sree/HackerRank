import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Set up connection pooling and web socket configurations for Neon
if (typeof window === "undefined") {
  neonConfig.fetchConnectionCache = true;
}

const databaseUrl = process.env.DATABASE_URL;

// Create Neon client and Drizzle database instance if DATABASE_URL is present
export const sql = databaseUrl ? neon(databaseUrl) : null;
export const db = sql ? drizzle(sql, { schema }) : null;

// Mock Local Memory DB for sandbox fallback
export const isMockMode = !db;

export interface MockMember {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  year: number;
  hackerrankUsername: string;
  whyJoin: string;
  createdAt: Date;
  isApproved: boolean;
}

export interface MockEvent {
  id: string;
  title: string;
  description: string;
  type: "workshop" | "hackathon" | "contest";
  date: Date;
  venue: string;
  maxCapacity: number;
  createdAt: Date;
}

export interface MockRSVP {
  id: string;
  eventId: string;
  memberEmail: string;
  name: string;
  createdAt: Date;
}

export interface MockTeam {
  id: string;
  name: string;
  role: string;
  bio: string;
  linkedinUrl: string;
  githubUrl: string;
  avatarUrl: string;
  order: number;
}

export interface MockLeaderboard {
  id: string;
  memberId: string;
  score: number;
  eventsAttended: number;
  updatedAt: Date;
  member?: {
    name: string;
    hackerrankUsername: string;
  };
}

// Seed Initial Mock Data
let mockMembers: MockMember[] = [
  {
    id: "m1",
    name: "Aravind Swamy",
    email: "aravind@sjgi.edu",
    rollNumber: "21CS101",
    department: "Computer Science",
    year: 3,
    hackerrankUsername: "aravind_codez",
    whyJoin: "To push competitive programming beyond standard boundaries.",
    createdAt: new Date(),
    isApproved: true,
  },
  {
    id: "m2",
    name: "Shruti Sen",
    email: "shruti@sjgi.edu",
    rollNumber: "22IT204",
    department: "Information Technology",
    year: 2,
    hackerrankUsername: "shruti_s",
    whyJoin: "I love surreal designs and solving algorithms under pressure.",
    createdAt: new Date(),
    isApproved: true,
  },
  {
    id: "m3",
    name: "Karthik R",
    email: "karthik@sjgi.edu",
    rollNumber: "21EC055",
    department: "Electronics & Communication",
    year: 3,
    hackerrankUsername: "karthik_ece",
    whyJoin: "Intrigued by hardware-software co-design and edge networking.",
    createdAt: new Date(),
    isApproved: true,
  },
  {
    id: "m4",
    name: "Meera Nair",
    email: "meera@sjgi.edu",
    rollNumber: "23CS012",
    department: "Computer Science",
    year: 1,
    hackerrankUsername: "meera_n",
    whyJoin: "Excited to join the elite crew and learn from senior architects.",
    createdAt: new Date(),
    isApproved: true,
  }
];

let mockEvents: MockEvent[] = [
  {
    id: "e1",
    title: "Surreal Hack 2026",
    description: "Build an impossible geometry dashboard in 24 hours. Form groups, write robust schemas, and deploy serverless.",
    type: "hackathon",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    venue: "Main Hacker Lab",
    maxCapacity: 100,
    createdAt: new Date(),
  },
  {
    id: "e2",
    title: "Chrono-Meltdown Contest",
    description: "HackerRank competitive coding battle. 8 challenging algorithms themed around time manipulation.",
    type: "contest",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    venue: "HackerRank Portal",
    maxCapacity: 250,
    createdAt: new Date(),
  },
  {
    id: "e3",
    title: "Next.js & Neon Masterclass",
    description: "Deep dive into Next.js 15, Neon Serverless connection pools, dynamic caching, and performance profiling.",
    type: "workshop",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    venue: "Seminar Hall 3",
    maxCapacity: 80,
    createdAt: new Date(),
  }
];

let mockRSVPs: MockRSVP[] = [
  {
    id: "r1",
    eventId: "e1",
    memberEmail: "aravind@sjgi.edu",
    name: "Aravind Swamy",
    createdAt: new Date(),
  }
];

let mockTeam: MockTeam[] = [
  {
    id: "t1",
    name: "Dharshan K",
    role: "President / Chief Architect",
    bio: "Obsessed with algorithms, system design, and creating interactive user experiences.",
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Dharshan",
    order: 1,
  },
  {
    id: "t2",
    name: "Ananya Rao",
    role: "Vice President / Lead Organizer",
    bio: "Event orchestrator, hackathon expert, and community builder. Loves clean architecture.",
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Ananya",
    order: 2,
  },
  {
    id: "t3",
    name: "Rohan Verma",
    role: "Technical Lead / Competitive Programmer",
    bio: "6-star coder on HackerRank. Solves graph theory problems for fun. Refactors everything.",
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Rohan",
    order: 3,
  },
  {
    id: "t4",
    name: "Sanya Gupta",
    role: "Design Lead / Creative Director",
    bio: "Pioneering the Surrealist Pixel Art style. Creates vector masterworks and custom cursors.",
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    avatarUrl: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Sanya",
    order: 4,
  }
];

let mockLeaderboard: MockLeaderboard[] = [
  {
    id: "l1",
    memberId: "m1",
    score: 9500,
    eventsAttended: 12,
    updatedAt: new Date(),
    member: {
      name: "Aravind Swamy",
      hackerrankUsername: "aravind_codez",
    },
  },
  {
    id: "l2",
    memberId: "m2",
    score: 8900,
    eventsAttended: 10,
    updatedAt: new Date(),
    member: {
      name: "Shruti Sen",
      hackerrankUsername: "shruti_s",
    },
  },
  {
    id: "l3",
    memberId: "m3",
    score: 8200,
    eventsAttended: 9,
    updatedAt: new Date(),
    member: {
      name: "Karthik R",
      hackerrankUsername: "karthik_ece",
    },
  },
  {
    id: "l4",
    memberId: "m4",
    score: 7500,
    eventsAttended: 7,
    updatedAt: new Date(),
    member: {
      name: "Meera Nair",
      hackerrankUsername: "meera_n",
    },
  }
];

// Helper database actions that fallback if real DB isn't available
export const mockDbActions = {
  getMembers: async () => mockMembers,
  approveMember: async (id: string) => {
    mockMembers = mockMembers.map(m => m.id === id ? { ...m, isApproved: true } : m);
    // Add to leaderboard if newly approved
    const exists = mockLeaderboard.some(l => l.memberId === id);
    if (!exists) {
      const member = mockMembers.find(m => m.id === id);
      if (member) {
        mockLeaderboard.push({
          id: "l_new_" + id,
          memberId: id,
          score: 1000,
          eventsAttended: 0,
          updatedAt: new Date(),
          member: {
            name: member.name,
            hackerrankUsername: member.hackerrankUsername,
          }
        });
      }
    }
  },
  rejectMember: async (id: string) => {
    mockMembers = mockMembers.filter(m => m.id !== id);
    mockLeaderboard = mockLeaderboard.filter(l => l.memberId !== id);
  },
  registerMember: async (data: Omit<MockMember, "id" | "createdAt" | "isApproved">) => {
    const newMember: MockMember = {
      ...data,
      id: "m_" + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      isApproved: false, // requires admin approval
    };
    mockMembers.push(newMember);
    return newMember;
  },
  getEvents: async () => mockEvents,
  createEvent: async (data: Omit<MockEvent, "id" | "createdAt">) => {
    const newEvent: MockEvent = {
      ...data,
      id: "e_" + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    mockEvents.push(newEvent);
    return newEvent;
  },
  updateEvent: async (id: string, data: Partial<MockEvent>) => {
    mockEvents = mockEvents.map(e => e.id === id ? { ...e, ...data } as MockEvent : e);
  },
  deleteEvent: async (id: string) => {
    mockEvents = mockEvents.filter(e => e.id !== id);
    mockRSVPs = mockRSVPs.filter(r => r.eventId !== id);
  },
  rsvpEvent: async (data: Omit<MockRSVP, "id" | "createdAt">) => {
    // Validate email belongs to an approved member
    const member = mockMembers.find(m => m.email === data.memberEmail && m.isApproved);
    const newRSVP: MockRSVP = {
      ...data,
      id: "r_" + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    mockRSVPs.push(newRSVP);

    // Increase member's score and eventsAttended on leaderboard
    if (member) {
      mockLeaderboard = mockLeaderboard.map(l => {
        if (l.memberId === member.id) {
          return {
            ...l,
            score: l.score + 500, // +500 points for RSVPing
            eventsAttended: l.eventsAttended + 1,
            updatedAt: new Date(),
          };
        }
        return l;
      });
    }
    return newRSVP;
  },
  getLeaderboard: async () => {
    return [...mockLeaderboard].sort((a, b) => b.score - a.score);
  },
  updateLeaderboardScore: async (id: string, score: number, eventsAttended: number) => {
    mockLeaderboard = mockLeaderboard.map(l => 
      l.id === id ? { ...l, score, eventsAttended, updatedAt: new Date() } : l
    );
  },
  getTeam: async () => mockTeam.sort((a, b) => a.order - b.order),
  createTeamMember: async (data: Omit<MockTeam, "id">) => {
    const newMember: MockTeam = {
      ...data,
      id: "t_" + Math.random().toString(36).substr(2, 9),
    };
    mockTeam.push(newMember);
    return newMember;
  },
  updateTeamMember: async (id: string, data: Partial<MockTeam>) => {
    mockTeam = mockTeam.map(t => t.id === id ? { ...t, ...data } as MockTeam : t);
  },
  deleteTeamMember: async (id: string) => {
    mockTeam = mockTeam.filter(t => t.id !== id);
  }
};
