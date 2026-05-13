import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Camera, 
  ShieldCheck, 
  Eye, 
  ChevronDown, 
  Star,
  Activity,
  Zap
} from 'lucide-react';

// --- Sub-components ---

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const diff = midnight.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E5393520] border border-[#E5393540] rounded-full text-[#E53935] text-xs font-semibold">
      <motion.div 
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="w-1.5 h-1.5 bg-[#E53935] rounded-full"
      />
      <span>Flash Sale — 30% off all 4K cameras. Ends in: {format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}</span>
    </div>
  );
};

const CameraPanel = ({ label, status, type }: { label: string; status: 'LIVE' | 'MOTION'; type: 'scan' | 'noise' }) => {
  return (
    <div className="relative aspect-video bg-[#060F1C] rounded-lg overflow-hidden border border-[#FFFFFF10] group">
      {/* Simulation effects */}
      {type === 'scan' && (
        <div 
          className="absolute inset-0 h-[0.5px] bg-teal opacity-20 pointer-events-none" 
          style={{ animation: 'scanline 3s linear infinite' }} 
        />
      )}
      {type === 'noise' && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#00C896_1px,transparent_1px)] bg-[length:4px_4px]" style={{ animation: 'noise 2s infinite' }} />
      )}
      
      {/* Header */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
        <span className="text-[10px] text-text-muted font-mono uppercase tracking-wider">{label}</span>
      </div>
      
      {/* Badge */}
      <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-[#00000080] border border-[#FFFFFF10]">
        <div className={`w-1 h-1 rounded-full ${status === 'LIVE' ? 'bg-green-500' : 'bg-yellow-500'}`} />
        <span className={`text-[9px] font-bold ${status === 'LIVE' ? 'text-green-500' : 'text-yellow-500'}`}>{status}</span>
      </div>

      {/* Placeholder content/scene */}
      <div className="flex items-center justify-center h-full">
        <Camera className="w-8 h-8 text-white/5 group-hover:text-teal/10 transition-colors duration-500" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,.25)_50%),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

// --- Main App ---

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <main className="min-h-svh bg-navy selection:bg-teal selection:text-navy overflow-x-hidden relative flex flex-col">
      {/* Background radial gradient for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0D1F35_0%,#0A1628_60%,#010914_100%)] pointer-events-none" />

      <section className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-20 lg:py-0">
        
        {/* Left Column: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[55%] space-y-8 z-10"
        >
          {/* Live Indicator */}
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-teal/30 rounded-full">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </div>
            <span className="text-[12px] text-teal font-medium tracking-wide">LIVE MONITORING — 2,847 cameras online</span>
          </div>

          {/* Headline Group */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              See Everything.<br />
              <span className="text-teal">Miss Nothing.</span>
            </h1>
            <p className="text-lg lg:text-xl text-text-muted max-w-xl leading-relaxed">
              Professional-grade security cameras for homes, businesses, and critical infrastructure — built to protect what matters most.
            </p>
          </div>

          {/* Key Specs Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: <Zap className="w-4 h-4 text-teal" />, title: "4K Ultra HD", desc: "Crystal-clear footage" },
              { icon: <Eye className="w-4 h-4 text-teal" />, title: "100m Night Vision", desc: "IR illumination" },
              { icon: <ShieldCheck className="w-4 h-4 text-teal" />, title: "IP67 Weatherproof", desc: "Extreme durability" },
            ].map((spec, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex flex-col gap-2 p-4 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.06] transition-colors group cursor-default"
              >
                <div className="p-2 w-fit bg-teal/10 rounded-lg group-hover:bg-teal/20 transition-colors">
                  {spec.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{spec.title}</h3>
                  <p className="text-[11px] text-text-muted">{spec.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              className="px-8 py-4 bg-teal text-navy font-bold rounded-lg transition-all active:scale-95 hover:bg-teal/90 animate-[pulse-teal_2s_infinite]"
              aria-label="Shop Security Cameras"
            >
              Shop Security Cameras
            </button>
            <button 
              className="px-8 py-4 border-2 border-teal text-teal font-bold rounded-lg transition-all hover:bg-teal/5 active:scale-95"
              aria-label="Get a Free System Quote"
            >
              Get a Free System Quote
            </button>
          </div>

          {/* Social Proof & Urgency */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-text-muted font-medium">
                Trusted by 14,000+ customers · <span className="text-white">4.9/5</span> average rating
              </span>
            </div>
            
            <CountdownTimer />
          </div>
        </motion.div>

        {/* Right Column: Visual Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-[45%] z-10"
        >
          {/* Dashboard Container */}
          <div className="relative p-6 bg-[#0D1F35] border border-[#1E3A5F] rounded-2xl shadow-[0_0_50px_rgba(0,200,150,0.1)] group">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />

            {/* Header / Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-teal rounded-full" />
                <span className="text-xs font-bold text-white tracking-widest uppercase">System Dashboard</span>
              </div>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Camera Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <CameraPanel label="CAM 01 — Front Entrance" status="LIVE" type="scan" />
              <CameraPanel label="CAM 02 — Parking Lot" status="MOTION" type="noise" />
              <CameraPanel label="CAM 03 — Server Room" status="LIVE" type="noise" />
              <CameraPanel label="CAM 04 — Rear Exit" status="LIVE" type="scan" />
            </div>

            {/* Status Footer */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[11px] text-text-muted border-t border-[#1E3A5F] pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span>System Online</span>
                </div>
                <span>4 / 4 cameras active</span>
                <span>Recording: 2.1 TB used</span>
              </div>

              {/* Alert Notification */}
              <motion.div 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center justify-between px-3 py-2 bg-red/10 border border-red/20 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-red rounded-full"
                  />
                  <span className="text-[10px] text-red font-bold">Motion detected — CAM 02 Parking Lot — 2s ago</span>
                </div>
                <Activity className="w-3 h-3 text-red opacity-50" />
              </motion.div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-teal/40 rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-teal/40 rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-teal/40 rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-teal/40 rounded-br-lg" />
          </div>
        </motion.div>
      </section>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Scroll to explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </div>
    </main>
  );
}

