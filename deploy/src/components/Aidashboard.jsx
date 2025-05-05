import React, { useState, useEffect } from 'react';
import { 
  FiActivity, FiUsers, FiDatabase, FiSettings, FiBell, FiSearch, 
  FiMenu, FiX, FiDownload, FiUpload, FiFilter, FiRefreshCw, 
  FiServer
} from 'react-icons/fi';
import { 
  BsLightningFill, BsGraphUp, BsShieldLock, BsThreeDotsVertical,
  BsArrowUpRight, BsFillMoonFill, BsFillSunFill, 
  BsIndent,
  BsImageAlt,
  Bs0Circle,
  Bs8CircleFill,
  BsAlignCenter
} from 'react-icons/bs';
import { RiDashboardFill } from 'react-icons/ri';
import { AiFillThunderbolt } from 'react-icons/ai';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New model training completed', time: '2 mins ago', read: false, type: 'success' },
    { id: 2, text: 'System performance alert', time: '1 hour ago', read: true, type: 'warning' },
    { id: 3, text: 'New dataset available', time: '3 hours ago', read: true, type: 'info' },
    { id: 4, text: 'Training failed for Model X', time: '5 hours ago', read: false, type: 'error' }
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [activeModels, setActiveModels] = useState([
    { id: 1, name: 'Sentiment Analysis', accuracy: 92, status: 'active', type: 'NLP' },
    { id: 2, name: 'Image Classifier', accuracy: 94, status: 'active', type: 'CV' },
    { id: 3, name: 'Fraud Detection', accuracy: 89, status: 'active', type: 'Anomaly' },
    { id: 4, name: 'Recommendation Engine', accuracy: 91, status: 'active', type: 'ML' }
  ]);

  // Simulate model training
  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        setTrainingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsTraining(false);
            addNewTrainedModel();
            return 0;
          }
          return prev + 5;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isTraining]);

  const addNewTrainedModel = () => {
    const newModel = {
      id: activeModels.length + 1,
      name: `Model v${activeModels.length + 1}.0`,
      accuracy: Math.floor(Math.random() * 10) + 85,
      status: 'active',
      type: ['NLP', 'CV', 'Anomaly', 'ML'][Math.floor(Math.random() * 4)]
    };
    setActiveModels([...activeModels, newModel]);
    
    // Add notification
    const newNotification = {
      id: notifications.length + 1,
      text: `Training completed for ${newModel.name}`,
      time: 'just now',
      read: false,
      type: 'success'
    };
    setNotifications([newNotification, ...notifications]);
  };

  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Mock data for charts
  const modelPerformanceData = [65, 59, 80, 81, 56, 55, 40, 75, 68, 72, 85, 90];
  const dataUsageData = [45, 25, 60, 30, 70, 35, 55, 65, 40, 50, 75, 60];
  const userActivityData = [20, 35, 40, 50, 49, 60, 70, 65, 80, 75, 90, 85];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} ${
        darkMode ? 'bg-gray-800' : 'bg-indigo-800'
      } text-white transition-all duration-300 flex flex-col`}>
        {/* <div className="p-4 flex items-center justify-between border-b border-indigo-700">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold flex items-center">
              <AiFillThunderbolt className="mr-2 text-yellow-400" />
              <span className={darkMode ? 'text-white' : 'text-white'}>AI Nexus</span>
            </h1>
          ) : (
            <AiFillThunderbolt className="mx-auto text-yellow-400 text-xl" />
          )}
          <button 
            onClick={toggleSidebar} 
            className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-white hover:text-yellow-300'}`}
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div> */}
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "300px", width: "300px", height: "100px" }}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' ? 
                (darkMode ? 'bg-gray-700' : 'bg-indigo-700') : 
                (darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600')
            }`}
          >
            <BsImageAlt className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20} 
            style={{ color: " black ", fontWeight: "bold", backgroundColor: "white ", borderRadius: "300px", width: "200px", height: "40px" }}
            
            />
            {sidebarOpen && ''}
          </button>
          <button 
            onClick={() => setActiveTab('models')
              
            }
            style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "300px", width: "300px", height: "100px" }}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              activeTab === 'models' ? 
                (darkMode ? 'bg-gray-700' : 'bg-indigo-700') : 
                (darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600')
            }`}
          >
            <BsFillMoonFill className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20}   style={{ color: " black ", fontWeight: "bold", backgroundColor: "white ", borderRadius: "300px", width: "200px", height: "40px" }}/>
            {sidebarOpen && ''}
          </button>
          <button 
            onClick={() => setActiveTab('data')} style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "300px", width: "300px", height: "100px" }}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              activeTab === 'data' ? 
                (darkMode ? 'bg-gray-700' : 'bg-indigo-700') : 
                (darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600')
            }`}
          >
            <FiDownload className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20}   style={{ color: " black ", fontWeight: "bold", backgroundColor: "white ", borderRadius: "300px", width: "200px", height: "40px" }} />
            {sidebarOpen && ''}
          </button>
          <button 
            onClick={() => setActiveTab('users')} style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "300px", width: "300px", height: "100px" }}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              activeTab === 'users' ? 
                (darkMode ? 'bg-gray-700' : 'bg-indigo-700') : 
                (darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600')
            }`}
          >
            <BsIndent className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20}  style={{ color: " black ", fontWeight: "bold", backgroundColor: "white ", borderRadius: "300px", width: "200px", height: "40px" }} />
            {sidebarOpen && ''}
          </button>
          <button 
            onClick={() => setActiveTab('security')}style={{ color: " white ", fontWeight: "bold", backgroundColor: "black ", borderRadius: "300px", width: "300px", height: "100px" }}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              activeTab === 'security' ? 
                (darkMode ? 'bg-gray-700' : 'bg-indigo-700') : 
                (darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600')
            }`}
          >
            <FiServer className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20} style={{ color: " black ", fontWeight: "bold", backgroundColor: "white ", borderRadius: "300px", width: "200px", height: "40px" }} />
            {sidebarOpen && ''}
          </button>
        </nav>
        
        {/* <div className="p-4 border-t border-indigo-700">
          <button 
            onClick={toggleDarkMode}
            className={`w-full flex items-center p-3 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-600'
            }`}
          >
            {darkMode ? (
              <BsFillSunFill className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20} />
            ) : (
              <BsFillMoonFill className={`${sidebarOpen ? 'mr-3' : 'mx-auto'}`} size={20} />
            )}
            {sidebarOpen && (darkMode ? 'Light Mode' : 'Dark Mode')}
          </button>
        </div> */}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4 flex items-center justify-between`}>
          {/* <div className={`flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg px-4 py-2 w-96`}>
            <FiSearch className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mr-2`} />
            <input 
              type="text" 
              placeholder="Search models, datasets, users..." 
              className={`bg-transparent border-none outline-none w-full ${
                darkMode ? 'text-white placeholder-gray-400' : 'text-gray-700'
              }`}
            />
          </div> */}
          
          <div className="flex items-center space-x-4">
            {/* <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              {darkMode ? <BsFillSunFill size={20} /> : <BsFillMoonFill size={20} />}
            </button> */}
            
            <div className="relative">
              {/* <button 
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} relative`}
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <FiBell size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button> */}
              
              {/* Notifications dropdown */}
              {notificationOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-xl z-50 ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  <div className={`p-3 border-b ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  } flex justify-between items-center`}>
                    <span className="font-semibold">Notifications</span>
                    <button 
                      onClick={markAllAsRead}
                      className="text-sm text-blue-500 hover:text-blue-700"
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 cursor-pointer transition-colors ${
                          !notification.read ? (darkMode ? 'bg-gray-700' : 'bg-blue-50') : 
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div className={`rounded-full p-2 mr-3 ${
                              notification.type === 'success' ? 'bg-green-100 text-green-600' :
                              notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                              notification.type === 'error' ? 'bg-red-100 text-red-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {notification.type === 'success' && <BsLightningFill size={16} />}
                              {notification.type === 'warning' && <FiActivity size={16} />}
                              {notification.type === 'error' && <FiX size={16} />}
                              {notification.type === 'info' && <FiDatabase size={16} />}
                            </div>
                            <div>
                              <p className="font-medium">{notification.text}</p>
                              <p className={`text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>{notification.time}</p>
                            </div>
                          </div>
                          {!notification.read && (
                            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">New</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`p-3 text-center text-blue-500 font-medium cursor-pointer border-t ${
                    darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    View all notifications
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-indigo-600' : 'bg-indigo-600'
                } text-white font-semibold`}>
                 
                </div>
                {sidebarOpen && (
                  <div>
                   
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Click here </p>
                  </div>
                )}
                <BsAlignCenter className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} style={{ color: " black ", fontWeight: "bold", backgroundColor: "white ", borderRadius: "300px", width: "200px", height: "40px" }} />
              </div>
              
              {userMenuOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  <div className="py-1">
                    <a href="www.instagram.comm" className={`block px-6 py-2 text-sm ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}>Insta</a>
                    <a href="#" className={`block px-4 py-2 text-sm ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}>faceBook</a>
                    <a href="www.google.com" className={`block px-4 py-2 text-sm ${
                      darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    }`}>Google</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

       
        {/* <main className={`flex-1 overflow-y-auto p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Model Dashboard</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Monitor and manage your AI models in real-time
              </p>
            </div>
            <div className="flex space-x-3">
              <button 
                className={`flex items-center px-4 py-2 rounded-lg ${
                  isTraining ? 
                    'bg-yellow-500 text-white' : 
                    darkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
                onClick={startTraining}
                disabled={isTraining}
              >
                {isTraining ? (
                  <>
                    <FiRefreshCw className="animate-spin mr-2" />
                    Training ({trainingProgress}%)
                  </>
                ) : (
                  <>
                    <BsLightningFill className="mr-2" />
                    Train New Model
                  </>
                )}
              </button>
              <button className={`border ${
                darkMode ? 'border-gray-600 hover:bg-gray-800 text-white' : 'border-gray-300 hover:bg-gray-100'
              } px-4 py-2 rounded-lg flex items-center`}>
                <FiDownload className="mr-2" />
                Export
              </button>
            </div>
          </div>

     


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { title: 'Active Models', value: activeModels.length, change: '+12%', icon: <FiActivity />, color: 'green' },
              { title: 'Model Accuracy', value: '92.4%', change: '+3.2%', icon: <BsGraphUp />, color: 'blue' },
              { title: 'Data Processed', value: '1.2TB', change: '+45%', icon: <FiDatabase />, color: 'purple' },
              { title: 'Active Users', value: '156', change: '+8 today', icon: <FiUsers />, color: 'yellow' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`rounded-xl shadow-sm border ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{stat.title}</p>
                      <p className={`text-3xl font-bold mt-1 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      stat.color === 'green' ? 'bg-green-100 text-green-600' :
                      stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {stat.icon}
                    </div>
                  </div>
                  <p className={`text-sm mt-3 flex items-center ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    'text-yellow-600'
                  }`}>
                    <span>↑ {stat.change}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

  


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
           
            <div className={`rounded-xl shadow-sm border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            } lg:col-span-2`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Model Performance</h3>
                  <div className="flex items-center space-x-2">
                    <select className={`text-sm rounded-lg px-3 py-1 ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'
                    }`}>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last quarter</option>
                    </select>
                    <button className={`p-2 rounded-lg ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}>
                      <FiFilter />
                    </button>
                  </div>
                </div>
                <div className={`h-64 rounded-lg p-4 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="h-full flex items-end justify-between">
                    {modelPerformanceData.map((value, index) => (
                      <div key={index} className="flex flex-col items-center w-6">
                        <div 
                          className={`w-full ${
                            darkMode ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-indigo-500 hover:bg-indigo-600'
                          } rounded-t-sm transition-all`}
                          style={{ height: `${value}%` }}
                          title={`${value}%`}
                        ></div>
                        <span className={`text-xs mt-1 ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>



            <div className={`rounded-xl shadow-sm border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            }`}>
              <div className="p-6">
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Model Distribution</h3>
                <div className="space-y-4">
                  {[
                    { name: 'NLP Models', value: 42, color: 'bg-blue-500' },
                    { name: 'Computer Vision', value: 32, color: 'bg-green-500' },
                    { name: 'Anomaly Detection', value: 15, color: 'bg-yellow-500' },
                    { name: 'Recommendation', value: 11, color: 'bg-purple-500' }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.value}%</span>
                      </div>
                      <div className={`h-2 rounded-full ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <div 
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

      


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
            <div className={`rounded-xl shadow-sm border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            }`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Active Models</h3>
                  <button className={`text-sm ${
                    darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                  } font-medium flex items-center`}>
                    View All <BsArrowUpRight className="ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {activeModels.map((model) => (
                    <div 
                      key={model.id} 
                      className={`p-4 rounded-lg ${
                        darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                      } transition-colors`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-3 rounded-lg mr-4 ${
                            model.type === 'NLP' ? 'bg-blue-100 text-blue-600' :
                            model.type === 'CV' ? 'bg-green-100 text-green-600' :
                            model.type === 'Anomaly' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {model.type === 'NLP' && <FiActivity />}
                            {model.type === 'CV' && <FiDatabase />}
                            {model.type === 'Anomaly' && <BsGraphUp />}
                            {model.type === 'ML' && <BsLightningFill />}
                          </div>
                          <div>
                            <h4 className={`font-medium ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>{model.name}</h4>
                            <p className={`text-xs ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>{model.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 text-right">
                            <span className={`text-lg font-bold ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>{model.accuracy}%</span>
                            <p className={`text-xs ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>Accuracy</p>
                          </div>
                          <button className={`p-2 rounded-lg ${
                            darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                          }`}>
                            <BsThreeDotsVertical />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>



            <div className={`rounded-xl shadow-sm border ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            }`}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Training</h3>
                  <button className={`text-sm ${
                    darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                  } font-medium flex items-center`}>
                    View All <BsArrowUpRight className="ml-1" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <tr>
                        {['Model', 'Status', 'Accuracy', 'Duration', ''].map((header, index) => (
                          <th 
                            key={index} 
                            className={`px-6 py-3 text-left text-xs font-medium ${
                              darkMode ? 'text-gray-300' : 'text-gray-500'
                            } uppercase tracking-wider`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${
                      darkMode ? 'divide-gray-700' : 'divide-gray-200'
                    }`}>
                      {[1, 2, 3, 4].map((item) => {
                        const status = item % 3 === 0 ? 'Completed' : item % 2 === 0 ? 'Training' : 'Pending';
                        return (
                          <tr 
                            key={item} 
                            className={`${
                              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                            }`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                                  darkMode ? 'bg-gray-600 text-white' : 'bg-indigo-100 text-indigo-600'
                                }`}>
                                  <BsLightningFill />
                                </div>
                                <div className="ml-4">
                                  <div className={`text-sm font-medium ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                  }`}>Model v{item}.0</div>
                                  <div className={`text-sm ${
                                    darkMode ? 'text-gray-400' : 'text-gray-500'
                                  }`}>Mohan AI  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                status === 'Completed' ? 
                                  (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') : 
                                status === 'Training' ? 
                                  (darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800') : 
                                  (darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800')
                              }`}>
                                {status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm ${
                                darkMode ? 'text-gray-300' : 'text-gray-900'
                              }`}>
                                {status === 'Completed' ? `${90 + item}%` : '--'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm ${
                                darkMode ? 'text-gray-300' : 'text-gray-900'
                              }`}>
                                {status === 'Completed' ? `${item * 45} mins` : '--'}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className={`${
                                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                              }`}>
                                Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main> */}
      </div>
    </div>
  );
};

export default Dashboard;