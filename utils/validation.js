//uri dump and restore validate using regex
exports.dumpUriValidation = (uri) => {
  const localRegEx =
    /mongodb:[^a-z A-Z 0-9][//]localhost:27017[/][a-z A-z 0-9]/;

  const serverRegEx =
    /mongodb[+]srv:[^a-z A-Z 0-9][//]([\w]+:)([a-z A-Z 0-9]+@)([a-z A-Z 0-9]+[\.\-])([a-z A-Z 0-9]+[\.\-])mongodb.net[//]/;

  if (localRegEx.test(uri)) return true;
  else return serverRegEx.test(uri);
};
