import React from 'react';
import { Flag, Target, Waves, Compass } from 'lucide-react';
import { GridNode } from '../types';

interface GridRendererProps {
  grid: GridNode[][];
  onNodeMouseDown: (row: number, col: number) => void;
  onNodeMouseEnter: (row: number, col: number) => void;
  onNodeMouseUp: () => void;
}

export default function GridRenderer({
  grid,
  onNodeMouseDown,
  onNodeMouseEnter,
  onNodeMouseUp
}: GridRendererProps) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  // Custom node styling generator to apply correct Sophisticated Dark colors & animations
  const getNodeClassName = (node: GridNode) => {
    const { isStart, isEnd, isWall, isVisited, isPath, weight } = node;

    if (isStart) {
      return 'bg-[#D4AF37] border-[#E5C35D] text-[#0A0A0A] z-20 scale-[1.02] shadow-[0_0_12px_rgba(212,175,55,0.4)]';
    }
    if (isEnd) {
      return 'bg-white border-slate-200 text-[#0A0A0A] z-20 scale-[1.02] shadow-[0_0_12px_rgba(255,255,255,0.3)]';
    }
    if (isWall) {
      return 'bg-[#2A2A28] border-[#1C1C1A] scale-[0.96] rounded-[1.5px] transition-all duration-150';
    }
    
    let base = 'transition-all duration-200';

    if (isPath) {
      return `${base} node-shortest-path border-[#E5C35D] z-10`;
    }

    if (isVisited) {
      if (weight > 1) {
        return `${base} node-weight-visited border-[#5C4A6E]/40`;
      }
      return `${base} node-visited border-[#4A4232]/40`;
    }

    // Unvisited terrains with matching Sophisticated Dark palette
    if (weight === 5) {
      return `${base} bg-[#3D2C1E] border-[#5C4533] text-[#D4AF37] hover:bg-[#4D3A2A]`;
    }
    if (weight === 10) {
      return `${base} bg-[#1C2030] border-[#2B3554] text-cyan-400 hover:bg-[#272D45]`;
    }

    // Default neutral empty node cell (Sophisticated Dark layout grid)
    return `${base} border-[#1A1A18] bg-[#0D0D0D] hover:bg-[#1A1A18]`;
  };

  return (
    <div className="bg-[#141412] rounded-xl p-4 border border-[#2A2A28] shadow-2xl" id="grid-container-panel">
      {/* Scrollable container for mobile responsiveness */}
      <div className="overflow-x-auto w-full" id="grid-scroll-viewport">
        <div 
          className="grid gap-[2px] select-none mx-auto min-w-[760px] max-w-[1200px]"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          onMouseLeave={onNodeMouseUp}
          id="visualizer-grid-mesh"
        >
          {grid.map((row, rIdx) =>
            row.map((node, cIdx) => {
              const nodeClass = getNodeClassName(node);
              const isWeightNode = node.weight > 1 && !node.isWall && !node.isStart && !node.isEnd;

              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  id={`node-${rIdx}-${cIdx}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onNodeMouseDown(rIdx, cIdx);
                  }}
                  onMouseEnter={() => onNodeMouseEnter(rIdx, cIdx)}
                  onMouseUp={onNodeMouseUp}
                  className={`aspect-square border flex items-center justify-center text-[10px] sm:text-xs cursor-crosshair rounded-[1px] ${nodeClass}`}
                >
                  {/* Cell icon and identifier indicators */}
                  {node.isStart && (
                    <Flag className="w-3.5 h-3.5 text-[#0A0A0A] fill-[#0A0A0A] animate-pulse" />
                  )}
                  {node.isEnd && (
                    <Target className="w-3.5 h-3.5 text-[#0A0A0A]" />
                  )}
                  
                  {isWeightNode && !node.isPath && !node.isVisited && (
                    <div className="flex flex-col items-center justify-center font-mono font-bold leading-none scale-[0.8]">
                      {node.weight === 5 ? (
                        <span className="text-[#D4AF37]/80">5</span>
                      ) : (
                        <Waves className="w-2.5 h-2.5 text-cyan-500/80" />
                      )}
                    </div>
                  )}

                  {node.isVisited && isWeightNode && !node.isPath && (
                    <span className="font-mono text-[8px] text-[#D4AF37]/60 leading-none">
                      {node.weight}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* Small informative advice beneath grid */}
      <div className="mt-3.5 flex flex-col sm:flex-row gap-2 sm:items-center justify-between text-[10px] text-[#666] font-mono px-1">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Hệ thống mạng lưới lý thuyết đồ thị: {rows} hàng × {cols} cột (800 đỉnh/nút liên kết)</span>
        </div>
        <span>Thao tác: Nhấn giữ cọ vẽ để tô tường, đặt điểm nút hoặc dịch chuyển cờ bắt đầu/kết thúc</span>
      </div>
    </div>
  );
}
