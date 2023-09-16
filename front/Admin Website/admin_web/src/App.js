// The logic file that manage all the react pages and components

// Import all the react library
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Import all the components and pages
import Navbar from "./components/navbar";
import Dashboard from './pages/dashboard';
import DataReview from './pages/data_review';
import ReminderList from './pages/reminder_list';
import Settings from "./pages/settings";
import AdminManagement from './pages/admin_management';
import SurveyManagement from './pages/survey_management';

import './stylesheets/react_page.css'

function App() {

  return <BrowserRouter>

    {/* Add the navigation bar */}
    <Navbar />

    {/* Add routes to all the sub pages */}
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/data_review" element={<DataReview />} />
      <Route path="/reminder_list" element={<ReminderList />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin_management" element={<AdminManagement />} />
      <Route path="/survey_management" element={<SurveyManagement />} />
    </Routes>

  </BrowserRouter>
}

export default App;