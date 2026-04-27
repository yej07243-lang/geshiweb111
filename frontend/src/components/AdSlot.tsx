"use client";
export default function AdSlot() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[250px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4">
      <div className="text-slate-300 mb-2">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      </div>
      <p className="text-slate-400 text-xs text-center">
        Ad Space Available<br/>
        (Paste your ad code here)
      </p>
    </div>
  );
}