import React from 'react';
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt } from 'react-icons/fa';

function formatTime(value) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="w-[150px] rounded-[22px] border border-white/10 bg-white/10 px-4 py-4 text-center sm:w-[165px] md:w-[200px] md:rounded-[24px] md:px-5 md:py-5">
      <p className="mb-2 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#aab1ff] sm:text-sm md:text-base">
        <Icon className="text-sm" />
        {label}
      </p>
      <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
        {value}
      </h2>
    </div>
  );
}

function ScoreBoard({ time, moves, matchedCount, totalPairs, onReset }) {
  return (
    <div className="mb-8 flex w-full flex-col items-center md:mb-10">
      <div className="mb-7 flex flex-wrap justify-center gap-3 md:gap-6">
        <StatCard icon={FaClock} label="WAKTU" value={formatTime(time)} />
        <StatCard icon={FaMousePointer} label="PERCOBAAN" value={moves} />
        <StatCard icon={FaCheck} label="DITEMUKAN" value={`${matchedCount}/${totalPairs}`} />
      </div>

      <button
        onClick={onReset}
        className="yellow-glow flex items-center gap-3 rounded-full bg-yellow-400 px-8 py-3 text-lg font-extrabold text-slate-900 transition-all hover:scale-[1.02] md:px-10 md:py-4 md:text-xl"
      >
        <FaSyncAlt />
        Acak Ulang
      </button>
    </div>
  );
}

export default ScoreBoard;