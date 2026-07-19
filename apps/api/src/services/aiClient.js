// ACTION: CREATE
// FILE: src/services/aiClient.js
const axios = require('axios');

const aiClient = axios.create({
  baseURL: process.env.AI_ENGINE_URL || 'http://127.0.0.1:5001',
  timeout: 10000,
});

const matchEmployee = async (preferences, jobs) => {
  try {
    const response = await aiClient.post('/match/employee', {
      preferences,
      jobs,
    });
    return response.data;
  } catch (error) {
    console.warn('AI Engine warning [matchEmployee]:', error.message);
    return { matches: [] };
  }
};

const matchEmployer = async (desiredProfile, candidates) => {
  try {
    const response = await aiClient.post('/match/employer', {
      desired_profile: desiredProfile,
      candidates,
    });
    return response.data;
  } catch (error) {
    console.warn('AI Engine warning [matchEmployer]:', error.message);
    return { matches: [] };
  }
};

module.exports = {
  matchEmployee,
  matchEmployer,
};
