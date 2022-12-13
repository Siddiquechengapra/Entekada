import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(
    { name: user.name, email: user.email, isAdmin: user.isAdmin }, //because we dont want to password also into jwt
    process.env.JWT_SECRET
  );

  return token;
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "invaid token" });
      } else {
        req.user = decoded;
        console.log("decoded ", decoded);
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No token" });
  }
};