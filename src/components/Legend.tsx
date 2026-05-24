import React from 'react';
import { Target, Flag, Circle } from 'lucide-react';

export default function Legend() {
  const legendItems = [
    {
      label: 'Điểm Bắt Đầu',
      description: 'Gốc tọa độ xuất phát (Dấu mốc #D4AF37)',
      badge: (
        <div className="w-5.5 h-5.5 rounded bg-[#D4AF37] flex items-center justify-center border border-[#E5C35D] shadow-md">
          <Flag className="w-3 h-3 text-[#0A0A0A] fill-[#0A0A0A]" />
        </div>
      ),
    },
    {
      label: 'Điểm Đích',
      description: 'Tọa độ đích kết thúc (Trắng tinh khiết)',
      badge: (
        <div className="w-5.5 h-5.5 rounded bg-white flex items-center justify-center border border-slate-300 shadow-md">
          <Target className="w-3 h-3 text-[#0A0A0A]" />
        </div>
      ),
    },
    {
      label: 'Tường rào / Vật Cản',
      description: 'Vật cản thạch bản vô hướng',
      badge: (
        <div className="w-5.5 h-5.5 rounded bg-[#2A2A28] border border-[#444] shadow-sm" />
      ),
    },
    {
      label: 'Terrain Sình lầy (Hệ số: 5)',
      description: 'Lực cản trung bình, tốn 5 lượt',
      badge: (
        <div className="w-5.5 h-5.5 rounded bg-[#3D2C1E] border border-[#5C4533] text-[#D4AF37] font-mono text-[9px] flex items-center justify-center font-bold">
          5
        </div>
      ),
    },
    {
      label: 'Hồ nước sâu (Hệ số: 10)',
      description: 'Lực cản gập ghềnh cao, tốn 10 lượt',
      badge: (
        <div className="w-5.5 h-5.5 rounded bg-[#1C2030] border border-[#2B3554] text-cyan-400 font-mono text-[9px] flex items-center justify-center font-bold">
          10
        </div>
      ),
    },
    {
      label: 'Nút đã khảo sát',
      description: 'Đỉnh đồ thị đã duyệt qua',
      badge: (
        <div className="w-5.5 h-5.5 rounded bg-[#2F2A22] border border-[#4A4232]" />
      ),
    },
    {
      label: 'Đường đi tối ưu',
      description: 'Quỹ đạo di chuyển tối ưu',
      badge: (
        <div className="w-5.5 h-5.5 rounded bg-[#D4AF37] border border-[#E5C35D] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
      ),
    },
  ];

  return (
    <div className="bg-[#141412] rounded-xl p-5 border border-[#2A2A28]" id="legend-panel">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#888] mb-4 flex items-center gap-2 font-mono">
        <Circle className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]/20" />
        <span>Ký Hiệu Sơ Đồ Thiết Kế</span>
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {legendItems.map((item, index) => (
          <div key={index} className="flex gap-2.5 items-center p-2 rounded bg-[#1A1A18] border border-[#2A2A28] hover:bg-[#252522] transition-colors">
            <div className="shrink-0">{item.badge}</div>
            <div className="min-w-0">
              <h4 className="text-[11px] font-medium text-[#F2F2F0] truncate">{item.label}</h4>
              <p className="text-[9px] text-[#666] mt-0.5 line-clamp-1 leading-normal">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
