import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Balance from './pages/Balance/Balance';
import { ChakraProvider, Flex, HStack } from '@chakra-ui/react';
import SideBar from './components/SideBar/SideBar';
import Analysis from './pages/Analysis/Analysis';
import Routine from './pages/Routine/Routine';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/balance',
    element: <Balance />
  },
  {
    path: '/analysis',
    element: <Analysis />
  },
  {
    path: '/routine',
    element: <Routine />
  }
]);

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <ChakraProvider>
        <HStack spacing={0} w='100vw' h='100vh'>
          <SideBar />
          <Flex h='100%' w='100%' py={15} px={30}>
            <RouterProvider router={router} />
          </Flex>
        </HStack>
      </ChakraProvider>
    </React.StrictMode>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
