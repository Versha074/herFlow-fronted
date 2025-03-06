import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCycleByUserId } from '../api/cycleApi';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faHome, faCalendarAlt, faDumbbell, faCog, faUserCircle, faPlus, faCircle, faCookie, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import DashboardSkeleton from '../skeleton/DashboardSkeleton';
import ProgressItem from './progressItem';

const Dashboard = () => {
  const [cycleData, setCycleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [activities, setActivities] = useState([]);
  const [userId, setUserId] = useState(null);

  // Decode JWT token and set user ID
  useEffect(() => {
    const token = localStorage.getItem('token');
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
  }, []);

  // Fetch cycle data when userId is available
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await getCycleByUserId(userId);
          // Handle array response
          const currentCycle = response[0] || {};
          const processedData = processCycleData(currentCycle);
          setCycleData(processedData);
          updateSymptoms(processedData);
          updateActivities(processedData);
          setError(null);
        } catch (err) {
          handleFetchError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userId]);

  // Process cycle data from API
  const processCycleData = (data) => {
    const processed = {
      ...data,
      cycleStartDate: data.cycleStartDate ? new Date(data.cycleStartDate) : null,
      cycleEndDate: data.cycleEndDate ? new Date(data.cycleEndDate) : null,
      symptoms: data.symptoms?.map((symptom) => ({
        ...symptom,
        date: symptom.date ? new Date(symptom.date) : new Date(),
      })) || [],
      predictions: {
        ...data.predictions,
        nextCycleStart: data.predictions?.nextCycleStart ? new Date(data.predictions.nextCycleStart) : null,
        nextOvulationDate: data.predictions?.nextOvulationDate ? new Date(data.predictions.nextOvulationDate) : null,
        fertileWindow: data.predictions?.fertileWindow?.map((date) => new Date(date)) || [],
        nextPeriodDate: data.predictions?.nextPeriodDate ? new Date(data.predictions.nextPeriodDate) : null,
        nextCyclePhases: data.predictions?.nextCyclePhases?.map((phase, index, arr) => {
          const startDate = new Date(phase.date);
          let endDate = new Date(startDate);

          if (index < arr.length - 1) {
            endDate = new Date(arr[index + 1].date);
            endDate.setDate(endDate.getDate() - 1);
          } else {
            endDate.setDate(startDate.getDate() + (data.lutealPhaseLength || 14) - 1);
          }

          return {
            ...phase,
            date: startDate,
            startDate: startDate,
            endDate: endDate,
          };
        }) || [],
      },
    };
    return processed;
  };

  // Update symptoms list
  const updateSymptoms = (data) => {
    const symptomsList = data.symptoms?.map((symptom) => ({
      date: symptom.date?.toLocaleDateString() || 'Unknown date',
      flow: symptom.flowIntensity || 'Not specified',
      cramps: symptom.cramps || 'Not specified',
      mood: symptom.mood || 'Not specified',
      temperature: symptom.bodyTemperature ? `${symptom.bodyTemperature}°C` : 'Not measured',
      mucus: symptom.cervicalMucus || 'Not specified',
      notes: symptom.additionalNotes || '',
    })) || [];
    setSymptoms(symptomsList);
  };

  // Update activities list
  const updateActivities = (data) => {
    const activityList = [
      data.cycleStartDate && data.cycleEndDate
        ? `Logged Cycle: ${data.cycleStartDate.toLocaleDateString()} - ${data.cycleEndDate.toLocaleDateString()}`
        : 'No active cycle tracked',
      data.predictions?.fertileWindow?.length
        ? `Fertile Window: ${data.predictions.fertileWindow[0].toLocaleDateString()} - ${data.predictions.fertileWindow.slice(-1)[0].toLocaleDateString()}`
        : 'Fertile window not available',
      `Next Ovulation: ${data.predictions?.nextOvulationDate?.toLocaleDateString() || 'Not predicted'}`,
      `Cycle Length: ${data.cycleLength || 'Unknown'} days`,
    ];
    setActivities(activityList);
  };

  // Handle fetch errors
  const handleFetchError = (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    setError(error.message || 'Failed to fetch cycle data');
  };

  // Calculate cycle progress
  const getCycleProgress = () => {
    if (!cycleData?.cycleStartDate || !cycleData?.cycleEndDate) return 0;
    const start = cycleData.cycleStartDate;
    const end = cycleData.cycleEndDate;
    const today = new Date();

    const totalDays = Math.ceil((end - start) / 86400000) || 1;
    const daysPassed = Math.ceil((today - start) / 86400000);

    return Math.min(Math.round((daysPassed / totalDays) * 100), 100);
  };

  // Get current phase
  const getCurrentPhase = () => {
    if (!cycleData?.cycleStartDate) return 'No active cycle';

    const today = new Date();
    const start = cycleData.cycleStartDate;
    const cycleDay = Math.floor((today - start) / 86400000) + 1;

    if (cycleDay < 1) return 'Between cycles';

    const lutealLength = cycleData.lutealPhaseLength || 14;
    const ovulationDay = (cycleData.cycleLength || 28) - lutealLength;

    if (cycleDay <= 5) return 'Menstruation';
    if (cycleDay <= ovulationDay) return 'Follicular';
    if (cycleDay <= ovulationDay + 1) return 'Ovulation';
    return 'Luteal';
  };

  // Render pie chart
  useEffect(() => {
    let pieChart;
    if (!loading && cycleData?.predictions?.nextCyclePhases) {
      const pieCtx = document.getElementById('phasePieChart')?.getContext('2d');
      if (pieCtx) {
        if (pieChart) pieChart.destroy();

        const phases = cycleData.predictions.nextCyclePhases;
        const phaseDurations = phases.map((phase, index) => {
          const nextPhase = phases[index + 1];
          const endDate = nextPhase ? new Date(nextPhase.date) : new Date(phase.date);
          endDate.setDate(endDate.getDate() - 1);
          const diff = Math.ceil((endDate - new Date(phase.date)) / 86400000) + 1;
          return diff > 0 ? diff : 0;
        });

        pieChart = new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: phases.map(phase => phase.phase),
            datasets: [{
              data: phaseDurations,
              backgroundColor: ['#FF69B4', '#FFB6C1', '#FF85C0', '#FFAEC9'],
              borderWidth: 2,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom' },
              tooltip: {
                callbacks: {
                  label: (ctx) => `${ctx.label}: ${ctx.raw} days`,
                },
              },
            },
          },
        });
      }
    }
    return () => pieChart?.destroy();
  }, [loading, cycleData]);

  if (loading) return <DashboardSkeleton />;
  if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;

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
                    idx === 0 ? 'bg-[#FF69B4] text-white shadow-md' : 'hover:bg-[rgba(255,105,180,0.1)]'
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
          <h1 className="text-2xl font-bold">Cycle Dashboard</h1>
          <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm">
            <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
            <span>{userId || 'User'}</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="space-y-8">
          {/* Cycle Overview */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Cycle Overview</h2>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Add Entry
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <ProgressItem
                title="Cycle Progress"
                progress={getCycleProgress()}
                description={`${getCycleProgress()}% through ${getCurrentPhase()} phase`}
              />
              <ProgressItem
                title="Symptom Tracker"
                progress={Math.min(symptoms.length * 20, 100)}
                description={`${symptoms.length} symptoms logged`}
              />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold mb-4">Phase Distribution</h3>
              <div className="h-64">
                <canvas id="phasePieChart" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold mb-4">Lifestyle Recommendations</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-pink-600">Sleep:</h4>
                  <p>{cycleData.predictions.sleepRecommendations || '7-9 hours recommended'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-pink-600">Activity Suggestions:</h4>
                  <p>{cycleData.predictions.lifestyleChangeRecommendations || 'Maintain balanced diet and exercise'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Symptoms Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Recent Symptoms</h2>
            <div className="space-y-3">
              {symptoms.length > 0 ? (
                symptoms.map((symptom, idx) => (
                  <div key={idx} className="p-4 bg-pink-50 rounded-lg grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-medium">Flow: {symptom.flow}</p>
                      <p className="text-sm">Cramps: {symptom.cramps}</p>
                    </div>
                    <div>
                      <p className="text-sm">Mood: {symptom.mood}</p>
                      <p className="text-sm">Temp: {symptom.temperature}</p>
                    </div>
                    <div>
                      <p className="text-sm">Cervical Mucus: {symptom.mucus}</p>
                      {symptom.notes && <p className="text-sm">Notes: {symptom.notes}</p>}
                    </div>
                    <span className="text-sm text-gray-500 col-span-3 text-right">{symptom.date}</span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No symptoms recorded yet</p>
              )}
            </div>
          </div>

          {/* Activities Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Cycle Activities</h2>
            <div className="space-y-3">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex items-center p-3 bg-pink-50 rounded-lg">
                  <FontAwesomeIcon icon={faCircle} className="text-pink-500 mr-3 text-xs" />
                  <span className="text-sm">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;