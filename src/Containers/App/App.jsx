import React from 'react';
import { AppProvider } from '../../Data/AppContext';
import { BrowserRouter } from 'react-router-dom';
import AppContent from './AppContent';

const App = () => (
    <BrowserRouter>
        <AppProvider>
            <AppContent />
        </AppProvider>
    </BrowserRouter>
);

export default App;