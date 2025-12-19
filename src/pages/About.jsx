import { motion } from 'framer-motion';
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaNodeJs, FaGithub, FaLaptopCode, FaFilePdf, FaQrcode } from 'react-icons/fa';
import myPhoto from '../assets/abirprofile.png';

// Enhanced premium animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.4,
      duration: 0.6
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50 dark:from-gray-900/90 dark:via-slate-900/50 dark:to-purple-950/90 overflow-x-hidden">
      
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-purple-400/10 to-indigo-500/10 rounded-full blur-2xl animate-ping" />
      </div>

      {/* HERO SECTION - Ultra Premium */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
            className="mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl border border-indigo-200/50 mb-8">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Front-End &Back-End Developer | Rajshahi, BD</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-none sm:leading-tight">
              Hi, I'm <span className="text-amber-500 drop-shadow-lg">Arafat</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Crafting <span className="font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">responsive masterpieces</span> with React, Tailwind & Vite
            </p>
          </motion.div>
          
          {/* Premium Photo with glass overlay */}
          <motion.div 
            initial={{ scale: 0.7, opacity: 0, rotate: -10 }} 
            animate={{ scale: 1, opacity: 1, rotate: 0 }} 
            transition={{ delay: 0.6, duration: 1 }}
            className="mx-auto w-52 h-52 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] relative group cursor-pointer"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10" />
            <img
              src={myPhoto}
              alt="Arafat - Premium Developer Portrait"
              className="w-full h-full object-cover rounded-3xl shadow-2xl border-8 border-white/60 dark:border-slate-800/60 ring-8 ring-indigo-500/40 group-hover:ring-pink-500/60 transition-all duration-700 hover:scale-105 hover:rotate-2 "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <span className="text-white/90 font-bold text-sm px-4 py-2 bg-black/30 rounded-2xl backdrop-blur-sm">✨ Hover Me</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Skills - Diamond Layout */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent text-center mb-24 px-4"
          >
            Premium Tech Stack
          </motion.h2>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto"
          >
            {[
              { icon: FaReact, name: 'React Mastery', desc: 'Hooks • Context • Custom Components', color: 'from-cyan-500 to-blue-600' },
              { icon: FaFilePdf, name: 'PDF Magic', desc: 'CGPA Export • Result Sheets', color: 'from-orange-500 to-red-600' },
              { icon: FaQrcode, name: 'QR Generator', desc: 'Dynamic Codes • React QR', color: 'from-emerald-500 to-teal-600' },
              { icon: FaJsSquare, name: 'JavaScript Pro', desc: 'ES6+ • Performance Optimized', color: 'from-yellow-500 to-amber-600' },
              { icon: FaCss3Alt, name: 'Tailwind Expert', desc: 'Dark Mode • Mobile-First', color: 'from-indigo-500 to-purple-600' },
              { icon: FaLaptopCode, name: 'Mobile Master', desc: 'Realme → iPhone Perfect', color: 'from-pink-500 to-rose-600' },
              { icon: FaNodeJs, name: 'Vite Speed', desc: 'Lightning Builds • HMR', color: 'from-green-500 to-emerald-600' },
              { icon: FaGithub, name: 'Codebase Pro', desc: 'Clean • Documented • Versioned', color: 'from-slate-600 to-slate-800' }
            ].map((skill, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ 
                  y: -16, 
                  scale: 1.08,
                  rotateX: 5,
                  rotateY: 5
                }}
                className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl px-3 pt-5 pb-3 md:p-5 lg:p-7 shadow-2xl border border-white/40 dark:border-slate-700/50 hover:shadow-3xl hover:border-indigo-300/50 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Premium glass overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-r ${skill.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 shadow-indigo-500/50`}>
                  <skill.icon className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow-lg" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 relative z-10">
                  {skill.name}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 relative z-10 leading-relaxed">
                  {skill.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

  {/* Ultra-Smooth Fast Slide Timeline */}
<section className="py-24 sm:py-32 px-4 sm:px-6 bg-gradient-to-br from-indigo-50/70 via-white/80 to-purple-50/70 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-indigo-900/70">
  <div className="max-w-5xl mx-auto">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-4xl sm:text-5xl md:text-6xl font-black text-center text-slate-900 dark:text-white mb-24 px-4"
    >
      Professional Journey ✨
    </motion.h2>
    
    <div className="space-y-12 sm:space-y-16">
      {[
        {
          period: "2025 - Present",
          title: "Senior Front-End Engineer",
          company: "Arafat-Tech Ltd.",
          badge: "Current",
          highlights: [
            "🎯 CGPA calculators with PDF export mastery",
            "📱 Fixed 100+ mobile issues (Realme, Oppo, Xiaomi)",
            "⚡ Created responsive clocks & QR code generators",
            "🌙 Perfect dark/light theme implementation"
          ]
        },
        {
          period: "2024 - 2025",
          title: "Freelance React Specialist",
          company: "20+ Client Projects",
          badge: "Foundation",
          highlights: [
            "🏗️ Built educational web tools ecosystem",
            "🔧 Mastered cross-device responsive perfection",
            "📄 Advanced PDF generation for result sheets",
            "🚀 Optimized Vite builds for production speed"
          ]
        }
      ].map((job, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            x: i % 2 === 0 ? -150 : 150,
            scale: 0.95
          }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            scale: 1
          }}
          viewport={{ once: true }}



          whileHover={{ 
            y: -6, 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/50 dark:border-slate-700/60 hover:shadow-4xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
        >
          {/* Rest of your timeline content stays exactly the same */}
          <div className="absolute right-4 top-4">
            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-bold rounded-full shadow-lg">
              {job.badge}
            </span>
          </div>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
            <div className="w-28 sm:w-32 text-center shrink-0">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all duration-300">
                {job.period}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {job.title}
              </h3>
              <h4 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8">
                {job.company}
              </h4>
              
              <ul className="space-y-3 sm:space-y-4">
                {job.highlights.map((highlight, j) => (
                  <li key={j} className="flex items-start group-hover:translate-x-2 transition-transform duration-300">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl mt-2 mr-4 flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300" />
                    <span className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Luxury CTA */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700/60 shadow-xl mb-8 mx-auto max-w-max">
              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-ping" />
              <span className="text-lg font-semibold text-slate-900 dark:text-white">Ready for Premium Projects</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-8 drop-shadow-2xl">
              Let's Create Something <span className="text-amber-500">Legendary</span>
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Responsive tools • PDF perfection • Cross-device mastery
            </p>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.96 }}
              className="group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-12 sm:px-16 py-6 sm:py-8 rounded-3xl font-black text-xl sm:text-2xl shadow-3xl hover:shadow-4xl border border-transparent hover:border-white/20 backdrop-blur-sm transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                🚀 Start Premium Project
                <div className="w-3 h-3 bg-white/30 rounded-full group-hover:animate-ping group-hover:w-12 group-hover:h-12 transition-all duration-500" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -skew-x-12 transform -translate-x-4 group-hover:translate-x-8 transition-transform duration-700" />
            </motion.a>
            
            <motion.a
              href="/services"
              whileHover={{ scale: 1.05 }}
              className="px-12 sm:px-16 py-6 sm:py-8 border-2 border-white/40 hover:border-white/80 backdrop-blur-xl hover:backdrop-blur-2xl rounded-3xl font-bold text-xl sm:text-2xl text-white hover:text-slate-900 hover:bg-white/90 dark:hover:bg-slate-800/90 shadow-2xl hover:shadow-3xl transition-all duration-500"
            >
              ✨ View Porject
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
