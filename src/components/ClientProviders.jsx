'use client'
import { Provider } from 'react-redux'
import store from '../store/store'
import UserContextProvider from '../context/UserContextProvider'
import LayoutWrapper from "./LayoutWrapper";

export default function ClientProviders({ children }) {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </UserContextProvider>
    </Provider>
  );
}