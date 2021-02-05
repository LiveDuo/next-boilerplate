import jwt from "jsonwebtoken";

const privateKey = process.env.JWT_PRIVATE_KEY;

const withReq = (handler, method) => (req, res) => {
  if (req.method !== method) {
    res.status(400).end("Invalid method");
    return;
  }
  return handler(req, res);
};

export { withReq };

const verifyUser = (req, res) => {
  const token = req.headers["authorization"];
  try {
    const data = jwt.verify(token, privateKey);
    req.userId = data.userId;
    return data;
  } catch (error) {
    res.status(401).end("Unauthozorized");
    return;
  }
};

const withAuth = (handler) => (req, res) => {
  return verifyUser(req, res) ? handler(req, res) : null;
};

export { withAuth };
