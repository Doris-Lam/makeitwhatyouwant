'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ToolbarProps {
  onHardReload: () => void;
  onSoftReload: () => void;
  onRandom: () => void;
  onDownload: () => void;
  onShare: () => void;
  currentPath: string;
}

export default function HoverToolbar({
  onHardReload,
  onSoftReload,
  onRandom,
  onDownload,
  onShare,
  currentPath
}: ToolbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [visitHistory, setVisitHistory] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Load history from localStorage
    const saved = localStorage.getItem('visit-history');
    if (saved) {
      setVisitHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save current path to history
    if (currentPath && !visitHistory.includes(currentPath)) {
      const newHistory = [currentPath, ...visitHistory.slice(0, 9)]; // Keep last 10
      setVisitHistory(newHistory);
      localStorage.setItem('visit-history', JSON.stringify(newHistory));
    }
  }, [currentPath, visitHistory]);

  const buttons = [
    { label: 'Hard Reload', onClick: onHardReload, tooltip: 'Generate completely new content' },
    { label: 'Soft Reload', onClick: onSoftReload, tooltip: 'Refresh current content' },
    { label: 'Random', onClick: onRandom, tooltip: 'Go to random website' },
    { label: 'Download', onClick: onDownload, tooltip: 'Download HTML file' },
    { label: 'Share', onClick: onShare, tooltip: 'Share on Twitter' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
            <div className="bg-white/90 backdrop-blur-lg rounded-full px-6 py-3 border border-gray/20 shadow-2xl">
        <div className="flex items-center space-x-4">
          {buttons.map((button, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={button.onClick}
              className="px-4 py-2 rounded-full text-sm font-normal text-black/80 hover:text-black transition-colors duration-200 whitespace-nowrap"
              title={button.tooltip}
            >
              {button.label}
            </motion.button>
          ))}
          
          {/* GitHub Link */}
          <motion.a
            href="https://github.com/Doris-Lam/makeitwhatyouwant"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full text-sm font-normal text-black/80 hover:text-black transition-colors duration-200 flex items-center space-x-2"
            title="View source code on GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            <span>GitHub</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
