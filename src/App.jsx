import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Swords,
  Trophy,
  Users,
  Tv,
  Gamepad2,
  DollarSign,
  ShieldCheck,
  Flame,
  MessageSquare,
  CheckCircle2,
  Send,
  Zap,
  Sparkles,
  ChevronRight,
  Sliders,
  Radio
} from 'lucide-react';

export default function App() {
  const {
    activeTab,
    setActiveTab,
    tournaments,
    bracket,
    chatMessages,
    registeredSquads,
    postChatMessage,
    registerTeam,
    updateGrandFinalScore
  } = useStore();

  // Chat input
  const [chatInput, setChatInput] = useState('');

  // Team registration form
  const [regTeamName, setRegTeamName] = useState('');
  const [regTag, setRegTag] = useState('');
  const [regCaptain, setRegCaptain] = useState('');
  const [regDiscord, setRegDiscord] = useState('');
  const [regRoster, setRegRoster] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    postChatMessage(chatInput);
    setChatInput('');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    registerTeam({
      teamName: regTeamName,
      tag: regTag,
      captain: regCaptain,
      discord: regDiscord,
      roster: regRoster
    });
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 font-sans flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-40 bg-[#0f111a]/95 backdrop-blur-md border-b border-[#282c44] shadow-2xl">
        <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-500 text-white py-1 px-4 text-xs font-display font-extrabold tracking-widest flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
            <span>VALORANT MASTERS GRAND FINALS: SENTINELS VS CLOUD9 · LIVE ON STAGE</span>
          </div>
          <div className="hidden sm:block font-mono text-[10px] tracking-wider">
            TOTAL PRIZE POOL: $225,000 USD
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('brackets')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
                <Swords className="w-7 h-7" />
              </div>
              <div>
                <span className="text-2xl font-display font-black tracking-wider bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
                  NEXUS<span className="text-white">ARENA</span>
                </span>
                <span className="block text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  ESPORTS TOURNAMENT NETWORK
                </span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {[
                { id: 'brackets', label: 'Bracket Tree', icon: Swords },
                { id: 'tournaments', label: 'Championships', icon: Trophy },
                { id: 'register', label: 'Squad Registration', icon: Users },
                { id: 'stream', label: 'Spectator Live', icon: Tv },
                { id: 'referee', label: 'Referee Desk', icon: Sliders },
                { id: 'prizes', label: 'Prize Escrow', icon: DollarSign }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-purple-900/40 text-cyan-300 border border-purple-500/50 shadow-md shadow-purple-900/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('stream')}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-display font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-lg shadow-pink-600/30 transition flex items-center gap-2 animate-pulse"
            >
              <Radio className="w-4 h-4" /> Watch Live (48.2k)
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= TAB 1: BRACKET TREE ================= */}
        {activeTab === 'brackets' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  Valorant Champions Global Masters · Berlin Arena
                </span>
                <h1 className="text-3xl font-display font-black text-white mt-1">
                  OFFICIAL PLAYOFF BRACKET TREE
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-purple-900/40 border border-purple-500 text-purple-300 text-xs font-display font-bold px-3.5 py-1.5 rounded-full">
                  Prize Pool: $50,000 USD
                </span>
              </div>
            </div>

            {/* Interactive Bracket Grid */}
            <div className="bg-[#0f111a] rounded-3xl p-6 sm:p-8 border border-[#282c44] shadow-2xl overflow-x-auto">
              <div className="min-w-[850px] grid grid-cols-3 gap-8 items-center">
                {/* Quarterfinals */}
                <div className="space-y-6">
                  <h3 className="font-display font-black text-xs text-slate-400 uppercase tracking-widest text-center border-b border-[#282c44] pb-2">
                    Quarterfinals (BO3)
                  </h3>
                  {bracket.quarterfinals.map((m) => (
                    <div
                      key={m.id}
                      className="bg-[#1a1d2d] rounded-2xl p-4 border border-[#282c44] space-y-2 shadow-lg hover:border-purple-500/60 transition"
                    >
                      <div className="flex justify-between items-center text-xs font-display">
                        <span className={`font-bold ${m.winner === m.teamA ? 'text-cyan-300' : 'text-slate-400'}`}>
                          {m.teamA}
                        </span>
                        <span className="font-mono font-bold bg-[#07080d] px-2 py-0.5 rounded text-white">
                          {m.scoreA}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-display">
                        <span className={`font-bold ${m.winner === m.teamB ? 'text-cyan-300' : 'text-slate-400'}`}>
                          {m.teamB}
                        </span>
                        <span className="font-mono font-bold bg-[#07080d] px-2 py-0.5 rounded text-white">
                          {m.scoreB}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Semifinals */}
                <div className="space-y-12">
                  <h3 className="font-display font-black text-xs text-purple-400 uppercase tracking-widest text-center border-b border-[#282c44] pb-2">
                    Semifinals (BO3)
                  </h3>
                  {bracket.semifinals.map((m) => (
                    <div
                      key={m.id}
                      className="bg-[#1a1d2d] rounded-2xl p-5 border border-purple-500/40 space-y-3 shadow-xl"
                    >
                      <div className="flex justify-between items-center text-sm font-display">
                        <span className={`font-bold ${m.winner === m.teamA ? 'text-cyan-300' : 'text-slate-400'}`}>
                          {m.teamA}
                        </span>
                        <span className="font-mono font-bold bg-[#07080d] px-2.5 py-0.5 rounded text-cyan-400">
                          {m.scoreA}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-display">
                        <span className={`font-bold ${m.winner === m.teamB ? 'text-cyan-300' : 'text-slate-400'}`}>
                          {m.teamB}
                        </span>
                        <span className="font-mono font-bold bg-[#07080d] px-2.5 py-0.5 rounded text-cyan-400">
                          {m.scoreB}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Grand Finals */}
                <div className="space-y-6">
                  <h3 className="font-display font-black text-xs text-pink-400 uppercase tracking-widest text-center border-b border-[#282c44] pb-2">
                    🏆 Grand Finals (BO5)
                  </h3>
                  <div className="bg-gradient-to-br from-purple-950/80 via-[#1a1d2d] to-[#0f111a] rounded-3xl p-6 border-2 border-pink-500/60 shadow-2xl space-y-4">
                    <div className="text-center">
                      <span className="inline-flex items-center gap-1.5 bg-pink-500/20 text-pink-300 border border-pink-500/40 px-3 py-1 rounded-full text-[10px] font-display font-black uppercase tracking-wider mb-2 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400" /> LIVE NOW
                      </span>
                      <div className="text-xs font-mono text-cyan-300 font-bold">
                        {bracket.finals.currentMap}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-base font-display font-black">
                        <span className="text-white">{bracket.finals.teamA}</span>
                        <span className="font-mono text-xl text-pink-400 bg-black px-3 py-0.5 rounded-xl border border-pink-500/30">
                          {bracket.finals.scoreA}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-base font-display font-black">
                        <span className="text-white">{bracket.finals.teamB}</span>
                        <span className="font-mono text-xl text-cyan-400 bg-black px-3 py-0.5 rounded-xl border border-cyan-500/30">
                          {bracket.finals.scoreB}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#282c44] space-y-1 text-[11px] font-mono text-slate-400">
                      {bracket.finals.mapPicks.map((p, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{p.map}</span>
                          <span className="text-cyan-300 font-bold">{p.winner}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveTab('stream')}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-display font-black text-xs uppercase py-3 rounded-xl shadow-lg transition"
                    >
                      Watch Grand Finals Stream
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CHAMPIONSHIPS HUB ================= */}
        {activeTab === 'tournaments' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-display font-black text-white">
              ACTIVE & UPCOMING CHAMPIONSHIPS
            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {tournaments.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#0f111a] rounded-3xl border border-[#282c44] overflow-hidden shadow-xl hover:border-purple-500/60 transition group flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={t.banner}
                      alt={t.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-black/80 backdrop-blur-md text-cyan-300 text-xs font-display font-bold px-3 py-1 rounded-full">
                      {t.game}
                    </div>
                    <div className="absolute top-3.5 right-3.5 bg-purple-600 text-white text-xs font-display font-black px-3 py-1 rounded-full">
                      ${t.prizePool.toLocaleString()} USD
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-display font-black text-xl text-white group-hover:text-cyan-300 transition-colors">
                        {t.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        Format: {t.format} · {t.region}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">Dates: {t.startDate}</p>
                    </div>

                    <button
                      onClick={() => setActiveTab('register')}
                      className="w-full bg-[#1a1d2d] hover:bg-purple-600 text-white font-display font-black text-xs uppercase py-2.5 rounded-xl border border-[#282c44] transition"
                    >
                      Register Squad Roster
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: SQUAD REGISTRATION ================= */}
        {activeTab === 'register' && (
          <div className="max-w-2xl mx-auto bg-[#0f111a] rounded-3xl p-8 border border-[#282c44] shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-mono text-purple-400 uppercase font-bold tracking-wider">
                Official Roster Verification
              </span>
              <h2 className="text-2xl font-display font-black text-white mt-1">
                REGISTER TEAM FOR CHAMPIONSHIP
              </h2>
            </div>

            {regSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-xl font-display font-black text-white">Squad Registered!</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Your roster is submitted for MMR seeding and referee review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Team / Clan Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Predators"
                      value={regTeamName}
                      onChange={(e) => setRegTeamName(e.target.value)}
                      className="w-full bg-[#1a1d2d] border border-[#282c44] rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Clan Tag (3-4 Chars)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. APEX"
                      value={regTag}
                      onChange={(e) => setRegTag(e.target.value)}
                      className="w-full bg-[#1a1d2d] border border-[#282c44] rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-purple-500 uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Team Captain *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="IGN (In-Game Name)"
                      value={regCaptain}
                      onChange={(e) => setRegCaptain(e.target.value)}
                      className="w-full bg-[#1a1d2d] border border-[#282c44] rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Captain Discord Tag
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="captain#0001"
                      value={regDiscord}
                      onChange={(e) => setRegDiscord(e.target.value)}
                      className="w-full bg-[#1a1d2d] border border-[#282c44] rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    5-Player Active Roster (Comma separated IGNs) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="TenZ, zekken, johnqt, Sacy, Zellsis"
                    value={regRoster}
                    onChange={(e) => setRegRoster(e.target.value)}
                    className="w-full bg-[#1a1d2d] border border-[#282c44] rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-display font-black text-sm uppercase py-3.5 rounded-xl shadow-lg transition active:scale-95"
                >
                  Submit Official Squad Entry
                </button>
              </form>
            )}
          </div>
        )}

        {/* ================= TAB 4: SPECTATOR STREAM ================= */}
        {activeTab === 'stream' && (
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Stream Video Frame */}
            <div className="lg:col-span-8 bg-[#0f111a] rounded-3xl p-4 border border-[#282c44] shadow-2xl space-y-4">
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-[#282c44] flex flex-col justify-between p-6">
                <div className="flex justify-between items-center text-xs font-display font-bold">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                    <Radio className="w-3.5 h-3.5" /> LIVE STREAM
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-slate-300">
                    1080p60 · 48,290 Viewers
                  </span>
                </div>

                <div className="text-center space-y-2">
                  <div className="text-3xl sm:text-5xl font-display font-black text-white tracking-widest">
                    SENTINELS <span className="text-pink-400">1 - 1</span> CLOUD9
                  </div>
                  <div className="text-cyan-300 font-mono text-sm font-bold">
                    MAP 3: LOTUS · ROUND 15 (8 - 6)
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span>Casters: Pansy & Hypoc</span>
                  <span>Audio Stream: Active 🔊</span>
                </div>
              </div>

              <div className="p-2 space-y-1">
                <h3 className="font-display font-black text-lg text-white">
                  Valorant Champions 2026 Grand Finals: Sentinels vs Cloud9
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Official stream broadcast with live twitch telemetry and chat moderation.
                </p>
              </div>
            </div>

            {/* Live Chat */}
            <div className="lg:col-span-4 bg-[#0f111a] rounded-3xl border border-[#282c44] shadow-2xl flex flex-col h-[520px]">
              <div className="p-4 border-b border-[#282c44] flex items-center justify-between">
                <span className="font-display font-black text-sm text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" /> ARENA LIVE CHAT
                </span>
                <span className="text-[11px] font-mono text-slate-500">Slow Mode (1s)</span>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-purple-900/60 text-purple-300 px-1.5 py-0.5 rounded font-bold">
                        {msg.badge}
                      </span>
                      <span className="font-bold text-cyan-300">{msg.user}</span>
                      <span className="text-[10px] text-slate-500">{msg.time}</span>
                    </div>
                    <p className="text-slate-300 pl-1">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleChatSubmit} className="p-3 border-t border-[#282c44] flex gap-2">
                <input
                  type="text"
                  placeholder="Send match reaction..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 bg-[#1a1d2d] border border-[#282c44] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= TAB 5: REFEREE DESK ================= */}
        {activeTab === 'referee-console' || activeTab === 'referee' ? (
          <div className="max-w-2xl mx-auto bg-[#0f111a] rounded-3xl p-8 border border-[#282c44] shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                Official Head Tournament Referee
              </span>
              <h2 className="text-2xl font-display font-black text-white mt-1">
                LIVE SCORE & MAP ARBITRATION
              </h2>
            </div>

            <div className="bg-[#1a1d2d] p-6 rounded-2xl border border-[#282c44] space-y-4">
              <div className="flex justify-between items-center text-sm font-display font-bold">
                <span className="text-white">Sentinels Map Score</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateGrandFinalScore(1, 0)}
                    className="bg-purple-600 text-white px-4 py-1.5 rounded-xl font-black text-xs"
                  >
                    +1 Map Win
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm font-display font-bold">
                <span className="text-white">Cloud9 Map Score</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateGrandFinalScore(0, 1)}
                    className="bg-cyan-600 text-white px-4 py-1.5 rounded-xl font-black text-xs"
                  >
                    +1 Map Win
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* ================= TAB 6: PRIZE POOL ESCROW ================= */}
        {activeTab === 'prizes' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-display font-black text-white">
              PRIZE POOL SMART CONTRACT ESCROW
            </h2>

            <div className="bg-[#0f111a] rounded-3xl p-8 border border-[#282c44] space-y-6 shadow-2xl">
              <div className="flex justify-between items-center border-b border-[#282c44] pb-4">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase">
                    Championship Pool
                  </span>
                  <div className="text-3xl font-display font-black text-cyan-300">
                    $50,000.00 USD
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-mono px-3 py-1 rounded-full font-bold">
                  Escrow Locked ✓
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-[#1a1d2d] p-5 rounded-2xl border border-yellow-500/40 space-y-1">
                  <span className="text-xs font-display font-bold text-yellow-400">
                    🥇 1st Place (60%)
                  </span>
                  <div className="text-2xl font-display font-black text-white">$30,000</div>
                  <span className="text-[11px] font-mono text-slate-400">Plus Championship Ring</span>
                </div>

                <div className="bg-[#1a1d2d] p-5 rounded-2xl border border-slate-400/40 space-y-1">
                  <span className="text-xs font-display font-bold text-slate-300">
                    🥈 2nd Place (25%)
                  </span>
                  <div className="text-2xl font-display font-black text-white">$12,500</div>
                  <span className="text-[11px] font-mono text-slate-400">Runner Up</span>
                </div>

                <div className="bg-[#1a1d2d] p-5 rounded-2xl border border-amber-700/40 space-y-1">
                  <span className="text-xs font-display font-bold text-amber-500">
                    🥉 3rd/4th (15%)
                  </span>
                  <div className="text-2xl font-display font-black text-white">$7,500</div>
                  <span className="text-[11px] font-mono text-slate-400">Semifinalists Split</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#07080d] text-slate-500 py-8 border-t border-[#282c44] text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-purple-400" />
            <span className="font-display font-bold text-white">NEXUSARENA ESPORTS</span> · Project 57 / 59
          </div>
          <div>Port 3057 · Interactive Bracket Trees & Tournament Escrow</div>
        </div>
      </footer>
    </div>
  );
}
