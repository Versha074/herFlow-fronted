import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faHome, faCalendarAlt, faChartLine, faCog, faUserCircle, faCookie, faDumbbell, faUser } from '@fortawesome/free-solid-svg-icons';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [notes, setNotes] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [currentMood, setCurrentMood] = useState(null);
  const [audioSrc, setAudioSrc] = useState('');

  const moodResponses = {
    happy: "Yay! Keep spreading that joy! 🌟",
    sad: "Take it easy—maybe a warm hug or a good cry? 🤗",
    irritated: "Breathe it out! You’ve got this. 🌬",
    anxious: "You’re stronger than you think—try a calm moment. 🌿",
    tired: "Rest up, champ! You deserve it. 🌙",
    energetic: "Unleash that energy—go conquer the day! ⚡"
  };

  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    irritated: "😠",
    anxious: "😟",
    tired: "😴",
    energetic: "💪"
  };

  const moodActivities = {
    happy: ["Dance to your favorite song!", "Plan a fun outing with friends.", "Bake some delicious treats."],
    sad: ["Watch a comforting movie.", "Write in a journal to let it out.", "Cuddle with a pet or a cozy blanket."],
    irritated: ["Take a brisk walk to clear your mind.", "Punch a pillow or scream into it.", "Listen to some calming music."],
    anxious: ["Try deep breathing exercises.", "Meditate for 5 minutes.", "Organize your space for control."],
    tired: ["Take a short power nap.", "Sip some herbal tea.", "Stretch gently to relax."],
    energetic: ["Go for a run or workout.", "Start a creative project.", "Challenge yourself with a new task."]
  };

  const moodPlaylists = {
    happy: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    sad: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    irritated: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    anxious: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    tired: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    energetic: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("moodHistory");
    if (savedHistory) setMoodHistory(JSON.parse(savedHistory));
  }, []);

  const handleTrackMood = () => {
    if (!selectedMood) {
      showMessage("Please select a mood first!", true);
      return;
    }

    const timestamp = new Date().toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const newEntry = { mood: selectedMood, notes, timestamp };
    setMoodHistory(prev => [newEntry, ...prev]);
    setCurrentMood(selectedMood);
    setAudioSrc(moodPlaylists[selectedMood]);
    showMessage(moodResponses[selectedMood]);
    
    setSelectedMood('');
    setNotes('');
    localStorage.setItem("moodHistory", JSON.stringify([newEntry, ...moodHistory]));
  };

  const clearHistory = () => {
    setMoodHistory([]);
    setCurrentMood(null);
    setAudioSrc('');
    showMessage("History cleared—fresh start!");
    localStorage.removeItem("moodHistory");
  };

  const showMessage = (text, isError = false) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3500);
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
                          idx === 3 ? 'bg-[#FF69B4] text-white shadow-md' : 'hover:bg-[rgba(255,105,180,0.1)]'
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
          <h1 className="text-2xl font-bold">Mood Swings Tracker</h1>
          <div className="flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm">
            <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
            <span>User</span>
          </div>
        </header>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling today?</label>
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:ring-pink-400"
              >
                <option value="" disabled>Select a mood</option>
                {Object.entries(moodEmojis).map(([key, emoji]) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)} {emoji}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What's on your mind? (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:ring-pink-400 h-32"
                placeholder="Share your thoughts..."
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleTrackMood}
                className="flex-1 bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
              >
                Track Mood
              </button>
              <button
                onClick={clearHistory}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Clear History
              </button>
            </div>

            {message && (
              <div className="p-4 bg-pink-50 text-pink-700 rounded-lg border-l-4 border-pink-500">
                {message}
              </div>
            )}

            <div className="bg-pink-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Mood History</h3>
              {moodHistory.length === 0 ? (
                <p className="text-gray-500 text-center">No moods tracked yet</p>
              ) : (
                <div className="space-y-4">
                  {moodHistory.map((entry, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                        <div>
                          <p className="font-semibold">{entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</p>
                          <p className="text-sm text-gray-500">{entry.timestamp}</p>
                          {entry.notes && <p className="text-gray-600 mt-1">{entry.notes}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {currentMood && (
              <>
                <div className="bg-pink-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Suggested Activities</h3>
                  <ul className="space-y-2">
                    {moodActivities[currentMood].map((activity, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span>✨</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-pink-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4">Music for Your Mood</h3>
                  <audio controls className="w-full" src={audioSrc} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;