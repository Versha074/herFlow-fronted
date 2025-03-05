import React, { useState, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVenus, faHome, faCalendarAlt, faChartLine, faCog,
  faUserCircle, faPlus, faCircle
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  // Sample data mimicking the backend schema
  const [cycleData, setCycleData] = useState({
    userId: 'user123',
    cycleStartDate: new Date('2024-03-01'),
    cycleEndDate: new Date('2024-03-28'),
    cycleLength: 28,
    symptoms: [
      {
        date: new Date('2024-03-02'),
        flowIntensity: 'Medium',
        cramps: 'Moderate',
        mood: 'Irritable',
        bodyTemperature: 37.2,
        cervicalMucus: 'Sticky',
        ovulationTestResult: 'Not Taken',
        additionalNotes: 'Feeling tired'
      },
      {
        date: new Date('2024-03-03'),
        flowIntensity: 'Heavy',
        cramps: 'Severe',
        mood: 'Sad',
        bodyTemperature: 37.5,
        cervicalMucus: 'Creamy',
        ovulationTestResult: 'Negative',
        additionalNotes: 'Need more rest'
      }
    ],
    lifestyleFactors: {
      sleepHours: 6.5,
      stressLevel: 'High',
      exerciseRoutine: 'Light'
    },
    predictions: {
      nextCycleStart: new Date('2024-04-01'),
      nextOvulationDate: new Date('2024-03-15'),
      fertileWindow: [
        new Date('2024-03-13'),
        new Date('2024-03-14'),
        new Date('2024-03-15'),
        new Date('2024-03-16'),
        new Date('2024-03-17')
      ],
      nextPeriodDate: new Date('2024-04-01'),
      nextCyclePhases: [
        { date: new Date('2024-03-01'), phase: 'Menstruation' },
        { date: new Date('2024-03-15'), phase: 'Ovulation' }
      ],
      sleepRecommendations: '7-8 hours',
      lifestyleChangeRecommendations: 'Try to reduce stress and increase moderate exercise.'
    }
  });

  const [symptoms, setSymptoms] = useState(
    cycleData.symptoms.map(symptom => ({
      name: `${symptom.flowIntensity} Flow, ${symptom.cramps} Cramps`,
      severity: symptom.mood,
      time: symptom.date.toLocaleString()
    }))
  );

  const [activities, setActivities] = useState([
    `Logged Cycle from ${cycleData.cycleStartDate.toLocaleDateString()} to ${cycleData.cycleEndDate.toLocaleDateString()}`,
    `Next Ovulation Predicted: ${cycleData.predictions.nextOvulationDate.toLocaleDateString()}`,
    `Cycle Length: ${cycleData.cycleLength} days`
  ]);

  // Calculate cycle progress and current phase
  const today = new Date();
  const cycleStart = new Date(cycleData.cycleStartDate);
  const cycleEnd = new Date(cycleData.cycleEndDate);
  const totalCycleDays = Math.ceil((cycleEnd - cycleStart) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.ceil((today - cycleStart) / (1000 * 60 * 60 * 24));
  const cyclePhaseProgress = Math.min(Math.round((daysPassed / totalCycleDays) * 100), 100);

  let currentPhase;
  if (daysPassed <= 5) currentPhase = 'Menstrual';
  else if (daysPassed <= 12) currentPhase = 'Follicular';
  else if (daysPassed <= 17) currentPhase = 'Ovulation';
  else currentPhase = 'Luteal';

  useEffect(() => {
    // Initialize bar chart
    const ctx = document.getElementById('cycleChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255,105,180,0.8)');
    gradient.addColorStop(1, 'rgba(255,182,193,0.4)');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'],
        datasets: [{
          label: 'Cycle Phase Intensity',
          data: [5, 3, 4, 2],
          backgroundColor: gradient,
          borderColor: 'rgba(255,105,180,0.8)',
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: 'rgba(255,105,180,1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } }
        },
        plugins: { legend: { position: 'top', labels: { font: { weight: '600' } } } }
      }
    });

    // Initialize pie chart
    const pieCtx = document.getElementById('phasePieChart').getContext('2d');
    const phaseData = [5, 7, 5, 11]; // Days for each phase
    const phaseColors = ['#FF69B4', '#FFB6C1', '#FF85C0', '#FFAEC9'];
    const highlightColors = ['#FF1493', '#FF69B4', '#FF6EB4', '#FF82AB'];
    const currentPhaseIndex = ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'].indexOf(currentPhase);

    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Menstrual', 'Follicular', 'Ovulation', 'Luteal'],
        datasets: [{
          data: phaseData,
          backgroundColor: phaseColors.map((color, index) =>
            index === currentPhaseIndex ? highlightColors[index] : color
          ),
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { font: { weight: '600' } }
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: ${context.raw} days`
            }
          }
        }
      }
    });
  }, [currentPhase]);

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
            {['Dashboard', 'Calendar', 'Analytics', 'Settings'].map((item, index) => (
              <li key={item} className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer
                ${index === 0 ? 'bg-[#FF69B4] text-white shadow-md' : 'hover:bg-[rgba(255,105,180,0.1)]'}`}>
                <FontAwesomeIcon icon={[faHome, faCalendarAlt, faChartLine, faCog][index]} />
                {item}
              </li>
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
            <span>Sarah Johnson</span>
          </div>
        </header>

        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 relative overflow-hidden">
          <p className="mb-4">
            Next Ovulation: {cycleData.predictions.nextOvulationDate.toLocaleDateString()}
            🌸 Fertile Window Starting Soon!
          </p>
          <button className="bg-gradient-to-br from-[#FF69B4] to-[#ff85c0] text-white px-6 py-2 rounded-lg
            flex items-center gap-2 hover:shadow-lg transition-shadow">
            <FontAwesomeIcon icon={faPlus} />
            Add Cycle Entry
          </button>
        </div>

        {/* Progress Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ProgressItem
            title="Cycle Phase"
            progress={cyclePhaseProgress}
            description={`${cyclePhaseProgress}% through ${cycleData.predictions.nextCyclePhases[0].phase}`}
            buttonText="Continue Tracking"
          />
          <ProgressItem
            title="Symptom Tracker"
            progress={symptoms.length * 20}
            description={`${symptoms.length} symptoms logged this cycle`}
            buttonText="Log Symptoms"
          />
        </div>

        {/* Symptom Tracker and Pie Chart Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Symptom Tracker */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Recent Symptoms</h2>
            {symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center gap-3 py-3 border-b last:border-0">
                <FontAwesomeIcon icon={faCircle} className="text-[8px] text-[#FF69B4]" />
                <span>{symptom.name} - {symptom.severity}</span>
                <span className="ml-auto text-gray-600 text-sm">{symptom.time}</span>
              </div>
            ))}
            <button className="mt-4 bg-gradient-to-br from-[#FF69B4] to-[#ff85c0] text-white px-6 py-2 rounded-lg
              flex items-center gap-2 hover:shadow-lg transition-shadow w-full justify-center">
              Add Symptom
            </button>
          </div>

          {/* Pie Chart Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Cycle Phase Progress</h2>
            <div className="h-80">
              <canvas id="phasePieChart" />
            </div>
            <div className="text-center mt-4">
              <p className="text-lg font-semibold text-[#FF69B4]">
                {currentPhase} Phase
              </p>
              <p className="text-gray-600">
                {cyclePhaseProgress}% of cycle completed
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <div className="h-80">
            <canvas id="cycleChart" />
          </div>
        </div>

        {/* Activity Tracker */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 py-3 border-b last:border-0">
              <FontAwesomeIcon icon={faCircle} className="text-[8px] text-[#FF69B4]" />
              <span>{activity}</span>
              <span className="ml-auto text-gray-600 text-sm">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>

        {/* Goals Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Lifestyle Insights</h2>
          <CircularProgress percent={Math.round(cycleData.lifestyleFactors.sleepHours / 8 * 100)} />
          <p className="mt-4 text-gray-600">Sleep: {cycleData.lifestyleFactors.sleepHours} hours</p>
          <p className="mb-4">Recommendations: {cycleData.predictions.lifestyleChangeRecommendations}</p>
          <button className="bg-gradient-to-br from-[#FF69B4] to-[#ff85c0] text-white px-6 py-2 rounded-lg
            hover:shadow-lg transition-shadow">
            Update Goals →
          </button>
        </div>
      </div>
    </div>
  );
};

// ProgressItem Component
const ProgressItem = ({ title, progress, description, buttonText }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-[#FF69B4] to-[#FFB6C1] rounded-full transition-all duration-500"
           style={{ width: `${progress}%` }} />
    </div>
    <p className="my-3 text-gray-600">{description}</p>
    <button className="bg-gradient-to-br from-[#FF69B4] to-[#ff85c0] text-white px-4 py-2 rounded-lg
      text-sm hover:shadow-md transition-shadow">
      {buttonText}
    </button>
  </div>
);

// CircularProgress Component
const CircularProgress = ({ percent }) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-32 h-32 mx-auto my-4">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="12"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="none"
          stroke="#FF69B4"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#FF69B4]">
        {percent}%
      </span>
    </div>
  );
};

export default Dashboard;