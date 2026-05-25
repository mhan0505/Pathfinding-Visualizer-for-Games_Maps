import React from 'react';
import { Target, Flag, Circle } from 'lucide-react';

export default function Legend() {
  const legendItems = [
    {
      label: 'Điểm Bắt Đầu',
      description: 'Gốc tọa độ xuất phát (Dấu mốc #D4AF37)',
      badge: (
        <div className="w-6.5 h-6.5 rounded bg-[#D4AF37] flex items-center justify-center border border-[#E5C35D] shadow-md">
          <Flag className="w-3.5 h-3.5 text-[#0A0A0A] fill-[#0A0A0A]" />
        </div>
      ),
    },
    {
      label: 'Điểm Đích',
      description: 'Tọa độ đích kết thúc (Trắng tinh khiết)',
      badge: (
        <div className="w-6.5 h-6.5 rounded bg-white flex items-center justify-center border border-slate-300 shadow-md">
          <Target className="w-3.5 h-3.5 text-[#0A0A0A]" />
        </div>
      ),
    },
    {
      label: 'Tường rào / Vật Cản',
      description: 'Vật cản thạch bản vô hướng',
      badge: (
        <div className="w-6.5 h-6.5 rounded bg-[#2A2A28] border border-[#444] shadow-sm" />
      ),
    },
    {
      label: 'Terrain Sình lầy (Hệ số: 5)',
      description: 'Lực cản trung bình, tốn 5 lượt',
      badge: (
        <div className="w-6.5 h-6.5 rounded bg-[#3D2C1E] border border-[#5C4533] text-[#D4AF37] font-mono text-[10px] flex items-center justify-center font-bold">
          5
        </div>
      ),
    },
    {
      label: 'Hồ nước sâu (Hệ số: 10)',
      description: 'Lực cản gập ghềnh cao, tốn 10 lượt',
      badge: (
        <div className="w-6.5 h-6.5 rounded bg-[#1C2030] border border-[#2B3554] text-cyan-400 font-mono text-[10px] flex items-center justify-center font-bold">
          10
        </div>
      ),
    },
    {
      label: 'Nút đã khảo sát',
      description: 'Đỉnh đồ thị đã duyệt qua',
      badge: (
        <div className="w-6.5 h-6.5 rounded bg-[#2F2A22] border border-[#4A4232]" />
      ),
    },
    {
      label: 'Đường đi tối ưu',
      description: 'Quỹ đạo di chuyển tối ưu',
      badge: (
        <div className="w-6.5 h-6.5 rounded bg-[#D4AF37] border border-[#E5C35D] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
      ),
    },
  ];

  return (
    <div className="bg-[#141412] rounded-xl p-3 px-5 border border-[#2A2A28] flex flex-col md:flex-row md:items-center justify-between gap-4" id="legend-panel">
      {/* Left side: Sleek title */}
      <div className="flex items-center gap-2 shrink-0">
        <Circle className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]/20 animate-pulse" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#888] font-mono">Ký hiệu bản đồ</span>
      </div>
      
      {/* Right side: Flex row of compact blocks */}
      <div className="flex flex-wrap items-center gap-3">
        {legendItems.map((item, index) => (
          <div key={index} className="relative group">
            {/* Interactive Badge Block */}
            <div className="cursor-help transition-all duration-300 hover:scale-110 active:scale-95">
              {item.badge}
            </div>
            
            {/* Beautiful Custom Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-44 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform scale-90 translate-y-1 group-hover:scale-100 group-hover:translate-y-0 z-50">
              <div className="bg-[#181816] border border-[#3E3E3B] text-[#F2F2F0] px-2.5 py-1.5 rounded-md shadow-2xl text-center relative flex flex-col items-center">
                <span className="font-bold text-[#D4AF37] text-[10px] uppercase tracking-wider block">{item.label}</span>
                <span className="text-[9px] text-[#A0A09B] mt-0.5 leading-normal block font-medium">{item.description}</span>
                
                {/* Tooltip Down Arrow */}
                <div className="w-1.5 h-1.5 bg-[#181816] border-r border-b border-[#3E3E3B] rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
