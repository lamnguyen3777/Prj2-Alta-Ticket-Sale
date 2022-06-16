import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainView from './view/main';
import './App.css';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <MainView />
        </BrowserRouter>
    );
};

export default App;