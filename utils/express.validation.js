const { body, validationResult } = require("express-validator");

exports.dumpDataValidation = () => [
  body("dumpDbUri")
    .notEmpty()
    .isString()
    .withMessage("Please Enter A String..!"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    next();
  },
];

exports.dumpUriValidation = (uri) => {
  const localRegEx =
    /mongodb:[^a-z A-Z 0-9][//]localhost:27017[/][a-z A-z 0-9]/;

  const serverRegEx =
    /mongodb[+]srv:[^a-z A-Z 0-9][//]([\w]+:)([a-z A-Z 0-9]+@)([a-z A-Z 0-9]+[\.\-])([a-z A-Z 0-9]+[\.\-])mongodb.net[//]/;

  if (localRegEx.test(uri)) return true;
  else return serverRegEx.test(uri);
};
