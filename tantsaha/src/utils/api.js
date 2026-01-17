const API_BASE = 'http://localhost:5000/api';

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

// ============ ADVICE ============
export const getAdvice = async () => {
  const response = await fetch(`${API_BASE}/advice`);
  return response.json();
};
