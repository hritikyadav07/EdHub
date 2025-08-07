import React from 'react'

const ActivityItem = ({ type, title, subtitle, time, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600'
  }

  return (
    <div className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base font-medium text-gray-900 dark:text-white truncate">
          {title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {subtitle}
        </p>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {time}
      </div>
    </div>
  )
}

const RecentActivity = () => {
  const activities = [
    {
      type: 'lesson_started',
      title: 'Started: React Hooks Deep Dive',
      subtitle: 'Complete Web Development Bootcamp',
      time: '2h ago',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l4.828 4.828a1 1 0 01.293.707V17a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1a1 1 0 00-1-1H9a1 1 0 01-1-1v-1a1 1 0 00-1-1H6a1 1 0 01-1-1V9a1 1 0 011-1h2.586a1 1 0 01.707.293l4.828 4.828z" />
        </svg>
      ),
      color: 'blue'
    },
    {
      type: 'course_completed',
      title: 'Completed: JavaScript Fundamentals',
      subtitle: 'Full Stack Development Path',
      time: '1d ago',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'green'
    },
    {
      type: 'certificate_earned',
      title: 'Earned: UI/UX Design Certificate',
      subtitle: 'Design Fundamentals Course',
      time: '2d ago',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: 'purple'
    },
    {
      type: 'assignment_submitted',
      title: 'Submitted: Portfolio Project',
      subtitle: 'Web Development Bootcamp',
      time: '3d ago',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'orange'
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            type={activity.type}
            title={activity.title}
            subtitle={activity.subtitle}
            time={activity.time}
            icon={activity.icon}
            color={activity.color}
          />
        ))}
      </div>
    </div>
  )
}

export default RecentActivity
