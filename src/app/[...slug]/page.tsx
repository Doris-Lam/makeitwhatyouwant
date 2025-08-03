'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import HoverToolbar from '@/components/HoverToolbar';
import { motion } from 'framer-motion';

export default function DynamicPage() {
  const params = useParams();
  const router = useRouter();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Build the full path from params
  const fullPath = Array.isArray(params.slug) ? `/${params.slug.join('/')}` : `/${params.slug}`;

  const generateContent = async (path: string) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate content: ${response.statusText}`);
      }

      const data = await response.json();
      setContent(data.html);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error generating content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateContent(fullPath);
  }, [fullPath]);

  const handleHardReload = () => {
    generateContent(fullPath);
  };

  const handleSoftReload = () => {
    window.location.reload();
  };

  const handleRandom = () => {
    const randomPaths = [
      '/quantum/cafe/multiverse',
      '/dragon/mountain/sanctuary',
      '/cyberpunk/alley/2099',
      '/floating/gardens/sky',
      '/haunted/mansion/midnight',
      '/alien/bazaar/galaxy',
      '/steampunk/airship/adventure',
      '/crystal/caves/wonder',
      '/robot/dance/revolution',
      '/time/traveler/hub',
      '/ninja/temple/secrets',
      '/pirate/ship/treasure',
      '/magic/school/spells',
      '/virtual/reality/maze',
      '/dinosaur/valley/expedition'
    ];
    const randomPath = randomPaths[Math.floor(Math.random() * randomPaths.length)];
    router.push(randomPath);
  };

  const handleDownload = () => {
    if (!content) return;
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fullPath.replace(/\//g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    const shareText = `Check out this AI-generated webpage: ${window.location.href} #ThisWebsiteDoesNotExist`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, '_blank');
  };

  const handleHistory = () => {
    const history = localStorage.getItem('visit-history');
    if (history) {
      const paths = JSON.parse(history);
      const historyText = paths.join('\n');
      alert(`Recent visits:\n${historyText}`);
    } else {
      alert('No history found');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white ml-4 text-lg"
        >
          Generating your unique webpage...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
          <p className="text-white/80 mb-6">{error}</p>
          <button
            onClick={() => generateContent(fullPath)}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
        <HoverToolbar
          onHardReload={handleHardReload}
          onSoftReload={handleSoftReload}
          onRandom={handleRandom}
          onDownload={handleDownload}
          onShare={handleShare}
          onHistory={handleHistory}
          currentPath={fullPath}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Render the AI-generated HTML content */}
      <div 
        dangerouslySetInnerHTML={{ __html: content }}
        className="w-full h-full"
      />
      
      {/* Floating toolbar */}
      <HoverToolbar
        onHardReload={handleHardReload}
        onSoftReload={handleSoftReload}
        onRandom={handleRandom}
        onDownload={handleDownload}
        onShare={handleShare}
        onHistory={handleHistory}
        currentPath={fullPath}
      />
    </div>
  );
}
