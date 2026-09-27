import { create } from 'zustand';

export const useStore = create((set, get) => ({
  activeTab: 'brackets', // 'brackets' | 'tournaments' | 'register' | 'referee' | 'stream' | 'prizes'
  selectedTournamentId: 'TRN-2026-VAL',

  tournaments: [
    {
      id: 'TRN-2026-VAL',
      title: 'Valorant Champions Global Masters',
      game: 'Valorant',
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
      prizePool: 50000,
      format: '8-Team Single Elimination (BO3/BO5)',
      status: 'Live',
      startDate: 'Sep 27 - Oct 02, 2026',
      teamsCount: 8,
      region: 'International (LAN Berlin)'
    },
    {
      id: 'TRN-2026-CS2',
      title: 'Counter-Strike 2 Major Championship',
      game: 'CS2',
      banner: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
      prizePool: 100000,
      format: '16-Team Swiss + Playoff',
      status: 'Registration Open',
      startDate: 'Oct 15 - Oct 24, 2026',
      teamsCount: 16,
      region: 'Copenhagen Arena'
    },
    {
      id: 'TRN-2026-LOL',
      title: 'Rift Clash Worlds Invitational',
      game: 'League of Legends',
      banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
      prizePool: 75000,
      format: 'Double Elimination',
      status: 'Upcoming',
      startDate: 'Nov 05, 2026',
      teamsCount: 12,
      region: 'Seoul Dome'
    }
  ],

  bracket: {
    quarterfinals: [
      { id: 'QF-1', teamA: 'Sentinels', scoreA: 2, teamB: 'Fnatic', scoreB: 1, winner: 'Sentinels', status: 'Finished' },
      { id: 'QF-2', teamA: 'Paper Rex', scoreA: 2, teamB: 'DRX', scoreB: 0, winner: 'Paper Rex', status: 'Finished' },
      { id: 'QF-3', teamA: 'Team Liquid', scoreA: 1, teamB: 'Natus Vincere', scoreB: 2, winner: 'Natus Vincere', status: 'Finished' },
      { id: 'QF-4', teamA: 'Cloud9', scoreA: 2, teamB: 'NRG Esports', scoreB: 1, winner: 'Cloud9', status: 'Finished' }
    ],
    semifinals: [
      { id: 'SF-1', teamA: 'Sentinels', scoreA: 2, teamB: 'Paper Rex', scoreB: 1, winner: 'Sentinels', status: 'Finished' },
      { id: 'SF-2', teamA: 'Natus Vincere', scoreA: 0, teamB: 'Cloud9', scoreB: 2, winner: 'Cloud9', status: 'Finished' }
    ],
    finals: {
      id: 'GF-1',
      teamA: 'Sentinels',
      scoreA: 1,
      teamB: 'Cloud9',
      scoreB: 1,
      currentMap: 'Map 3: Lotus (Live 8 - 6)',
      status: 'Live',
      mapPicks: [
        { map: 'Ascent', winner: 'Sentinels (13 - 10)' },
        { map: 'Bind', winner: 'Cloud9 (11 - 13)' },
        { map: 'Lotus', winner: 'In Progress (8 - 6)' }
      ]
    }
  },

  chatMessages: [
    { id: 'M-1', user: 'TenZ_Fanatic', text: 'THAT OPERATOR FLICK ON C-SITE WAS UNREAL!', time: '14:22', badge: 'VIP' },
    { id: 'M-2', user: 'ValkyrieAce', text: 'Cloud9 eco round clutch incoming? Lotus is their best map', time: '14:23', badge: 'PRO' },
    { id: 'M-3', user: 'ApexPredator', text: 'Grand finals delivering peak Valorant right now 🔥', time: '14:24', badge: 'MOD' }
  ],

  registeredSquads: [
    {
      id: 'SQD-01',
      teamName: 'Sentinels Elite',
      tag: 'SEN',
      captain: 'Tyson Ngo (TenZ)',
      discord: 'tenz#0001',
      region: 'North America',
      roster: ['TenZ', 'zekken', 'johnqt', 'Sacy', 'Zellsis'],
      status: 'Verified & Seeded #1'
    }
  ],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),

  postChatMessage: (text) => set((state) => ({
    chatMessages: [
      ...state.chatMessages,
      {
        id: `M-${Date.now()}`,
        user: 'Spectator_Elite',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        badge: 'FAN'
      }
    ]
  })),

  registerTeam: (teamData) => set((state) => {
    const newSquad = {
      id: `SQD-${Math.floor(100 + Math.random() * 900)}`,
      teamName: teamData.teamName,
      tag: teamData.tag || 'TEAM',
      captain: teamData.captain,
      discord: teamData.discord || 'captain#1234',
      region: teamData.region || 'Global',
      roster: teamData.roster ? teamData.roster.split(',') : ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'],
      status: 'Pending Verification'
    };

    return {
      registeredSquads: [newSquad, ...state.registeredSquads],
      activeTab: 'tournaments'
    };
  }),

  updateGrandFinalScore: (teamAIncrement, teamBIncrement) => set((state) => ({
    bracket: {
      ...state.bracket,
      finals: {
        ...state.bracket.finals,
        scoreA: state.bracket.finals.scoreA + teamAIncrement,
        scoreB: state.bracket.finals.scoreB + teamBIncrement
      }
    }
  }))
}));
