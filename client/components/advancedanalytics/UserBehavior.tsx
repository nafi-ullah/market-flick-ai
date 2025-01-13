import React from "react";

const UserBehaviorAnalytics: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4">User Behavior Analytics</h3>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span>Active Users</span>
          <span className="text-green-600 font-bold">1.2K</span>
        </li>
        <li className="flex justify-between">
          <span>Avg. Session Duration</span>
          <span className="font-bold">5:30</span>
        </li>
        <li className="flex justify-between">
          <span>Bounce Rate</span>
          <span className="text-yellow-600 font-bold">32%</span>
        </li>
      </ul>
      <div className="mt-4">
        <div className="text-sm text-gray-500">Real-time Engagement Score</div>
        <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
          <div className="h-full bg-black rounded-full" style={{ width: "75%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default UserBehaviorAnalytics;
