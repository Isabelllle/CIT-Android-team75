// The navigation bar in admin website page

// Import library
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Import css file
import '../stylesheets/navbar.css'

// Import assets
import { ReactComponent as DashboardIcon } from '../Assets/Icon/icon_dashboard.svg';
import { ReactComponent as DataReviewIcon } from '../Assets/Icon/icon_data_review.svg';
import { ReactComponent as ReminderListIcon } from '../Assets/Icon/icon_reminder_list.svg';
import { ReactComponent as SettingsIcon } from '../Assets/Icon/icon_settings.svg';
import { ReactComponent as AdminManageIcon } from '../Assets/Icon/icon_admin_management.svg';
import { ReactComponent as SurveyManageIcon } from '../Assets/Icon/icon_survey_management.svg';

const NavBar= () =>{
    const location = useLocation();

    return (

        // Create the list in navigation bar
        <div className = "navbar">
            <li>
                <Link to="/dashboard" className="no-underline">
                    <DashboardIcon className="icon" style={{ fill: location.pathname === '/dashboard' ? '#DE0A3F' : 'black' }} src={DashboardIcon} />
                    <h1 className={location.pathname === '/dashboard' ? 'active selectedText' : 'unselectedText'}>Dashboard</h1>
                </Link>
            </li>

            <li>
                <Link to="/data_review" className="no-underline">
                    <DataReviewIcon className="icon" style={{ fill: location.pathname === '/data_review' ? '#DE0A3F' : 'black' }} src={DataReviewIcon} />
                    <h1 className={location.pathname === '/data_review' ? 'active selectedText' : 'unselectedText'}>Data Review</h1>
                </Link>
            </li>

            <li>
                <Link to="/reminder_list" className="no-underline">
                    <ReminderListIcon className="icon" style={{ fill: location.pathname === '/reminder_list' ? '#DE0A3F' : 'black',  stroke: location.pathname === '/reminder_list' ? '#DE0A3F' : 'black'  } } src={ReminderListIcon} />
                    <h1 className={location.pathname === '/reminder_list' ? 'active selectedText' : 'unselectedText'}>Reminder List</h1>
                </Link>
            </li>

            <li>
                <Link to="/settings" className="no-underline">
                    <SettingsIcon className="icon" style={{ fill: location.pathname === '/settings' ? '#DE0A3F' : 'black' } } src={SettingsIcon} />
                    <h1 className={location.pathname === '/settings' ? 'active selectedText' : 'unselectedText'}>Settings</h1>
                </Link>
            </li>

            <li>
                <Link to="/admin_management" className="no-underline">
                    <AdminManageIcon className="icon" style={{ fill: location.pathname === '/admin_management' ? '#DE0A3F' : 'black' } } src={AdminManageIcon} />
                    <h1 className={location.pathname === '/admin_management' ? 'active selectedText' : 'unselectedText'}>Admin Management</h1>
                </Link>
            </li>

            <li>
                <Link to="/survey_management" className="no-underline">
                    <SurveyManageIcon className="icon" style={{ fill: location.pathname === '/survey_management' ? '#DE0A3F' : 'black' } } src={SurveyManageIcon} />
                    <h1 className={location.pathname === '/survey_management' ? 'active selectedText' : 'unselectedText'}>Survey Management</h1>
                </Link>
            </li>
        </div>
    );
}

export default NavBar;