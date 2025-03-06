const DashboardSkeleton = () => (
    <div className="flex min-h-screen bg-[#FFF0F6]">
      {/* Sidebar Skeleton */}
      <div className="w-72 bg-gradient-to-b from-white to-[#fff5f9] shadow-xl sticky top-0 h-screen p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <nav className="space-y-2">
          {[1,2,3,4].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </nav>
      </div>
  
      {/* Main Content Skeleton */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
  
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
  
        {/* Progress Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[1,2].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          ))}
        </div>
  
        {/* Symptom & Chart Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Symptom Tracker */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
            {[1,2,3].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded mb-2 animate-pulse"></div>
            ))}
          </div>
  
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="h-80 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
  
        {/* Chart Skeleton */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="h-80 bg-gray-200 rounded animate-pulse"></div>
        </div>
  
        {/* Activity Tracker */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
          {[1,2,3].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded mb-2 animate-pulse"></div>
          ))}
        </div>
  
        {/* Goals Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <div className="h-6 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
          <div className="h-40 w-40 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 rounded mx-auto mt-4 animate-pulse"></div>
          <div className="h-10 w-48 bg-gray-200 rounded-lg mx-auto mt-4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  export default DashboardSkeleton;
  