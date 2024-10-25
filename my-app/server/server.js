const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Dummy tariff data
const tariffs = [
  { id: 1, time: '08:00 AM', price: 0.12 },
  { id: 2, time: '12:00 PM', price: 0.20 },
  { id: 3, time: '06:00 PM', price: 0.30 },
  { id: 4, time: '10:00 PM', price: 0.10 },
];

// Sample energy consumption data
const getRandomConsumptionData = () => {
  const timestamps = [];
  const consumption = [];
  
  for (let i = 0; i < 24; i++) {
    timestamps.push(`${i}:00`);
    consumption.push(Math.floor(Math.random() * 10) + 1); // Random consumption between 1 and 10 kWh
  }
  
  return { timestamps, consumption };
};

app.get('/api/tariffs', (req, res) => {
  res.json(tariffs);
});

// New endpoint for energy consumption data
app.get('/api/energy-data', (req, res) => {
  const data = getRandomConsumptionData();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
