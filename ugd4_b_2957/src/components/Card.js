import React from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, onFlip }) {
  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  const handleClick = () => {
    if (!isOpen) {
      onFlip(card.id);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="perspective w-[72px] h-[92px] sm:w-[88px] sm:h-[108px] md:w-[128px] md:h-[146px]"
    >
      <div
        className={`card-inner relative w-full h-full rounded-[22px] md:rounded-[24px] transition-all duration-300 ${
          isOpen ? 'rotate-y-180' : ''
        }`}
      >
        {/* Sisi belakang (tertutup) */}
        <div
          className={`absolute inset-0 backface-hidden rounded-[22px] md:rounded-[24px]
          flex items-center justify-center
          bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500
          memory-card-glow
          transition-all duration-300 ease-out
          ${
            !isOpen
              ? 'hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] active:scale-95'
              : ''
          }`}
        >
          <FaQuestion className="text-[28px] text-white/75 sm:text-[34px] md:text-[44px]" />
        </div>

        {/* Sisi depan (terbuka) */}
        <div
          className="absolute inset-0 rotate-y-180 backface-hidden rounded-[22px] md:rounded-[24px]
          flex items-center justify-center
          bg-white/95 shadow-xl"
        >
          <span className="animate-bounce-once">
            <IconComponent
              className="text-[28px] sm:text-[34px] md:text-[48px]"
              style={{ color: card.color }}
            />
          </span>
        </div>
      </div>
    </button>
  );
}

export default Card;