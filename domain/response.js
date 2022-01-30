
class Response{

  constructor(statusCode, httpStatus, data, message){

      this.statusCode = statusCode;
      this.timeStamp = new Date().toLocaleString();
      this.httpStatus = httpStatus;
      this.data = data;
      this.message = message;
  }
}

module.exports = Response;