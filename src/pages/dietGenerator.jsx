import { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faHome, faCalendarAlt, faDumbbell, faCog, faUserCircle, faPlus, faCookie, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DietPlanGenerator = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    activity: '',
    diet: ''
  });
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userId, setUserId] = useState(null);

  const activityLevels = ['sedentary', 'light', 'moderate', 'active'];
  const dietTypes = ['veg', 'non-veg', 'vegan'];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 100 : prev + 20));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsGenerating(true);
    setProgress(0);

    try {
      const { height, weight, age, activity, diet } = formData;
      if (!height || height <= 0) throw new Error('Invalid height');
      if (!weight || weight <= 0) throw new Error('Invalid weight');
      if (!age || age <= 0) throw new Error('Invalid age');
      if (!activity) throw new Error('Please select activity level');
      if (!diet) throw new Error('Please select diet preference');

      await new Promise(resolve => setTimeout(resolve, 1000));
      const generatedPlan = generateDietPlan();
      setPlan(generatedPlan);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDietPlan = () => {
    const { height, weight, age, activity, diet } = formData;
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    const bmr = calculateBMR(weight, height, age);
    const calories = calculateCalories(bmr, activity);

    return (
      <div className="space-y-4">
        <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
          <h3 className="text-lg font-semibold mb-2">📊 Health Profile</h3>
          <p><strong>BMI:</strong> {bmi} ({getBMICategory(bmi)})</p>
          <p><strong>BMR:</strong> {bmr} kcal</p>
          <p><strong>Daily Calories:</strong> {calories} kcal</p>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${diet === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {diet === 'veg' ? '🌱' : diet === 'non-veg' ? '🍗' : '🥗'} 
            {diet.charAt(0).toUpperCase() + diet.slice(1)}
          </span>
        </div>

        <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
          <h3 className="text-lg font-semibold mb-2">🎯 Nutrition Goals</h3>
          {getGoalSection(bmi, calories)}
        </div>

        <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
          <h3 className="text-lg font-semibold mb-2">🍽 Daily Meal Plan</h3>
          {getMealPlan(calories)}
        </div>

        <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
          <h3 className="text-lg font-semibold mb-2">📅 Weekly Progression</h3>
          {getWeeklyProgression(bmi)}
        </div>
      </div>
    );
  };

  const calculateBMR = (weight, height, age) => {
    return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  };

  const calculateCalories = (bmr, activity) => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725
    };
    return Math.round(bmr * multipliers[activity]);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi <= 24.9) return 'Normal Weight';
    if (bmi <= 29.9) return 'Overweight';
    return 'Obese';
  };

  const getGoalSection = (bmi, calories) => {
    if (bmi < 18.5) return <p>Gain weight: Target {calories + 500} kcal/day with focus on protein-rich foods.</p>;
    if (bmi <= 24.9) return <p>Maintain weight: Target {calories} kcal/day with balanced macros.</p>;
    return <p>Weight loss: Target {calories - 500} kcal/day with emphasis on protein and fiber.</p>;
  };

  const getMealPlan = (calories) => {
    const protein = Math.round(calories * 0.3 / 4);
    const carbs = Math.round(calories * 0.4 / 4);
    const fats = Math.round(calories * 0.3 / 9);

    const meals = {
      breakfast: `Oatmeal with chia seeds and berries (${Math.round(calories * 0.3)} kcal)`,
      lunch: `Grilled chicken with quinoa and veggies (${Math.round(calories * 0.35)} kcal)`,
      dinner: `Salmon with sweet potato and asparagus (${Math.round(calories * 0.25)} kcal)`,
      snacks: `Greek yogurt with nuts (${Math.round(calories * 0.1)} kcal)`
    };

    return (
      <div>
        <p><strong>Breakfast:</strong> {meals.breakfast}</p>
        <p><strong>Lunch:</strong> {meals.lunch}</p>
        <p><strong>Dinner:</strong> {meals.dinner}</p>
        <p><strong>Snacks:</strong> {meals.snacks}</p>
        <p><strong>Macronutrients:</strong> {protein}g Protein, {carbs}g Carbs, {fats}g Fats</p>
      </div>
    );
  };

  const getWeeklyProgression = (bmi) => {
    const focuses = bmi < 18.5 ? [
      'Increase calorie intake gradually',
      'Focus on strength training',
      'Add healthy snacks between meals'
    ] : bmi <= 24.9 ? [
      'Maintain balanced diet',
      'Incorporate variety in meals',
      'Stay consistent with exercise'
    ] : [
      'Implement calorie deficit',
      'Increase protein intake',
      'Add HIIT workouts'
    ];

    return focuses.map((focus, i) => (
      <p key={i}><strong>Week {i + 1}:</strong> {focus}</p>
    ));
  };

  const handleDownloadPlan = () => {
    const element = document.getElementById('dietPlan');
    html2pdf().from(element).save();
  };

  return (
    <div className="flex min-h-screen bg-[#FFF0F6]">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-white to-[#fff5f9] shadow-xl sticky top-0 h-screen p-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-[#FF69B4] mb-8">
          <FontAwesomeIcon icon={faVenus} />
          <span>HerFlow</span>
        </div>
        <nav>
          <ul className="space-y-2">
            {['Dashboard', 'Calendar', 'Exercises', 'MoodTrcker', "DietGenerator", "Profile"].map((item, idx) => (
              <Link to={`/${item.toLowerCase()}`} key={item}>
                <li
                  className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer ${
                    idx === 4 ? 'bg-[#FF69B4] text-white shadow-md' : 'hover:bg-[rgba(255,105,180,0.1)]'
                  }`}
                >
                  <FontAwesomeIcon icon={[faHome, faCalendarAlt, faDumbbell, faCog, faCookie, faUser][idx]} />
                  {item}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Personalized Diet Plan Generator</h1>
          <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm">
            <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
            <span>{userId || 'User'}</span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:ring-pink-400"
                placeholder="170.5"
                step="0.1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:ring-pink-400"
                placeholder="70.5"
                step="0.1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:ring-pink-400"
                placeholder="30"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
              <select
                value={formData.activity}
                onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:ring-pink-400"
                required
              >
                <option value="" disabled>Select activity level</option>
                {activityLevels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diet Preference</label>
              <select
                value={formData.diet}
                onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:ring-pink-400"
                required
              >
                <option value="" disabled>Select diet type</option>
                {dietTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-70"
          >
            {isGenerating ? 'Generating...' : 'Generate Plan'}
          </button>

          {isGenerating && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {plan && (
          <div id="dietPlan" className="mt-8 space-y-4 animate-slideUp">
            <h2 className="text-2xl font-bold text-center mb-6">Your Personalized Nutrition Plan</h2>
            {plan}
            <button
              onClick={handleDownloadPlan}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPlanGenerator;