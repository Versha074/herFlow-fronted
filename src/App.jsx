import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import CycleForm from './pages/cycleForm';
import WhatTrack from './pages/whatTrack';
import MenstrualDashboard from './pages/Dashboard';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ExercisePage from './pages/Exercises';
import DietPlanGenerator from './pages/dietGenerator';
import Calendar from './pages/Calendar';
import MoodTracker from './pages/MoodTracker';


// config.autoAddCss = false;


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Single protected route with nested children */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {/* Give z-index to highest  in tailwind to home so that chatbot does not appear above home components */}
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path="track" element={<WhatTrack />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cycle" element={<CycleForm />} />
          <Route path="profile" element={<Profile />} />
          <Route path="mensturalDashboard" element={<MenstrualDashboard />} />
          <Route path="exercises" element={<ExercisePage />} />
          <Route path="dietgenerator" element={<DietPlanGenerator />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="moodtrcker" element={<MoodTracker />} />
          <Route path="proofile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;