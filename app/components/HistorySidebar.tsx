'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import SidebarToggle from './SidebarToggle';
import Image from 'next/image';

interface RoadmapHistory {
  id: string;
  project_description: string;
  created_at: string;
}

export default function HistorySidebar() {
  const [history, setHistory] = useState<RoadmapHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('roadmaps')
        .select('id, project_description, created_at')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to load roadmap history');
        console.error('Error fetching history:', error);
        setLoading(false);
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

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const truncateDescription = (description: string) => {
    if (description.length <= 50) return capitalizeFirstLetter(description);
    return capitalizeFirstLetter(description.substring(0, 50)) + '...';
  };

  return (
    <div className="sidebar w-80 h-screen bg-[#2a2a2a] flex flex-col transition-all duration-300">
      <div className="p-4">
        <Image src="/logo-final.png" alt="logo" width={35} height={35} />
        {/* <h2 className="text-lg font-semibold text-[#b0b0b0]">History</h2> */}
      </div>
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <div className="p-4 text-center text-[#b0b0b0]">
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
                    <p className="text-sm text-[#b0b0b0] font-medium">
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