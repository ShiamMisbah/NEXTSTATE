import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Facebook, ArrowRight } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { cn } from '../../lib/utils';

export default function Footer() {
  return (
    <footer className="relative bg-[#020604] pt-16 pb-6 overflow-hidden">
      {/* Top emerald divider/gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16"
        >
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <div className="mb-6 -ml-2">
              <Logo light />
            </div>
            <p className="text-white/80 font-sans text-sm mb-8 leading-relaxed max-w-sm">
              Building the technology behind Bangladesh's progress.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="X (Twitter)" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="flex flex-col lg:pl-10">
            <span className="font-mono uppercase tracking-widest text-emerald-500 text-xs font-semibold mb-6">
              Explore
            </span>
            <nav className="flex flex-col gap-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Technology', path: '/technology' },
                { name: 'Advisory', path: '/advisory' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-white/80 hover:text-emerald-500 transition-colors duration-300 font-sans text-sm w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Group */}
          <div className="flex flex-col">
            <span className="font-mono uppercase tracking-widest text-emerald-500 text-xs font-semibold mb-6">
              Group
            </span>
            <ul className="flex flex-col gap-3 font-sans text-sm text-white/80 mb-6">
              <li>Nexstate Corporation</li>
              <li>Backdesk Solutions</li>
              <li>Career Developers Bangladesh</li>
            </ul>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-wider mt-auto">
              A Nexstate Corporation group.
            </p>
          </div>

          {/* Column 4: Get in touch */}
          <div className="flex flex-col">
            <span className="font-mono uppercase tracking-widest text-emerald-500 text-xs font-semibold mb-6">
              Get in Touch
            </span>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/80 mb-8">
              <a href="mailto:contact@nexstate.com.bd" className="hover:text-emerald-500 transition-colors duration-300 break-all w-fit">
                contact@nexstate.com.bd
              </a>
              <a href="https://nexstate.com.bd" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors duration-300 w-fit">
                nexstate.com.bd
              </a>
            </div>
            
            <Link 
              to="/contact"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-emerald-500 hover:text-emerald-400 transition-colors mt-auto w-fit"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-white/40">
          <p>© 2025 Nexstate Corporation. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
