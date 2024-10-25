// src/components/TariffMonitor.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import TariffMonitor from './TariffMonitor';
import axios from 'axios';

jest.mock('axios');

describe('TariffMonitor Component', () => {
  
  test('renders tariff monitoring heading', async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, time: "08:00 AM", price: "0.12" }] });

    render(<TariffMonitor />);

    expect(screen.getByText(/Real-Time Tariff Monitoring/i)).toBeInTheDocument();
    
    // Wait for async data to be displayed.
    expect(await screen.findByText(/Time:/i)).toBeInTheDocument();
    
    expect(screen.getByText(/08:00 AM/i)).toBeInTheDocument();
    expect(screen.getByText(/\$0.12/i)).toBeInTheDocument();
    
    // Clean up mock.
    jest.clearAllMocks();
});
});
