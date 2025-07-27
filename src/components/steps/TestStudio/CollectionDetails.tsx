import React, { useState } from 'react';
import './CollectionDetails.css';
import { Test } from 'types';

export interface CollectionDetailsProps {
  tests: Test[];
  onSelectTest: (test: Test) => void;
}

const CollectionDetails: React.FC<CollectionDetailsProps> = ({ tests, onSelectTest }) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const functionalTests = tests.filter(test => test.type === 'functional');
  const securityTests = tests.filter(test => test.type === 'security');

  return (
    <div className="collection-details">
      <h2>Test Collection</h2>
      <div>
        <div className="folder" onClick={() => setSelectedFolder('functional')}>
          Functional Tests
        </div>
        {selectedFolder === 'functional' && (
          <ul>
            {functionalTests.map((test, index) => (
              <li key={index} onClick={() => onSelectTest(test)}>
                {test.description}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div className="folder" onClick={() => setSelectedFolder('security')}>
          Security Tests
        </div>
        {selectedFolder === 'security' && (
          <ul>
            {securityTests.map((test, index) => (
              <li key={index} onClick={() => onSelectTest(test)}>
                {test.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CollectionDetails;

export {};
