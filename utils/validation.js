//uri dump and restore validation using regex
const dumpUriValidation = (uri) => {
  const localRegEx =
    /mongodb:[^a-z A-Z 0-9][//]localhost:27017[/][a-z A-z 0-9]/;

  const serverRegEx =
    /mongodb[+]srv:[^a-z A-Z 0-9][//]([\w]+:)([a-z A-Z 0-9]+@)([a-z A-Z 0-9]+[\.\-])([a-z A-Z 0-9]+[\.\-])mongodb.net[//]/;

  if (localRegEx.test(uri)) return true;
  else return serverRegEx.test(uri);
};

const catchAsync = (myFunc) => (req, res, next) => {
  Promise.resolve(myFunc(req, res, next))
    .then(({ message, status }) => {
      res.json({ message, status });
    })
    .catch((err) => {
      res.status(200).send({ message: err?.message, status: false });
    });
};

module.exports = {
  dumpUriValidation,
  catchAsync,
};
