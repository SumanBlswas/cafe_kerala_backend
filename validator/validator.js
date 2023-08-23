const validator = (req, res, next) => {
  const { email, password, name, dob, gender, subscribed, sharedata } =
    req.body;
  const method = req.method;
  if (method === "POST" || method === "PATCH") {
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof name !== "string" ||
      typeof dob !== "string" ||
      typeof gender !== "string" ||
      typeof subscribed !== "boolean" ||
      typeof sharedata !== "boolean"
    ) {
      res.status(404).send({ msg: "type error" });
    } else {
      next();
    }
  } else {
    next();
  }
};

export { validator };
