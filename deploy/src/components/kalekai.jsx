import { useState } from 'react';
import {
  FiLifeBuoy,
  FiSettings,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiArrowDownCircle
} from 'react-icons/fi';
import { Bs123, BsAirplane, BsIndent, BsStars } from 'react-icons/bs';
import { FaRegStar, FaStar } from 'react-icons/fa';

const Kalekai = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('animations');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = () => {
    alert("It's a  season!");
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const animationFeatures = [
    { icon: <BsIndent />, name: 'Indent Animation', color: 'red' },
    { icon: <FiSettings />, name: 'Settings Animation', color: 'green' },
    { icon: <FiArrowDownCircle />, name: 'Down Arrow', color: 'orange' },
    { icon: <Bs123 />, name: 'Number Animation', color: 'red' },
    { icon: <BsAirplane />, name: 'Silent Animation', color: 'black', textWhite: true },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ 
        borderBottom: '2px solid #ddd', 
        paddingBottom: '10px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>Creative ★ Studio</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('animations')}
            style={{ 
              padding: '5px 10px',
              background: activeTab === 'animations' ? '#6200ea' : '#f3e5f5',
              color: activeTab === 'animations' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Animations
          </button>
          <button 
            onClick={() => setActiveTab('features')}
            style={{ 
              padding: '5px 10px',
              background: activeTab === 'features' ? '#6200ea' : '#f3e5f5',
              color: activeTab === 'features' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Features
          </button>
        </div>
      </header>

      {activeTab === 'animations' && (
        <div>
          <div style={{ 
            backgroundColor: '#6200ea', 
            padding: '15px', 
            borderRadius: '8px',
            marginBottom: '20px',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
          }} onClick={toggleExpand}>
            <h2 style={{ margin: 0 }}>Animation Collection</h2>
            {isExpanded ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
          </div>

          {isExpanded && (
            <div style={{ marginBottom: '20px' }}>
              {animationFeatures.map((feature, index) => (
                <div key={index} style={{ 
                  backgroundColor: feature.color, 
                  padding: '15px', 
                  borderRadius: '8px',
                  marginBottom: '15px',
                  color: feature.textWhite ? 'white' : 'inherit'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{feature.icon}</span>
                    <h3 style={{ margin: 0 }}>{feature.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ 
            backgroundColor: 'pink', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <h2>Rate Our Animations</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', margin: '15px 0' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  style={{ cursor: 'pointer', fontSize: '24px' }}
                >
                  {(hoverRating || rating) >= star ? <FaStar color="#ffc107" /> : <FaRegStar />}
                </span>
              ))}
            </div>
            <p>{rating ? `You rated ${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}</p>
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div>
          <div style={{ 
            backgroundColor: '#03a9f4', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px',
            color: 'white'
          }}>
            <h2 style={{ marginTop: 0 }}>Premium Features</h2>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Unlimited animation exports</li>
              <li>4K resolution support</li>
              <li>Custom animation presets</li>
              <li>Collaboration tools</li>
            </ul>
          </div>

          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ 
              backgroundColor: '#4caf50', 
              padding: '15px', 
              borderRadius: '8px',
              color: 'white'
            }}>
              <FiPlus size={24} />
              <h3>Create New</h3>
              <p>Start a new animation project from scratch</p>
            </div>
            <div style={{ 
              backgroundColor: '#ff9800', 
              padding: '15px', 
              borderRadius: '8px',
              color: 'white'
            }}>
              <FiEdit size={24} />
              <h3>Edit</h3>
              <p>Modify existing animations</p>
            </div>
            <div style={{ 
              backgroundColor: '#f44336', 
              padding: '15px', 
              borderRadius: '8px',
              color: 'white'
            }}>
              <FiTrash2 size={24} />
              <h3>Delete</h3>
              <p>Remove unwanted projects</p>
            </div>
          </div>
        </div>
      )}

      <div style={{ 
        backgroundColor: '#673ab7', 
        padding: '15px', 
        borderRadius: '8px',
        textAlign: 'center',
        color: 'white'
      }}>
        <button 
          onClick={handleChange}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: 'transparent',
            border: '2px solid white',
            borderRadius: '4px',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        > 
          <BsStars size={24} />
          Click for  Magic!
        </button>
      </div>

      <footer style={{ 
        marginTop: '30px',
        paddingTop: '15px',
        borderTop: '1px solid #ddd',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>© 2023 Creative Studio. All rights reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <FiLifeBuoy style={{ cursor: 'pointer' }} title="Help" />
          <FiSettings style={{ cursor: 'pointer' }} title="Settings" />
        </div>
      </footer>
    </div>
  );
}

export default Kalekai;