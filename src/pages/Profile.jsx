import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVenus,
  faHome,
  faCalendarAlt,
  faChartLine,
  faCog,
  faUserCircle,
  faCookie,
  faUser,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Selena',
    gender: 'Woman',
    location: 'Chandigarh, India',
  });
  const [cycleInfo, setCycleInfo] = useState({
    avgCycleLength: 28,
    lastPeriod: '2023-11-01',
  });
  const [healthInfo, setHealthInfo] = useState({
    contraception: 'Oral pills',
    lastCheckup: '2023-10-15',
  });
  const [preferences, setPreferences] = useState({
    reminders: 'Enabled',
    symptomTracking: 'On',
  });

  const toggleEdit = () => setIsEditing(!isEditing);

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
                                idx === 5 ? 'bg-[#FF69B4] text-white shadow-md' : 'hover:bg-[rgba(255,105,180,0.1)]'
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
          <h1 className="text-3xl font-bold text-[#831843]">Profile Settings</h1>
          <div className="user-info flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm">
            <FontAwesomeIcon icon={faUserCircle} className="text-xl text-[#FF69B4]" />
            <span className="text-[#9d174d]">{userInfo.name}</span>
          </div>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-[0_4px_6px_rgba(244,63,94,0.1)] p-6 flex flex-col md:flex-row items-center gap-6">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACUCAMAAABGFyDbAAAAMFBMVEXk5ueutLepsLPZ3N7n6erIzM7P0tTq7O2yuLvBxsje4eLV2NrR1da2u767wMPEycvljgLtAAADY0lEQVR4nO2byXLbMAxAuYDiou3//7akXLfxIosABciZ4bskMz3kDQiBC1ClOp1Op9PpdDqdTqfT6XR+DQDPv1wOeGUHF5dMjG6yX2EGaopaa6Nv5J8hWnWxGaR1vhv9x4ThWrGoX6VuXCcGbleqRGy8xAvSsut0I15hZQ+kcsDmJG41HVoVkuxCwrSfVQ9YSS8Y6qRKvAStxspYZYKcVwrVVlrPUsvoZ4SVNk7GC4b6JdwYRbSOC9YTQSJc/qi4v2AGfi+wyCXUMl8jOlgiWY/OrA1uLYj4Nczh4j7kAMVK64XZCrHt/IQ56YGQ8AUzsWop1L7zg8iaXLTvsOA5tYiplVeR0wocWctyakWiVc55xuTCnbQe4Nx/POZY+gjnp+ipqZXrfNfqWh+1vjTlv7NA0A6BBdZy+qWbT8NWzXuwIec868GGch3bgsV7DKQeIQzvOwTlTl3gvlcT6zxnjS/QSgT79ZV4yeD9DhUt6c3AbaVU+s6HJI/eF1n3w38kdLBE3nTRT7pCL/OwYLykHsAV7oFkYS8OdzBbkGBzRcFYrSXaG65+FRRt3NXGK4j30SF96J/fMItw8/XG0e4oVxkegOnjwIFwWv3wgjW8FzNBZB/cFUvuVcyYebp8ygZsnENW+Wukw+wuyfQXQNlxWMukVHTD+B2DUgXY8N5vP6+2UUXIg0o5WIPbGHK0bMqG132F+boxuvh6+y+TZcs62iQ+kQc+jW6ZjdmtW/mfstuQxMzyH7Ku/sC1jkqgWOR6sM77QXoXtxCZq1jO7oH2ksQ4xQh+3B8FPIzZwjMsCGp8MzOJIbjTxcBPqOvO+4jNZ4tZ4ivgM+HE1whIa3Ok7pjltGNY/TWnSuyUlQRFbhHsec3tAQO7c/5sovWUXz3IicO0DfDSezxHhBYtNqvsRU4waCzrnzHUE397Xf8MKV5Ab2nWQokXY17dwb99wXn7zScvZLioU21IsP081DB1ixdqUrahg4/1wiwh9uW9AcSMpdQSblQPM+K7Ok1Uv9uLWtVmPX3SjsZcFyvRzNK1TVDJz/DGXJNdDcNQREzN1kho+rayHic9OHKrqqQ/6f6MoeKAI/0dFiomcOgz3g1ax/dGmYPWE4eNY/qYXQuHlQsWcwWHBdVegcx/fut0Op1O5xfyBzfiKaWdaPkVAAAAAElFTkSuQmCC"
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-pink-400"
            />

            <div className="flex-1 text-center">
              {!isEditing ? (
                <div>
                  <h1 className="text-2xl font-bold text-[#831843]">{userInfo.name}</h1>
                  <p className="text-[#9d174d]">{userInfo.gender}</p>
                  <p className="text-[#9d174d]">📍 {userInfo.location}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    className="w-full p-2 border border-pink-400 rounded"
                  />
                  <select
                    value={userInfo.gender}
                    onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                    className="w-full p-2 border border-pink-400 rounded"
                  >
                    <option>Woman</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                  <input
                    type="text"
                    value={userInfo.location}
                    onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                    className="w-full p-2 border border-pink-400 rounded"
                  />
                </div>
              )}
            </div>

            <button
              onClick={toggleEdit}
              className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          {/* Cycle Status */}
          <div className="bg-white rounded-lg shadow-[0_4px_6px_rgba(244,63,94,0.1)] p-6 mt-6">
            <h2 className="text-xl font-semibold text-[#831843] mb-4">Current Cycle Status</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#fce7f3] text-[#9d174d] px-4 py-2 rounded-full">📅 Day 14 of 28</span>
              <span className="bg-[#fce7f3] text-[#9d174d] px-4 py-2 rounded-full">🌱 Follicular Phase</span>
              <span className="bg-[#fce7f3] text-[#9d174d] px-4 py-2 rounded-full">🩸 Average Flow</span>
            </div>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Cycle Information */}
            <div className="bg-white rounded-lg shadow-[0_4px_6px_rgba(244,63,94,0.1)] p-4 relative">
              <span className="absolute top-4 right-4 text-2xl">📅</span>
              <h3 className="text-lg font-semibold text-[#db2777] mb-2">Cycle Information</h3>
              {!isEditing ? (
                <div className="text-[#9d174d] space-y-1">
                  <p>Avg Cycle Length: {cycleInfo.avgCycleLength} days</p>
                  <p>Last Period: {cycleInfo.lastPeriod}</p>
                  <p>Next Predicted: 2023-11-29</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="number"
                    value={cycleInfo.avgCycleLength}
                    onChange={(e) => setCycleInfo({ ...cycleInfo, avgCycleLength: e.target.value })}
                    className="w-full p-2 border border-pink-400 rounded"
                  />
                  <input
                    type="date"
                    value={cycleInfo.lastPeriod}
                    onChange={(e) => setCycleInfo({ ...cycleInfo, lastPeriod: e.target.value })}
                    className="w-full p-2 border border-pink-400 rounded"
                  />
                </div>
              )}
            </div>

            {/* Health Metrics */}
            <div className="bg-white rounded-lg shadow-[0_4px_6px_rgba(244,63,94,0.1)] p-4 relative">
              <span className="absolute top-4 right-4 text-2xl">❤</span>
              <h3 className="text-lg font-semibold text-[#db2777] mb-2">Health Metrics</h3>
              {!isEditing ? (
                <div className="text-[#9d174d] space-y-1">
                  <p>Contraception: {healthInfo.contraception}</p>
                  <p>Last Checkup: {healthInfo.lastCheckup}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <select
                    value={healthInfo.contraception}
                    onChange={(e) => setHealthInfo({ ...healthInfo, contraception: e.target.value })}
                    className="w-full p-2 border border-pink-400 rounded"
                  >
                    <option>None</option>
                    <option>Oral pills</option>
                    <option>IUD</option>
                    <option>Condoms</option>
                  </select>
                  <input
                    type="date"
                    value={healthInfo.lastCheckup}
                    onChange={(e) => setHealthInfo({ ...healthInfo, lastCheckup: e.target.value })}
                    className="w-full p-2 border border-pink-400 rounded"
                  />
                </div>
              )}
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-lg shadow-[0_4px_6px_rgba(244,63,94,0.1)] p-4 relative">
              <span className="absolute top-4 right-4 text-2xl">📝</span>
              <h3 className="text-lg font-semibold text-[#db2777] mb-2">Preferences</h3>
              {!isEditing ? (
                <div className="text-[#9d174d] space-y-1">
                  <p>Reminders: {preferences.reminders}</p>
                  <p>Symptom Tracking: {preferences.symptomTracking}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <select
                    value={preferences.reminders}
                    onChange={(e) => setPreferences({ ...preferences, reminders: e.target.value })}
                    className="w-full p-2 border border-pink-400 rounded"
                  >
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                  <select
                    value={preferences.symptomTracking}
                    onChange={(e) => setPreferences({ ...preferences, symptomTracking: e.target.value })}
                    className="w-full p-2 border border-pink-400 rounded"
                  >
                    <option>On</option>
                    <option>Off</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;