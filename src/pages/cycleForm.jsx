import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { createCycle } from '../api/cycleApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MicText from '../components/micText';
import { jwtDecode } from 'jwt-decode';
import { Mic, MicOff } from 'lucide-react';

const CycleForm = () => {
  const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log(token)
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserId(decoded.id);
        } catch (err) {
          setError('Invalid authentication token');
          setLoading(false);
        }
      } else {
        setError('No authentication token found');
        setLoading(false);
      }
      console.log(userId)
    }, []);

  // Initialize form methods
  const formMethods = useForm({
    defaultValues: {
      cycleStartDate: '',
      cycleEndDate: '',
      lutealPhaseLength: 14,
      symptoms: [{
        date: '',
        flowIntensity: '',
        cramps: '',
        mood: '',
        bodyTemperature: '',
        cervicalMucus: '',
        ovulationTestResult: 'Not Taken',
        additionalNotes: '',
      }],
      lifestyleFactors: {
        sleepHours: '',
        stressLevel: 'Moderate',
        exerciseRoutine: 'Light'
      },
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = formMethods;

  const { fields, append, remove } = useFieldArray({ control, name: 'symptoms' });
  const cycleStartDate = watch('cycleStartDate');

  const onSubmit = async (data) => {
    data.userId = userId;
    console.log(data)
    try {
      // const response = await createCycle(data);
      // toast.success('Cycle created successfully');
      // console.log(response);
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create cycle';
      toast.error(message);
    }
  };

  // Enum options for dropdowns
  const intensityOptions = ['Light', 'Medium', 'Heavy', 'Spotting'];
  const crampsOptions = ['None', 'Mild', 'Moderate', 'Severe'];
  const moodOptions = ['Happy', 'Irritable', 'Sad', 'Anxious', 'Neutral'];
  const mucusOptions = ['Dry', 'Sticky', 'Creamy', 'Egg White', 'Watery'];
  const testOptions = ['Positive', 'Negative', 'Not Taken'];
  const stressOptions = ['Low', 'Moderate', 'High'];
  const exerciseOptions = ['Sedentary', 'Light', 'Moderate', 'Intense'];

  return (
    <div className="bg-pink-50 min-h-screen p-6">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
          {/* Cycle Dates Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Cycle Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date *</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  // {...register('cycleStartDate', { required: 'Required' })}
                />
                {errors.cycleStartDate && (
                  <span className="text-red-500 text-sm">{errors.cycleStartDate.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">End Date *</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  // {...register('cycleEndDate', {
                  //   // required: 'Required',
                  //   // validate: (value) => !cycleStartDate || new Date(value) > new Date(cycleStartDate) || 'Must be after start date'
                  // })}
                />
                {errors.cycleEndDate && (
                  <span className="text-red-500 text-sm">{errors.cycleEndDate.message}</span>
                )}
              </div>
            </div>
          </section>

          {/* Symptoms Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Daily Symptoms</h2>
            {fields.map((field, index) => (
              <div key={field.id} className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Day {index + 1}</h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date *</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      // {...register(`symptoms.${index}.date`, { required: 'Required' })}
                    />
                  </div>

                  <SelectField
                    label="Flow Intensity"
                    name={`symptoms.${index}.flowIntensity`}
                    options={intensityOptions}
                    register={register}
                    // required
                  />

                  <SelectField
                    label="Cramps"
                    name={`symptoms.${index}.cramps`}
                    options={crampsOptions}
                    register={register}
                  />

                  <SelectField
                    label="Mood"
                    name={`symptoms.${index}.mood`}
                    options={moodOptions}
                    register={register}
                  />

                  <SelectField
                    label="Cervical Mucus"
                    name={`symptoms.${index}.cervicalMucus`}
                    options={mucusOptions}
                    register={register}
                  />

                  <SelectField
                    label="Ovulation Test"
                    name={`symptoms.${index}.ovulationTestResult`}
                    options={testOptions}
                    register={register}
                  />

                  <div>
                    <label className="block text-sm font-medium mb-1">Body Temp (°C)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border rounded"
                      {...register(`symptoms.${index}.bodyTemperature`)}
                    />
                  </div>

                  {/* MicText Integration */}
                  <div className="col-span-full">
                    <MicText index={index} />
                  </div>  
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ date: '', flowIntensity: '', additionalNotes: '' })}
              className="mt-4 text-pink-600 hover:text-pink-700 text-sm"
            >
              + Add Another Day
            </button>
          </section>

          {/* Lifestyle Factors Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Lifestyle Factors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Daily Sleep Hours</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  {...register('lifestyleFactors.sleepHours')}
                />
              </div>

              <SelectField
                label="Stress Level"
                name="lifestyleFactors.stressLevel"
                options={stressOptions}
                register={register}
              />

              <SelectField
                label="Exercise Routine"
                name="lifestyleFactors.exerciseRoutine"
                options={exerciseOptions}
                register={register}
              />
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition-colors"
          >
            Save Cycle Data
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

// Reusable Select Component
const SelectField = ({ label, name, options, register, required }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      className="w-full p-2 border rounded bg-white"
      // {...register(name, { required: required && 'Required' })}
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default CycleForm;