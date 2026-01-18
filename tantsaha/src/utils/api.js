const API_BASE = 'http://localhost:5000/api';

// ============ OPENWEATHERMAP ============
const WEATHER_API_KEY = 'b3ad9b485aac99bfe9e5812e148c0db0';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const getRealtimeWeatherByLocation = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${WEATHER_BASE_URL}weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=fr`
    );
    
    if (!response.ok) {
      throw new Error('Erreur API OpenWeatherMap');
    }

    const data = await response.json();
    
    return {
      temp: data.main.temp,
      humidity: data.main.humidity,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,
      cloudiness: data.clouds.all,
      rainChance: data.rain?.['1h'] || 0,
      location: {
        name: data.name,
        country: data.sys.country,
        latitude: data.coord.lat,
        longitude: data.coord.lon
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erreur météo temps réel:', error);
    throw error;
  }
};

export const getWeatherForecast = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${WEATHER_BASE_URL}forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric&lang=fr`
    );
    
    if (!response.ok) {
      throw new Error('Erreur API OpenWeatherMap');
    }

    const data = await response.json();
    
    // Regrouper par jour
    const forecastByDay = {};
    
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      
      if (!forecastByDay[date]) {
        forecastByDay[date] = [];
      }
      
      forecastByDay[date].push({
        time: new Date(item.dt * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        temp: item.main.temp,
        humidity: item.main.humidity,
        condition: item.weather[0].main,
        description: item.weather[0].description,
        windSpeed: item.wind.speed,
        rainChance: (item.pop * 100).toFixed(0),
        timestamp: item.dt
      });
    });

    return {
      location: data.city.name,
      forecast: forecastByDay,
      retrievedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erreur prévision météo:', error);
    throw error;
  }
};

// ============ ALERTS ============
export const getAlerts = async () => {
  const response = await fetch(`${API_BASE}/alerts`);
  return response.json();
};

export const addAlert = async (alertData) => {
  const response = await fetch(`${API_BASE}/alerts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(alertData),
  });
  return response.json();
};

export const deleteAlert = async (id) => {
  const response = await fetch(`${API_BASE}/alerts/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

// ============ OBSERVATIONS ============
export const getObservations = async () => {
  const response = await fetch(`${API_BASE}/observations`);
  return response.json();
};

export const addObservation = async (observationData) => {
  const response = await fetch(`${API_BASE}/observations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(observationData),
  });
  return response.json();
};

export const deleteObservation = async (id) => {
  const response = await fetch(`${API_BASE}/observations/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

// ============ WEATHER ============
export const getWeather = async () => {
  const response = await fetch(`${API_BASE}/weather`);
  return response.json();
};

export const getWeatherByLocation = async (latitude, longitude) => {
  const response = await fetch(`${API_BASE}/weather?lat=${latitude}&lon=${longitude}`);
  return response.json();
};

export const getLocationRealtime = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Géolocalisation non supportée par ce navigateur'));
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        resolve({
          latitude,
          longitude,
          accuracy,
          timestamp: new Date().toISOString()
        });
      },
      (error) => {
        reject(new Error(`Erreur de géolocalisation: ${error.message}`));
      },
      options
    );
  });
};

export const getCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Géolocalisation non supportée par ce navigateur'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        resolve({
          latitude,
          longitude,
          accuracy,
          timestamp: new Date().toISOString()
        });
      },
      (error) => {
        reject(new Error(`Erreur de géolocalisation: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

// ============ ADVICE ============
export const getAdvice = async () => {
  const response = await fetch(`${API_BASE}/advice`);
  return response.json();
};
