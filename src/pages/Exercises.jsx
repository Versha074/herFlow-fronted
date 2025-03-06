import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVenus, faHome, faCalendarAlt, faRunning, faChartLine, faCog,
  faUserCircle, faCircle, faSpa, faWalking, faSwimmer, faBicycle, faHeartbeat,
  faCookie,
  faDumbbell,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const ExercisePage = () => {
  // Define the expanded list of exercises with icons and descriptions
  const exercises = [
    { name: 'Yoga', icon: "faSpa", description: 'Gentle poses relieve tension and improve flexibility.', img:"https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjljYmNjbDZmdmJqdzRhMXh0OXg0bjdmNjgxOWE3dnhnaTF5MW9hYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPavRPgJYaNI97W/200.webp" },
    { name: 'Walking', icon: faWalking, description: 'A brisk walk boosts mood and energy.', img:"https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHB0NTkxcnA5M21kdnltazAzdjdzMDF6b2tidnBjMGJvcm43MmxtOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUOrvW5lZpuaNJgpVu/giphy.webp" },
    { name: 'Swimming', icon: faSwimmer, description: 'Low-impact and great for reducing bloating.', img: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnE0YjZvNmsxZ3pqNGFjNXFoZHJwejZ6c3JvcHhpbDhhbzF5am9hdSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V0mnnGcVblF8bAI/200.webp" },
    { name: 'Pilates', icon: faRunning, description: 'Strengthens core muscles and improves posture.', img:"https://media0.giphy.com/media/M1fLXZpNPUhiowqMVP/giphy.webp?cid=790b7611r5nmf3l63qw8h7j0o5j71rlpt9huubczxt0m8d0a&ep=v1_gifs_search&rid=giphy.webp&ct=g" },
    { name: 'Cycling', icon: faBicycle, description: 'Boosts cardiovascular health and leg strength.', img:"https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdncybDNhM3ZldjZvOTVmdnd1ZWxxbzZmaWpiOTAyY29lMXAwMWZzayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o84Ufy4oR2l0nSdEs/giphy.webp" },
    { name: 'Strength Training', icon: faHeartbeat, description: 'Builds muscle and enhances metabolism.', img:"https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3c4dHlheTNjenVxdGVlNmxhMzZvMTVnamtibmR3dDNnMjVzM2xwbCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/NLuFwZieDxvws/100.webp" }
  ];

  return (
    <div className="flex min-h-screen bg-[#FFF0F6]">
      {/* Sidebar - Unchanged */}
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
                          idx === 2 ? 'bg-[#FF69B4] text-white shadow-md' : 'hover:bg-[rgba(255,105,180,0.1)]'
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
        {/* Header - Unchanged */}
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-[#FF69B4]">Exercise for Menstrual Health</h1>
          <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <FontAwesomeIcon icon={faUserCircle} className="text-xl text-[#FF69B4]" />
            <span className="text-gray-700">Sarah Johnson</span>
          </div>
        </header>

        {/* Introduction Section - Unchanged */}
        <section className="bg-white p-6 rounded-2xl shadow-lg mb-8 animate-slide-up">
          <h2 className="text-xl font-bold mb-4 text-[#FF69B4]">Why Exercise During Your Cycle?</h2>
          <p className="text-gray-700 leading-relaxed">
            Exercising during your menstrual cycle can alleviate symptoms like cramps, bloating, and mood swings. It boosts energy levels and enhances overall well-being. Tailoring workouts to your cycle phases maximizes these benefits!
          </p>
        </section>

        {/* Recommended Exercises Section - Updated */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-[#FF69B4] mb-6">Recommended Exercises</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-xl transform transition-all duration-300"
              >
                {/* Header with icon and name */}
                <div className="flex items-center gap-3 mb-4">
                  <FontAwesomeIcon icon={exercise.icon} className="text-3xl text-[#FF69B4]" />
                  <h3 className="text-lg font-semibold text-[#FF69B4]">{exercise.name}</h3>
                </div>
                {/* GIF for the exercise */}
                <img
                  src={`${exercise.img}`}
                  alt={`${exercise.name} demonstration`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600">{exercise.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section - Unchanged */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-[#FF69B4] mb-6">Benefits Across Phases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { phase: 'Menstrual Phase', description: 'Gentle exercises like yoga ease cramps.' },
              { phase: 'Follicular Phase', description: 'Perfect for high-intensity workouts.' },
              { phase: 'Ovulation Phase', description: 'Ideal for strength training and cardio.' },
              { phase: 'Luteal Phase', description: 'Moderate exercise aids stress relief.' }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-xl transform transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-2 text-[#FF69B4]">{item.phase}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section - Unchanged */}
        <section className="bg-white p-6 rounded-2xl shadow-lg mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-bold mb-4 text-[#FF69B4]">Tips for Exercising During Menstruation</h2>
          <ul className="space-y-3">
            {[
              'Listen to your body and adjust intensity as needed.',
              'Stay hydrated before, during, and after exercise.',
              'Wear comfortable, breathable clothing.',
              'Consider menstrual products designed for exercise.'
            ].map((tip, index) => (
              <li key={index} className="flex items-center gap-3 group">
                <FontAwesomeIcon icon={faCircle} className="text-[8px] text-[#FF69B4] group-hover:animate-pulse" />
                <span className="text-gray-700 group-hover:text-[#FF69B4] transition-colors">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Exercise Log Section - Unchanged */}
        <section className="bg-white p-6 rounded-2xl shadow-lg animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-bold mb-4 text-[#FF69B4]">Log Your Exercise</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Exercise Type</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF69B4] transition-all"
                placeholder="e.g., Yoga, Running"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Duration (minutes)</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF69B4] transition-all"
                placeholder="e.g., 30"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Notes</label>
              <textarea
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF69B4] transition-all"
                placeholder="How did you feel?"
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-br from-[#FF69B4] to-[#ff85c0] text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transform transition-all duration-300"
            >
              Log Exercise
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ExercisePage;