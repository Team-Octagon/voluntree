import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import { ROLE } from '../../api/role/Role';
import LoadingSpinner from '../components/LoadingSpinner';
import ManageDatabase from '../pages/ManageDatabase';
import Feedback from '../pages/Feedback';
import VolunteerProfile from '../pages/VolunteerProfile';
import AboutUs from '../pages/AboutUs';
import VolunteerListEvents from '../pages/VolunteerListEvents';
import VolunteerEventDetail from '../pages/VolunteerEventDetail';
import VolunteerSettings from '../pages/VolunteerSettings';
import OrganizationPage from '../pages/OrganizationPage';
import AddEvent from '../pages/AddEvent';
import ListEvents from '../pages/ListEvents';
import DashboardVolunteer from '../pages/DashboardVolunteer';
import EditEvent from '../pages/EditEvent';
import AdminProfile from '../pages/AdminProfile';
import VolunteerEventPage from '../pages/VolunteerEventPage';
import SendNotifications from '../pages/SendNotifications';
import ListEventsMapView from '../pages/ListEventsMapView';
import ChatIcon from '../components/ChatIcon';
import { ChatProvider } from '../contexts/ChatContext';
import StartOrganization from '../pages/StartOrganization';
import CreateOrganization from '../pages/CreateOrganization';
import OrganizationRequests from '../pages/OrganizationRequests';
import OrganizationPagePublic from '../pages/OrganizationPagePublic';
import DashboardOrganization from '../pages/DashboardOrganization';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <ChatProvider>
        <div className="d-flex flex-column min-vh-100">
          <NavBar />
          <ChatIcon />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/organization-page" element={<ProtectedRoute><OrganizationPage /></ProtectedRoute>} />
            <Route path="/organization-page/:_id" element={<OrganizationPagePublic />} />
            <Route path="/admin-page" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
            <Route path="/volunteer-profile" element={<ProtectedRoute><VolunteerProfile /></ProtectedRoute>} />
            <Route path="/volunteer-settings" element={<ProtectedRoute><VolunteerSettings /></ProtectedRoute>} />
            <Route path="/volunteer-list-events" element={<VolunteerListEvents />} />
            <Route path="/volunteer-list-events/:_id" element={<ProtectedRoute><VolunteerEventDetail /></ProtectedRoute>} />
            <Route path="/listEvents" element={<ProtectedRoute><ListEvents /></ProtectedRoute>} />
            <Route path="/listEvents-mapview" element={<ProtectedRoute><ListEventsMapView /></ProtectedRoute>} />
            <Route path="/add-event" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
            <Route path="/dashboard-volunteer" element={<ProtectedRoute><DashboardVolunteer /></ProtectedRoute>} />
            <Route path="/dashboard-organization" element={<ProtectedRoute><DashboardOrganization /></ProtectedRoute>} />
            <Route path="/edit-event/:_id" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
            <Route path="/volunteer-event-page/:_id" element={<VolunteerEventPage />} />
            <Route path="/admin" element={<AdminProtectedRoute ready={ready}><ListEvents /></AdminProtectedRoute>} />
            <Route path="/start-organization" element={<StartOrganization />} />
            <Route path="/create-organization" element={<CreateOrganization />} />
            <Route path="/manage-database" element={<AdminProtectedRoute ready={ready}><ManageDatabase /></AdminProtectedRoute>} />
            <Route path="/send-notifications" element={<AdminProtectedRoute ready={ready}><SendNotifications /></AdminProtectedRoute>} />
            <Route path="/organization-requests" element={<AdminProtectedRoute ready={ready}><OrganizationRequests /></AdminProtectedRoute>} />
            <Route path="/notauthorized" element={<NotAuthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </ChatProvider>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
