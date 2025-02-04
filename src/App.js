import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Graph from './components/Graph';
import NodeControls from './components/NodeControls';

const App = () => {
  return (
    <Provider store={store}>
      <h1>Interactive Graph Visualization</h1>

      <Graph />
      <NodeControls />
    </Provider>
  );
};

export default App;
