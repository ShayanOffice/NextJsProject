import '../styles/globals.css';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { store, PersistedStore } from '../app/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={PersistedStore}> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      {/* </PersistGate> */}
    </Provider>
  );
}
