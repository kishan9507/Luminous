import React from 'react';
import TariffMonitor from '../components/TariffMonitor';
import EnergyAnalytics from '../components/EnergyAnalytics';
import SmartScheduler from '../components/SmartScheduler';
import SolarManagement from '../components/SolarManagement';
import Notifications from '../components/Notifications';
import Forecasting from '../components/Forecasting';

function Dashboard() {
  return (
    <div style={{ marginTop: '20px' }}>
      {/* <h2>Dashboard</h2> */}
      <TariffMonitor />
      <EnergyAnalytics />
      <SmartScheduler />
      <SolarManagement />
      <Notifications />
      <Forecasting />
    </div>
  );
}

export default Dashboard;
