import React, { useState } from 'react';
import {
  FiLifeBuoy,
  FiAirplay,
  FiSettings,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiArrowDownCircle
} from 'react-icons/fi';
import { Bs123, BsIndent } from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Manufactures = () => {
  // State for manufacturers data
  const [manufacturers, setManufacturers] = useState([
    { id: 1, name: 'Audi', country: 'Germany', icon: <FiLifeBuoy />, models: ['A4', 'Q5', 'A6'] },
    { id: 2, name: 'BMW', country: 'Germany', icon: <FiAirplay />, models: ['3 Series', 'X5', '5 Series'] },
    { id: 3, name: 'Fiat', country: 'Italy', icon: <BsIndent />, models: ['500', 'Panda', 'Tipo'] },
    { id: 4, name: 'Ford', country: 'USA', icon: <BsIndent />, models: ['F-150', 'Mustang', 'Explorer'] },
    { id: 5, name: 'JLR', country: 'UK', icon: <FiSettings />, models: ['Range Rover', 'Discovery', 'Defender'] }
  ]);


  const modelsPerCountry = Object.entries(
    manufacturers.reduce((acc, curr) => {
      acc[curr.country] = (acc[curr.country] || 0) + curr.models.length;
      return acc;
    }, {})
  ).map(([country, count]) => ({
    country,
    modelCount: count
  }));


  // State for expanded rows
  const [expandedRows, setExpandedRows] = useState([]);
  const [newManufacturer, setNewManufacturer] = useState({ name: '', country: '', year: '', licence: "" });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  // Toggle row expansion
  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  // Handle manufacturer info display
  const showManufacturerInfo = (manufacturer) => {
    alert(`${manufacturer.name} is from ${manufacturer.country}\n and in the year ${manufacturer.year}Models: ${manufacturer.models.join(', ')}`);
  };

  // Add new manufacturer
  const addManufacturer = () => {
    if (newManufacturer.name && newManufacturer.country && newManufacturer.year && newManufacturer.licence) {
      const newId = manufacturers.length > 0 ? Math.max(...manufacturers.map(m => m.id)) + 1 : 1;
      setManufacturers([
        ...manufacturers,
        {
          id: newId,
          name: newManufacturer.name,
          country: newManufacturer.country,
          year: newManufacturer.year,
          licence: newManufacturer.licence,
          icon: <FiArrowDownCircle />,
          models: ['New Model']
        }
      ]);
      setNewManufacturer({ name: '', country: '', year: "", licence: "" });
    }
  };

  // Delete manufacturer
  const deleteManufacturer = (id) => {
    if (window.confirm('Are you sure you want to delete this manufacturer?')) {
      setManufacturers(manufacturers.filter(m => m.id !== id));
    }
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sort manufacturers
  const sortedManufacturers = [...manufacturers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Filter manufacturers based on search term
  const filteredManufacturers = sortedManufacturers.filter(manufacturer =>
    manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manufacturer.country.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const getCountryCoordinates = (country) => {
    const coordinatesMap = {
      "Germany": [10.45, 51.16],
      "Italy": [12.56, 42.50],
      "USA": [-98.58, 39.83],  // Centered coordinates
      "United States": [-98.58, 39.83],
      "UK": [-3.44, 55.38],
      "United Kingdom": [-3.44, 55.38],
      "France": [2.35, 46.86],
      "Japan": [138.25, 36.20],
      "South Korea": [127.77, 35.91],
      "China": [104.19, 35.86],
      "Sweden": [18.64, 60.13],
      "India": [78.96, 20.59],
      "Brazil": [-53.10, -10.83],
      // Add more countries as needed
    };

    // Try exact match first, then case-insensitive
    return coordinatesMap[country] ||
      coordinatesMap[Object.keys(coordinatesMap).find(key =>
        key.toLowerCase() === country.toLowerCase())];
  };

  // Process manufacturer data
  const countryData = manufacturers.reduce((acc, manufacturer) => {
    const coordinates = getCountryCoordinates(manufacturer.country);
    if (!coordinates) return acc; // Skip if no coordinates

    const existing = acc.find(item =>
      item.coordinates[0] === coordinates[0] &&
      item.coordinates[1] === coordinates[1]);

    if (existing) {
      existing.count++;
      existing.manufacturers.push(manufacturer.name);
    } else {
      acc.push({
        country: manufacturer.country,
        count: 1,
        manufacturers: [manufacturer.name],
        coordinates
      });
    }
    return acc;
  }, []);



  return (


    <>



      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

        <button
          style={{ color: "red", fontWeight: "bold", backgroundColor: "red", borderRadius: "2px", width: "1000px" }}

        >

        </button>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Automobile Manufacturers</h1>

        <button
          style={{ color: "red", fontWeight: "bold", backgroundColor: "red", borderRadius: "2px", width: "1000px" }}

        >
        </button>


        {/* Search and Add New */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <input
              type="text"
              placeholder="Search manufacturers..."
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '300px' }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Manufacturer name"
              value={newManufacturer.name}
              onChange={(e) => setNewManufacturer({ ...newManufacturer, name: e.target.value })}
              style={{ color: "red", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "150px" }}
            />
            <input
              type="text"
              placeholder="Country"
              value={newManufacturer.country}
              onChange={(e) => setNewManufacturer({ ...newManufacturer, country: e.target.value })}
              style={{ color: "red", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "150px" }}
            />

            <input
              type="number"
              placeholder="Year"
              value={newManufacturer.year}
              onChange={(e) => setNewManufacturer({ ...newManufacturer, year: e.target.value })}
              style={{ color: "red", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "60px" }}
            />

            <input
              type="text"
              placeholder="Licence"
              value={newManufacturer.licence}
              onChange={(e) => setNewManufacturer({ ...newManufacturer, licence: e.target.value })}
              style={{ color: "red", fontWeight: "bold", backgroundColor: "black", borderRadius: "10px", width: "60px" }}
            />


            <button
              onClick={addManufacturer}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <FiPlus /> Add
            </button>
          </div>
        </div>

        {/* Manufacturers Table */}
        <div className="overflow-x-auto" style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className='bg-gray-700'>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('id')}>
                  ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('name')}>
                  Manufacturer {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('country')}>
                  Country {sortConfig.key === 'country' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('year')}>
                  Year {sortConfig.key === 'year' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('licence')}>
                  Licence {sortConfig.key === 'licence' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                  <BsIndent />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredManufacturers.map((manufacturer) => (
                <React.Fragment key={manufacturer.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center bg-indigo-100 text-indigo-600">
                          {manufacturer.id}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {manufacturer.icon}
                        {manufacturer.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {manufacturer.country}

                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {manufacturer.year}

                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {manufacturer.licence}

                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => showManufacturerInfo(manufacturer)}
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: "#2196F3",
                            borderRadius: "4px",
                            padding: "5px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px"
                          }}
                        >
                          <FiEdit size={14} /> Info
                        </button>
                        <button
                          onClick={() => toggleRow(manufacturer.id)}
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: "#FF9800",
                            borderRadius: "4px",
                            padding: "5px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px"
                          }}
                        >
                          {expandedRows.includes(manufacturer.id) ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />} Models
                        </button>
                        <button
                          onClick={() => deleteManufacturer(manufacturer.id)}
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: "#F44336",
                            borderRadius: "4px",
                            padding: "5px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px"
                          }}
                        >
                          <FiTrash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRows.includes(manufacturer.id) && (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 bg-gray-50">
                        <div>
                          <h4 style={{ marginBottom: '10px' }}>Models:</h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {manufacturer.models.map((model, index) => (
                              <span key={index} style={{
                                backgroundColor: '#E1F5FE',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                color: '#0288D1'
                              }}>
                                {model}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statistics Section */}
        <div style={{ marginTop: '30px', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ marginBottom: '15px', color: '#333' }}>Manufacturer Statistics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ marginBottom: '10px', color: '#666' }}>Total Manufacturers</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>{manufacturers.length}</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ marginBottom: '10px', color: '#666' }}>Countries</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>
                {[...new Set(manufacturers.map(m => m.country))].length}
              </p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3 style={{ marginBottom: '10px', color: '#666' }}>Total Models</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>
                {manufacturers.reduce((acc, curr) => acc + curr.models.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '40px', backgroundColor: 'black', padding: '20px', borderRadius: '80px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginBottom: '15px', color: '#333', fontWeight: '600', color: " white" }}>Models Distribution by Country</h3>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={modelsPerCountry}
              margin={{ top: 20, right: 30, left: 30, bottom: 60 }}
              layout="vertical" // Makes bars horizontal
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666' }}
                tickFormatter={(value) => `${value} models`}
              />
              <YAxis
                dataKey="country"
                type="category"
                width={100}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666' }}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  border: 'none'
                }}
                formatter={(value) => [`${value} models`, 'Count']}
                labelFormatter={(label) => `Country: ${label}`}
                cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }}
              />
              <Bar
                dataKey="modelCount"
                name="Models"
                fill="#8884d8"
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
                label={{
                  position: 'right',
                  formatter: (value) => `${value} models`,
                  fill: '#666',
                  fontSize: 12
                }}
              />
              <text
                x={500} // Adjust based on your chart width
                y={390}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="red"
                fontSize={12}
              >
                Total models per country distribution
              </text>

            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


      <div style={{
        marginTop: '40px',
        backgroundColor: 'pink',
        borderRadius: "120px",
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%'
      }}>
        <h3 style={{ marginBottom: '15px', color: '#333', fontWeight: '600' }}>
          Global Manufacturer Distribution
        </h3>

        <div style={{ width: '100%', height: '500px', position: 'relative' }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 120,
              center: [20, 40],
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <ZoomableGroup zoom={1}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#EAEAEC"
                      stroke="#D6D6DA"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: '#CFD8DC' },
                        pressed: { fill: '#B0BEC5' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {countryData.map(({ country, count, coordinates }) => (
                <Marker key={country} coordinates={coordinates}>
                  <circle
                    r={Math.min(8 + count * 3, 24)}
                    fill="#FF5722"
                    fillOpacity={0.8}
                    stroke="#FFF"
                    strokeWidth={1}
                  />
                  <text
                    textAnchor="middle"
                    y={-Math.min(8 + count * 3, 24) - 10}
                    style={{
                      fontFamily: 'system-ui',
                      fill: '#333',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      pointerEvents: 'none'
                    }}
                  >
                    {country} ({count})
                  </text>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>

        <div style={{
          marginTop: '15px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#FF5722',
              marginRight: '6px',
              opacity: 0.8
            }}></div>
            <span>Manufacturer location</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#FF5722',
              marginRight: '6px',
              opacity: 0.8
            }}></div>
            <span>Multiple manufacturers</span>
          </div>
        </div>
      </div>


    </>);
}

export default Manufactures;