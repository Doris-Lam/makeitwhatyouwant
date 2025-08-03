'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExplore = (path: string) => {
    router.push(path);
  };

  const handleRandomWebsite = () => {
    const randomWords = [
      // Themes
      'neon', 'crystal', 'shadow', 'rainbow', 'cosmic', 'digital', 'mystic', 'cyber', 
      'retro', 'future', 'ancient', 'electric', 'quantum', 'plasma', 'hologram', 'matrix',
      'synthwave', 'steampunk', 'cyberpunk', 'vaporwave', 'darkwave', 'techno', 'glitch',
      
      // Places/Nouns
      'city', 'forest', 'ocean', 'space', 'lab', 'cave', 'tower', 'realm', 'world', 'zone',
      'dimension', 'portal', 'nexus', 'hub', 'station', 'base', 'sanctuary', 'temple',
      'academy', 'factory', 'garden', 'library', 'arena', 'theater', 'marketplace',
      
      // Actions/Concepts
      'adventure', 'journey', 'quest', 'mission', 'exploration', 'discovery', 'creation',
      'transformation', 'evolution', 'revolution', 'awakening', 'ascension', 'meditation',
      'code', 'hack', 'decrypt', 'unlock', 'escape', 'fight', 'dance', 'fly', 'dream',
      
      // Mystical/Fantasy
      'magic', 'spell', 'potion', 'wizard', 'dragon', 'phoenix', 'unicorn', 'fairy',
      'angel', 'demon', 'spirit', 'soul', 'energy', 'aura', 'chakra', 'ritual',
      
      // Sci-Fi/Tech
      'robot', 'android', 'cyborg', 'ai', 'neural', 'data', 'binary', 'circuit',
      'laser', 'plasma', 'fusion', 'quantum', 'nano', 'bio', 'tech', 'system'
    ];
    
    // Generate 2-4 random words for the path
    const pathLength = Math.floor(Math.random() * 3) + 2; // 2 to 4 words
    const selectedWords = [];
    
    for (let i = 0; i < pathLength; i++) {
      const randomIndex = Math.floor(Math.random() * randomWords.length);
      selectedWords.push(randomWords[randomIndex]);
    }
    
    const randomPath = '/' + selectedWords.join('/');
    router.push(randomPath);
  };

  const suggestedPaths = [
    '/matrix/code/reality',
    '/synthwave/city/drive',
    '/crystal/cave/magic',
    '/hologram/lab/future',
    '/galaxy/storm/voyage',
    '/neon/samurai/dojo'
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
             Make it What You Want
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A dynamic website generator that creates unique, interactive HTML pages on-demand using AI. 
            Each URL path generates a completely different experience.
          </p>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">Try these paths:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {suggestedPaths.map((path, index) => (
                <motion.button
                  key={path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleExplore(path)}
                  className="bg-white/10 backdrop-blur-lg rounded-lg px-4 py-3 text-white border border-white/20 hover:border-white/40 transition-all duration-200"
                >
                  {path}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-gray-400"
          >
            <p className="mb-4">Or visit any path you can imagine:</p>
            <code className="bg-gray-800 px-4 py-2 rounded text-green-400">
              {typeof window !== 'undefined' ? window.location.origin : ''}/your/custom/path
            </code>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-8"
          >
            <motion.button
              onClick={handleRandomWebsite}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Generate Random Website
            </motion.button>
            <p className="text-sm text-gray-500 mt-2">Surprise me with something completely random!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-12"
          >
            <a
              href="https://github.com/itsmarsss/thiswebsitedoesnotexist"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 text-white border border-white/20 hover:border-white/40 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
