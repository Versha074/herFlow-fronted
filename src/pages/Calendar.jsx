import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faHome, faCalendarAlt, faChartLine, faCog, faUserCircle, faCookie, faUser } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-03-05'));
  const [cycles, setCycles] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const savedCycles = JSON.parse(localStorage.getItem('cycles')) || [];
    const savedSymptoms = JSON.parse(localStorage.getItem('symptoms')) || [];
    
    if (savedCycles.length === 0) {
      const initialCycles = [{ startDate: '2025-02-25', phase: 'Follicular', duration: 14 }];
      localStorage.setItem('cycles', JSON.stringify(initialCycles));
      setCycles(initialCycles);
    } else {
      setCycles(savedCycles);
    }

    if (savedSymptoms.length === 0) {
      const initialSymptoms = [{ name: 'Headache', date: '2025-03-03' }];
      localStorage.setItem('symptoms', JSON.stringify(initialSymptoms));
      setSymptoms(initialSymptoms);
    } else {
      setSymptoms(savedSymptoms);
    }
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleMonthChange = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(direction === 'prev' ? prev.getMonth() - 1 : prev.getMonth() + 1);
      return newDate;
    });
  };

  const hasCycleEntry = (day) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return cycles.some(cycle => {
      const start = new Date(cycle.startDate);
      const end = new Date(start.getTime() + cycle.duration * 86400000);
      return checkDate >= start && checkDate <= end;
    });
  };

  const handleAddEntry = () => {
    if (!selectedDay) return;
    
    const newCycle = {
      startDate: `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`,
      phase: 'Custom',
      duration: 14
    };

    const updatedCycles = [...cycles, newCycle];
    setCycles(updatedCycles);
    localStorage.setItem('cycles', JSON.stringify(updatedCycles));
    alert('Cycle entry added successfully!');
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
            {['Dashboard', 'Calendar', 'Exercises', 'MoodTrcker', "DietGenerator", "profile"].map((item, idx) => (
              <Link 
                to={`/${item.toLowerCase()}`} 
                key={item}
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer ${
                  item === 'Calendar' ? 'bg-[#FF69B4] text-white shadow-md' : 'hover:bg-[rgba(255,105,180,0.1)]'
                }`}
              >
                <FontAwesomeIcon icon={[faHome, faCalendarAlt, faChartLine, faCog, faCookie, faUser][idx]} />
                {item}
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="month-selector flex items-center gap-4">
            <button 
              onClick={() => handleMonthChange('prev')}
              className="bg-[#FF69B4] text-white px-4 py-2 rounded-lg hover:bg-[#ff85c0] transition-colors"
            >
              ←
            </button>
            <h1 className="text-2xl font-bold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
            <button 
              onClick={() => handleMonthChange('next')}
              className="bg-[#FF69B4] text-white px-4 py-2 rounded-lg hover:bg-[#ff85c0] transition-colors"
            >
              →
            </button>
          </div>
          <div className="user-info flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm">
            <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
            <span>Sarah Johnson</span>
          </div>
        </header>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 bg-white p-4 rounded-xl shadow-lg">
          {Array.from({ length: getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          
          {Array.from({ length: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }).map((_, i) => {
            const day = i + 1;
            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`p-4 text-center rounded-lg cursor-pointer transition-colors ${
                  selectedDay === day ? 'bg-[#FF69B4] text-white' : 'hover:bg-[#FF69B4]/10'
                } ${hasCycleEntry(day) ? 'relative after:content-[""] after:absolute after:w-2 after:h-2 after:bg-[#FF69B4] after:rounded-full after:bottom-2 after:left-1/2 after:-translate-x-1/2' : ''}`}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Cycle Information */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Cycle Information</h2>
          {selectedDay ? (
            cycles.find(c => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
              const start = new Date(c.startDate);
              const end = new Date(start.getTime() + c.duration * 86400000);
              return date >= start && date <= end;
            }) ? (
              <div>
                <p>Phase: Custom</p>
                <p>Days in phase: {(selectedDay - new Date(cycles[0].startDate).getDate() + 1)}/14</p>
              </div>
            ) : (
              <p>No cycle data for this date</p>
            )
          ) : (
            <p>Select a date to view or add cycle details</p>
          )}
        </div>

        {/* History Section */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Past Cycles History</h2>
          {cycles.length === 0 ? (
            <p>No cycle history available</p>
          ) : (
            cycles.map((cycle, i) => {
              const start = new Date(cycle.startDate);
              const end = new Date(start.getTime() + cycle.duration * 86400000);
              return (
                <p key={i} className="mb-2">
                  Cycle {i + 1}: {start.toLocaleDateString()} - {end.toLocaleDateString()} ({cycle.phase}, {cycle.duration} days)
                </p>
              );
            })
          )}
        </div>

        <button
          onClick={handleAddEntry}
          className="mt-6 bg-gradient-to-r from-[#FF69B4] to-[#ff85c0] text-white px-6 py-3 rounded-lg font-semibold hover:translate-y-[-2px] hover:shadow-lg transition-all"
        >
          Add Cycle Entry
        </button>
      </div>
    </div>
  );
};

export default Calendar;