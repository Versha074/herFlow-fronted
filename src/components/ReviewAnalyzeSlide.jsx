export default function ReviewAnalyzeSlide({ formData, handleSubmit }) {
    return (
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-pink-600">Review & Analyze</h2>
        <div className="space-y-6 text-gray-700">
          <h3 className="text-lg font-medium">Cycle Summary</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>Start Date</div>
            <div>{formData.cycleStartDate || 'Not set'}</div>
            <div>End Date</div>
            <div>{formData.cycleEndDate || 'Not set'}</div>
          </div>
          {/* Add more review content */}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
        >
          Analyze with AI
        </button>
      </div>
    );
  }