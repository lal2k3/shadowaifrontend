import React, { useState, useCallback } from 'react';
import ApiCallDetails from './ApiCallDetails';
import CollectionDetails from './CollectionDetails';
import './TestViewer.css';
import { Test } from 'types';

const TestViewer: React.FC<{ tests: Test[] }> = ({ tests }) => {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  const handleSelectTest = useCallback((test: Test) => {
    setSelectedTest(test);
  }, []);

  return (
    <div className="test-viewer-container">
      <div className="collection-section">
        <CollectionDetails tests={tests} onSelectTest={handleSelectTest} />
      </div>
      <div className="api-call-section">
        <ApiCallDetails test={selectedTest} />
      </div>
    </div>
  );
};

export default TestViewer;
