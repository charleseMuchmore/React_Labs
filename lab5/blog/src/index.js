// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { UProvider }from './context/user';
import { PProvider } from './context/posts';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
<UProvider>
    <PProvider>
        <App />
    </PProvider>
</UProvider>
);