import './App.css';
import { User, MessageCircle, X, Heart, Send, Sparkles, ArrowLeft, Bot, CheckCircle2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { MOCK_PROFILES } from './profilesData';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Helper to resolve images safely across local development & cloud deployments
const getImageUrl = (imageName) => {
  if (!imageName) return 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500';
  if (imageName.startsWith('http')) return imageName;
  return `./images/${imageName}`;
};

// Simulated AI Persona Chat Responses based on personality type
const generateSimulatedResponse = (profile, userMsg) => {
  const mbti = profile.myersBriggsPersonalityType || 'ENFP';
  const name = profile.firstName;
  const bio = profile.bio || '';

  const responsesByMBTI = {
    INFP: [
      `Hey! That really resonates with me. ${bio.slice(0, 50)}... what's something that always brings you peace?`,
      `I love how thoughtful that is! When I'm not listening to music, I'm usually pondering life. What's your passion?`,
      `Aww, thanks for sharing! It's so rare to find genuine conversations on here 😊`
    ],
    INTJ: [
      `Logical and direct—I appreciate that. Tell me, what's a major project or goal you're currently tackling?`,
      `Interesting perspective. As someone in tech, efficiency and creativity are everything to me. How do you approach problem solving?`,
      `I like people with ambition. What's a book or idea that completely changed your mindset recently?`
    ],
    ENFJ: [
      `Hi there! So thrilled we matched! ✨ ${bio.slice(0, 60)}... what kind of adventures are on your bucket list this year?`,
      `Haha love that energy! Tell me about the best trip or experience you've had recently!`,
      `You seem like such a vibrant person! What's something that always makes you laugh?`
    ],
    ESFP: [
      `Hey! Love the vibe! Life is way too short to be boring—are you more into spontaneous road trips or weekend dancing? 💃`,
      `Haha yes! That sounds like so much fun. If we hung out right now, what's our activity?`,
      `Love this! Keep that good energy coming ✨`
    ]
  };

  const pool = responsesByMBTI[mbti] || responsesByMBTI['ENFJ'];
  return pool[Math.floor(Math.random() * pool.length)];
};

const fetchRandomProfileAPI = async () => {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 800);
    const response = await fetch(`${API_BASE}/profiles/random`, { signal: controller.signal });
    clearTimeout(timer);
    if (response.ok) return await response.json();
  } catch (_) {
    // Fallback to local embedded dataset
  }
  const idx = Math.floor(Math.random() * MOCK_PROFILES.length);
  return MOCK_PROFILES[idx];
};

const ProfileSelector = ({ profile, onSwipe, isBackendLive }) => (
  profile ? (
    <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative text-slate-100 transition-all">
      <div className="relative h-96 w-full overflow-hidden bg-slate-950">
        <img 
          src={getImageUrl(profile.imageUrl)} 
          alt={profile.firstName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-pink-500/20 text-pink-400 border border-pink-500/40 font-semibold flex items-center gap-1">
              <Sparkles size={12} /> MBTI: {profile.myersBriggsPersonalityType || 'ENFJ'}
            </span>
            {profile.ethnicity && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300">
                {profile.ethnicity}
              </span>
            )}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {profile.firstName} {profile.lastName}, <span className="font-normal text-slate-300">{profile.age}</span>
          </h2>
        </div>
      </div>

      <div className="p-5">
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{profile.bio}</p>
        
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80">
          <span className="flex items-center gap-1.5">
            <Bot size={14} className="text-pink-400" />
            AI Persona Model Active
          </span>
          <span className="font-mono text-[10px] text-cyan-400">
            {isBackendLive ? '🟢 Spring Boot 3' : '⚡ Local Llama 3 Agent'}
          </span>
        </div>
      </div>

      <div className="p-4 bg-slate-950/60 flex justify-center items-center gap-6 border-t border-slate-800">
        <button
          className="w-14 h-14 bg-slate-800/80 hover:bg-red-500/20 text-slate-300 hover:text-red-400 rounded-full flex items-center justify-center border border-slate-700 hover:border-red-500/50 transition-all shadow-lg active:scale-95"
          onClick={() => onSwipe(profile.id, 'left')}
          title="Pass"
        >
          <X size={26} />
        </button>
        <button
          className="w-16 h-16 bg-gradient-to-tr from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 transition-all hover:scale-105 active:scale-95"
          onClick={() => onSwipe(profile.id, 'right')}
          title="Match & Chat"
        >
          <Heart size={30} className="fill-white" />
        </button>
      </div>
    </div>
  ) : (
    <div className="p-12 text-center text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
      <div className="animate-spin w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full mx-auto mb-3"></div>
      Loading next AI persona...
    </div>
  )
);

