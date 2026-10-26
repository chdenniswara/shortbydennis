import React, { useState, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Check, ExternalLink, 
  Mail, Instagram, Linkedin, ArrowUpRight, Menu, X, 
  Sparkles, Sliders, Film, Layers, Send, ChevronRight, CheckCircle2
} from 'lucide-react';

// Sample 9:16 Video Portfolio Data
const PROJECTS_DATA = [
  {
    id: 'matcha-beverage',
    title: 'Matcha Ritual — Brand Edit',
    category: 'Product & Brand',
    categoryTag: 'Product Promo',
    platform: 'Instagram Reels / TikTok',
    oneLiner: 'Fast-paced, sensory-driven product promo with sound design.',
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-coffee-into-a-glass-41031-large.mp4',
    rawVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-coffee-into-a-glass-41031-large.mp4',
    overview: 'Promotional edit designed for a modern beverage brand looking to highlight product texture, sound effects, and aesthetic appeal.',
    approach: 'Used precise match cuts synced with organic sound effects (foley) to create a satisfying sensory loop.',
    decisions: [
      'Hook: 0.5s liquid splash effect to pause scrolling',
      'Rhythm: Micro-cut sync with upbeat lo-fi track',
      'Color: Vibrant green saturation bump for fresh product visual',
      'Captions: Clean kinetic typography on key product benefits'
    ]
  },
  {
    id: 'perfume-cinematic',
    title: 'Noir Perfume — Visual Story',
    category: 'Product & Brand',
    categoryTag: 'Cinematic Product',
    platform: 'Instagram Reels',
    oneLiner: 'Moody and luxury visual story focused on lighting and elegance.',
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-studio-setting-41584-large.mp4',
    rawVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-studio-setting-41584-large.mp4',
    overview: 'A luxury product visual story intended for premium brand positioning and organic Reels engagement.',
    approach: 'Focus on slow-motion transitions, elegant contrast, and subtle motion graphics to convey luxury without loud audio.',
    decisions: [
      'Hook: High-contrast light flare reveal',
      'Pacing: Slower, intentional cuts to reflect luxury',
      'Audio: Ambient bass rumble with crisp spray sounds'
    ]
  },
  {
    id: 'creator-vlog-story',
    title: 'Daily Creator Vlog — Retention Edit',
    category: 'Creator Content',
    categoryTag: 'Personal Brand',
    platform: 'TikTok / Shorts',
    oneLiner: 'High-energy storytelling edit designed to keep viewers until the last second.',
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-skating-on-a-sunny-day-41566-large.mp4',
    rawVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-skating-on-a-sunny-day-41566-large.mp4',
    overview: 'Lifestyle creator content edited for high retention using rapid hook framing and continuous dynamic captions.',
    approach: 'Eliminated all silence gaps, added dynamic zoom punches, and integrated contextual overlay popups.',
    decisions: [
      'Hook: High-stakes statement in first 2 seconds',
      'Retention: Zoom punch every 1.8 seconds on key words',
      'Graphics: Minimalist pop-up sound cues and emojis'
    ]
  },
  {
    id: 'fixie-cycling-action',
    title: 'Urban Fixie Rider — Speed Edit',
    category: 'Creator Content',
    categoryTag: 'Action & Lifestyle',
    platform: 'Instagram Reels / Shorts',
    oneLiner: 'Dynamic motion edit with rhythmic speed ramps and urban aesthetics.',
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-riding-a-bicycle-in-the-city-41215-large.mp4',
    rawVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-riding-a-bicycle-in-the-city-41215-large.mp4',
    overview: 'Lifestyle action edit capturing urban cycling culture through rhythmic speed ramps and punchy bass drops.',
    approach: 'Utilized velocity editing techniques to sync bicycle movement directly with drum transients.',
    decisions: [
      'Hook: Instant motion blur cut into frame',
      'Pacing: Speed ramp from 50% to 300% on beat drops',
      'Audio: Layered tire skids and street noise ambience'
    ]
  },
  {
    id: 'ugc-skincare-ad',
    title: 'UGC Skincare — Conversion Hook',
    category: 'UGC & Ads',
    categoryTag: 'Performance Ad',
    platform: 'TikTok Ads / Reels',
    oneLiner: 'Authentic performance-focused edit built for direct response advertising.',
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-facial-cream-41581-large.mp4',
    rawVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-applying-facial-cream-41581-large.mp4',
    overview: 'UGC-style performance ad focusing on problem-solution framing, native TikTok aesthetic, and strong CTA.',
    approach: 'Kept the feel raw and relatable while applying strict pacing rules to prevent scroll-away.',
    decisions: [
      'Hook: Pattern-interrupt text over raw camera angle',
      'Captions: Native TikTok bold yellow/white style',
      'CTA: Clean animated end-screen badge'
    ]
  },
  {
    id: 'podcast-short-repurpose',
    title: 'Podcast Highlight — Hook & Captions',
    category: 'Repurposed',
    categoryTag: 'Podcast to Short',
    platform: 'YouTube Shorts / Reels',
    oneLiner: 'Repurposed long-form interview clip with auto-highlight framing & dynamic captions.',
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-speaking-at-a-podcast-recording-41219-large.mp4',
    rawVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-speaking-at-a-podcast-recording-41219-large.mp4',
    overview: 'Extracted high-value moment from a 45-minute podcast and converted it into a viral 30-second vertical short.',
    approach: 'Reframed landscape footage to vertical 9:16, added active speaker auto-tracking, and stylized word-by-word captions.',
    decisions: [
      'Hook: Started with the punchline answer first (Inverted Hook)',
      'Layout: Split-screen active speaker setup',
      'Visuals: Added relevant b-roll overlays on key noun mentions'
    ]
  },
  {
    id: 'educational-breakdown',
    title: 'Talking Head — Educational Breakdown',
    category: 'Creator Content',
    categoryTag: 'Educational',
    platform: 'YouTube Shorts / TikTok',
    oneLiner: 'Clean, engaging educational edit with visual emphasis and graphic overlays.',
    aspectRatio: '9:16',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-explaining-a-topic-on-a-video-call-41582-large.mp4',
    rawVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-explaining-a-topic-on-a-video-call-41582-large.mp4',
    overview: 'Talking-head educational content designed to simplify complex concepts through visual graphics.',
    approach: 'Maintained fast pacing with subtle sound effects for every graphic popup to sustain attention.',
    decisions: [
      'Hook: Animated question badge in first frame',
      'Captions: Word-by-word highlighted active spoken word',
      'B-roll: Vector graphics and chart callouts'
    ]
  }
];

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [showRawComparison, setShowRawComparison] = useState(false);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', brand: '', projectType: 'Short-Form Video Editing', details: ''
  });

  const heroVideoRef = useRef(null);

  const categories = ['All', 'Product & Brand', 'Creator Content', 'UGC & Ads', 'Repurposed'];

  const filteredProjects = selectedFilter === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === selectedFilter);

  const toggleHeroPlay = () => {
    if (heroVideoRef.current) {
      if (isHeroPlaying) {
        heroVideoRef.current.pause();
      } else {
        heroVideoRef.current.play();
      }
      setIsHeroPlaying(!isHeroPlaying);
    }
  };

  const toggleHeroMute = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !isHeroMuted;
      setIsHeroMuted(!isHeroMuted);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F3F4F6] font-sans antialiased selection:bg-[#D4FF33] selection:text-[#0D0F12]">
      
      {/* --- STICKY NAVIGATION --- */}
      <header className="sticky top-0 z-40 bg-[#0D0F12]/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Wordmark */}
          <a href="#" className="flex items-center gap-3 group">
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-[#D4FF33] transition-colors">
              Short by Dennis
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-[#D4FF33]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF33] animate-pulse"></span>
              Available
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#approach" className="hover:text-white transition-colors">Approach</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold bg-[#D4FF33] text-[#0D0F12] hover:bg-[#c2f026] transition-all hover:scale-105 active:scale-95"
            >
              Let's Talk
            </a>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-white/10 bg-[#0D0F12] px-6 py-6 flex flex-col gap-4 text-base font-medium">
            <a href="#work" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4FF33]">Work</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4FF33]">Services</a>
            <a href="#approach" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4FF33]">Approach</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4FF33]">About</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#D4FF33]">Contact</a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 rounded-full font-semibold bg-[#D4FF33] text-[#0D0F12]"
            >
              Let's Talk
            </a>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Copy */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-6 tracking-wide uppercase">
                <Sparkles size={14} className="text-[#D4FF33]" />
                SHORT-FORM VIDEO EDITOR · REELS · TIKTOK · SHORTS
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
                Scroll-Stopping Videos. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                  Edited with Purpose.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl font-normal leading-relaxed mb-8">
                I help international & Indonesian brands and creators turn raw footage and creative ideas into engaging short-form videos built for social media retention.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <a 
                  href="#work" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-[#D4FF33] text-[#0D0F12] hover:bg-[#c2f026] transition-all hover:scale-105"
                >
                  View My Work
                  <ArrowUpRight size={18} />
                </a>
                <a 
                  href="#contact" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-all"
                >
                  Let's Work Together
                </a>
              </div>
            </div>

            {/* Right Column: 3-Card Reel Showcase Strip */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[340px] sm:max-w-[380px]">
                
                {/* Main 9:16 Vertical Video Frame */}
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl group">
                  <video 
                    ref={heroVideoRef}
                    src="https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-coffee-into-a-glass-41031-large.mp4"
                    poster="https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80"
                    autoPlay 
                    loop 
                    muted={isHeroMuted}
                    playsInline 
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-90 transition-opacity p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono bg-black/60 backdrop-blur-md text-[#D4FF33] px-2.5 py-1 rounded-full border border-[#D4FF33]/30">
                        Featured Reel
                      </span>
                      <button 
                        onClick={toggleHeroMute}
                        className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                      >
                        {isHeroMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">Matcha Ritual — Brand Edit</h3>
                      <p className="text-xs text-gray-300 mt-1">Short-Form Product Storytelling</p>
                      
                      <button 
                        onClick={toggleHeroPlay}
                        className="mt-3 w-full py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-xs font-medium text-white flex items-center justify-center gap-2 border border-white/10 transition-all"
                      >
                        {isHeroPlaying ? <Pause size={14} /> : <Play size={14} />}
                        {isHeroPlaying ? 'Pause Preview' : 'Play Preview'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Decorative Stacked Side Cards */}
                <div className="absolute -z-10 -right-4 top-8 bottom-8 w-full rounded-2xl border border-white/10 bg-white/5 rotate-3 pointer-events-none hidden sm:block" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SELECTED WORK / PORTFOLIO GRID --- */}
      <section id="work" className="py-20 md:py-32 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs font-mono text-[#D4FF33] uppercase tracking-wider mb-2">Portfolio</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Selected Work</h2>
              <p className="text-gray-400 mt-2 text-base sm:text-lg max-w-xl">
                A selection of edits exploring product storytelling, creator content, and social-first visuals.
              </p>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    selectedFilter === cat 
                      ? 'bg-[#D4FF33] text-[#0D0F12] font-semibold' 
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 9:16 Multi-Column Video Grid (2 cols mobile, 3-4 cols desktop) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => {
                  setActiveModalProject(project);
                  setShowRawComparison(false);
                }}
                className="group relative cursor-pointer rounded-xl overflow-hidden bg-[#161920] border border-white/10 hover:border-[#D4FF33]/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* 9:16 Vertical Aspect Ratio Thumbnail */}
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-neutral-900">
                  <img 
                    src={project.thumbnailUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Play Button Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-3 rounded-full bg-[#D4FF33] text-[#0D0F12] shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play size={20} className="fill-[#0D0F12]" />
                    </span>
                  </div>

                  {/* Platform Badge */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                    <span className="text-[10px] font-mono uppercase bg-black/60 backdrop-blur-md text-gray-300 px-2 py-1 rounded border border-white/10">
                      {project.categoryTag}
                    </span>
                  </div>

                  {/* Card Bottom Copy */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#D4FF33] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                      {project.oneLiner}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- PROJECT DETAIL MODAL --- */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#161920] border border-white/15 rounded-2xl overflow-hidden shadow-2xl my-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#D4FF33]">{activeModalProject.categoryTag} · {activeModalProject.platform}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">{activeModalProject.title}</h3>
              </div>
              <button 
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: 9:16 Video Player with Raw Comparison Toggle */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-black border border-white/10 max-h-[480px]">
                  <video 
                    key={showRawComparison ? 'raw' : 'edited'}
                    src={showRawComparison ? activeModalProject.rawVideoUrl : activeModalProject.videoUrl}
                    controls 
                    autoPlay 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Raw vs Polished Toggle */}
                <div className="mt-4 flex items-center gap-2 p-1.5 rounded-lg bg-white/5 border border-white/10 w-full justify-center">
                  <button 
                    onClick={() => setShowRawComparison(false)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${!showRawComparison ? 'bg-[#D4FF33] text-[#0D0F12]' : 'text-gray-400 hover:text-white'}`}
                  >
                    Polished Edit
                  </button>
                  <button 
                    onClick={() => setShowRawComparison(true)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${showRawComparison ? 'bg-[#D4FF33] text-[#0D0F12]' : 'text-gray-400 hover:text-white'}`}
                  >
                    Raw Footage
                  </button>
                </div>
              </div>

              {/* Right Column: Case Study Details */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-[#D4FF33] uppercase tracking-wider mb-1">Project Overview</h4>
                  <p className="text-sm text-gray-300 mb-5 leading-relaxed">{activeModalProject.overview}</p>

                  <h4 className="text-sm font-semibold text-[#D4FF33] uppercase tracking-wider mb-1">Editing Approach</h4>
                  <p className="text-sm text-gray-300 mb-5 leading-relaxed">{activeModalProject.approach}</p>

                  <h4 className="text-sm font-semibold text-[#D4FF33] uppercase tracking-wider mb-2">Key Creative Decisions</h4>
                  <ul className="space-y-2 mb-6">
                    {activeModalProject.decisions.map((dec, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <CheckCircle2 size={16} className="text-[#D4FF33] shrink-0 mt-0.5" />
                        <span>{dec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <a 
                    href="#contact" 
                    onClick={() => setActiveModalProject(null)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#D4FF33] text-[#0D0F12] hover:bg-[#c2f026]"
                  >
                    Request Similar Edit
                    <ChevronRight size={16} />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-20 md:py-32 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-mono text-[#D4FF33] uppercase tracking-wider mb-2">Capabilities</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">What I Can Help You Create</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-[#161920] border border-white/10 hover:border-[#D4FF33]/40 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 text-[#D4FF33] mb-6">
                <Film size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Short-Form Video Editing</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Engaging vertical videos tailored for Instagram Reels, TikTok, and YouTube Shorts. Focused on strong hooks, seamless pacing, and retention.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold text-[#D4FF33] hover:underline">
                Discuss Your Project <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-[#161920] border border-white/10 hover:border-[#D4FF33]/40 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 text-[#D4FF33] mb-6">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Product & Brand Videos</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Visually compelling product edits that communicate brand value, highlight textures, and convert viewers into customers.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold text-[#D4FF33] hover:underline">
                Discuss Your Project <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-[#161920] border border-white/10 hover:border-[#D4FF33]/40 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 text-[#D4FF33] mb-6">
                <Sliders size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Creator & Personal Brand Content</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Clean, engaging edits for talking-head videos, lifestyle vlogs, and educational creators who value authenticity and sharp rhythm.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold text-[#D4FF33] hover:underline">
                Discuss Your Project <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Card 4 */}
            <div className="p-8 rounded-2xl bg-[#161920] border border-white/10 hover:border-[#D4FF33]/40 transition-all group">
              <div className="p-3 w-fit rounded-xl bg-white/5 border border-white/10 text-[#D4FF33] mb-6">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Podcast & Long-Form Repurposing</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Transform long-form recordings and interviews into multiple viral short clips equipped with custom subtitles and hook framing.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 text-xs font-bold text-[#D4FF33] hover:underline">
                Discuss Your Project <ArrowUpRight size={14} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* --- EDITING APPROACH SECTION --- */}
      <section id="approach" className="py-20 md:py-32 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-xs font-mono text-[#D4FF33] uppercase tracking-wider mb-2">Workflow</p>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">More Than Just Cutting Clips.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Understand', desc: 'Deep dive into content goals, target audience psychology, and platform specifics.' },
              { num: '02', title: 'Structure', desc: 'Craft the strongest opening hook, refine narrative arc, and establish retention pacing.' },
              { num: '03', title: 'Edit', desc: 'Add kinetic captions, sound design, color grade, and dynamic visual cutaways.' },
              { num: '04', title: 'Deliver', desc: 'Export platform-optimized vertical renders ready for high-performing upload.' },
            ].map((step, index) => (
              <div key={index} className="p-6 rounded-xl bg-[#161920] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-3xl font-mono font-bold text-[#D4FF33] block mb-4">{step.num}</span>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT ME SECTION --- */}
      <section id="about" className="py-20 md:py-32 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/15 bg-neutral-900">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" 
                  alt="Dennis" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs text-gray-300 font-mono">
                  Dennis — Short-Form Video Editor
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs font-mono text-[#D4FF33] uppercase tracking-wider mb-2">About Me</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Hey, I'm Dennis.</h2>
              
              <div className="space-y-4 text-base text-gray-300 leading-relaxed">
                <p>
                  I'm Dennis, a creative professional focused on short-form video editing for international and Indonesian brands and content creators.
                </p>
                <p>
                  I enjoy turning raw footage and simple ideas into clear, engaging visual stories. My approach combines creative thinking, attention to detail, and platform-aware editing to help content communicate more effectively and retain viewer attention.
                </p>
                <p>
                  Whether you need consistent video editing support or help launching a short-form campaign, I'm always open to collaborating on thoughtful projects.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">Instagram Reels</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">TikTok Ads</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">YouTube Shorts</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">Premiere Pro & CapCut</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5">
              <p className="text-xs font-mono text-[#D4FF33] uppercase tracking-wider mb-2">Get In Touch</p>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">Let's Create Something Great.</h2>
              <p className="text-gray-400 text-base mb-8 leading-relaxed">
                Tell me a little about your project, your content goals, and what you're looking to achieve. I'll get back to you within 24 hours.
              </p>

              <div className="space-y-4">
                <a href="mailto:hello@shortbydennis.com" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#D4FF33]">
                  <Mail size={18} className="text-[#D4FF33]" />
                  hello@shortbydennis.com
                </a>
                <div className="flex items-center gap-4 pt-4">
                  <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10">
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 rounded-2xl bg-[#161920] border border-white/10">
                {formSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#D4FF33]/20 text-[#D4FF33] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                    <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
                      Thanks for reaching out. I'll review your project details and reply to your email shortly.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)} 
                      className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white/10 text-white hover:bg-white/20"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Your Name</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Dennis" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D4FF33]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1.5">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="hello@brand.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D4FF33]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Brand / Company Name</label>
                      <input 
                        type="text" 
                        placeholder="Your Brand Name" 
                        value={formData.brand}
                        onChange={(e) => setFormData({...formData, brand: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D4FF33]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Project Type</label>
                      <select 
                        value={formData.projectType}
                        onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D4FF33]"
                      >
                        <option value="Short-Form Video Editing">Short-Form Video Editing (Reels / TikTok)</option>
                        <option value="Product & Brand Videos">Product & Brand Videos</option>
                        <option value="Creator Content">Creator Content</option>
                        <option value="Podcast Repurposing">Podcast Repurposing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1.5">Project Details</label>
                      <textarea 
                        rows={4} 
                        required
                        placeholder="Tell me about your video volume, raw footage status, or goals..." 
                        value={formData.details}
                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-[#D4FF33]"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-3.5 rounded-lg bg-[#D4FF33] text-[#0D0F12] font-bold text-sm hover:bg-[#c2f026] transition-all flex items-center justify-center gap-2"
                    >
                      Send Message <Send size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/10 bg-black/40 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white text-sm">Short by Dennis</p>
            <p className="mt-1">Short-form video editing for brands & creators.</p>
          </div>
          <p>© {new Date().getFullYear()} Short by Dennis. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}