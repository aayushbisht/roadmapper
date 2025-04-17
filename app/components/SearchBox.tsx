'use client';

import { useState } from 'react';
import Milestone from './Milestone';

interface Milestone {
  title: string;
  description: string;
  tools: string[];
  dependencies: string[];
}

interface RoadmapResponse {
  milestones: Milestone[];
}

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roadmap, setRoadmap] = useState<RoadmapResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRoadmap(null);

    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectDescription: searchQuery }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate roadmap');
      }

      const data = await response.json();
      setRoadmap(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="I want to build a..."
          className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2">Generating your roadmap...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {roadmap && (
        <div className="space-y-6">
          {roadmap.milestones.map((milestone, index) => (
            <Milestone
              key={index}
              title={milestone.title}
              description={milestone.description}
              tools={milestone.tools}
              dependencies={milestone.dependencies}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
} 