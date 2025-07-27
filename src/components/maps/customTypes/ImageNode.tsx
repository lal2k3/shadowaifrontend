import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
  isConnectable: boolean;
  data: {
    label: string;
    image: string;
    color: string;
    mapId?: string;
    cves: {
      critical: number;
      high: number;
    };
  };
}

const ImageNode = memo(({isConnectable, data }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: '100px',
        height: '100px',
      }}
    >
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: data.color,
          borderRadius: '4px',
        }}
      >
        <div
          onClick={() => {
            if (data.mapId) {
              navigate(`/cvesmap/${data.mapId}`);
            } else {
              navigate(`/remediation?service=${data.label}`);
            }
          }}
          style={{
            width: '50%',
            height: '50%',
            backgroundImage: `url(${data.image})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            cursor: 'pointer',
          }}
        />
       <div 
          style={{
            width: '100%',
            height: '20%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px', // Adjust font size
            fontWeight: 'bold', // Make text bold
            fontFamily: 'Arial, sans-serif', // Change font family
            color: 'black',
            textAlign: 'center',
            padding: '2px', // Add padding to prevent text overflow
            boxSizing: 'border-box',
          }}
        >
          {data.label}
        </div>
        {data.cves ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '8px',
              boxSizing: 'border-box',
              flexDirection: 'row',
            }}
          >
            <div style={{ marginRight: '5px' }}>
              Critical: {data.cves.critical}
            </div>
            <div>High: {data.cves.high}</div>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '8px',
              boxSizing: 'border-box',
              alignItems: 'center',
            }}
          >
            No CVEs
          </div>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Right}
        id="a"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
});

ImageNode.displayName = 'react-flow-image-node';

export default ImageNode;
