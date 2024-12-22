import jwt from "jsonwebtoken";
export function generateAdminToken(payload = "") {
  if (!payload) {
    return false;
  }
  const Token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
    algorithm: "HS256",
  });
  if (Token) {
    return Token;
  }
  return false;
}
