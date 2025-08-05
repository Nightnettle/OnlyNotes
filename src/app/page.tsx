'use client'

import TypewriterTitle from "@/components/TypewriterTitle";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from "next/link";


const fadeIn = {hidden: {opacity: 0, y: 20}, show: {opacity: 1, y: 0}}

export default function Home() {
  return (
    <div className="relative bg-gradient-to-r min-h-screen from-rose-100 to-teal-100">
      <div 
        className="absolute inset-0 grainy opacity-10 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {transition: {staggerChildren: 0.2}}
          }}
          className="max-w-2xl p-12 bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl"
          >
            <motion.h1 variants={fadeIn} className="font-semibold text-7xl text-center">
              Smart Notes, <span className="text-[#00b087] font-bold">Smarter</span> Ideas.
            </motion.h1>
          <div className="mt-4"></div>
          <motion.h2 variants={fadeIn} className="font-semibold text-3xl text-center text-slate-700">
            <TypewriterTitle/>
          </motion.h2>
          <div className="mt-8"></div>
          <motion.div variants={fadeIn} className="flex justify-center">
            <Link href="/dashboard">
              <Button className="bg-[#00b087] hover:scale-105 transition-transform">
                Get Started
                <ArrowRight className="ml-1 w-2 h-2 animate-bounce" strokeWidth={3}/>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
