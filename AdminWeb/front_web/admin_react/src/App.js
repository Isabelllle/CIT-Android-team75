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
import ChangePassword from "./pages/setting_change_password";
import AdminManagement from './pages/admin_management';
import SurveyManagement from './pages/survey_management/survey_management';

// Import sub pages of SurveyManagement
import SurveyMain from './pages/survey_management/survey_management_main';
import SurveyTitle from './pages/survey_management/survey_manangement_title';
import SurveyList from './pages/survey_management/survey_management_list';
import SurveyType from './pages/survey_management/survey_management_type';
import SurveyText from './pages/survey_management/survey_management_text';
import SurveyNumber from './pages/survey_management/survey_management_number';
import SurveyYesNo from './pages/survey_management/survey_management_yesno';
import SurveyRating from './pages/survey_management/survey_management_rating';
import SurveyDropDown from './pages/survey_management/survey_management_dropdown';

// Import CSS
import styles from './stylesheets/react_page.module.css'

function App() {

  return <BrowserRouter>

    <div className={styles.app}>
      {/* Add the navigation bar */}
      <Navbar />

      {/* Add routes to all the sub pages */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data_review" element={<DataReview />} />
        <Route path="/reminder_list" element={<ReminderList />} />
        <Route path="/settings" element={<Settings />} />
          <Route path="/settings/change_password" element={<ChangePassword />} />
        <Route path="/admin_management" element={<AdminManagement />} />
        <Route path="/survey_management" element={<SurveyManagement />}>
          <Route path="" element={<SurveyMain />} />
          <Route path="title" element={<SurveyTitle />} />
          <Route path="list" element={<SurveyList />} />
          <Route path="type" element={<SurveyType />} />
          <Route path="text" element={<SurveyText />} />
          <Route path="number" element={<SurveyNumber />} />
          <Route path="yesno" element={<SurveyYesNo />} />
          <Route path="rating" element={<SurveyRating />} />
          <Route path="dropdown" element={<SurveyDropDown />} />
        </Route>

      </Routes>
    </div>

  </BrowserRouter>
}

export default App;