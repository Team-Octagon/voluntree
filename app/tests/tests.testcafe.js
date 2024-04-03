// import { Selector, t } from 'testcafe';
import {
  aboutUsPage, /* addStuffPage, listStuffAdminPage, listStuffPage, editStuffPage, manageDatabasePage, */
  signOutPage,
  volunteerProfilePage,
} from './simple.page';
// import { aboutUsPage } from './aboutus.page';
import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
// import { signUpPage } from './signup.page';
import { navBar } from './navbar.component';
import { footer } from './footer.component';
// import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };
// const newCredentials = { username: 'jane@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

test('Test that signin and signout work', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that volunteers can view their profile', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoVolunteerProfile();
  await volunteerProfilePage.isDisplayed();
});

test('Test that user pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await footer.gotoAboutUsPage();
  await navBar.gotoEventsPage();
  await navBar.gotoDashboardVolunteer();
  // await aboutUsPage.isDisplayed();
  // await navBar.gotoAddStuffPage();
  // await addStuffPage.isDisplayed();
  // await navBar.gotoListStuffPage();
  // await listStuffPage.isDisplayed();
  // want to see if we can get to the editStuffPage
  // const editLinks = await Selector(`.${COMPONENT_IDS.LIST_STUFF_EDIT}`);
  // await t.click(editLinks.nth(0));
  // await editStuffPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

/*
test('Test that sign up and sign out work', async () => {
  await navBar.gotoSignUpPage();
  await signUpPage.isDisplayed();
  await signUpPage.signupUser(newCredentials.username, newCredentials.password);
  await navBar.isLoggedIn(newCredentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});
*/

test('Test that admin pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await footer.gotoAboutUsPage();
  await aboutUsPage.isDisplayed();
  // await navBar.gotoAddStuffPage();
  // await addStuffPage.isDisplayed();
  // await navBar.gotoListStuffPage();
  // await listStuffPage.isDisplayed();
  // want to see if we can get to the editStuffPage
  // const editLinks = await Selector(`.${COMPONENT_IDS.LIST_STUFF_EDIT}`);
  // await t.click(editLinks.nth(0));
  // await editStuffPage.isDisplayed();
  // await navBar.gotoListStuffAdminPage();
  // await listStuffAdminPage.isDisplayed();
  // await navBar.gotoManageDatabasePage();
  // await manageDatabasePage.isDisplayed();
});
test('Test for event detail', async t => {
  // Define selectors for form fields and submit button
  const titleInput = Selector('input[name="title"]');
  const organizerInput = Selector('input[name="organizer"]');
  const eventDateInput = Selector('input[name="eventDate"]');
  const locationInput = Selector('input[name="location"]');
  const descriptionInput = Selector('textarea[name="description"]');
  const startTimeInput = Selector('input[name="startTime"]');
  const endTimeInput = Selector('input[name="endTime"]');
  const volunteersNeededInput = Selector('input[name="volunteersNeeded"]');
  const submitButton = Selector('button').withText('Submit');


  // Fill in the form fields with valid data
  await t.typeText(titleInput, 'Test Event')
  await t.typeText(organizerInput, 'Test Organizer')
  await t.typeText(eventDateInput, '2024-04-10')
  await t.typeText(locationInput, 'Test Location')
  await t.typeText(descriptionInput, 'Test Description')
  await t.typeText(startTimeInput, '10:00 AM')
  await t.typeText(endTimeInput, '12:00 PM')
  await t.typeText(volunteersNeededInput, '5');

  // Click on the submit button
  await t.click(submitButton);

  // Assert that success message appears after form submission
  const successMessage = Selector('div').withText('Event added successfully');
  await t.expect(successMessage.exists).ok();
});
