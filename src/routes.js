import React from 'react';

const Chatbot = React.lazy(() => import('./views/Chatbot'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/chatbot', name: 'Chatbot', component: Chatbot }
];

export default routes;
