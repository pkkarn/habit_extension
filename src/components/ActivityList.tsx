import React, { useEffect, useState } from 'react';
import { Activity, ActivityState } from '../types';
import { getStorageData } from '../utils/storage';
import { formatDistanceToNow } from 'date-fns';
import { Trophy } from 'lucide-react';

export const ActivityList: React.FC = () => {
  const [state, setState] = useState<ActivityState>({ activities: [], totalPoints: 0 });

  useEffect(() => {
    const loadActivities = async () => {
      const data = await getStorageData();
      setState(data);
    };

    loadActivities();
    chrome.storage.onChanged.addListener(loadActivities);
    return () => chrome.storage.onChanged.removeListener(loadActivities);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-lg">
        <Trophy className="w-6 h-6 text-indigo-600" />
        <span className="text-lg font-semibold text-indigo-700">
          Total Points: {state.totalPoints}
        </span>
      </div>

      <div className="space-y-4">
        {state.activities.slice().reverse().map((activity: Activity) => (
          <div
            key={activity.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {activity.category}
              </span>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </span>
            </div>
            <p className="text-gray-700">{activity.content}</p>
            <div className="mt-2 text-sm text-gray-500">
              Points: +{activity.points}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};