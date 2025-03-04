export default function SymptomTrackingSlide({ formData, handleNestedChange }) {
    return (
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-pink-600">Symptom Tracking</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label>Flow Intensity</label>
            <select
              value={formData.symptoms.flowIntensity}
              onChange={(e) => handleNestedChange('symptoms', 'flowIntensity', e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option>Light</option>
              <option>Medium</option>
              <option>Heavy</option>
            </select>
          </div>
          {/* Add more symptom tracking fields */}
        </div>
      </div>
    );
  }