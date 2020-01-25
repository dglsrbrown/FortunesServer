//allows us to export this module to another file
module.exports = function(req, res, next) {
  //we call res.header so that the server will respond with what kind of headers are allowed in the request
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); //these are the methods the server will allow
  res.header(
    'access-control-allow-headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  ); //types of headers that the server will accept from the client.

  next(); // sends the request along to its next destination
};
