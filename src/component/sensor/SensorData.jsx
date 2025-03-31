import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SensorData.css'; // Import CSS

const SensorData = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSensorData = async () => {
        try {
            const response = await axios.get('https://iomt.hoangphucthanh.vn/index.php?latest');
            console.log('Sensor Data:', response.data);
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching sensor data:', error);
            setError('Failed to load data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSensorData();
        const intervalId = setInterval(fetchSensorData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <p className="loading">Loading sensor data...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="sensor-data-container">
            <h3>Live Sensor Dashboard</h3>
            <div className="sensor-data-grid">
                <div className="sensor-data-item">
                    <p className="label">Current</p>
                    <p className="value">{data.currentValue || '0'}</p>
                    <p className="unit">A</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Power</p>
                    <p className="value">{data.powerValue || '0'}</p>
                    <p className="unit">W</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Temperature</p>
                    <p className="value">{data.nhiet_do || 'N/A'}</p>
                    <p className="unit">°C</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Humidity</p>
                    <p className="value">{data.do_am || 'N/A'}</p>
                    <p className="unit">%</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Air Quality</p>
                    <p className="value">{data.cl_kk || 'N/A'}</p>
                    <p className="unit">ppm</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">PM2.5 Concentration</p>
                    <p className="value">{data.bui_min || 'N/A'}</p>
                    <p className="unit">µg/m³</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Longitude</p>
                    <p className="value">{data.lon || 'N/A'}</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Latitude</p>
                    <p className="value">{data.lat || 'N/A'}</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Operation Count</p>
                    <p className="value">{data.lightToggleCount || '0'}</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Operation State</p>
                    <p className="value">{data.opr_flag === 1 ? 'On' : 'Off'}</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Operation Time</p>
                    <p className="value">{data.opr_time || 'N/A'}</p>
                </div>
                <div className="sensor-data-item">
                    <p className="label">Update Time</p>
                    <p className="value">{data.created_at || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default SensorData;