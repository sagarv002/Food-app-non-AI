import React, { useState, useEffect, useRef } from 'react';

const LightEffect = () => {
  // State for main light
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [color, setColor] = useState('#ffcc00');
  const [intensity, setIntensity] = useState(70);
  const [isDragging, setIsDragging] = useState(false);
  
  // State for additional features
  const [secondaryLights, setSecondaryLights] = useState([]);
  const [pulseEnabled, setPulseEnabled] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(false);
  const [particles, setParticles] = useState([]);
  const [lightType, setLightType] = useState('point');
  const [beamAngle, setBeamAngle] = useState(45);
  const [beamWidth, setBeamWidth] = useState(30);
  const containerRef = useRef(null);

  // Handle mouse movement for draggable light
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const container = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - container.left) / container.width) * 100;
      const y = ((e.clientY - container.top) / container.height) * 100;
      setPosition({ x, y });
    }
  };

  // Add a secondary light
  const addSecondaryLight = () => {
    const newLight = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 10,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      intensity: Math.random() * 50 + 30
    };
    setSecondaryLights([...secondaryLights, newLight]);
  };

  // Remove a secondary light
  const removeSecondaryLight = (id) => {
    setSecondaryLights(secondaryLights.filter(light => light.id !== id));
  };

  // Toggle pulse effect
  useEffect(() => {
    if (!pulseEnabled) return;
    
    const interval = setInterval(() => {
      setIntensity(prev => {
        const newIntensity = prev + (prev > 80 ? -10 : 10);
        return Math.max(30, Math.min(100, newIntensity));
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [pulseEnabled]);

  // Particle effect
  useEffect(() => {
    if (!particlesEnabled) {
      setParticles([]);
      return;
    }
    
    const interval = setInterval(() => {
      if (particles.length < 50) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: position.x,
          y: position.y,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          opacity: 1,
          color: color
        };
        setParticles(prev => [...prev, newParticle]);
      }
    }, 100);
    
    const updateInterval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
            opacity: p.opacity - 0.01
          }))
          .filter(p => p.opacity > 0)
      );
    }, 30);
    
    return () => {
      clearInterval(interval);
      clearInterval(updateInterval);
    };
  }, [particlesEnabled, position, color]);

  // Change color randomly
  useEffect(() => {
    const interval = setInterval(() => {
      const hue = Math.floor(Math.random() * 360);
      setColor(`hsl(${hue}, 100%, 50%)`);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Container styles
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '70vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    overflow: 'hidden',
    cursor: isDragging ? 'grabbing' : 'grab',
    borderRadius: '12px',
    boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)'
  };

  // Base light style
  const baseLightStyle = (x, y, lightColor, lightIntensity, scale = 1) => ({
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    width: '40px',
    height: '40px',
    borderRadius: lightType === 'point' ? '50%' : '0%',
    backgroundColor: lightColor,
    boxShadow: `0 0 ${lightIntensity}px ${lightIntensity / 2}px ${lightColor}`,
    transform: `translate(-50%, -50%) scale(${1 + lightIntensity / 100 * scale})`,
    filter: 'blur(5px)',
    transition: 'all 0.3s ease',
    zIndex: 10,
    pointerEvents: 'none'
  });

  // Main light style with type variations
  const lightStyle = lightType === 'beam' ? {
    ...baseLightStyle(position.x, position.y, color, intensity),
    width: `${beamWidth}px`,
    height: '200px',
    transform: `translate(-50%, -50%) rotate(${beamAngle}deg)`,
    transformOrigin: 'center bottom',
    borderRadius: '50% 50% 0 0'
  } : baseLightStyle(position.x, position.y, color, intensity);

  // Beam effect style
  const beamStyle = lightType === 'beam' ? {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    width: `${beamWidth}px`,
    height: '100%',
    background: `linear-gradient(${beamAngle}deg, 
      transparent 0%, 
      ${color}40 30%, 
      transparent 100%)`,
    transform: `translate(-50%, -50%) rotate(${beamAngle}deg)`,
    transformOrigin: 'center top',
    filter: 'blur(5px)',
    zIndex: 5,
    pointerEvents: 'none'
  } : { display: 'none' };

  // Reflection styles
  const reflectionStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '30%',
    background: `radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    )`,
    pointerEvents: 'none'
  };

  // Controls container
  const controlsStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '15px',
    borderRadius: '8px',
    zIndex: 20,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    maxWidth: '300px'
  };

  // Control group styles
  const controlGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    minWidth: '120px'
  };

  // Label styles
  const labelStyle = {
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px'
  };

  // Button styles
  const buttonStyle = {
    padding: '5px 10px',
    borderRadius: '4px',
    border: 'none',
    background: '#444',
    color: 'white',
    cursor: 'pointer',
    fontSize: '12px'
  };

  // Particle styles
  const particleStyle = (particle) => ({
    position: 'absolute',
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    borderRadius: '50%',
    backgroundColor: particle.color,
    opacity: particle.opacity,
    filter: 'blur(1px)',
    pointerEvents: 'none'
  });

  return (
    <div 
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={containerRef}
    >
      {/* Beam effect */}
      <div style={beamStyle} />
      
      {/* Main light */}
      <div 
        style={lightStyle}
        onMouseDown={handleMouseDown}
      />
      
      {/* Secondary lights */}
      {secondaryLights.map(light => (
        <div 
          key={light.id}
          style={baseLightStyle(light.x, light.y, light.color, light.intensity, 0.7)}
          onClick={() => removeSecondaryLight(light.id)}
        />
      ))}
      
      {/* Particles */}
      {particles.map(particle => (
        <div key={particle.id} style={particleStyle(particle)} />
      ))}
      
      {/* Reflection */}
      <div style={reflectionStyle} />
      
      {/* Controls */}
      <div style={controlsStyle}>
        <div style={controlGroupStyle}>
          <div style={labelStyle}>Intensity: {intensity}</div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={controlGroupStyle}>
          <div style={labelStyle}>Color</div>
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: '50px', height: '30px', cursor: 'pointer' }}
          />
        </div>
        
        <div style={controlGroupStyle}>
          <div style={labelStyle}>Light Type</div>
          <select 
            value={lightType}
            onChange={(e) => setLightType(e.target.value)}
            style={{ padding: '5px', borderRadius: '4px' }}
          >
            <option value="point">Point Light</option>
            <option value="beam">Beam Light</option>
          </select>
        </div>
        
        {lightType === 'beam' && (
          <>
            <div style={controlGroupStyle}>
              <div style={labelStyle}>Beam Angle: {beamAngle}°</div>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={beamAngle}
                onChange={(e) => setBeamAngle(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <div style={controlGroupStyle}>
              <div style={labelStyle}>Beam Width: {beamWidth}px</div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={beamWidth}
                onChange={(e) => setBeamWidth(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </>
        )}
        
        <div style={controlGroupStyle}>
          <button 
            style={buttonStyle}
            onClick={addSecondaryLight}
          >
            Add Secondary Light
          </button>
          <button 
            style={buttonStyle}
            onClick={() => setSecondaryLights([])}
            disabled={secondaryLights.length === 0}
          >
            Clear All
          </button>
        </div>
        
        <div style={controlGroupStyle}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input 
              type="checkbox" 
              checked={pulseEnabled}
              onChange={() => setPulseEnabled(!pulseEnabled)}
            />
            Pulse Effect
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input 
              type="checkbox" 
              checked={particlesEnabled}
              onChange={() => setParticlesEnabled(!particlesEnabled)}
            />
            Particle Effect
          </label>
        </div>
      </div>
    </div>
  );
};

export default LightEffect;