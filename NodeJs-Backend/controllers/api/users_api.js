const User = require("../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async (req, res) => {
  // first time verification of user that is sign in user and create his token
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    return res.json(200, {
      message: "sign in successful keep this token safe",
      data: {
        //user is encrypted by user.toJSON
        token: jwt.sign(user.toJSON(), "blahSomething", {
          expiresIn: "100000000",
        }),
        success:true
      },
    });
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
module.exports.createUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      User.create(req.body, (err, newUser) => {
        if (err) {
          return res.json(422, {
            message: "Something went wrong",
          });
        }
        return res.json(200, {
          message: "User created successfully",
          success:true
        });
      });
    } else {
      return res.json(500, {
        message: "User Already Present!",
      });
    }
  } catch (error) {
    console.log(err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

module.exports.profile = async (req, res) => {
  try {
    return res.json(200, {
   data:{
      data: {
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email,
      phone: req.user.phone,
      address: req.user.address,
      
    },
    success:true
   },
      message: "MIla kya",
     
    });
  } catch (error) {
    console.log(err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
