import React from 'react';
import {
  Play,
  Trash2,
  Sliders,
  Paintbrush,
  Sparkles,
  RefreshCw,
  Eraser,
  Grid,
  Weight,
  Flag,
  Target
} from 'lucide-react';
import { AlgorithmType, SpeedType, ToolMode } from '../types';

interface ControlPanelProps {
  selectedAlgo: AlgorithmType;
  onChangeAlgo: (algo: AlgorithmType) => void;
  speed: SpeedType;
  onChangeSpeed: (speed: SpeedType) => void;
  toolMode: ToolMode;
  onChangeToolMode: (mode: ToolMode) => void;
  isRunning: boolean;
  onStartVisualization: () => void;
  onClearGrid: () => void;
  onClearPathsOnly: () => void;
  onGenerateRandomWalls: (density: number) => void;
  onGenerateRecursiveDivision: () => void;
  onGenerateSwampTerrain: () => void;
  wallDensity: number;
  onChangeWallDensity: (density: number) => void;

  // New pathfinding parameters
  heuristic: 'manhattan' | 'euclidean' | 'octile' | 'chebyshev';
  onChangeHeuristic: (heuristic: 'manhattan' | 'euclidean' | 'octile' | 'chebyshev') => void;
  allowDiagonal: boolean;
  onChangeAllowDiagonal: (allow: boolean) => void;
  dontCrossCorners: boolean;
  onChangeDontCrossCorners: (allow: boolean) => void;
  weight: number;
  onChangeWeight: (weight: number) => void;
}

