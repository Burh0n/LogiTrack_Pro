import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Компонент ProfileManager для управления созданием профилей
const ProfileManager = ({ onAddProfile }) => {
  const [newProfileName, setNewProfileName] = useState('');
  const [error, setError] = useState('');

  const handleAddProfile = () => {
    if (!newProfileName.trim()) {
      setError('Profile name cannot be empty');
      return;
    }

    // Получаем существующие профили
    const existingProfiles = JSON.parse(localStorage.getItem('profiles')) || [];
    
    // Проверяем, существует ли уже профиль
    if (existingProfiles.some(profile => profile.name === newProfileName)) {
      setError('A profile with this name already exists');
      return;
    }

    // Добавляем новый профиль
    const updatedProfiles = [...existingProfiles, { name: newProfileName }];
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
    
    // Уведомляем родительский компонент
    onAddProfile(updatedProfiles);
    
    // Сбрасываем ввод
    setNewProfileName('');
    setError('');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Create New Profile</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Profile Name"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleAddProfile}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition"
        >
          Add Profile
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// Компонент AppWrapper для управления состоянием приложения и localStorage
const AppWrapper = () => {
  const [profiles, setProfiles] = useState([]);

  // Загружаем профили из localStorage при монтировании
  useEffect(() => {
    const savedProfiles = JSON.parse(localStorage.getItem('profiles')) || [];
    if (savedProfiles.length === 0) {
      // Инициализируем с профилем по умолчанию, если пусто
      const defaultProfiles = [{ name: "Default User" }];
      localStorage.setItem('profiles', JSON.stringify(defaultProfiles));
      setProfiles(defaultProfiles);
    } else {
      setProfiles(savedProfiles);
    }
  }, []);

  const handleAddProfile = (newProfiles) => {
    setProfiles(newProfiles);
  };

  return (
    <React.StrictMode>
      <div className="container mx-auto px-4 py-8">
        <ProfileManager onAddProfile={handleAddProfile} />
        <App />
      </div>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />);