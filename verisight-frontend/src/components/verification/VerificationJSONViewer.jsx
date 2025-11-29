import { useState } from 'react';
import Card from '../ui/Card';

const VerificationJSONViewer = ({ data }) => {
  const [expandedKeys, setExpandedKeys] = useState(new Set(['root']));

  const toggleKey = (key) => {
    const newExpanded = new Set(expandedKeys);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedKeys(newExpanded);
  };

  const renderValue = (value, key, path = '') => {
    const fullPath = path ? `${path}.${key}` : key;

    if (value === null) {
      return <span style={{ color: '#FF4444' }}>null</span>;
    }

    if (typeof value === 'boolean') {
      return <span style={{ color: '#FFA500' }}>{value.toString()}</span>;
    }

    if (typeof value === 'number') {
      return <span style={{ color: '#3BFFB3' }}>{value}</span>;
    }

    if (typeof value === 'string') {
      return <span style={{ color: '#35E2FF' }}>"{value}"</span>;
    }

    if (Array.isArray(value)) {
      const isExpanded = expandedKeys.has(fullPath);
      return (
        <div>
          <span
            onClick={() => toggleKey(fullPath)}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              color: '#D8DDE3',
            }}
          >
            {isExpanded ? '▼' : '▶'} [{value.length}]
          </span>
          {isExpanded && (
            <div style={{ marginLeft: '20px', borderLeft: '1px solid rgba(42, 107, 255, 0.2)', paddingLeft: '12px' }}>
              {value.map((item, index) => (
                <div key={index} style={{ marginTop: '4px' }}>
                  <span style={{ color: '#D8DDE3' }}>{index}: </span>
                  {renderValue(item, index, fullPath)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (typeof value === 'object') {
      const isExpanded = expandedKeys.has(fullPath);
      const keys = Object.keys(value);
      return (
        <div>
          <span
            onClick={() => toggleKey(fullPath)}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              color: '#D8DDE3',
            }}
          >
            {isExpanded ? '▼' : '▶'} {`{${keys.length}}`}
          </span>
          {isExpanded && (
            <div style={{ marginLeft: '20px', borderLeft: '1px solid rgba(42, 107, 255, 0.2)', paddingLeft: '12px' }}>
              {keys.map((k) => (
                <div key={k} style={{ marginTop: '4px' }}>
                  <span style={{ color: '#FFFFFF', fontWeight: '500' }}>"{k}"</span>
                  <span style={{ color: '#D8DDE3' }}>: </span>
                  {renderValue(value[k], k, fullPath)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return <span style={{ color: '#D8DDE3' }}>{String(value)}</span>;
  };

  if (!data) {
    return (
      <Card>
        <div style={{ padding: '48px 24px', textAlign: 'center' }}>
          <p style={{ color: '#D8DDE3', fontSize: '14px' }}>
            No verification data available
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div style={{
        padding: '24px',
        background: 'rgba(10, 30, 63, 0.5)',
        fontFamily: 'monospace',
        fontSize: '13px',
        lineHeight: '1.6',
        maxHeight: '600px',
        overflowY: 'auto',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid rgba(42, 107, 255, 0.3)',
        }}>
          <h3 style={{
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '600',
            margin: 0,
          }}>
            Verification JSON
          </h3>
          <button
            onClick={() => {
              const allKeys = new Set();
              const getAllKeys = (obj, path = '') => {
                Object.keys(obj).forEach(key => {
                  const fullPath = path ? `${path}.${key}` : key;
                  allKeys.add(fullPath);
                  if (typeof obj[key] === 'object' && obj[key] !== null) {
                    getAllKeys(obj[key], fullPath);
                  }
                });
              };
              getAllKeys(data);
              setExpandedKeys(expandedKeys.size > 1 ? new Set(['root']) : allKeys);
            }}
            style={{
              padding: '6px 12px',
              background: 'rgba(42, 107, 255, 0.2)',
              border: '1px solid rgba(42, 107, 255, 0.3)',
              borderRadius: '6px',
              color: '#35E2FF',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {expandedKeys.size > 1 ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
        {renderValue(data, 'root', '')}
      </div>
      
      <style>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(10, 30, 63, 0.5);
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(42, 107, 255, 0.3);
          borderRadius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(42, 107, 255, 0.5);
        }
      `}</style>
    </Card>
  );
};

export default VerificationJSONViewer;
