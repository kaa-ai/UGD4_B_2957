'use client';

import React, { useState, useEffect } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';

import { PiCardsFill } from 'react-icons/pi';
import {
  FaAppleAlt,
  FaLemon,
  FaHeart,
  FaStar,
  FaLeaf,
  FaGem,
  FaMoon,
  FaSun,
  FaSmile,
  FaSkullCrossbones,
} from 'react-icons/fa';

const ICONS = [
  { icon: FaAppleAlt, color: '#ef4444' },
  { icon: FaLemon, color: '#eab308' },
  { icon: FaHeart, color: '#ec4899' },
  { icon: FaStar, color: '#f97316' },
  { icon: FaLeaf, color: '#22c55e' },
  { icon: FaGem, color: '#6366f1' },
  { icon: FaMoon, color: '#a855f7' },
  { icon: FaSun, color: '#facc15' },
];

const LEVELS = {
  easy: {
    label: 'Easy',
    pairs: 4,
    icon: FaSmile,
  },
  medium: {
    label: 'Medium',
    pairs: 6,
    icon: FaSmile,
  },
  hard: {
    label: 'Hard',
    pairs: 8,
    icon: FaSkullCrossbones,
  },
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Home() {
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [status, setStatus] = useState('');

  const getPairs = () => {
    return LEVELS[difficulty].pairs;
  };

  const createCards = () => {
    const pairs = getPairs();
    const selected = ICONS.slice(0, pairs);

    const paired = selected.flatMap((item, index) => [
      {
        id: `${difficulty}-${index}-a-${Math.random()}`,
        icon: item.icon,
        color: item.color,
        pairId: index,
      },
      {
        id: `${difficulty}-${index}-b-${Math.random()}`,
        icon: item.icon,
        color: item.color,
        pairId: index,
      },
    ]);

    return shuffleArray(paired);
  };

  useEffect(() => {
    setCards(createCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setPlaying(true);
    setStatus('');
  }, [difficulty]);

  useEffect(() => {
    let interval;

    if (playing) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;

      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (!firstCard || !secondCard) return;

      setMoves((prev) => prev + 1);

      if (firstCard.pairId === secondCard.pairId) {
        setMatchedCards((prev) => [...prev, firstId, secondId]);
        setFlippedCards([]);
      } else {
        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 800);

        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards]);

useEffect(() => {
  if (cards.length > 0 && matchedCards.length === cards.length) {
    setPlaying(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;

    setStatus(`🎉 Selamat! Selesai dalam waktu ${formattedTime} dengan ${moves} percobaan!`);
  }
}, [matchedCards, cards, time, moves]);

  const handleCardFlip = (id) => {
    if (status) return;

    if (!playing) setPlaying(true);

    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(id) &&
      !matchedCards.includes(id)
    ) {
      setFlippedCards((prev) => [...prev, id]);
    }
  };

  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setPlaying(false);
    setStatus('');
  };

  return (
    <main className="min-h-screen w-full px-4 py-8 md:py-10 flex items-start justify-center">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <h1 className="mb-8 flex items-center gap-3 text-[38px] font-extrabold leading-none md:mb-10 md:text-[64px]">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-slate-900 shadow-lg md:h-14 md:w-14">
            <PiCardsFill className="text-2xl md:text-3xl" />
          </span>
        <span className="animate-float-title bg-linear-to-r from-[#ffd7ac] to-[#f2a8ff] bg-clip-text text-transparent">
        Memory Card
        </span>
        </h1>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {Object.entries(LEVELS).map(([key, level]) => {
            const LevelIcon = level.icon;
            const active = difficulty === key;

            return (
              <button
                key={key}
                onClick={() => setDifficulty(key)}
                className={`min-w-[145px] rounded-full border px-6 py-4 text-lg font-bold transition-all duration-300 md:min-w-[180px]
                ${
                  active
                    ? 'border-yellow-300 bg-yellow-400 text-slate-900 yellow-glow'
                    : 'border-white/10 bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                <span className="flex items-center justify-center gap-3">
                  <LevelIcon className="text-base" />
                  {level.label} ({level.pairs})
                </span>
              </button>
            );
          })}
        </div>

        <ScoreBoard
          moves={moves}
          time={time}
          matchedCount={matchedCards.length / 2}
          totalPairs={getPairs()}
          onReset={resetGame}
        />

        {status && (
            <div className="mb-6 w-full max-w-[700px] rounded-2xl border border-[#7c3aed] bg-[#4c3b58] px-5 py-3 text-center text-sm font-bold text-yellow-300 shadow-lg md:text-base">
             {status}
            </div>
        )}

        <div className="memory-shell w-full max-w-[700px] rounded-[32px] bg-white/6 p-6 md:p-10">
          <GameBoard
            cards={cards}
            flippedCards={flippedCards}
            matchedCards={matchedCards}
            onFlip={handleCardFlip}
          />
        </div>
      </div>
    </main>
  );
}