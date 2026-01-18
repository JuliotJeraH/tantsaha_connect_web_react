/**
 * Service pour générer les alertes météo basées sur les données de météo
 */

export const generateWeatherAlerts = (weatherData) => {
  if (!weatherData) return [];

  const alerts = [];
  
  try {
    // Extraire les données météo
    const temp = weatherData.temp || 0;
    const description = (weatherData.description || '').toLowerCase();
    const rain = weatherData.rainChance || weatherData.rain || 0;
    const wind = weatherData.wind || 0;

    console.log('Données météo analysées - Temp:', temp, '°C, Pluie:', rain, '%, Vent:', wind, 'km/h');

    // ALERTE PLUIE FORTE - Plus de 70% de chance ou > 15mm
    if (rain > 70 || rain > 15) {
      console.log('ALERTE: Pluie forte détectée -', rain, '%');
      alerts.push(createAlertePluieForte(rain));
    }

    // ALERTE ORAGE
    const termesOrage = ['thunderstorm', 'orage', 'tonnerre', 'lightning', 'éclair'];
    const hasOrage = termesOrage.some(terme => description.includes(terme));
    
    if (hasOrage || (description.includes('rain') && description.includes('thunder'))) {
      console.log('ALERTE: Orage détecté -', description);
      alerts.push(createAlerteOrage());
    }

    // ALERTE FORTE CHALEUR - Plus de 34°C
    if (temp > 34) {
      console.log('ALERTE: Chaleur extrême détectée -', temp, '°C');
      alerts.push(createAlerteChaleur(temp));
    }

    // ALERTE VENT VIOLENT - Plus de 40 km/h
    if (wind > 40) {
      console.log('ALERTE: Vent violent détecté -', wind, 'km/h');
      alerts.push(createAlerteVent(wind));
    }

    // ALERTE FROID INTENSE - Moins de 8°C
    if (temp < 8) {
      console.log('ALERTE: Froid intense détecté -', temp, '°C');
      alerts.push(createAlerteFroid(temp));
    }

    console.log('Résultat:', alerts.length, 'alertes générées');
    
    return alerts;
  } catch (error) {
    return [];
  }
};

const createAlertePluieForte = (rain) => ({
  type: 'pluie_forte',
  titre: 'Rivo-mahery androany!',
  message: `Misy rivo-mahery androany (${Math.round(rain)}% chance). Ataovy izay hahafahana miaro ny fambolena:`,
  actions: [
    'Arovy ny zana-kazo raha afaka',
    'Aza mamafy androany',
    'Jereo ny lalana ranonorana tsy hisakana',
    'Ampiandao ny fitaovana sasany'
  ],
  urgence: 'haute'
});

const createAlerteOrage = () => ({
  type: 'orage',
  titre: 'Kotroka androany!',
  message: 'Misy kotroka androany. Mitandrema:',
  actions: [
    'Avelao ny saha',
    'Apetraho any anaty trano ny fitaovana metaly',
    'Aza mipetraka eo am-banin\'ny hazo',
    'Aza mampiasa telefaona anaty rano'
  ],
  urgence: 'haute'
});

const createAlerteChaleur = (temp) => ({
  type: 'chaleur',
  titre: 'Hafanana tafahoatra androany!',
  message: `Tafahoatra ny hafanana androany (${Math.round(temp)}°C). Ataovy izay manaraka:`,
  actions: [
    'Anondraho maraina ny rano',
    'Aza anondrahana amin\'ny mitatao vovonana',
    'Arovy ny zana-kazo malemy',
    'Misotro rano be ianao'
  ],
  urgence: 'moyenne'
});

const createAlerteVent = (wind) => ({
  type: 'vent',
  titre: 'Rivotra mahery androany!',
  message: `Misy rivotra mahery androany (${Math.round(wind)} km/h). Mitandrema:`,
  actions: [
    'Arovy ny zana-kazo vaovao',
    'Hazon-drano ny zavamaniry malemy',
    'Apetraho ao anaty trano ny fitaovana mora levona',
    'Aza mitsangana eo ambanin\'ny hazo'
  ],
  urgence: 'moyenne'
});

const createAlerteFroid = (temp) => ({
  type: 'froid',
  titre: 'Mangatsiaka be androany!',
  message: `Mangatsiaka be androany (${Math.round(temp)}°C). Ataovy izay manaraka:`,
  actions: [
    'Aza mamafy androany',
    'Arovy ao anaty trano ny zana-kazo',
    'Amboary ny tany amin\'ny ahitra maina',
    'Miandry hatramin\'ny hafanana ny famafazana'
  ],
  urgence: 'moyenne'
});
