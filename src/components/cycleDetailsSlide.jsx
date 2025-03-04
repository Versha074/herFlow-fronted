export default function CycleDetailsSlide({ formData, handleChange }) {
    return (
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-pink-600">Cycle Details</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label>Cycle Start Date</label>
            <input
              type="date"
              name="cycleStartDate"
              value={formData.cycleStartDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <label>Cycle End Date</label>
            <input
              type="date"
              name="cycleEndDate"
              value={formData.cycleEndDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>
    );
  }