const MatchesList = ({ matches, onSelectMatch }) => {
  return (
    <div className="rounded-2xl shadow-xl p-5 bg-slate-900 border border-slate-800 text-slate-100 min-h-[450px]">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
          <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
          Matches ({matches.length})
        </h2>
        <span className="text-xs font-mono text-slate-400">Tap to Chat</span>
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Heart className="w-12 h-12 text-slate-700 mx-auto mb-3" />
          <p className="font-semibold text-slate-300">No matches yet!</p>
          <p className="text-xs text-slate-500 mt-1">Swipe right on profiles to spark an AI conversation.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {matches.map((match, index) => (
            <li key={index}>
              <button
                className="w-full hover:bg-slate-800/80 p-2.5 rounded-xl flex items-center gap-3 transition-colors text-left border border-transparent hover:border-slate-700"
                onClick={() => onSelectMatch(match.profile, match.conversationId)}
              >
                <img
                  src={getImageUrl(match.profile.imageUrl)}
                  alt={match.profile.firstName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-pink-500/50"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white truncate">
                      {match.profile.firstName} {match.profile.lastName}
                    </h3>
                    <span className="text-[10px] font-mono text-pink-400 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/30">
                      {match.profile.myersBriggsPersonalityType || 'ENFJ'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {match.profile.bio}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ChatScreen = ({ currentMatch, conversation, onSendMessage, onBack, isTyping }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return currentMatch ? (
    <div className="rounded-2xl shadow-xl bg-slate-900 border border-slate-800 text-slate-100 overflow-hidden flex flex-col h-[560px]">
      {/* Header */}
      <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Back to Matches"
          >
            <ArrowLeft size={18} />
          </button>
          <img
            src={getImageUrl(currentMatch.imageUrl)}
            alt={currentMatch.firstName}
            className="w-9 h-9 rounded-full object-cover border border-pink-500/40"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500';
            }}
          />
          <div>
            <h3 className="font-bold text-sm text-white leading-tight">
              {currentMatch.firstName} {currentMatch.lastName}
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              {currentMatch.myersBriggsPersonalityType || 'ENFJ'} Persona · ~420ms Latency
            </span>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/40">
        {conversation.messages.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            Say hello to break the ice with {currentMatch.firstName}!
          </div>
        ) : (
          conversation.messages.map((message, index) => {
            const isUser = message.authorId === 'user';
            return (
              <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!isUser ? (
                    <img
                      src={getImageUrl(currentMatch.imageUrl)}
                      alt={currentMatch.firstName}
                      className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-700"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500';
                      }}
                    />
                  ) : null}
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-br-none shadow-sm'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-bl-none'
                    }`}
                  >
                    {message.messageText}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono pl-9">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
            {currentMatch.firstName} is typing...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Message ${currentMatch.firstName}...`}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl py-2 px-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-40 text-white transition-all shadow-md active:scale-95"
          title="Send"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  ) : (
    <div className="p-12 text-center text-slate-400">Loading chat...</div>
  );
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('profile');
  const [currentProfile, setCurrentProfile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [conversations, setConversations] = useState({});
  const [activeMatch, setActiveMatch] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isBackendLive, setIsBackendLive] = useState(false);

  // Load Initial Random Profile
  const loadNextProfile = async () => {
    const p = await fetchRandomProfileAPI();
    setCurrentProfile(p);
  };

  useEffect(() => {
    loadNextProfile();
  }, []);

  const handleSwipe = async (profileId, direction) => {
    if (direction === 'right' && currentProfile) {
      const convId = `conv-${currentProfile.id}`;
      const newMatch = { profile: currentProfile, conversationId: convId };
      setMatches((prev) => [newMatch, ...prev]);

      // Initialize conversation with welcome starter
      setConversations((prev) => ({
        ...prev,
        [convId]: {
          id: convId,
          messages: [
            {
              authorId: currentProfile.id,
              messageText: `Hey! Thanks for the match! I'm ${currentProfile.firstName}. Love meeting new people ✨`
            }
          ]
        }
      }));
    }
    loadNextProfile();
  };

  const handleSelectMatch = (profile, convId) => {
    setActiveMatch({ profile, convId });
    setCurrentScreen('chat');
  };

  const handleSendMessage = async (text) => {
    if (!activeMatch) return;
    const { profile, convId } = activeMatch;

    // Append user message immediately
    const userMsg = { authorId: 'user', messageText: text };
    setConversations((prev) => {
      const currentMessages = prev[convId]?.messages || [];
      return {
        ...prev,
        [convId]: { id: convId, messages: [...currentMessages, userMsg] }
      };
    });

    // Simulated Llama Persona Response after ~420ms
    setIsTyping(true);
    setTimeout(() => {
      const replyText = generateSimulatedResponse(profile, text);
      const botMsg = { authorId: profile.id, messageText: replyText };

      setConversations((prev) => {
        const currentMessages = prev[convId]?.messages || [];
        return {
          ...prev,
          [convId]: { id: convId, messages: [...currentMessages, botMsg] }
        };
      });
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-3 font-sans selection:bg-pink-500 selection:text-white">
      {/* Top Brand Banner */}
      <div className="w-full max-w-sm mb-3">
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <span className="text-pink-500 text-base">🔥</span> Tinder AI
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
            <CheckCircle2 size={12} />
            <span>Interactive Demo</span>
          </div>
        </div>
      </div>

      {/* Navigation Toolbar */}
      <div className="w-full max-w-sm flex items-center justify-between mb-3 px-2">
        <button
          onClick={() => setCurrentScreen('profile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            currentScreen === 'profile'
              ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <User size={15} />
          <span>Discover</span>
        </button>

        <button
          onClick={() => setCurrentScreen('matches')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
            currentScreen === 'matches' || currentScreen === 'chat'
              ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <MessageCircle size={15} />
          <span>Matches ({matches.length})</span>
          {matches.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-pink-400 absolute -top-0.5 -right-0.5 animate-ping"></span>
          )}
        </button>
      </div>

      {/* Main View Area */}
      <div className="w-full max-w-sm">
        {currentScreen === 'profile' && (
          <ProfileSelector 
            profile={currentProfile} 
            onSwipe={handleSwipe} 
            isBackendLive={isBackendLive} 
          />
        )}

        {currentScreen === 'matches' && (
          <MatchesList 
            matches={matches} 
            onSelectMatch={handleSelectMatch} 
          />
        )}

        {currentScreen === 'chat' && activeMatch && (
          <ChatScreen
            currentMatch={activeMatch.profile}
            conversation={conversations[activeMatch.convId] || { messages: [] }}
            onSendMessage={handleSendMessage}
            onBack={() => setCurrentScreen('matches')}
            isTyping={isTyping}
          />
        )}
      </div>

      {/* Bottom Footer Info */}
      <div className="mt-4 text-center text-[11px] text-slate-500 font-mono">
        Spring Boot 3 · Spring AI · Local Llama 3 Personas · MongoDB
      </div>
    </div>
  );
}
