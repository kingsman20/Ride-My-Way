import authTest from './auth_test';
import ridesTest from './rides_test';
import requestsTest from './requests_test';
import otherTest from './other_test';

describe('API Endpoints /ride_my_way', () => {
  // Home page
  authTest.homepage();

  // Authentication Test
  authTest.loginUser();
  authTest.loginFailed();
  authTest.createUser();
  authTest.createFailedInvalidPhone();
  authTest.createFailedEmailExist();

  // Rides Test
  ridesTest.getAllRides();
  ridesTest.getRidesFailed();
  ridesTest.createRide();
  ridesTest.createRideFailedNoToken();
  ridesTest.createRideFailedInvalidDetails();
  ridesTest.getRideOffer();
  ridesTest.invalidRideOfferId();

  // Requests Test
  requestsTest.joinRideOffer();
  requestsTest.requestRideFailedNoToken();
  requestsTest.getRideRequests();
  requestsTest.getRequestsFailedNoToken();
  requestsTest.respondToRequest();
  requestsTest.respondFailedNoToken();

  // More Test
  otherTest.getUser();
  otherTest.getUserFailed();
  otherTest.getUserRides();
  otherTest.getUserRidesFailed();
  otherTest.getNotifications();
  otherTest.getNotificationsFailed();
  otherTest.getRidesGiven();
  otherTest.getRidesGivenFailed();
  otherTest.getRidesTaken();
  otherTest.getRidesTakenFailed();

  // Invalid route
  authTest.invalidRoute();
});
