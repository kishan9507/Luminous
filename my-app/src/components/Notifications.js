import React, { useEffect, useState } from 'react';
import {
  Snackbar,
  Alert,
} from '@mui/material';

// Dummy data for tariffs with some prices above $5
const dummyTariffs = [
  { time: '08:00 AM', price: 0.12 },
  { time: '12:00 PM', price: 0.20 },
  { time: '06:00 PM', price: 5.30 }, // High price example
  { time: '10:00 PM', price: 0.10 },
];

function Notifications() {
  const [highPriceTimes, setHighPriceTimes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSolarSnackbar, setOpenSolarSnackbar] = useState(false);
  const [solarPrices, setSolarPrices] = useState([]); // State to hold solar prices

  useEffect(() => {
    const checkTariffs = () => {
      const highPrices = dummyTariffs.filter(tariff => tariff.price > 0.25); // Assuming price > $0.25 is high
      if (highPrices.length > 0) {
        setHighPriceTimes(highPrices);
        setOpenSnackbar(true);
      }

      // Check for solar energy selling opportunity
      const highSolarPrices = dummyTariffs.filter(tariff => tariff.price > 5);
      if (highSolarPrices.length > 0) {
        setSolarPrices(highSolarPrices); // Store the high solar prices
        setOpenSolarSnackbar(true);
      }
    };

    checkTariffs();

    // Check every minute for updates
    const interval = setInterval(checkTariffs, 60000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseSolarSnackbar = () => {
    setOpenSolarSnackbar(false);
  };

  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          High electricity prices detected! Use solar energy!
        </Alert>
      </Snackbar>

      <Snackbar 
        open={openSolarSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSolarSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Positioning the snackbar at the top right
      >
        <Alert onClose={handleCloseSolarSnackbar} severity="info" sx={{ width: '100%' }}>
          Sell Solar Energy: ${solarPrices[0]?.price || "N/A"} {/* Displaying the first high solar price */}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Notifications;