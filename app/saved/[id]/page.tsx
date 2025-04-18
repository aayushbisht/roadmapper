'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import Milestone from '../../components/Milestone';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';

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

export default function SavedRoadmap() {
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState<SavedRoadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const truncateDescription = (description: string) => {
    if (description.length <= 50) return capitalizeFirstLetter(description);
    return capitalizeFirstLetter(description.substring(0, 50)) + '...';
  };

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to view saved roadmaps');
      router.push('/');
      return;
    }

    const fetchRoadmap = async () => {
      const { data, error } = await supabase
        .from('roadmaps')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        toast.error('Failed to load roadmap');
        console.error('Error fetching roadmap:', error);
        router.push('/saved');
        return;
      }

      setRoadmap(data);
      setLoading(false);
    };

    fetchRoadmap();
  }, [user, id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Roadmap not found</h1>
          <button
            onClick={() => router.push('/saved')}
            className="text-blue-500 hover:text-blue-600"
          >
            Back to saved roadmaps
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-12 py-8">
      <div className="mb-8">
   
        <h1 className="text-3xl text-[#b0b0b0] font-bold mb-2">{truncateDescription(roadmap.project_description)}</h1>
        <p className="text-sm text-[#b0b0b0]">
          Created on {new Date(roadmap.created_at).toLocaleDateString()}
        </p>
      </div>
      
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
  );
} 