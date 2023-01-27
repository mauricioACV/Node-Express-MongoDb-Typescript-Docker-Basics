import config from '../config/keyConfig';
const jwt = require("jsonwebtoken");

export const getJwtToken = (signObj: object) => {
    const token = jwt.sign(
        signObj,
        config.SECRET,
        { expiresIn: "2h" }
    );

    return token;
}