export default function HealthMetricsSlide({ formData, handleNestedChange }) {
    return (
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-pink-600">Health Metrics</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label>Sleep Hours: {formData.lifestyleFactors.sleepHours} hours</label>
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={formData.lifestyleFactors.sleepHours}
              onChange={(e) =>
                handleNestedChange('lifestyleFactors', 'sleepHours', parseFloat(e.target.value))
              }
              className="w-full"
            />
          </div>
          {/* Add more health metrics fields */}
        </div>
      </div>
    );
  }