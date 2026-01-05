import React, { useState, useEffect, useRef } from 'react';

interface StopwatchProps {
  onStop?: (seconds: number) => void;
  label?: string;
  color?: string;
}

const Stopwatch: React.FC<StopwatchProps> = ({ onStop, label = "Cronômetro", color = "rose" }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;
      timerRef.current = window.setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
      if (onStop) onStop(time / 1000);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTime(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = () => {
    const totalSeconds = time / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const centiseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const colorClasses: Record<string, string> = {
    rose: "text-rose-600 bg-rose-50 border-rose-200",
    purple: "text-purple-600 bg-purple-50 border-purple-200",
    blue: "text-blue-600 bg-blue-50 border-blue-200"
  };

  const btnClasses: Record<string, string> = {
    rose: "bg-rose-600 shadow-rose-200",
    purple: "bg-purple-600 shadow-purple-200",
    blue: "bg-blue-600 shadow-blue-200"
  };

  return (
    <div className={`p-6 rounded-[2rem] border-2 flex flex-col items-center gap-4 ${colorClasses[color] || colorClasses.rose}`}>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{label}</span>
        <span className="text-4xl font-mono font-black tracking-tighter tabular-nums">
          {formatTime()}
        </span>
      </div>
      
      <div className="flex gap-2 w-full">
        {!isRunning ? (
          <button 
            onClick={startTimer}
            className={`flex-1 py-3 rounded-xl text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 ${btnClasses[color]}`}
          >
            Iniciar
          </button>
        ) : (
          <button 
            onClick={stopTimer}
            className="flex-1 py-3 rounded-xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95"
          >
            Parar
          </button>
        )}
        <button 
          onClick={resetTimer}
          className="px-4 py-3 rounded-xl bg-white border-2 border-slate-200 text-slate-400 hover:text-slate-600 transition-all"
        >
          <span className="material-symbols-outlined text-lg">restart_alt</span>
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;