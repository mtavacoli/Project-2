const router = require("express").Router();
const { User } = require("../models/user");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    //  use User.findOne()
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      // include the data from the Expense model
      // using the include property, i.e. include:
      order: [["name", "ASC"]],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
