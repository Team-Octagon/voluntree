// Import necessary modules
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import { BellFill, BoxArrowRight, CloudDownload, GearFill, PersonFill, PersonPlusFill, Send } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import NotificationsDropdown from './NotificationsDropdown';

// Define the NavBar component
const NavBar = () => {
  // Track the currentUser state
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  // Determine if the currentUser is an ADMIN
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);

  return (
    <Navbar expand="lg" variant="light" style={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Container>
        <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/">
          {/* Ensure your logo fits the white background */}
          <img src="/images/Voluntree-logo.png" width="35" height="35" className="d-inline-block align-top" alt="Brand Logo" /> Voluntree
        </Navbar.Brand>
        <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_EVENTS} as={NavLink} to="/volunteer-list-events">Events</Nav.Link>
        <Navbar.Toggle aria-controls={COMPONENT_IDS.NAVBAR_COLLAPSE} />
        <Navbar.Collapse id={COMPONENT_IDS.NAVBAR_COLLAPSE}>
          <Nav className="me-auto">
            {currentUser ? (
              <Nav.Link id={COMPONENT_IDS.NAVBAR_DASHBOARD_VOLUNTEER} as={NavLink} to="/dashboard-volunteer">Dashboard</Nav.Link>
            ) : null}
            {isAdmin && (
              <>
                <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin">Admin</Nav.Link>
                <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/add-event">Add Event</Nav.Link>
                <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Manage">
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} as={NavLink} to="/manage-database">
                    <CloudDownload /> Database
                  </NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_SEND_NOTIFICATIONS} as={NavLink} to="/send-notifications">
                    <Send /> Send Notifications
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav>
            {currentUser === '' ? (
              <NavDropdown id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN} title="Login">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin">
                  <PersonFill /> Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_UP} as={NavLink} to="/signup">
                  <PersonPlusFill /> Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Dropdown>
                  <Dropdown.Toggle style={{ backgroundColor: 'white', border: 'none' }} bsPrefix="dropdown">
                    <BellFill style={{ color: 'black' }} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Container>
                      <NotificationsDropdown />
                    </Container>
                  </Dropdown.Menu>
                </Dropdown>

                <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
                  {/* Redirect to /admin-page if isAdmin, otherwise /volunteer-profile */}
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_VOLUNTEER_PROFILE_DROPDOWN} as={NavLink} to={isAdmin ? '/admin-page' : '/volunteer-profile'}>
                    {isAdmin ? 'Admin Page' : 'View Profile'}
                  </NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_VOLUNTEER_ORGANIZATION_DROPDOWN} as={NavLink} to="/organization-page">View Organization</NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_SETTINGS} as={NavLink} to="/volunteer-settings"><GearFill /> Settings</NavDropdown.Item>
                  <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Export the NavBar component
export default NavBar;
