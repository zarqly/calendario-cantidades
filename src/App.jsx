import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, Check, Edit2, Trash2, Download, Upload, ChevronRight, Home, TrendingUp, BarChart3, PieChart, Clock, FolderOpen, Settings, LogOut, User } from 'lucide-react';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBfBUm3uWTQ4ngT0Q-4ljkYaGrCCJZkOmQ",
  authDomain: "cuentastaxi-d02bd.firebaseapp.com",
  projectId: "cuentastaxi-d02bd",
  storageBucket: "cuentastaxi-d02bd.firebasestorage.app",
  messagingSenderId: "410269972997",
  appId: "1:410269972997:web:180d1411ff4d0b02ecfa6c"
};

// Estilos adicionales
const styles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Utilidad para formatear fechas
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatDateISO = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

// Componente de Login
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        // Registrar nuevo usuario
        const auth = window.firebase.auth();
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        onLogin(userCredential.user);
      } else {
        // Iniciar sesión
        const auth = window.firebase.auth();
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        onLogin(userCredential.user);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const auth = window.firebase.auth();
      const provider = new window.firebase.auth.GoogleAuthProvider();
      const userCredential = await auth.signInWithPopup(provider);
      onLogin(userCredential.user);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dietario Taxi</h1>
          <p className="text-gray-600">Gestión profesional de ingresos</p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? 'Cargando...' : isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O continuar con</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-md flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar con Google
        </button>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente principal
export default function DietarioTaxi() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('diario');
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyAmount, setDailyAmount] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Estados para los diferentes apartados
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Estados para el apartado diario
  const [isEditingDaily, setIsEditingDaily] = useState(false);
  const [tempDailyAmount, setTempDailyAmount] = useState('');

  // Inicializar Firebase
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js';
    script2.async = true;
    document.body.appendChild(script2);

    const script3 = document.createElement('script');
    script3.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js';
    script3.async = true;
    document.body.appendChild(script3);

    script3.onload = () => {
      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(firebaseConfig);
      }

      // Observar cambios de autenticación
      window.firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
        if (user) {
          loadDataFromFirestore(user.uid);
        }
      });
    };

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
    };
  }, []);

  // Cargar datos de Firestore
  const loadDataFromFirestore = async (userId) => {
    try {
      const db = window.firebase.firestore();
      const docRef = db.collection('users').doc(userId).collection('dietario').doc('data');
      const doc = await docRef.get();
      
      if (doc.exists) {
        setData(doc.data().entries || {});
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Guardar datos en Firestore
  const saveData = async (newData) => {
    setData(newData);
    
    if (user) {
      try {
        const db = window.firebase.firestore();
        await db.collection('users').doc(user.uid).collection('dietario').doc('data').set({
          entries: newData,
          lastUpdated: window.firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await window.firebase.auth().signOut();
      setData({});
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Actualizar el campo cuando cambia la fecha seleccionada
  useEffect(() => {
    const dateKey = formatDateISO(selectedDate);
    setDailyAmount(data[dateKey] || '');
    setIsEditingDaily(false);
    setTempDailyAmount('');
  }, [selectedDate, data]);

  // Funciones para el apartado DIARIO
  const handleDailyAmountChange = (value) => {
    const regex = /^\d*\.?\d{0,2}$/;
    if (value === '' || regex.test(value)) {
      setTempDailyAmount(value);
    }
  };

  const handleSaveDaily = () => {
    if (tempDailyAmount && !isNaN(parseFloat(tempDailyAmount))) {
      const dateKey = formatDateISO(selectedDate);
      const formattedValue = parseFloat(tempDailyAmount).toFixed(2);
      const newData = { ...data, [dateKey]: formattedValue };
      saveData(newData);
      setIsEditingDaily(false);
      setTempDailyAmount('');
    }
  };

  const handleEditDaily = () => {
    const dateKey = formatDateISO(selectedDate);
    setTempDailyAmount(data[dateKey] || '');
    setIsEditingDaily(true);
  };

  const handleCancelEdit = () => {
    setIsEditingDaily(false);
    setTempDailyAmount('');
  };

  const handleDeleteDaily = () => {
    const dateKey = formatDateISO(selectedDate);
    const newData = { ...data };
    delete newData[dateKey];
    saveData(newData);
    setDailyAmount('');
  };

  const getDailyTotal = () => {
    const dateKey = formatDateISO(selectedDate);
    const amount = data[dateKey] ? parseFloat(data[dateKey]) : 0;
    return {
      total: amount,
      sixty: amount * 0.6,
      forty: amount * 0.4
    };
  };

  // Funciones para el apartado SEMANAL
  const getWeekDates = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(monday);
      currentDate.setDate(monday.getDate() + i);
      weekDates.push(currentDate);
    }
    return weekDates;
  };

  const getWeekRange = () => {
    const weekDates = getWeekDates(selectedWeek);
    const firstDay = formatDate(weekDates[0]);
    const lastDay = formatDate(weekDates[6]);
    return `${firstDay} - ${lastDay}`;
  };

  const getWeeklyData = () => {
    const weekDates = getWeekDates(selectedWeek);
    const weekData = weekDates.map(date => {
      const dateKey = formatDateISO(date);
      return {
        date: formatDate(date),
        amount: data[dateKey] ? parseFloat(data[dateKey]) : 0,
        dayName: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][date.getDay() === 0 ? 6 : date.getDay() - 1]
      };
    });
    
    const total = weekData.reduce((sum, day) => sum + day.amount, 0);
    return { weekData, total, sixty: total * 0.6, forty: total * 0.4 };
  };

  // Funciones para el apartado MENSUAL
  const getMonthName = (monthIndex) => {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames[monthIndex];
  };

  const getMonthlyData = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const monthData = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const dateKey = formatDateISO(date);
      if (data[dateKey]) {
        monthData.push({
          date: formatDate(date),
          amount: parseFloat(data[dateKey])
        });
      }
    }
    
    const total = monthData.reduce((sum, day) => sum + day.amount, 0);
    return { monthData, total, sixty: total * 0.6, forty: total * 0.4 };
  };

  // Funciones para el apartado ANUAL
  const getAnnualData = () => {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const annualData = [];
    
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(selectedYear, month + 1, 0).getDate();
      let monthTotal = 0;
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(selectedYear, month, day);
        const dateKey = formatDateISO(date);
        if (data[dateKey]) {
          monthTotal += parseFloat(data[dateKey]);
        }
      }
      
      if (monthTotal > 0) {
        annualData.push({
          month: monthNames[month],
          amount: monthTotal
        });
      }
    }
    
    const total = annualData.reduce((sum, month) => sum + month.amount, 0);
    return { annualData, total, sixty: total * 0.6, forty: total * 0.4 };
  };

  // Funciones para el apartado TOTAL
  const getTotalData = () => {
    const allYears = {};
    
    Object.keys(data).forEach(dateKey => {
      const year = dateKey.split('-')[0];
      if (!allYears[year]) {
        allYears[year] = 0;
      }
      allYears[year] += parseFloat(data[dateKey]);
    });
    
    const yearsData = Object.keys(allYears)
      .sort((a, b) => b - a)
      .map(year => ({
        year,
        amount: allYears[year]
      }));
    
    const total = yearsData.reduce((sum, year) => sum + year.amount, 0);
    const totalDays = Object.keys(data).length;
    
    return { yearsData, total, sixty: total * 0.6, forty: total * 0.4, totalDays };
  };

  // Funciones para el apartado PERSONALIZADO
  const getCustomData = () => {
    if (!customStartDate || !customEndDate) return null;
    
    const start = new Date(customStartDate);
    const end = new Date(customEndDate);
    const customData = [];
    
    Object.keys(data).forEach(dateKey => {
      const date = new Date(dateKey);
      if (date >= start && date <= end) {
        customData.push({
          date: formatDate(date),
          amount: parseFloat(data[dateKey])
        });
      }
    });
    
    customData.sort((a, b) => {
      const dateA = a.date.split('/').reverse().join('');
      const dateB = b.date.split('/').reverse().join('');
      return dateA.localeCompare(dateB);
    });
    
    const total = customData.reduce((sum, day) => sum + day.amount, 0);
    return { customData, total, sixty: total * 0.6, forty: total * 0.4 };
  };

  // Funciones para copias de seguridad
  const handleBackup = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dietario-backup-${formatDateISO(new Date())}.json`;
    link.click();
  };

  const handleRestore = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const restoredData = JSON.parse(e.target.result);
          saveData(restoredData);
          alert('Copia de seguridad restaurada correctamente');
        } catch (error) {
          alert('Error al restaurar la copia de seguridad');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDeleteAll = () => {
    saveData({});
    setShowDeleteConfirm(false);
    alert('Todos los datos han sido eliminados');
  };

  // Menú de navegación
  const menuItems = [
    { id: 'diario', label: 'Dietario', icon: Home },
    { id: 'semanal', label: 'Semanal', icon: TrendingUp },
    { id: 'mensual', label: 'Mensual', icon: BarChart3 },
    { id: 'anual', label: 'Anual', icon: PieChart },
    { id: 'total', label: 'Total', icon: Clock },
    { id: 'personalizado', label: 'Personalizado', icon: FolderOpen },
    { id: 'backup', label: 'Ajustes', icon: Settings }
  ];

  const handleMenuItemClick = (tabId) => {
    setActiveTab(tabId);
    setMenuOpen(false);
  };

  const getTabTitle = () => {
    const item = menuItems.find(item => item.id === activeTab);
    return item ? item.label : 'Dietario';
  };

  // Mostrar pantalla de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  // Mostrar pantalla de login si no hay usuario
  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <style>{styles}</style>
      {/* Header con menú hamburguesa */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={28} />
          </button>
          <h1 className="text-xl font-bold">{getTabTitle()}</h1>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Cerrar sesión"
          >
            <LogOut size={24} />
          </button>
        </div>
      </div>

      {/* Menú lateral */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`fixed left-0 top-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del menú */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">Dietario Taxi</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-4 p-2 bg-white/10 rounded-lg">
              <User size={20} />
              <p className="text-blue-100 text-sm truncate">{user?.email}</p>
            </div>
          </div>

          {/* Items del menú */}
          <nav className="p-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl mb-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon size={22} />
                  <span className="font-medium flex-1 text-left">{item.label}</span>
                  {isActive && <ChevronRight size={20} />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-4 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* APARTADO DIARIO */}
          {activeTab === 'diario' && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Selecciona una fecha</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={formatDateISO(selectedDate)}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                  <button
                    onClick={() => setSelectedDate(new Date())}
                    className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-md"
                    title="Ir a hoy"
                  >
                    <Calendar size={24} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {!dailyAmount && !isEditingDaily ? (
                  // Vista: Sin datos
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-gray-700">Cantidad (€)</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={tempDailyAmount}
                      onChange={(e) => handleDailyAmountChange(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSaveDaily();
                        }
                      }}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
                      placeholder="0.00"
                    />
                    <button
                      onClick={handleSaveDaily}
                      disabled={!tempDailyAmount}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
                    >
                      Introducir
                    </button>
                  </div>
                ) : isEditingDaily ? (
                  // Vista: Editando
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-gray-700">Cantidad (€)</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={tempDailyAmount}
                      onChange={(e) => handleDailyAmountChange(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSaveDaily();
                        }
                      }}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg"
                      placeholder="0.00"
                      autoFocus
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveDaily}
                        disabled={!tempDailyAmount}
                        className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg disabled:from-gray-300 disabled:to-gray-400 flex items-center justify-center gap-2"
                      >
                        <Check size={20} />
                        Guardar
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 py-4 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <X size={20} />
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  // Vista: Con datos
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold text-gray-700">Cantidad</label>
                    <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
                      <span className="text-3xl font-bold text-gray-900">{dailyAmount} €</span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleEditDaily}
                        className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <Edit2 size={20} />
                        Editar
                      </button>
                      <button
                        onClick={handleDeleteDaily}
                        className="flex-1 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <Trash2 size={20} />
                        Borrar
                      </button>
                    </div>
                  </div>
                )}

                {dailyAmount && !isEditingDaily && (
                  <div className="mt-6 space-y-3 bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-xl border-2 border-gray-200">
                    {(() => {
                      const { total, sixty, forty } = getDailyTotal();
                      return (
                        <>
                          <div className="flex justify-between items-center text-lg pb-3 border-b-2 border-gray-200">
                            <span className="font-semibold text-gray-700">Total:</span>
                            <span className="font-bold text-black text-xl">{total.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">60%:</span>
                            <span className="font-bold text-red-600 text-lg">{sixty.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">40%:</span>
                            <span className="font-bold text-blue-600 text-lg">{forty.toFixed(2)} €</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Los demás apartados permanecen igual que en RC3... */}
          {/* Por brevedad, incluyo solo el apartado Semanal como ejemplo */}
          
          {activeTab === 'semanal' && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Semana del {getWeekRange()}</label>
                <input
                  type="date"
                  value={formatDateISO(selectedWeek)}
                  onChange={(e) => setSelectedWeek(new Date(e.target.value))}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-white text-center">
                  {getWeekRange()}
                </h3>
              </div>

              {(() => {
                const { weekData, total, sixty, forty } = getWeeklyData();
                return (
                  <>
                    <div className="space-y-2 mb-6">
                      {weekData.map((day, index) => (
                        <div
                          key={index}
                          className={`flex justify-between items-center p-4 rounded-xl transition-all ${
                            day.amount > 0
                              ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200'
                              : 'bg-gray-50 border-2 border-gray-200'
                          }`}
                        >
                          <div>
                            <div className="font-semibold text-gray-900">{day.dayName}</div>
                            <div className="text-sm text-gray-600">{day.date}</div>
                          </div>
                          <span className={`font-bold text-lg ${day.amount > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                            {day.amount > 0 ? `${day.amount.toFixed(2)} €` : '-'}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-xl border-2 border-gray-200">
                      <div className="flex justify-between items-center text-lg pb-3 border-b-2 border-gray-200">
                        <span className="font-semibold text-gray-700">Total:</span>
                        <span className="font-bold text-black text-xl">{total.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">60%:</span>
                        <span className="font-bold text-red-600 text-lg">{sixty.toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">40%:</span>
                        <span className="font-bold text-blue-600 text-lg">{forty.toFixed(2)} €</span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

{/* APARTADO MENSUAL */}
          {activeTab === 'mensual' && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mes</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month, index) => (
                      <option key={index} value={index}>{month}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Año</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-white text-center">
                  {getMonthName(selectedMonth)} de {selectedYear}
                </h3>
              </div>

              {(() => {
                const { monthData, total, sixty, forty } = getMonthlyData();
                return (
                  <>
                    {monthData.length > 0 ? (
                      <>
                        <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
                          {monthData.map((day, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl"
                            >
                              <span className="font-semibold text-gray-900">{day.date}</span>
                              <span className="font-bold text-blue-600 text-lg">{day.amount.toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3 bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-xl border-2 border-gray-200">
                          <div className="flex justify-between items-center text-lg pb-3 border-b-2 border-gray-200">
                            <span className="font-semibold text-gray-700">Total:</span>
                            <span className="font-bold text-black text-xl">{total.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">60%:</span>
                            <span className="font-bold text-red-600 text-lg">{sixty.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">40%:</span>
                            <span className="font-bold text-blue-600 text-lg">{forty.toFixed(2)} €</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 text-gray-500 font-medium">
                        No existen datos a mostrar
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {/* APARTADO ANUAL */}
          {activeTab === 'anual' && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Selecciona el año</label>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`flex-shrink-0 px-6 py-3 rounded-xl font-semibold transition-all ${
                        selectedYear === year
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-white text-center">
                  Año {selectedYear}
                </h3>
              </div>

              {(() => {
                const { annualData, total, sixty, forty } = getAnnualData();
                return (
                  <>
                    {annualData.length > 0 ? (
                      <>
                        <div className="space-y-2 mb-6">
                          {annualData.map((month, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl"
                            >
                              <span className="font-semibold text-gray-900">{month.month}</span>
                              <span className="font-bold text-blue-600 text-lg">{month.amount.toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3 bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-xl border-2 border-gray-200">
                          <div className="flex justify-between items-center text-lg pb-3 border-b-2 border-gray-200">
                            <span className="font-semibold text-gray-700">Total:</span>
                            <span className="font-bold text-black text-xl">{total.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">60%:</span>
                            <span className="font-bold text-red-600 text-lg">{sixty.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">40%:</span>
                            <span className="font-bold text-blue-600 text-lg">{forty.toFixed(2)} €</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 text-gray-500 font-medium">
                        No existen datos a mostrar
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {/* APARTADO TOTAL */}
          {activeTab === 'total' && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {(() => {
                const { yearsData, total, sixty, forty, totalDays } = getTotalData();
                return (
                  <>
                    {yearsData.length > 0 ? (
                      <>
                        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                          <p className="text-center">
                            <span className="font-semibold text-gray-700">Total de días: </span>
                            <span className="font-bold text-blue-600 text-lg">{totalDays}</span>
                          </p>
                        </div>

                        <div className="space-y-2 mb-6">
                          {yearsData.map((year, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl"
                            >
                              <span className="font-semibold text-gray-900">{year.year}</span>
                              <span className="font-bold text-blue-600 text-lg">{year.amount.toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3 bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-xl border-2 border-gray-200">
                          <div className="flex justify-between items-center text-lg pb-3 border-b-2 border-gray-200">
                            <span className="font-semibold text-gray-700">Total General:</span>
                            <span className="font-bold text-black text-xl">{total.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">60%:</span>
                            <span className="font-bold text-red-600 text-lg">{sixty.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">40%:</span>
                            <span className="font-bold text-blue-600 text-lg">{forty.toFixed(2)} €</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        No hay datos registrados
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {/* APARTADO PERSONALIZADO */}
          {activeTab === 'personalizado' && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha inicio</label>
                  <input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha fin</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {(() => {
                const result = getCustomData();
                if (!result) {
                  return (
                    <div className="text-center py-12 text-gray-500">
                      Selecciona un rango de fechas
                    </div>
                  );
                }
                
                const { customData, total, sixty, forty } = result;
                return (
                  <>
                    {customData.length > 0 ? (
                      <>
                        <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
                          {customData.map((day, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl"
                            >
                              <span className="font-semibold text-gray-900">{day.date}</span>
                              <span className="font-bold text-blue-600 text-lg">{day.amount.toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3 bg-gradient-to-r from-gray-50 to-slate-50 p-5 rounded-xl border-2 border-gray-200">
                          <div className="flex justify-between items-center text-lg pb-3 border-b-2 border-gray-200">
                            <span className="font-semibold text-gray-700">Total:</span>
                            <span className="font-bold text-black text-xl">{total.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">60%:</span>
                            <span className="font-bold text-red-600 text-lg">{sixty.toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">40%:</span>
                            <span className="font-bold text-blue-600 text-lg">{forty.toFixed(2)} €</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        No hay datos en el rango seleccionado
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}

          {/* APARTADO AJUSTES/BACKUP */}
          {activeTab === 'backup' && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="space-y-4">
                <button
                  onClick={handleBackup}
                  className="w-full flex items-center justify-center gap-3 p-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg font-semibold text-lg"
                >
                  <Download size={24} />
                  Crear Copia de Seguridad
                </button>

                <label className="w-full flex items-center justify-center gap-3 p-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg cursor-pointer font-semibold text-lg">
                  <Upload size={24} />
                  Restaurar Copia de Seguridad
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleRestore}
                    className="hidden"
                  />
                </label>

                <div className="border-t-2 border-gray-200 pt-6 mt-6">
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full flex items-center justify-center gap-3 p-5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg font-semibold text-lg"
                  >
                    <Trash2 size={24} />
                    Eliminar Todos los Datos
                  </button>
                </div>
              </div>

              {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Confirmar Eliminación</h3>
                    <p className="text-gray-700 mb-6">
                      ¿Estás seguro de que deseas eliminar todos los datos? Esta acción no se puede deshacer.
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={handleDeleteAll}
                        className="flex-1 p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 font-semibold shadow-lg"
                      >
                        Sí, eliminar todo
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 p-4 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 font-semibold shadow-lg"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
