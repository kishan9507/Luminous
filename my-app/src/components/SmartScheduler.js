import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';

const appliances = [
  { id: 1, name: 'Washing Machine', power: 5 }, // Power in kW
  { id: 2, name: 'Dishwasher', power: 5 },
  { id: 3, name: 'Electric Vehicle Charger', power: 8 },
  { id: 4, name: 'Refrigerator', power: 0.5 },
  { id: 5, name: 'Air Conditioner', power: 3.5 },
  { id: 6, name: 'Heater', power: 2.5 },
  { id: 7, name: 'Microwave', power: 1.2 },
  { id: 8, name: 'Television', power: 0.1 },
];

const lowTariffTimes = ['08:00 AM', '10:00 PM']; // Example low tariff times
const HIGH_CONSUMPTION_THRESHOLD = 5; // Example threshold in kW

function SmartScheduler() {
  const [currentPowerConsumption, setCurrentPowerConsumption] = useState(0);
  
  // State to track scheduled appliances
  const [scheduledAppliances, setScheduledAppliances] = useState([]);
  
  // State to track notifications
  const [notification, setNotification] = useState('');

  // Simulate current power consumption for demonstration purposes
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random power consumption between 0 and 10 kW
      const randomConsumption = Math.random() * 10;
      setCurrentPowerConsumption(randomConsumption);
      // Check if scheduling is needed
      if (randomConsumption > HIGH_CONSUMPTION_THRESHOLD) {
        scheduleAppliances();
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const scheduleAppliances = () => {
    alert("Warning: Current power consumption is high! Scheduling appliances...");

    // Automatically schedule appliances that consume more than or equal to the threshold
    const highPowerAppliances = appliances
      .filter(appliance => appliance.power >= HIGH_CONSUMPTION_THRESHOLD) // Include appliances equal to or greater than the threshold
      .sort((a, b) => b.power - a.power); // Sort by power consumption (highest first)
    
    if (highPowerAppliances.length > 0) {
      const newScheduledAppliances = highPowerAppliances.map(appliance => {
        const time = lowTariffTimes[Math.floor(Math.random() * lowTariffTimes.length)]; // Randomly select a low tariff time
        return { ...appliance, time }; // Create a new object with the scheduled time
      });

      setScheduledAppliances(newScheduledAppliances); // Update state with newly scheduled appliances
      
      // Create notification message
      const notificationMessage = newScheduledAppliances.map(appliance => 
        `${appliance.name} scheduled at ${appliance.time}`
      ).join(', ');
      
      setNotification(notificationMessage); // Set notification message to be displayed as an alert

      // Automatically display the notification for a short period
      setTimeout(() => {
        setNotification('');
      }, 6000); // Clear notification after 6 seconds
    } else {
      alert("No appliances can be scheduled due to low power consumption.");
    }
  };

  return (
    <Card variant="outlined" style={{ marginBottom: '20px', borderRadius: '8px' }}>
      <CardContent>
        <Typography variant="h5" style={{ marginBottom: '20px',backgroundColor:'lightgreen', textAlign: 'center', fontFamily: 'serif', textTransform: 'uppercase', fontWeight: 'bolder' }}>
          Smart Scheduling
        </Typography>

        {/* Display current power consumption */}
        <Typography variant="body1" style={{ marginTop: '20px', textAlign: 'center' }}>
          Current Power Consumption: {currentPowerConsumption.toFixed(2)} kW
        </Typography>

        {/* Display scheduled appliances */}
        <Typography variant="h6" style={{ marginTop: '20px', textAlign: 'center' }}>
          Scheduled Appliances:
        </Typography>
        
        {scheduledAppliances.length === 0 ? (
          <Typography variant="body2" style={{ textAlign: 'center' }}>
            No appliances scheduled yet.
          </Typography>
        ) : (
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            {scheduledAppliances.map((appliance) => (
              <li key={appliance.id}>
                {appliance.name} - Scheduled at {appliance.time}
              </li>
            ))}
          </ul>
        )}

        {/* Display notification if exists */}
        {notification && (
          <Typography variant="body2" style={{ marginTop: '20px', color: '#4caf50' }}>
            • {notification}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default SmartScheduler;
