import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import MicText from '../components/micText';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const CycleForm = () => {
  // const startListening = () => SpeechRecognition.startListening({ continuous: true });
  // const stopListening = SpeechRecognition.stopListening();

  // const { transcript, listening, browserSupportsSpeechRecognition} = useSpeechRecognition();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cycleStartDate: '',
      cycleEndDate: '',
      lutealPhaseLength: '',
      symptoms: [{ date: '', flowIntensity: '', cramps: '', mood: '', bodyTemperature: '', cervicalMucus: '', ovulationTestResult: '', additionalNotes: '' }],
      lifestyleFactors: {
        sleepHours: '',
        stressLevel: '',
        exerciseRoutine: '',
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'symptoms',
  });

  const onSubmit = (data) => {
    console.log(data);
    // TODO: Send data to backend via API
  };

  return (
    <div className="bg-pink-50 min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-pink-700 mb-6 text-center">Log Your Cycle Data</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Cycle Information */}
          <section>
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Cycle Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cycle Start Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                  {...register('cycleStartDate', { required: 'Cycle start date is required' })}
                />
                {errors.cycleStartDate && (
                  <span className="text-pink-600 text-sm mt-1">{errors.cycleStartDate.message}</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cycle End Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                  {...register('cycleEndDate', {
                    required: 'Cycle end date is required',
                    validate: (value) =>
                      new Date(value) > new Date(document.getElementById('cycleStartDate')?.value) || 'End date must be after start date',
                  })}
                />
                {errors.cycleEndDate && (
                  <span className="text-pink-600 text-sm mt-1">{errors.cycleEndDate.message}</span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Luteal Phase Length (days, optional)</label>
                <input
                  type="number"
                  min="1"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                  {...register('lutealPhaseLength')}
                />
              </div>
            </div>
          </section>

          {/* Symptoms */}
          <section>
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Symptoms</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 bg-pink-50 rounded-lg mb-4 shadow-sm border border-pink-200">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                      {...register(`symptoms.${index}.date`, { required: 'Symptom date is required' })}
                    />
                    {errors.symptoms?.[index]?.date && (
                      <span className="text-pink-600 text-sm mt-1">{errors.symptoms[index].date.message}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Flow Intensity</label>
                      <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                        {...register(`symptoms.${index}.flowIntensity`)}
                      >
                        <option value="">Select...</option>
                        <option value="Light">Light</option>
                        <option value="Medium">Medium</option>
                        <option value="Heavy">Heavy</option>
                        <option value="Spotting">Spotting</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cramps</label>
                      <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                        {...register(`symptoms.${index}.cramps`)}
                      >
                        <option value="">Select...</option>
                        <option value="None">None</option>
                        <option value="Mild">Mild</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Severe">Severe</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Mood</label>
                      <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                        {...register(`symptoms.${index}.mood`)}
                      >
                        <option value="">Select...</option>
                        <option value="Happy">Happy</option>
                        <option value="Irritable">Irritable</option>
                        <option value="Sad">Sad</option>
                        <option value="Anxious">Anxious</option>
                        <option value="Neutral">Neutral</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Body Temperature (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                      {...register(`symptoms.${index}.bodyTemperature`)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cervical Mucus</label>
                      <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                        {...register(`symptoms.${index}.cervicalMucus`)}
                      >
                        <option value="">Select...</option>
                        <option value="Dry">Dry</option>
                        <option value="Sticky">Sticky</option>
                        <option value="Creamy">Creamy</option>
                        <option value="Egg White">Egg White</option>
                        <option value="Watery">Watery</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Ovulation Test Result</label>
                      <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                        {...register(`symptoms.${index}.ovulationTestResult`)}
                      >
                        <option value="">Select...</option>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                        <option value="Not Taken">Not Taken</option>
                      </select>
                    </div>
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                    <textarea
                      className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                      rows="3"
                      {...register(`symptoms.${index}.additionalNotes`)}
                    />
                  </div> */}
                  <MicText register={register} index={index}/>
                </div>
                <button
                  type="button"
                  className="mt-4 text-sm text-pink-600 hover:text-pink-800 transition duration-200"
                  onClick={() => remove(index)}
                >
                  Remove Symptom Log
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-full md:w-auto px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition duration-200 shadow-md"
              onClick={() =>
                append({
                  date: '',
                  flowIntensity: '',
                  cramps: '',
                  mood: '',
                  bodyTemperature: '',
                  cervicalMucus: '',
                  ovulationTestResult: '',
                  additionalNotes: '',
                })
              }
            >
              Add Symptom Log
            </button>
          </section>

          {/* Lifestyle Factors */}
          <section>
            <h3 className="text-xl font-semibold text-pink-600 mb-4">Lifestyle Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Average Sleep Hours</label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                  {...register('lifestyleFactors.sleepHours')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stress Level</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                  {...register('lifestyleFactors.stressLevel')}
                >
                  <option value="">Select...</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Exercise Routine</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition duration-200"
                  {...register('lifestyleFactors.exerciseRoutine')}
                >
                  <option value="">Select...</option>
                  <option value="Sedentary">Sedentary</option>
                  <option value="Light">Light</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Intense">Intense</option>
                </select>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition duration-300 shadow-md"
          >
            Submit Cycle Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default CycleForm