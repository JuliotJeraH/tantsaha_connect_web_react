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

// Serve static files (audio)
app.use('/audio', express.static(path.join(__dirname, 'src/assets')));

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
  const { lat, lon } = req.query;
  const latitude = lat ? parseFloat(lat) : -18.8792;
  const longitude = lon ? parseFloat(lon) : 47.5079;
  
  const weather = await getRealWeather(latitude, longitude);
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
    { id: 1, crop: 'general', title: 'Fanomanana ny tany', description: 'Alohan\'ny hamafazana na hambolena dia :\n-Harorana tsara ny tany\n-Esorina ny ahi-dratsy\n-Ahitsiana sy ahodina tsara ny tampon-tany\n-Jereo raha lena na maina loatra ny tany', icon: 'lightbulb', audio: 'fanomanana-ny-tany.wav' },
    { id: 2, crop: 'general', title: 'Fanondrahana', description: 'Raha monondraka dia : - Manodraka amin\'ny andro mivatravatre, mafana be - Aza manodraka amin\'ny andro mivatravatre - Aza manodraka raha hiey crana be', icon: 'water', audio: 'fanondrahana.wav' },
    { id: 3, crop: 'general', title: 'Hiadiana amin\'ny bibilely mpanimba', description: 'Diniho matetika ny ravin-javameniry - Esory amin\'ny tañana ny bibilely hita - Ampiasso vehaciana voajanahahy (reno + savory, ravin\'neem, sakamalalio, tongolo gasy...)', icon: 'bug', audio: 'hiadiana-bibilely.wav' },
    { id: 4, crop: 'rice', title: 'Famafazana vary', description: 'Misafidiana voa tsara kalitao - Aza mamafaze ivelan\'ny vanim-potcana mety - Aza mamafaze rehefa avy crana be - Tazomy ho lena tsara ny tany saingy aza aondrahana tafehoatra', icon: 'seedling', audio: 'famafazana-vary.wav' },
    { id: 5, crop: 'general', title: 'Fampiasana zezika komposta', description: 'Afangaroy amin\'ny tany ny komposta - Aza misy fako plastika, vera, metaly ao anatiny - Apatranho loha alahana ny hämbolena - Manampy ny zamamaniry hitombo haingana sy ho matanjaksaactive', icon: 'compost', audio: 'fampiasana-komposta.wav' },
    { id: 6, crop: 'general', title: 'Vanim-potoana', description: 'Amin\'ny vanim-potcana mafana / fahavatratra - Azo volena - voetabia, sakey, beranjeay, tsaramaso - Amin\'ny fotosm-pahavatratra / crana - Aza mametraka zama-boiy marefo', icon: 'climate', audio: 'vanim-potoana.wav' },
    { id: 7, crop: 'general', title: 'Hiadiana amin\'ny aretin-javamaniry', description: 'Esory avy hatrany ny ravina na sampana marazy - Acika ho misy elaneiana uy vcily - Aza manodraka mitraka amin\'ny raviny', icon: 'disease', audio: 'hiadiana-aretina.wav' },
    { id: 8, crop: 'rice', title: 'Momba ny fifinjana', description: 'Jinjaina maraina vao maizina - Aza mijinja raha be ny tany na mbola mando ny vcily', icon: 'harvest', audio: 'momba-fifinjana.wav' },
    { id: 9, crop: 'general', title: 'Fikarakarana ny saha', description: 'Manaia ahi-dratsy tsy tapaka - Mandic sy manadic fitacvana ampiassaina - Aza mamafy na mamboly sady skalky loatra - Jereo matetika ny lakandrano sy ny tatatra sac mihitsoka', icon: 'tools', audio: 'fikarakarana-saha.wav' },
    { id: 10, crop: 'general', title: 'Aza adino mihitsy!', description: 'Jereo foana ny toetrandy alohany hamafazana na hämbolena. Izany no fototy ny tetikasa "Tantsaha Connect". ', icon: 'reminder', audio: 'aza-adino.wav' },
  ];
  res.json(advices);
});

// Initialize files and start server
initializeFiles();

app.listen(PORT, () => {
  console.log(`🌾 Tantsaha Server running on http://localhost:${PORT}`);
});