export default function ControlPanel({
  selectedAlgo,
  onChangeAlgo,
  speed,
  onChangeSpeed,
  toolMode,
  onChangeToolMode,
  isRunning,
  onStartVisualization,
  onClearGrid,
  onClearPathsOnly,
  onGenerateRandomWalls,
  onGenerateRecursiveDivision,
  onGenerateSwampTerrain,
  wallDensity,
  onChangeWallDensity,
  heuristic,
  onChangeHeuristic,
  allowDiagonal,
  onChangeAllowDiagonal,
  dontCrossCorners,
  onChangeDontCrossCorners,
  weight,
  onChangeWeight,
}: ControlPanelProps) {
  return (
    <div className="bg-[#141412] rounded-xl p-6 border border-[#2A2A28] space-y-6" id="control-panel">
      {/* 1. Core Actions */}
      <div className="space-y-3">
        <h4 className="text-[10px] uppercase tracking-widest text-[#666] font-mono flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Vận Hành Mô Phỏng</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Main Play */}
          <button
            onClick={onStartVisualization}
            disabled={isRunning}
            className={`sm:col-span-1 py-3 px-4 rounded font-bold uppercase tracking-[0.2em] text-xs transition-colors ${isRunning
              ? 'bg-slate-800/40 text-slate-500 cursor-not-allowed border border-slate-800/50'
              : 'bg-[#D4AF37] hover:bg-[#E5C35D] text-black shadow-lg shadow-[#D4AF37]/10 hover:scale-[0.99] active:scale-95'
              }`}
            id="start-visualization-btn"
          >
            <span className="flex items-center justify-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start</span>
            </span>
          </button>

          {/* Clear Paths Only */}
          <button
            onClick={onClearPathsOnly}
            disabled={isRunning}
            className="py-3 px-4 rounded text-xs font-medium uppercase tracking-wider bg-[#1A1A18] text-[#888] border border-[#2A2A28] hover:text-white hover:border-[#444] transition-colors disabled:opacity-50"
            id="clear-paths-btn"
          >
            <span className="flex items-center justify-center gap-1.5 font-mono text-[11px]">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear Path</span>
            </span>
          </button>

          {/* Reset All */}
          <button
            onClick={onClearGrid}
            disabled={isRunning}
            className="py-3 px-4 rounded text-xs font-medium uppercase tracking-wider bg-[#1A1A18] text-rose-400 border border-[#2A2A28] hover:bg-rose-950/20 hover:border-rose-900 transition-colors disabled:opacity-50"
            id="reset-all-btn"
          >
            <span className="flex items-center justify-center gap-1.5 font-mono text-[11px]">
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </span>
          </button>
        </div>
      </div>

      {/* 2. Algorithm & Speed Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#2A2A28]">
        {/* ALGO SELECT */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-[#666] font-mono block">
            Choose Algorithm
          </label>
          <select
            value={selectedAlgo}
            onChange={(e) => onChangeAlgo(e.target.value as AlgorithmType)}
            disabled={isRunning}
            className="w-full bg-[#1A1A18] border border-[#D4AF37] rounded p-2.5 text-xs text-[#F2F2F0] font-sans font-medium outline-none focus:ring-1 focus:ring-[#D4AF37] transition-colors disabled:opacity-50"
            id="algo-select"
          >
            <option value="astar">A* Search (Thuật toán tìm đường A*)</option>
            <option value="bestfirst">Best-First Search (Duyệt tham lam Heuristic)</option>
            <option value="dijkstra">Dijkstra (Tìm đường theo Trọng số thực tế)</option>
            <option value="bfs">Breadth-First Search (Duyệt theo chiều rộng)</option>
            <option value="dfs">Depth-First Search (Duyệt theo chiều sâu)</option>
          </select>
        </div>

        {/* SPEED SELECT */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest text-[#666] font-mono block">
            Animation Speed
          </label>
          <div className="flex bg-[#1A1A18] border border-[#2A2A28] p-1 rounded-sm text-xs" id="speed-tab-group">
            {(['slow', 'medium', 'fast'] as SpeedType[]).map((s) => (
              <button
                key={s}
                onClick={() => onChangeSpeed(s)}
                disabled={isRunning}
                className={`flex-1 py-1.5 rounded-sm text-center uppercase tracking-wider text-[10px] font-semibold transition-all ${speed === s
                  ? 'bg-[#252522] text-[#D4AF37] border border-[#2A2A28]'
                  : 'text-[#666] hover:text-[#F2F2F0]'
                  } disabled:opacity-50`}
                id={`speed-${s}`}
              >
                {s === 'slow' ? 'Slow' : s === 'medium' ? 'Medium' : 'Fast'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Parameters for Pathfinding Heuristics and Options */}
      {!isRunning && (selectedAlgo === 'astar' || selectedAlgo === 'bestfirst' || selectedAlgo === 'dijkstra' || selectedAlgo === 'bfs') && (
        <div className="bg-[#0D0D0D]/60 border border-[#2A2A28] rounded-lg p-4 space-y-4 pt-3 animate-fade-in font-sans">
          {/* HEURISTIC SELECTOR */}
          {(selectedAlgo === 'astar' || selectedAlgo === 'bestfirst') && (
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#888] font-mono block font-bold">
                Heuristic
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {([
                  { id: 'manhattan', name: 'Manhattan' },
                  { id: 'euclidean', name: 'Euclidean' },
                  { id: 'octile', name: 'Octile' },
                  { id: 'chebyshev', name: 'Chebyshev' }
                ] as const).map((h) => (
                  <label
                    key={h.id}
                    className={`flex items-center gap-2 p-2 rounded border cursor-pointer select-none transition-colors ${heuristic === h.id
                      ? 'bg-[#1D1A15] border-[#D4AF37]/50 text-[#D4AF37]'
                      : 'bg-[#1A1A18]/40 border-[#2A2A28] text-slate-400 hover:bg-[#20201E]'
                      }`}
                  >
                    <input
                      type="radio"
                      name="heuristic"
                      value={h.id}
                      checked={heuristic === h.id}
                      onChange={() => onChangeHeuristic(h.id)}
                      className="accent-[#D4AF37]"
                    />
                    <span>{h.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* ADVANCED CHECKBOXES */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-[#888] font-mono block font-bold">
              Tùy chọn di chuyển (Options)
            </span>

            <div className="space-y-2.5 text-xs text-slate-300">
              {/* Allow Diagonal */}
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={allowDiagonal}
                  onChange={(e) => {
                    onChangeAllowDiagonal(e.target.checked);
                    if (!e.target.checked) {
                      onChangeDontCrossCorners(false);
                    }
                  }}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#D4AF37] focus:ring-0 accent-[#D4AF37]"
                />
                <span>Cho phép di chuyển chéo (Allow Diagonal)</span>
              </label>

              {/* Don't Cross Corners */}
              <label
                className={`flex items-center gap-2.5 select-none transition-opacity ${allowDiagonal ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={dontCrossCorners}
                  disabled={!allowDiagonal}
                  onChange={(e) => onChangeDontCrossCorners(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#D4AF37] focus:ring-0 accent-[#D4AF37] disabled:opacity-40"
                />
                <span>Không băng góc chéo tường (Don't Cross Corners)</span>
              </label>

              {/* Heuristic Weight Input (Only for A*) */}
              {selectedAlgo === 'astar' && (
                <div className="flex items-center gap-3 pt-2 border-t border-[#2A2A28]/40 mt-1">
                  <span className="text-[11px] text-slate-400">Trọng số Heuristic (Weight):</span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={weight}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      onChangeWeight(isNaN(val) ? 1 : val);
                    }}
                    className="w-16 bg-[#1A1A18] border border-[#2A2A28] text-center text-xs text-[#D4AF37] rounded py-1 px-1.5 focus:border-[#D4AF37] focus:ring-0 font-mono outline-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Drawing Brushes / Tools */}
      <div className="space-y-3 pt-2 border-t border-[#2A2A28]">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] uppercase tracking-widest text-[#666] font-mono flex items-center gap-1.5">
            <Paintbrush className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span> Function Draw Map</span>
          </h4>
          <span className="text-[9px] text-[#555] font-mono select-none">Nhắp chuột & rê vẽ trên lưới</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" id="brushes-container">
          {/* Start Brush */}
          <button
            onClick={() => onChangeToolMode('start')}
            disabled={isRunning}
            className={`px-3 py-2.5 rounded border text-[11px] font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${toolMode === 'start'
              ? 'bg-[#1A1A18] text-[#D4AF37] border-[#D4AF37]'
              : 'bg-[#1A1A18] text-[#888] border-[#2A2A28] hover:text-white hover:border-[#444]'
              } disabled:opacity-50`}
            id="brush-start-btn"
          >
            <Flag className="w-3.5 h-3.5 shrink-0" />
            <span>Start</span>
          </button>

          {/* End Brush */}
          <button
            onClick={() => onChangeToolMode('end')}
            disabled={isRunning}
            className={`px-3 py-2.5 rounded border text-[11px] font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${toolMode === 'end'
              ? 'bg-[#1A1A18] text-white border-white'
              : 'bg-[#1A1A18] text-[#888] border-[#2A2A28] hover:text-white hover:border-[#444]'
              } disabled:opacity-50`}
            id="brush-end-btn"
          >
            <Target className="w-3.5 h-3.5 shrink-0" />
            <span>Target</span>
          </button>

          {/* Wall Brush */}
          <button
            onClick={() => onChangeToolMode('wall')}
            disabled={isRunning}
            className={`px-3 py-2.5 rounded border text-[11px] font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${toolMode === 'wall'
              ? 'bg-[#2A2A28] text-white border-[#444]'
              : 'bg-[#1A1A18] text-[#888] border-[#2A2A28] hover:text-white hover:border-[#444]'
              } disabled:opacity-50`}
            id="brush-wall-btn"
          >
            <Grid className="w-3.5 h-3.5 shrink-0" />
            <span>Wall</span>
          </button>

          {/* Weight Terrain Brush */}
          <button
            onClick={() => onChangeToolMode('weight')}
            disabled={isRunning}
            className={`px-3 py-2.5 rounded border text-[11px] font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${toolMode === 'weight'
              ? 'bg-[#3D2C1E] text-[#D4AF37] border-[#5C4533]'
              : 'bg-[#1A1A18] text-[#888] border-[#2A2A28] hover:text-white hover:border-[#444]'
              } disabled:opacity-50`}
            title="Swamp / Water terrain with high weight"
            id="brush-weight-btn"
          >
            <Weight className="w-3.5 h-3.5 shrink-0" />
            <span>Swamp</span>
          </button>

          {/* Eraser */}
          <button
            onClick={() => onChangeToolMode('eraser')}
            disabled={isRunning}
            className={`col-span-2 sm:col-span-1 px-3 py-2.5 rounded border text-[11px] font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${toolMode === 'eraser'
              ? 'bg-[#252522] text-[#888] border-purple-900/60'
              : 'bg-[#1A1A18] text-[#888] border-[#2A2A28] hover:text-white hover:border-[#444]'
              } disabled:opacity-50`}
            id="brush-eraser-btn"
          >
            <Eraser className="w-3.5 h-3.5 shrink-0" />
            <span>Eraser</span>
          </button>
        </div>
      </div>

      {/* 4. Automated Generation */}
      <div className="space-y-3 pt-2 border-t border-[#2A2A28]">
        <h4 className="text-[10px] uppercase tracking-widest text-[#666] font-mono flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Random Matrix</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Recursive Division Walls */}
          <button
            onClick={onGenerateRecursiveDivision}
            disabled={isRunning}
            className="py-2.5 px-3 bg-[#1A1A18] border border-[#2A2A28] text-[10px] uppercase tracking-wider text-[#A0A09B] hover:text-[#F2F2F0] hover:bg-[#252522] transition-colors disabled:opacity-50"
            id="gen-recursive-maze-btn"
          >
            <span> Recursive Division</span>
          </button>

          {/* Organic Swamp-Terrain Rivers */}
          <button
            onClick={onGenerateSwampTerrain}
            disabled={isRunning}
            className="py-2.5 px-3 bg-[#1A1A18] border border-[#2A2A28] text-[10px] uppercase tracking-wider text-[#A0A09B] hover:text-[#F2F2F0] hover:bg-[#252522] transition-colors disabled:opacity-50 font-medium"
            title="Swamp and water terrain with high weight"
            id="gen-swamp-terrain-btn"
          >
            <span> Swamp Terrain</span>
          </button>

          {/* Random Walls Noise */}
          <button
            onClick={() => onGenerateRandomWalls(wallDensity)}
            disabled={isRunning}
            className="py-2.5 px-3 bg-[#1A1A18] border border-[#2A2A28] text-[10px] uppercase tracking-wider text-[#A0A09B] hover:text-[#F2F2F0] hover:bg-[#252522] transition-colors disabled:opacity-50"
            id="gen-random-walls-btn"
          >
            <span> Random Walls</span>
          </button>
        </div>

        {/* Wall Density slider */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-[11px] text-[#888] font-mono">
            <span> Random Walls (%):</span>
            <span className="text-[#D4AF37]">{Math.round(wallDensity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.10"
            max="0.40"
            step="0.05"
            value={wallDensity}
            onChange={(e) => onChangeWallDensity(parseFloat(e.target.value))}
            disabled={isRunning}
            className="w-full h-1 bg-[#2A2A28] rounded-lg appearance-none cursor-pointer accent-[#D4AF37] disabled:opacity-50"
            id="wall-density-slider"
          />
        </div>
      </div>
    </div>
  );
}
