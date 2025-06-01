import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormValidation, ErrorBoundary, FormField, DropdownField, apiRequest, validationRules } from './ErrorHandling';

const App = () => {
  const [profiles, setProfiles] = useState(JSON.parse(localStorage.getItem('profiles')) || [{ name: "Test User" }]) || [{ name: "Test User" }];
  const [currentProfile, setCurrentProfile] = useState(JSON.parse(localStorage.getItem('currentProfile')) || null);
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileModalMode, setProfileModalMode] = useState('add'); // 'add' or 'edit'
  const [profileFormData, setProfileFormData] = useState({ name: '' });
  const [editProfileIndex, setEditProfileIndex] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskModalData, setTaskModalData] = useState(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importData, setImportData] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [fileHandle, setFileHandle] = useState(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);

  // Initialize dark mode on app load
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

// Toggle dark mode function
const toggleDarkMode = () => {
  const newDarkMode = !darkMode;
  setDarkMode(newDarkMode);
  localStorage.setItem('darkMode', newDarkMode);
  document.documentElement.classList.toggle('dark', newDarkMode);
};

  // Initial validation rules for the task form
  const taskValidationConfig = {
    taskInput: [validationRules.required],
    company: [validationRules.required],
    timeInput: [validationRules.required, validationRules.validDate],
    status: [validationRules.required],
    action: [validationRules.required]
  };

  // Initialize form with empty values
  const initialFormValues = {
    taskInput: '',
    company: '',
    timeInput: '',
    status: '',
    action: ''
  };

  // Use our custom form validation hook
  const {
    values,
    errors,
    isValid,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues
  } = useFormValidation(initialFormValues, taskValidationConfig);

// Load tasks when profile changes
useEffect(() => {
  if (currentProfile) {
    const savedTasks = JSON.parse(localStorage.getItem(`tasks_${currentProfile.name}`)) || [];
    setTasks(savedTasks);
  } else {
    setTasks([]);
  }
}, [currentProfile]);

  // Set New York time on load
  useEffect(() => {
    setNewYorkTime();
  }, []);

  // Fetch companies on load
  useEffect(() => {
    fetchCompanies().catch(error => {
      toast.error("Failed to load companies: " + error.message);
    });
  }, []);

