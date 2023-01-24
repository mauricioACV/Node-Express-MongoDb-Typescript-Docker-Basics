import { Request, Response, NextFunction } from 'express';
const jwt =  require('jsonwebtoken');

const TOKEN_KEY = "x4TvnErxRETbVcqaLl5dqMI115eNlp5y";

const verifyToken = (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(authHeader);
  if (token === null) {
    return res.status(401).send("Token is required");
  }
  jwt.verify(token, TOKEN_KEY, (err:Error, user:any) => {
    if (err) return res.status(403).send("token required");
    console.log(user);
    // req.user = user;
    next();
  });
};