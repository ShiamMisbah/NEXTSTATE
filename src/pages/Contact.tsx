import { motion } from "motion/react";
import CustomCursor from "../components/layout/CustomCursor";

export default function Contact() {
  return (
    <div className="bg-ivory pt-32 pb-24 min-h-screen relative">
      <CustomCursor theme="light" />
      <div className="container mx-auto px-6 md:px-12 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-charcoal mb-4">
            Contact Us
          </h1>
          <p className="font-sans text-lg text-soft-text max-w-md mx-auto">
            Please fill out the form below and our team will get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-charcoal mb-2">Full Name</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full bg-ivory border border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-colors font-sans"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-charcoal mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                required
                className="w-full bg-ivory border border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-colors font-sans"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-charcoal mb-2">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                required
                className="w-full bg-ivory border border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-colors font-sans"
                placeholder="+880 1XXX XXXXXX"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-charcoal mb-2">Message</label>
              <textarea 
                id="message" 
                rows={5}
                required
                className="w-full bg-ivory border border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:border-emerald focus:ring-1 focus:ring-emerald transition-colors font-sans resize-none"
                placeholder="How can we help?"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald hover:bg-emerald-bright text-white font-sans font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
