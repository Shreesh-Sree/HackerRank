"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mockDbActions, MockMember, MockEvent, MockLeaderboard } from "@/db/db";

const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["workshop", "hackathon", "contest"]),
  date: z.string().min(5, "Please select a date"),
  venue: z.string().min(3, "Venue must be at least 3 characters"),
  maxCapacity: z.number().int().min(1, "Capacity must be at least 1"),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Admin Data states
  const [activeTab, setActiveTab] = useState<"members" | "events" | "leaderboard">("members");
  const [membersList, setMembersList] = useState<MockMember[]>([]);
  const [eventsList, setMockEvents] = useState<MockEvent[]>([]);
  const [leaderboardList, setLeaderboardList] = useState<MockLeaderboard[]>([]);
  
  // Stats
  const [stats, setStats] = useState({
    membersCount: 0,
    rsvpsCount: 0,
    eventsCount: 0,
  });

  // Load Admin mock data
  const loadAdminData = async () => {
    const members = await mockDbActions.getMembers();
    const events = await mockDbActions.getEvents();
    const leaderboard = await mockDbActions.getLeaderboard();

    setMembersList([...members]);
    setMockEvents([...events]);
    setLeaderboardList([...leaderboard]);

    setStats({
      membersCount: members.length,
      rsvpsCount: leaderboard.reduce((acc, curr) => acc + curr.eventsAttended, 0),
      eventsCount: events.length,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "sjgi_hrcc_2026") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Access Denied: Invalid credentials.");
    }
  };

  // Actions
  const handleApproveMember = async (id: string) => {
    await mockDbActions.approveMember(id);
    await loadAdminData();
  };

  const handleRejectMember = async (id: string) => {
    await mockDbActions.rejectMember(id);
    await loadAdminData();
  };

  // Event Form Handling
  const {
    register: registerEvent,
    handleSubmit: handleEventSubmit,
    reset: resetEventForm,
    formState: { errors: eventErrors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "workshop",
      date: "",
      venue: "",
      maxCapacity: 50,
    },
  });

  const onCreateEvent = async (data: EventFormValues) => {
    await mockDbActions.createEvent({
      title: data.title,
      description: data.description,
      type: data.type,
      date: new Date(data.date),
      venue: data.venue,
      maxCapacity: Number(data.maxCapacity),
    });
    resetEventForm();
    await loadAdminData();
  };

  const handleDeleteEvent = async (id: string) => {
    await mockDbActions.deleteEvent(id);
    await loadAdminData();
  };

  // Leaderboard Manual Edit State
  const [editingScoreId, setEditingScoreId] = useState<string | null>(null);
  const [newScoreVal, setNewScoreVal] = useState(0);
  const [newEventsAttended, setNewEventsAttended] = useState(0);

  const handleSaveScore = async (id: string) => {
    await mockDbActions.updateLeaderboardScore(id, newScoreVal, newEventsAttended);
    setEditingScoreId(null);
    await loadAdminData();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center font-ibm-mono px-4 text-[#F5F5F5]">
        <div className="w-full max-w-[420px] bg-[#121418] border-2 border-[#1A0533] p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-[18px] text-[#39FF14] font-press-start drop-shadow-[0_0_4px_#39FF14]">
              ADMIN GATE
            </h1>
            <p className="text-[10px] text-gray-400 mt-2">
              HackerRank Campus Crew SJGI
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 text-[12px]">
            <div className="flex flex-col gap-1">
              <label className="text-gray-300">ADMIN USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-[#050505] border border-[#1A0533] px-3 py-2 text-[#39FF14] focus:outline-none focus:border-[#39FF14] text-[13px]"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-300">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#050505] border border-[#1A0533] px-3 py-2 text-[#39FF14] focus:outline-none focus:border-[#39FF14] text-[13px]"
                required
              />
            </div>

            {authError && (
              <div className="text-red-500 text-[11px] font-bold mt-1 text-center animate-pulse">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="bg-[#1A0533] border border-[#39FF14] text-[#39FF14] font-bold py-2 mt-2 hover:bg-[#39FF14] hover:text-[#050505] transition-colors cursor-pointer text-center"
            >
              AUTHENTICATE
            </button>
            <div className="text-[9px] text-gray-500 text-center mt-3">
              Use default seed: admin / sjgi_hrcc_2026
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-ibm-mono p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b-2 border-[#1A0533] pb-6 gap-4">
          <div>
            <h1 className="text-[20px] text-[#39FF14] font-press-start font-bold">
              ADMIN CONTROL PANEL
            </h1>
            <p className="text-[12px] text-gray-400 mt-2">
              Manage SJGI HackerRank Crew database, registrations, quests, and rankings.
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-[#050505] px-4 py-2 text-[12px] font-bold transition-all self-start cursor-pointer"
          >
            DISCONNECT
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121418] border border-[#1A0533] p-4 flex flex-col justify-center">
            <span className="text-[10px] text-gray-400">TOTAL CREW REGISTRATIONS</span>
            <span className="text-[28px] text-[#39FF14] font-bold mt-1">{stats.membersCount}</span>
          </div>
          <div className="bg-[#121418] border border-[#1A0533] p-4 flex flex-col justify-center">
            <span className="text-[10px] text-gray-400">AGGREGATE QUEST RSVPS</span>
            <span className="text-[28px] text-[#00FFFF] font-bold mt-1">{stats.rsvpsCount}</span>
          </div>
          <div className="bg-[#121418] border border-[#1A0533] p-4 flex flex-col justify-center">
            <span className="text-[10px] text-gray-400">QUESTS / EVENTS ACTIVE</span>
            <span className="text-[28px] text-[#FFD700] font-bold mt-1">{stats.eventsCount}</span>
          </div>
        </div>

        {/* Dynamic Panels Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main List and grid */}
          <div className="lg:col-span-8 bg-[#121418] border border-[#1A0533] p-6 flex flex-col gap-6">
            
            {/* Tabs */}
            <div className="flex border-b border-[#1A0533] text-[12px] font-press-start text-[9px] md:text-[10px]">
              <button
                onClick={() => setActiveTab("members")}
                className={`px-4 py-2 border-b-2 transition-all ${
                  activeTab === "members" ? "border-[#39FF14] text-[#39FF14]" : "border-transparent text-gray-400 hover:text-[#F5F5F5]"
                }`}
              >
                MEMBERS
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-4 py-2 border-b-2 transition-all ${
                  activeTab === "events" ? "border-[#39FF14] text-[#39FF14]" : "border-transparent text-gray-400 hover:text-[#F5F5F5]"
                }`}
              >
                EVENTS CRUD
              </button>
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`px-4 py-2 border-b-2 transition-all ${
                  activeTab === "leaderboard" ? "border-[#39FF14] text-[#39FF14]" : "border-transparent text-gray-400 hover:text-[#F5F5F5]"
                }`}
              >
                LEADERBOARD
              </button>
            </div>

            {/* TAB CONTENT: Members Grid */}
            {activeTab === "members" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-[#00FFFF] font-bold text-[14px]">Crew Application Review</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[12px] border-collapse">
                    <thead>
                      <tr className="border-b border-[#1A0533] text-gray-400">
                        <th className="py-2 pr-2">NAME</th>
                        <th className="py-2 px-2">ROLL / DEPT</th>
                        <th className="py-2 px-2">HACKERRANK</th>
                        <th className="py-2 px-2">STATUS</th>
                        <th className="py-2 pl-2 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {membersList.map((member) => (
                        <tr key={member.id} className="border-b border-[#1A0533]/50 hover:bg-[#050505]/40 transition-colors">
                          <td className="py-3 pr-2">
                            <span className="font-bold block text-white">{member.name}</span>
                            <span className="text-[10px] text-gray-500">{member.email}</span>
                          </td>
                          <td className="py-3 px-2">
                            <span className="block">{member.rollNumber}</span>
                            <span className="text-[10px] text-gray-400">{member.department} (Yr {member.year})</span>
                          </td>
                          <td className="py-3 px-2 text-[#FFD700]">{member.hackerrankUsername}</td>
                          <td className="py-3 px-2">
                            {member.isApproved ? (
                              <span className="text-[#39FF14] bg-[#39FF14]/10 border border-[#39FF14] px-2 py-0.5 text-[10px] font-bold">APPROVED</span>
                            ) : (
                              <span className="text-amber-500 bg-amber-500/10 border border-amber-500 px-2 py-0.5 text-[10px] font-bold">PENDING</span>
                            )}
                          </td>
                          <td className="py-3 pl-2 text-right">
                            {!member.isApproved ? (
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleApproveMember(member.id)}
                                  className="bg-[#39FF14]/20 border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-[#050505] px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer"
                                >
                                  APPROVE
                                </button>
                                <button
                                  onClick={() => handleRejectMember(member.id)}
                                  className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 text-[11px] font-bold transition-all cursor-pointer"
                                >
                                  REJECT
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleRejectMember(member.id)}
                                className="text-gray-500 hover:text-red-500 text-[11px] underline cursor-pointer"
                              >
                                REMOVE
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Events Management */}
            {activeTab === "events" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-[#00FFFF] font-bold text-[14px]">Active Events Catalog</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[12px] border-collapse">
                    <thead>
                      <tr className="border-b border-[#1A0533] text-gray-400">
                        <th className="py-2 pr-2">EVENT TITLE</th>
                        <th className="py-2 px-2">TYPE</th>
                        <th className="py-2 px-2">VENUE / DATE</th>
                        <th className="py-2 pl-2 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventsList.map((event) => (
                        <tr key={event.id} className="border-b border-[#1A0533]/50 hover:bg-[#050505]/40 transition-colors">
                          <td className="py-3 pr-2">
                            <span className="font-bold block text-white">{event.title}</span>
                            <span className="text-[10px] text-gray-500 line-clamp-1">{event.description}</span>
                          </td>
                          <td className="py-3 px-2 text-[#FFD700] uppercase font-bold text-[11px]">{event.type}</td>
                          <td className="py-3 px-2">
                            <span className="block">{event.venue}</span>
                            <span className="text-[10px] text-gray-400">{new Date(event.date).toLocaleDateString()}</span>
                          </td>
                          <td className="py-3 pl-2 text-right">
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 text-[11px] font-bold transition-all cursor-pointer"
                            >
                              DELETE
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Leaderboard */}
            {activeTab === "leaderboard" && (
              <div className="flex flex-col gap-4">
                <h3 className="text-[#00FFFF] font-bold text-[14px]">Member Score Board Editor</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[12px] border-collapse">
                    <thead>
                      <tr className="border-b border-[#1A0533] text-gray-400">
                        <th className="py-2 pr-2">MEMBER</th>
                        <th className="py-2 px-2 text-center">SCORE</th>
                        <th className="py-2 px-2 text-center">QUESTS ATTENDED</th>
                        <th className="py-2 pl-2 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardList.map((l) => (
                        <tr key={l.id} className="border-b border-[#1A0533]/50 hover:bg-[#050505]/40 transition-colors">
                          <td className="py-3 pr-2">
                            <span className="font-bold block text-white">{l.member?.name || "Unknown"}</span>
                            <span className="text-[10px] text-[#39FF14]">@{l.member?.hackerrankUsername || "none"}</span>
                          </td>
                          <td className="py-3 px-2 text-center text-[#39FF14] font-bold text-[14px]">
                            {editingScoreId === l.id ? (
                              <input
                                type="number"
                                value={newScoreVal}
                                onChange={(e) => setNewScoreVal(Number(e.target.value))}
                                className="bg-[#050505] border border-[#39FF14] w-[80px] text-center py-1 text-[#39FF14] focus:outline-none"
                              />
                            ) : (
                              l.score
                            )}
                          </td>
                          <td className="py-3 px-2 text-center text-[#00FFFF] font-bold">
                            {editingScoreId === l.id ? (
                              <input
                                type="number"
                                value={newEventsAttended}
                                onChange={(e) => setNewEventsAttended(Number(e.target.value))}
                                className="bg-[#050505] border border-[#39FF14] w-[60px] text-center py-1 text-[#00FFFF] focus:outline-none"
                              />
                            ) : (
                              l.eventsAttended
                            )}
                          </td>
                          <td className="py-3 pl-2 text-right">
                            {editingScoreId === l.id ? (
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleSaveScore(l.id)}
                                  className="bg-[#39FF14]/20 border border-[#39FF14] text-[#39FF14] hover:bg-[#39FF14] hover:text-[#050505] px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer"
                                >
                                  SAVE
                                </button>
                                <button
                                  onClick={() => setEditingScoreId(null)}
                                  className="border border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-white px-2 py-1 text-[11px] font-bold transition-all cursor-pointer"
                                >
                                  CANCEL
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingScoreId(l.id);
                                  setNewScoreVal(l.score);
                                  setNewEventsAttended(l.eventsAttended);
                                }}
                                className="bg-[#1A0533] border border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#050505] px-2.5 py-1 text-[11px] font-bold transition-all cursor-pointer"
                              >
                                EDIT
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* Right Column Event Form */}
          <div className="lg:col-span-4 bg-[#121418] border border-[#1A0533] p-6 flex flex-col gap-4">
            <h3 className="text-[#39FF14] font-bold text-[14px] font-press-start text-[10px]">CREATE A QUEST</h3>
            
            <form onSubmit={handleEventSubmit(onCreateEvent)} className="flex flex-col gap-3 text-[12px]">
              <div className="flex flex-col gap-1">
                <label className="text-gray-300">QUEST TITLE</label>
                <input
                  type="text"
                  {...registerEvent("title")}
                  className="bg-[#050505] border border-[#1A0533] px-3 py-2 text-[#39FF14] focus:outline-none focus:border-[#39FF14]"
                />
                {eventErrors.title && <span className="text-red-500 text-[10px]">{eventErrors.title.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-300">DESCRIPTION</label>
                <textarea
                  rows={3}
                  {...registerEvent("description")}
                  className="bg-[#050505] border border-[#1A0533] px-3 py-2 text-white focus:outline-none focus:border-[#39FF14] resize-none"
                />
                {eventErrors.description && <span className="text-red-500 text-[10px]">{eventErrors.description.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-300">QUEST TYPE</label>
                <select
                  {...registerEvent("type")}
                  className="bg-[#050505] border border-[#1A0533] px-3 py-2 text-[#FFD700] focus:outline-none focus:border-[#39FF14] cursor-pointer"
                >
                  <option value="workshop">WORKSHOP</option>
                  <option value="hackathon">HACKATHON</option>
                  <option value="contest">CONTEST</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-300">DATE & TIME</label>
                <input
                  type="datetime-local"
                  {...registerEvent("date")}
                  className="bg-[#050505] border border-[#1A0533] px-3 py-2 text-white focus:outline-none focus:border-[#39FF14]"
                />
                {eventErrors.date && <span className="text-red-500 text-[10px]">{eventErrors.date.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-300">VENUE LOCATION</label>
                <input
                  type="text"
                  {...registerEvent("venue")}
                  className="bg-[#050505] border border-[#1A0533] px-3 py-2 text-white focus:outline-none focus:border-[#39FF14]"
                />
                {eventErrors.venue && <span className="text-red-500 text-[10px]">{eventErrors.venue.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-300">MAX CAPACITY</label>
                <input
                  type="number"
                  {...registerEvent("maxCapacity", { valueAsNumber: true })}
                  className="bg-[#050505] border border-[#1A0533] px-3 py-2 text-[#39FF14] focus:outline-none focus:border-[#39FF14]"
                />
                {eventErrors.maxCapacity && <span className="text-red-500 text-[10px]">{eventErrors.maxCapacity.message}</span>}
              </div>

              <button
                type="submit"
                className="bg-[#1A0533] border border-[#39FF14] text-[#39FF14] font-bold py-2.5 mt-2 hover:bg-[#39FF14] hover:text-[#050505] transition-colors cursor-pointer text-center"
              >
                CREATE QUEST
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
