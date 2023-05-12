import { BrowserRouter } from 'react-router-dom';
import UserRoutes from 'shared/UserRoutes/UserRoutes';
import { Provider } from 'react-redux';
import store from './redux/store';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/react-node-team-app">
        <UserRoutes />
      </BrowserRouter>
    </Provider>
  );
};
