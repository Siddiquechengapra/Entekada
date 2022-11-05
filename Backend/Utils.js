import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(
    { name: user.name, email: user.email, isAdmin: user.isAdmin }, //because we dont want to password also into jwt
    process.env.JWT_SECRET
  );

  return token;
};
