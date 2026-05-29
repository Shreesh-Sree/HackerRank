import { pgTable, uuid, text, integer, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Event Type Enum
export const eventTypeEnum = pgEnum("event_type", ["workshop", "hackathon", "contest"]);

// 2. Members Table
export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  rollNumber: text("roll_number").notNull(),
  department: text("department").notNull(),
  year: integer("year").notNull(),
  hackerrankUsername: text("hackerrank_username").notNull(),
  whyJoin: text("why_join").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isApproved: boolean("is_approved").default(false).notNull(),
});

// relations mapping for members
export const membersRelations = relations(members, ({ many, one }) => ({
  rsvps: many(rsvps),
  leaderboard: one(leaderboard, {
    fields: [members.id],
    references: [leaderboard.memberId],
  }),
}));

// 3. Events Table
export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: eventTypeEnum("type").notNull(),
  date: timestamp("date").notNull(),
  venue: text("venue").notNull(),
  maxCapacity: integer("max_capacity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// relations mapping for events
export const eventsRelations = relations(events, ({ many }) => ({
  rsvps: many(rsvps),
}));

// 4. RSVPs Table
export const rsvps = pgTable("rsvps", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: uuid("event_id")
    .references(() => events.id, { onDelete: "cascade" })
    .notNull(),
  memberEmail: text("member_email").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// relations mapping for rsvps
export const rsvpsRelations = relations(rsvps, ({ one }) => ({
  event: one(events, {
    fields: [rsvps.eventId],
    references: [events.id],
  }),
}));

// 5. Team Table
export const team = pgTable("team", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  linkedinUrl: text("linkedin_url").notNull(),
  githubUrl: text("github_url").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  order: integer("order").notNull(),
});

// 6. Leaderboard Table
export const leaderboard = pgTable("leaderboard", {
  id: uuid("id").primaryKey().defaultRandom(),
  memberId: uuid("member_id")
    .references(() => members.id, { onDelete: "cascade" })
    .notNull(),
  score: integer("score").notNull(),
  eventsAttended: integer("events_attended").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// relations mapping for leaderboard
export const leaderboardRelations = relations(leaderboard, ({ one }) => ({
  member: one(members, {
    fields: [leaderboard.memberId],
    references: [members.id],
  }),
}));
