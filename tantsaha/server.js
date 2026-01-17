import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// OpenWeatherMap API
const OPENWEATHER_API_KEY = 'b3ad9b485aac99bfe9e5812e148c0db0';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/';

// Middleware
app.use(cors());
app.use(express.json());

// Database file paths
const dataDir = path.join(__dirname, 'data');
const alertsFile = path.join(dataDir, 'alerts.json');
const observationsFile = path.join(dataDir, 'observations.json');
const weatherFile = path.join(dataDir, 'weather.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize JSON files if they don't exist
const initializeFiles = () => {
  if (!fs.existsSync(alertsFile)) {
    fs.writeFileSync(alertsFile, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(observationsFile)) {
    fs.writeFileSync(observationsFile, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(weatherFile)) {
    const defaultWeather = [
      { date: new Date().toISOString().split('T')[0], temp: 28, humidity: 65, condition: 'sunny', rainChance: 10 },
      { date: new Date(Date.now() + 86400000).toISOString().split('T')[0], temp: 26, humidity: 70, condition: 'partly-cloudy', rainChance: 30 },
      { date: new Date(Date.now() + 172800000).toISOString().split('T')[0], temp: 24, humidity: 75, condition: 'rainy', rainChance: 80 },
    ];
    fs.writeFileSync(weatherFile, JSON.stringify(defaultWeather, null, 2));
  }
};

// Helper functions
const readJSON = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    return [];
  }
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Get real weather data from OpenWeatherMap API
const getRealWeather = async (lat = -18.8792, lon = 47.5079) => { // Default: Antananarivo, Madagascar
  try {
    const url = `${OPENWEATHER_BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('OpenWeatherMap API error');
    }
    
    const data = await response.json();
    const weatherData = [];
    
    // Process forecast data (returns 5-day forecast in 3-hour intervals)
    const processedDates = new Set();
    
    for (const forecast of data.list) {
      const date = forecast.dt_txt.split(' ')[0];
      
      // Get one entry per day
      if (!processedDates.has(date)) {
        processedDates.add(date);
        weatherData.push({
          date: date,
          temp: Math.round(forecast.main.temp),
          humidity: forecast.main.humidity,
          condition: forecast.weather[0].main.toLowerCase(),
          rainChance: (forecast.pop || 0) * 100, // Probability of precipitation
          description: forecast.weather[0].description
        });
      }
      
      if (weatherData.length >= 5) break; // Get 5 days
    }
    
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather from OpenWeatherMap:', error);
    // Return mock data as fallback
    return [
      { date: new Date().toISOString().split('T')[0], temp: 28, humidity: 65, condition: 'sunny', rainChance: 10 },
      { date: new Date(Date.now() + 86400000).toISOString().split('T')[0], temp: 26, humidity: 70, condition: 'partly-cloudy', rainChance: 30 },
      { date: new Date(Date.now() + 172800000).toISOString().split('T')[0], temp: 24, humidity: 75, condition: 'rainy', rainChance: 80 },
    ];
  }
};

// ============ ALERTS API ============
app.get('/api/alerts', (req, res) => {
  const alerts = readJSON(alertsFile);
  res.json(alerts);
});

app.post('/api/alerts', (req, res) => {
  const { title, description, type, date } = req.body;
  const alerts = readJSON(alertsFile);
  const newAlert = {
    id: Date.now(),
    title,
    description,
    type, // 'planting', 'harvest', 'warning'
    date,
    createdAt: new Date().toISOString(),
  };
  alerts.push(newAlert);
  writeJSON(alertsFile, alerts);
  res.status(201).json(newAlert);
});

app.delete('/api/alerts/:id', (req, res) => {
  const { id } = req.params;
  let alerts = readJSON(alertsFile);
  alerts = alerts.filter(alert => alert.id !== parseInt(id));
  writeJSON(alertsFile, alerts);
  res.json({ success: true });
});

// ============ OBSERVATIONS API ============
app.get('/api/observations', (req, res) => {
  const observations = readJSON(observationsFile);
  res.json(observations);
});

app.post('/api/observations', (req, res) => {
  const { type, description, date, crop } = req.body;
  const observations = readJSON(observationsFile);
  const newObservation = {
    id: Date.now(),
    type, // 'rain', 'pest', 'planting', 'harvest'
    description,
    date,
    crop,
    createdAt: new Date().toISOString(),
  };
  observations.push(newObservation);
  writeJSON(observationsFile, observations);
  res.status(201).json(newObservation);
});

app.get('/api/observations/:id', (req, res) => {
  const observations = readJSON(observationsFile);
  const observation = observations.find(o => o.id === parseInt(req.params.id));
  if (!observation) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(observation);
});

app.delete('/api/observations/:id', (req, res) => {
  const { id } = req.params;
  let observations = readJSON(observationsFile);
  observations = observations.filter(obs => obs.id !== parseInt(id));
  writeJSON(observationsFile, observations);
  res.json({ success: true });
});

// ============ WEATHER API ============
app.get('/api/weather', async (req, res) => {
  const weather = await getRealWeather();
  res.json(weather);
});

app.post('/api/weather', (req, res) => {
  const { date, temp, humidity, condition, rainChance } = req.body;
  const weather = readJSON(weatherFile);
  weather.push({ date, temp, humidity, condition, rainChance });
  writeJSON(weatherFile, weather);
  res.status(201).json({ date, temp, humidity, condition, rainChance });
});

// ============ ADVICE API ============
app.get('/api/advice', (req, res) => {
  const advices = [
    { id: 1, crop: 'rice', title: 'Arrosage du riz', description: 'Arroser régulièrement pendant les 3 premiers mois', icon: 'droplet' },
    { id: 2, crop: 'maize', title: 'Semis maïs', description: 'Semer à 2-3 cm de profondeur, espacés de 20 cm', icon: 'leaf' },
    { id: 3, crop: 'beans', title: 'Haricots sains', description: 'Surveiller les parasites, utiliser des pièges à insectes', icon: 'bug' },
    { id: 4, crop: 'potato', title: 'Culture pommes de terre', description: 'Récolter après 90 jours de plantation', icon: 'harvest' },
    { id: 5, crop: 'rice', title: 'Lutte parasites riz', description: 'Utiliser des solutions biologiques', icon: 'shield' },
  ];
  res.json(advices);
});

// Initialize files and start server
initializeFiles();

app.listen(PORT, () => {
  console.log(`🌾 Tantsaha Server running on http://localhost:${PORT}`);
});
