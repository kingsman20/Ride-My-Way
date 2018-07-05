import checks from './checks';

const validate = {
  validateLogin: (req, res, next) => {
    if (!req.body.email || !checks.checkEmail(req.body.email) || req.body.email.trim().length < 5) {
      res.status(400).send({ status: 'failed', message: 'Enter valid email address e.g name@example.com' });
    } else if (!req.body.password || req.body.password.trim().length < 6) {
      res.status(400).send({ status: 'failed', message: 'Password must not be less than six characters' });
    } else {
      next();
    }
  },

  validateRegister: (req, res, next) => {
    if (!req.body.name || req.body.name.trim().length < 2) {
      res.status(400).send({ status: 'failed', message: 'Your name is required' });
    } else if (!req.body.email || !checks.checkEmail(req.body.email) || req.body.email.trim().length < 5) {
      res.status(400).send({ status: 'failed', message: 'Enter valid email address e.g name@example.com' });
    } else if (!req.body.phone || !checks.checkNumber(req.body.phone) || req.body.phone.trim().length < 11 || req.body.phone.trim().length > 11) {
      res.status(400).send({ status: 'failed', message: 'Provide a valid phone number e.g 08012345678' });
    } else if (!req.body.password || req.body.password.trim().length < 6) {
      res.status(400).send({ status: 'failed', message: 'Password must not be less than six characters' });
    } else if (!req.body.confirm || req.body.password !== req.body.confirm) {
      res.status(400).send({ status: 'failed', message: 'Password do not match' });
    } else {
      next();
    }
  },

  validateCreateRide: (req, res, next) => {
    if (!req.body.location || req.body.location.trim().length < 3) {
      res.status(400).send({ status: 'failed', message: 'Enter valid location' });
    } else if (!req.body.destination || req.body.destination.trim().length < 3) {
      res.status(400).send({ status: 'failed', message: 'Enter valid destination' });
    } else if (!req.body.date || !checks.checkDate(req.body.date)) {
      res.status(400).send({ status: 'failed', message: 'Enter date of departure in the format mm/dd/yyyy' });
    } else if (!req.body.time || !checks.checkTime(req.body.time)) {
      res.status(400).send({ status: 'failed', message: 'Enter time of departure in the format HH:MM' });
    } else if (!req.body.price || !checks.checkNumber(req.body.price) || req.body.price.length < 2) {
      res.status(400).send({ status: 'failed', message: 'Price is in naira. Enter a valid digit e.g 1500' });
    } else {
      next();
    }
  },

  validateGetRideRequests: (req, res, next) => {
    if (!req.params.id || !checks.checkNumber(req.params.id)) {
      res.status(400).send({ status: 'failed', message: 'Provide a valid id' });
    } else {
      next();
    }
  },

  validateRideResponse: (req, res, next) => {
    if (!req.params.rideId || !checks.checkNumber(req.params.rideId)) {
      res.status(404).send({ status: 'failed', message: 'Invalid Ride ID' });
    } else if (!req.params.requestId || !checks.checkNumber(req.params.requestId)) {
      res.status(400).send({ status: 'failed', message: 'Invalid Ride ID' });
    } else if (!req.body.status) {
      res.status(400).send({ status: 'failed', message: 'Provide message status e.g Accepted or Rejected' });
    } else {
      next();
    }
  },

  validateGetRide: (req, res, next) => {
    if (!req.params.id || !checks.checkNumber(req.params.id)) {
      res.status(400).send({ status: 'failed', message: 'Provide a valid ride id' });
    } else {
      next();
    }
  },
};

export default validate;
