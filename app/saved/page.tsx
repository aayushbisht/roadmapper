'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import Milestone from '../components/Milestone';

interface SavedRoadmap {
  id: string;
  project_description: string;
  milestones: {
    title: string;
    description: string;
    tools: string[];
    dependencies: string[];
  }[];
  created_at: string;
}

export default function SavedRoadmaps() {
  const { user } = useAuth();
  const [roadmaps, setRoadmaps] = useState<SavedRoadmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchRoadmaps = async () => {
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching roadmaps:', error);
        return;
      }

      setRoadmaps(data || []);
      setLoading(false);
    };

    fetchRoadmaps();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Please sign in to view saved roadmaps</h1>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Saved Roadmaps</h1>
      
      {roadmaps.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">You haven't saved any roadmaps yet.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {roadmaps.map((roadmap) => (
            <div key={roadmap.id} className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{roadmap.project_description}</h2>
              <p className="text-sm text-gray-500 mb-6">
                Created on {new Date(roadmap.created_at).toLocaleDateString()}
              </p>
              
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 