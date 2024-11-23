import React from 'react';
import { ActivityForm } from './components/ActivityForm';
import { ActivityList } from './components/ActivityList';
import { Toaster } from 'react-hot-toast';
import { ClipboardList } from 'lucide-react';

function App() {
  return (
    <div className="w-[400px] min-h-[600px] bg-gray-50">
      <div className="p-4 bg-white border-b shadow-sm">
        <div className="flex items-center space-x-2">
          <ClipboardList className="w-6 h-6 text-indigo-600" />
          <h1 className="text-xl font-semibold text-gray-900">Activity Tracker</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <ActivityForm />
        <ActivityList />
      </div>
      
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;