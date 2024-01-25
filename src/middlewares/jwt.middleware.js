import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  //1.read token
  const token = req.headers["authorization"];
  console.log("token: " + token);

  // 2.if no token, return the error
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  //3.check if token is valid
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRETKEY);
    console.log("payload:", payload);
    req.userID = payload.userID;

    next();
  } catch (err) {
    //4.return error
    return res.status(401).send("Unauthorized: Invalid token");
  }
};

export default jwtAuth;
