import React, { useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';

const CORNER_GIFS = [
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWgzeDY3M2lwanlvdm1zMTR5azVpcXk4amtsb3pzOHVma25yb2YwOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LPFNd1AJBoYcVUExmE/giphy.gif",

];

export default function Header() {
  const [gifIndex, setGifIndex] = useState(0);

  const nextCornerGif = () => {
    setGifIndex((prevIndex) => (prevIndex + 1) % CORNER_GIFS.length);
  };

  return (
    <header className="relative overflow-hidden rounded-xl bg-[#141412] p-6 sm:p-7 mb-6 border border-[#2A2A28] shadow-2xl" id="app-header">
      {/* Decorative refined radial gradient background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif italic font-normal tracking-tight text-[#D4AF37]" id="app-title">
              Pathfinding Visualizer
            </h1>
            <span className="text-[9px] uppercase tracking-widest text-[#888] border border-[#2A2A28] px-2 py-0.5 rounded font-mono bg-[#1A1A18]/60">
              [GROUP_5]
            </span>
          </div>

          <p className="text-xs text-[#888] max-w-2xl leading-relaxed font-sans">
            Môi trường so sánh hiệu năng và phân tích trực quan tốc độ của các thuật toán lý thuyết đồ thị cổ điển:{' '}
            <span className="text-[#D4AF37]">Breadth-First Search (BFS)</span>,{' '}
            <span className="text-slate-300">Depth-First Search (DFS)</span>, và{' '}
            <span className="text-[#D4AF37] border-b border-[#D4AF37]/20 pb-0.5">Thuật toán Dijkstra (Địa hình)</span>.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1A1A18] border border-[#2A2A28] text-[10px] font-mono text-[#D4AF37]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>DSEB</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1A1A18] border border-[#2A2A28] text-[10px] font-mono text-[#888] select-none">

            <span className="flex items-center gap-1.5 cursor-pointer" onClick={nextCornerGif}>
              <img
                src={CORNER_GIFS[gifIndex]}
                alt="Mini Corner GIF"
                className="w-10 h-10 rounded object-cover border border-[#2A2A28] transition-all duration-300 hover:scale-125"
              />
              <span className="hover:text-[#D4AF37] transition-colors"></span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
