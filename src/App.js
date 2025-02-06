import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Loading from './loading';
import NodeControls from './components/NodeControls';

const Graph = React.lazy(() => import('./components/Graph'));


const App = () => {
  return (
    <Provider store={store}>
      <h1>Interactive Graph Visualization</h1>

      <Suspense fallback={<Loading />}>
        <Graph />
      </Suspense>
      <NodeControls />
    </Provider>
  );
};

export default App;
