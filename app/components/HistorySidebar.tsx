'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface RoadmapHistory {
  id: string;
  project_description: string;
  created_at: string;
}

export default function HistorySidebar() {
  const [history, setHistory] = useState<RoadmapHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error } = await supabase
        .from('roadmaps')
        .select('id, project_description, created_at')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching history:', error);
        return;
      }

      setHistory(data || []);
      setLoading(false);
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateDescription = (description: string) => {
    if (description.length <= 50) return description;
    return description.substring(0, 50) + '...';
  };

  return (
    <div className="w-80 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">History</h2>
      </div>
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No roadmaps yet
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => router.push(`/saved/${item.id}`)}
                  className="w-full p-4 text-left hover:bg-gray-100 transition-colors duration-150"
                >
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-gray-900 font-medium">
                      {truncateDescription(item.project_description)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(item.created_at)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 