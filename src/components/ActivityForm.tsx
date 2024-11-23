import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { saveActivity } from '../utils/storage';
import toast from 'react-hot-toast';

const CATEGORIES = ['Work', 'Personal', 'Health', 'Learning'];

export const ActivityForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await saveActivity(content, category);
      toast.success('Activity saved!');
      setContent('');
    } catch (error) {
      toast.error('Failed to save activity');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="activity" className="block text-sm font-medium text-gray-700">
          What have you done?
        </label>
        <textarea
          id="activity"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows={3}
          placeholder="Describe your activity..."
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Activity
      </button>
    </form>
  );
};