import { Activity, ActivityState } from '../types';
import { differenceInDays } from 'date-fns';

export const getStorageData = async (): Promise<ActivityState> => {
  const data = await chrome.storage.local.get(['activityState']);
  return data.activityState || { activities: [], totalPoints: 0 };
};

export const calculatePoints = (activities: Activity[], newActivity: Partial<Activity>): number => {
  if (activities.length === 0) return 1;

  const lastActivity = activities[activities.length - 1];
  const daysDifference = differenceInDays(
    new Date(),
    new Date(lastActivity.timestamp)
  );

  // If entry is made on the same day, maintain points
  if (daysDifference === 0) return lastActivity.points;
  
  // If entry is made the next day, increment points
  if (daysDifference === 1) return lastActivity.points + 1;
  
  // If there's a gap, deduct points based on missed days
  return Math.max(1, lastActivity.points - (daysDifference - 1));
};

export const saveActivity = async (content: string, category: string): Promise<void> => {
  const state = await getStorageData();
  
  const newActivity: Activity = {
    id: crypto.randomUUID(),
    content,
    category,
    timestamp: new Date().toISOString(),
    points: calculatePoints(state.activities, { content, category })
  };

  const newState: ActivityState = {
    activities: [...state.activities, newActivity],
    totalPoints: state.activities.reduce((sum, act) => sum + act.points, 0) + newActivity.points
  };

  await chrome.storage.local.set({ activityState: newState });
};