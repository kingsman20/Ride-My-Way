
const checks = {
  checkEmail: (email) => {
    const result = /\S+@\S+\.\S+/;
    return result.test(email);
  },

  checkNumber: (phone) => {
    const number = parseInt(phone, 10);
    if (!isNaN(number)) {
      return true;
    } else {
      return false;
    }
  },

  checkDate: (date) => {
    if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
      return true;
    } else {
      return false;
    }
  },

  checkTime: (time) => {
    if (/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(time)){
      return true;
    } else {
      return false;
    }
  }
};

export default checks;