// Save tasks when they change
useEffect(() => {
  if (currentProfile) {
    localStorage.setItem(`tasks_${currentProfile.name}`, JSON.stringify(tasks));
  }
}, [tasks, currentProfile]);

  // Save profiles when they change
  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  // Save current profile when it changes
  useEffect(() => {
    localStorage.setItem('currentProfile', JSON.stringify(currentProfile));
  }, [currentProfile]);

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest(async () => {
        const myHeaders = new Headers();
        myHeaders.append("authorization", "0V2lXp7GZ7uJ9CdcDYzeORseP6EzOgIeMSacFJKSbs6EbtfsYu4Hn39MWGmG2cLC");
        
        return fetch("https://front-api-aws.evoeld.com/api/dashboards/getcompanies", {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        });
      }, "Failed to fetch companies");
      
      const companyList = (data.companies || []).map(company => ({
        id: company.uid,
        label: company.name,
        value: company.name
      }));
      
      setCompanies(companyList);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error("Failed to load companies: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDrivers = async (companyId) => {
    if (!companyId) return;
    
    setIsLoading(true);
    try {
      const data = await apiRequest(async () => {
        const myHeaders = new Headers();
        myHeaders.append("authorization", "0V2lXp7GZ7uJ9CdcDYzeORseP6EzOgIeMSacFJKSbs6EbtfsYu4Hn39MWGmG2cLC");
        myHeaders.append("companyuid", companyId);
        
        return fetch("https://front-api-aws.evoeld.com/api/dashboards/v2/activedrivers", {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        });
      }, "Failed to fetch drivers");
      
      const driverList = (data.drivers || []).map(driver => ({
        id: driver.id,
        label: `${driver.first_name} ${driver.second_name}`,
        value: `${driver.first_name} ${driver.second_name}`
      }));
      
      setDrivers(driverList);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      toast.error("Failed to load drivers: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanySelect = (company) => {
    handleChange({
      target: {
        name: 'company',
        value: company.label
      }
    });
    
    // Fetch drivers for this company
    fetchDrivers(company.id).catch(error => {
      toast.error("Failed to load drivers: " + error.message);
    });
  };

  const handleSignIn = () => {
    const selectedIndex = document.getElementById('profile-select').value;
    if (selectedIndex !== "") {
      try {
        const profile = profiles[selectedIndex];
        setCurrentProfile(profile);
        toast.success(`Signed in as ${profile.name}`);
      } catch (error) {
        toast.error("Failed to sign in: " + error.message);
      }
    } else {
      toast.warning("Please select a profile to sign in");
    }
  };

  const openAddProfileModal = () => {
    setProfileModalMode('add');
    setProfileFormData({ name: '' });
    setIsProfileModalOpen(true);
  };

  const openEditProfileModal = (profileIndex) => {
    setProfileModalMode('edit');
    setEditProfileIndex(profileIndex);
    setProfileFormData({ name: profiles[profileIndex].name });
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setProfileFormData({ name: '' });
    setEditProfileIndex(null);
  };

  const handleProfileFormChange = (e) => {
    setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });
  };

  const handleProfileFormSubmit = () => {
    if (!profileFormData.name.trim()) {
      toast.warning("Please enter a profile name");
      return;
    }
    
    if (profileModalMode === 'add') {
      // Check if profile already exists
      if (profiles.some(profile => profile.name === profileFormData.name)) {
        toast.warning(`Profile "${profileFormData.name}" already exists`);
        return;
      }
      
      const updatedProfiles = [...profiles, { name: profileFormData.name }];
      setProfiles(updatedProfiles);
      toast.success(`Profile "${profileFormData.name}" created`);
    } else if (profileModalMode === 'edit') {
      // Check if new name conflicts with another profile
      if (profiles.some((profile, idx) => profile.name === profileFormData.name && idx !== editProfileIndex)) {
        toast.warning(`Profile "${profileFormData.name}" already exists`);
        return;
      }
      
      const oldName = profiles[editProfileIndex].name;
      const updatedProfiles = [...profiles];
      updatedProfiles[editProfileIndex] = { name: profileFormData.name };
      setProfiles(updatedProfiles);
      
      // Update tasks for renamed profile
      const oldTasks = JSON.parse(localStorage.getItem(`tasks_${oldName}`)) || [];
      localStorage.setItem(`tasks_${profileFormData.name}`, JSON.stringify(oldTasks));
      localStorage.removeItem(`tasks_${oldName}`);
      
      // Update current profile if it's the one being edited
      if (currentProfile && currentProfile.name === oldName) {
        setCurrentProfile({ name: profileFormData.name });
      }
      
      toast.success(`Profile updated from "${oldName}" to "${profileFormData.name}"`);
    }
    
    closeProfileModal();
  };

  const handleSignOut = () => {
    setCurrentProfile(null);
    resetForm();
    toast.info('Signed out');
  };

  const handleDeleteProfile = (profileIndex) => {
    const profileToDelete = profiles[profileIndex];
    
    if (window.confirm(`Are you sure you want to delete ${profileToDelete.name}?`)) {
      try {
        // Remove profile and its tasks
        const updatedProfiles = profiles.filter((_, idx) => idx !== profileIndex);
        setProfiles(updatedProfiles);
        localStorage.removeItem(`tasks_${profileToDelete.name}`);
        
        // If this was the current profile, sign out
        if (currentProfile && currentProfile.name === profileToDelete.name) {
          setCurrentProfile(null);
        }
        
        toast.success(`Profile "${profileToDelete.name}" deleted`);
      } catch (error) {
        toast.error("Failed to delete profile: " + error.message);
      }
    }
  };

  // Modify handleAddTask to use auto-save
  const handleAddTask = () => {
    handleSubmit(async (formValues) => {
      if (!currentProfile) {
        throw new Error("Please sign in to add tasks");
      }

      const [date, taskTime] = formValues.timeInput.split('T');
      const newTask = {
        task: formValues.taskInput,
        status: formValues.status,
        company: formValues.company,
        date,
        time: taskTime,
        action: formValues.action
      };

      let updatedTasks;
      if (editIndex !== null) {
        // Update existing task
        updatedTasks = [...tasks];
        updatedTasks[editIndex] = newTask;
        setTasks(updatedTasks);
        setEditIndex(null);
        toast.success("Task updated successfully");
      } else {
        // Add new task
        updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        toast.success("Task added successfully");
      }

      // Auto-save if enabled
      saveToFile(updatedTasks);

      // Reset form
      resetForm();
    });
  };

  // New function to save tasks automatically to a file
  const saveTasksToFile = (taskData) => {
    try {
      // Create a data object containing the current profile's tasks
      const dataToSave = JSON.stringify(taskData, null, 2);
      
      // Create a blob and download link
      const blob = new Blob([dataToSave], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create download link and trigger click
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `tasks_${currentProfile.name}.json`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Clean up
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Error auto-saving data:", error);
      toast.error("Failed to auto-save data: " + error.message);
    }
  };

  const openTaskEditModal = (index) => {
    try {
      const task = tasks[index];
      setTaskModalData({
        index,
        task: task.task,
        company: task.company,
        date: task.date,
        time: task.time,
        status: task.status,
        action: task.action
      });
      setIsTaskModalOpen(true);
    } catch (error) {
      toast.error("Error editing task: " + error.message);
    }
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setTaskModalData(null);
  };

  const handleTaskModalChange = (e) => {
    const { name, value } = e.target;
    setTaskModalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Request access to the file system
  const requestFileAccess = async () => {
    try {
      // Request a file handle
      const options = {
        types: [
          {
            description: 'JSON Files',
            accept: {
              'application/json': ['.json'],
            },
          },
        ],
        suggestedName: `tasks_${currentProfile?.name || 'default'}.json`,
      };
      
      const handle = await window.showSaveFilePicker(options);
      setFileHandle(handle);
      setAutoSaveEnabled(true);
      toast.success("Auto-save enabled. All changes will be saved automatically.");
      
      // Perform initial save
      saveToFile(tasks);
    } catch (error) {
      console.error("Error accessing file system:", error);
      toast.error("Failed to enable auto-save: " + error.message);
    }
  };

  // Function to save to the selected file
  const saveToFile = async (taskData) => {
    if (!fileHandle || !autoSaveEnabled) return;
    
    try {
      // Convert data to JSON
      const data = JSON.stringify(taskData, null, 2);
      
      // Create a writable stream
      const writable = await fileHandle.createWritable();
      
      // Write the contents
      await writable.write(data);
      
      // Close the file
      await writable.close();
      
      console.log("Data saved automatically");
    } catch (error) {
      console.error("Error auto-saving data:", error);
      toast.error("Failed to auto-save: " + error.message);
      setAutoSaveEnabled(false);
    }
  };

  // Modify handleTaskModalSubmit for auto-save
  const handleTaskModalSubmit = () => {
    if (!taskModalData) return;
    
    const { index, ...taskData } = taskModalData;
    
    const updatedTasks = [...tasks];
    updatedTasks[index] = taskData;
    setTasks(updatedTasks);
    
    // Auto-save if enabled
    saveToFile(updatedTasks);
    
    toast.success("Task updated successfully");
    closeTaskModal();
  };

  // Modify handleDeleteTask for auto-save
  const handleDeleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = tasks.filter((_, idx) => idx !== index);
      setTasks(updatedTasks);
      
      // Auto-save if enabled
      saveToFile(updatedTasks);
      
      toast.success("Task deleted successfully");
    }
  };

  const handleEditTask = (index) => {
    try {
      const task = tasks[index];
      setValues({
        taskInput: task.task,
        company: task.company,
        timeInput: `${task.date}T${task.time}`,
        status: task.status,
        action: task.action
      });
      setEditIndex(index);
    } catch (error) {
      toast.error("Error editing task: " + error.message);
    }
  };

  const setNewYorkTime = () => {
    try {
      const now = new Date();
      const options = { timeZone: "America/New_York" };
      const newYorkTime = new Date(now.toLocaleString("en-US", options));
      
      const year = newYorkTime.getFullYear();
      const month = String(newYorkTime.getMonth() + 1).padStart(2, "0");
      const day = String(newYorkTime.getDate()).padStart(2, "0");
      const hours = String(newYorkTime.getHours()).padStart(2, "0");
      const minutes = String(newYorkTime.getMinutes()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      
      setValues(prev => ({
        ...prev,
        timeInput: formattedDate
      }));
    } catch (error) {
      console.error("Error setting NY time:", error);
      // Fall back to local time if NY time fails
      const now = new Date();
      const localTimeString = now.toISOString().slice(0, 16);
      setValues(prev => ({
        ...prev,
        timeInput: localTimeString
      }));
    }
  };

  const getTaskSummary = () => {
    return profiles.map(profile => {
      try {
        const profileTasks = JSON.parse(localStorage.getItem(`tasks_${profile.name}`)) || [];
        const totalTasks = profileTasks.length;
        
        // Today's tasks
        const today = new Date().toISOString().split('T')[0];
        const dailyTasks = profileTasks.filter(task => task.date === today).length;
        
        // This month's tasks
        const currentMonth = new Date().toISOString().slice(0, 7);
        const monthlyTasks = profileTasks.filter(task => task.date.startsWith(currentMonth)).length;
        
        // This year's tasks
        const currentYear = new Date().getFullYear();
        const yearlyTasks = profileTasks.filter(task => task.date.startsWith(currentYear.toString())).length;

        return {
          profile: profile.name,
          totalTasks,
          dailyTasks,
          monthlyTasks,
          yearlyTasks
        };
      } catch (error) {
        console.error(`Error calculating task summary for ${profile.name}:`, error);
        return {
          profile: profile.name,
          totalTasks: 0,
          dailyTasks: 0,
          monthlyTasks: 0,
          yearlyTasks: 0,
          error: true
        };
      }
    });
  };

  // Export all data to JSON file
  const exportAllData = () => {
    try {
      // Create a data object containing all profiles and their tasks
      const allData = {
        profiles: profiles,
        tasks: {}
      };
      
      // Add tasks for each profile
      profiles.forEach(profile => {
        const profileTasks = JSON.parse(localStorage.getItem(`tasks_${profile.name}`)) || [];
        allData.tasks[profile.name] = profileTasks;
      });
      
      // Convert to JSON string
      const jsonData = JSON.stringify(allData, null, 2);
      
      // Create a blob and download link
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create download link and trigger click
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'task_manager_data.json';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      
      // Clean up
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
      
      toast.success("Data exported successfully!");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data: " + error.message);
    }
  };

  // Open import modal
  const openImportModal = () => {
    setImportData('');
    setIsImportModalOpen(true);
  };

  // Close import modal
  const closeImportModal = () => {
    setIsImportModalOpen(false);
    setImportData('');
  };

  // Handle data import from JSON text
  const handleImportData = () => {
    try {
      if (!importData.trim()) {
        toast.warning("Please paste valid JSON data");
        return;
      }
      
      // Parse the JSON data
      const parsedData = JSON.parse(importData);
      
      // Validate the data structure
      if (!parsedData.profiles || !parsedData.tasks) {
        throw new Error("Invalid data format. JSON must contain 'profiles' and 'tasks' properties.");
      }
      
      // If valid, ask for confirmation
      if (window.confirm("This will replace all your current data. Continue?")) {
        // Import profiles
        setProfiles(parsedData.profiles);
        
        // Import tasks for each profile
        Object.keys(parsedData.tasks).forEach(profileName => {
          localStorage.setItem(`tasks_${profileName}`, JSON.stringify(parsedData.tasks[profileName]));
        });
        
        // Sign out current user
        setCurrentProfile(null);
        
        toast.success("Data imported successfully!");
        closeImportModal();
      }
    } catch (error) {
      console.error("Error importing data:", error);
      toast.error("Failed to import data: " + error.message);
    }
  };

  // Handle file upload for import
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        setImportData(e.target.result);
      } catch (error) {
        console.error("Error reading file:", error);
        toast.error("Failed to read file: " + error.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen flex flex-col items-center py-10 transition-colors duration-200 ${darkMode ? 'dark:bg-gray-900' : 'bg-gray-100'}`}>
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          theme={darkMode ? 'dark' : 'light'}
        />
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-blue-600'}`}>Task Manager</h1>
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'}`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Profile Selection Section */}
          <div className={`shadow-md rounded-lg p-6 mb-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <div className="flex items-center gap-4 mb-4">
              <select 
                id="profile-select" 
                className={`flex-grow p-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
              >
                <option value="" disabled selected={!currentProfile}>Select Profile</option>
                {profiles.map((profile, index) => (
                  <option key={index} value={index} selected={currentProfile?.name === profile.name}>
                    {profile.name}
                  </option>
                ))}
              </select>
              <button 
                onClick={handleSignIn}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
              >
                Sign In
              </button>
              <button 
                onClick={handleSignOut}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition" 
                disabled={!currentProfile}
              >
                Sign Out
              </button>
              <button 
                onClick={openAddProfileModal}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition"
              >
                Add Profile
              </button>
            </div>

            

            
            
            {/* Profile table with edit and delete buttons */}
            <div className="mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-200'}>
                    <th className={`p-2 border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Profile Name</th>
                    <th className={`p-2 border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((profile, index) => (
                    <tr key={index} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className={`p-2 border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>{profile.name}</td>
                      <td className={`p-2 border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                        <button 
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-400 mr-2"
                          onClick={() => openEditProfileModal(index)}
                        >
                          Edit
                        </button>
                        <button 
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                          onClick={() => handleDeleteProfile(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Task Section */}
          <div className={`shadow-md rounded-lg p-6 mb-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
            <h2 className="text-2xl font-semibold mb-4">Add / Edit Task</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DropdownField
                label="Company"
                name="company"
                value={values.company}
                onChange={handleChange}
                error={errors.company}
                placeholder="Select a company"
                options={companies}
                loading={isLoading}
                onSelect={handleCompanySelect}
                darkMode={darkMode}
              />
              <DropdownField
                label="Driver"
                name="taskInput"
                value={values.taskInput}
                onChange={handleChange}
                error={errors.taskInput}
                placeholder="Select a driver"
                options={drivers}
                loading={isLoading}
                disabled={!values.company}
                darkMode={darkMode}
              />
              <FormField
                label="Date & Time"
                name="timeInput"
                type="datetime-local"
                value={values.timeInput}
                onChange={handleChange}
                error={errors.timeInput}
                darkMode={darkMode}
              />
              <div className="form-field mb-3">
                <label className="block mb-1 font-medium">Status</label>
                <select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-lg ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="" disabled>Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">Inform</option>
                  <option value="Completed">Completed</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
              </div>
              <FormField
                label="Action"
                name="action"
                placeholder="Action"
                value={values.action}
                onChange={handleChange}
                error={errors.action}
              />
            </div>
            <button 
              onClick={handleAddTask}
              className={`bg-green-600 text-white mt-4 py-2 px-4 rounded-lg transition ${
                !currentProfile || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500'
              }`}
              disabled={!currentProfile || isSubmitting}
              title={!currentProfile ? "Sign in first" : ""}
            >
              {isSubmitting ? "Processing..." : editIndex !== null ? "Update Task" : "Add Task"}
            </button>
          </div>

          {/* Task List */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Task List</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Driver</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Company</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Time</th>
                    <th className="p-2 border">Action</th>
                    <th className="p-2 border">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                      <tr key={index}>
                        <td className="p-2 border">{index + 1}</td>
                        <td className="p-2 border">{task.task}</td>
                        <td className="p-2 border">{task.status}</td>
                        <td className="p-2 border">{task.company}</td>
                        <td className="p-2 border">{task.date}</td>
                        <td className="p-2 border">{task.time}</td>
                        <td className="p-2 border">{task.action}</td>
                        <td className="p-2 border">
                          <button 
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-400 mr-2"
                            onClick={() => openTaskEditModal(index)}
                          >
                            Edit
                          </button>
                          <button 
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                            onClick={() => handleDeleteTask(index)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="p-4 text-center text-gray-500">
                        {currentProfile ? "No tasks found" : "Sign in to view tasks"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Task Summary Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Task Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">Profile</th>
                    <th className="p-2 border">Total Tasks</th>
                    <th className="p-2 border">Today's Tasks</th>
                    <th className="p-2 border">This Month</th>
                    <th className="p-2 border">This Year</th>
                  </tr>
                </thead>
                <tbody>
                  {getTaskSummary().map((summary, index) => (
                    <tr key={index} className={summary.error ? "bg-red-50" : ""}>
                      <td className="p-2 border">{summary.profile}</td>
                      <td className="p-2 border">{summary.totalTasks}</td>
                      <td className="p-2 border">{summary.dailyTasks}</td>
                      <td className="p-2 border">{summary.monthlyTasks}</td>
                      <td className="p-2 border">{summary.yearlyTasks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Profile Modal */}
        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">
                {profileModalMode === 'add' ? 'Add New Profile' : 'Edit Profile'}
              </h3>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Profile Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileFormData.name}
                  onChange={handleProfileFormChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter profile name"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                onClick={closeProfileModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileFormSubmit}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
                >
                  {profileModalMode === 'add' ? 'Add Profile' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Edit Modal */}
        {isTaskModalOpen && taskModalData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <h3 className="text-xl font-semibold mb-4">Edit Task</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="form-field">
                  <label className="block mb-1 font-medium">Driver</label>
                  <input
                    type="text"
                    name="task"
                    value={taskModalData.task}
                    onChange={handleTaskModalChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="form-field">
                  <label className="block mb-1 font-medium">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={taskModalData.company}
                    onChange={handleTaskModalChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="form-field">
                  <label className="block mb-1 font-medium">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={taskModalData.date}
                    onChange={handleTaskModalChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="form-field">
                  <label className="block mb-1 font-medium">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={taskModalData.time}
                    onChange={handleTaskModalChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="form-field">
                  <label className="block mb-1 font-medium">Status</label>
                  <select
                    name="status"
                    value={taskModalData.status}
                    onChange={handleTaskModalChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">Inform</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="block mb-1 font-medium">Action</label>
                  <input
                    type="text"
                    name="action"
                    value={taskModalData.action}
                    onChange={handleTaskModalChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={closeTaskModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTaskModalSubmit}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Import Data Modal */}
        
      </div>
    </ErrorBoundary>
  );
};

export default App;