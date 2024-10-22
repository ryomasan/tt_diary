import db from "../models/index.js";
const User = db.users;

//Function to check if name or email already exist in the database
//this is to avoid having two users with the same name and email
const saveUser = async (req, res, next) => {
    //search the database to see if user exist
    try {
        const name = await User.findOne({
            where: {
                name: req.body.name,
            },
        });
        //if name exist in the database respond with a status of 409
        if (name) {
            return res.json(409).send("name already taken");
        }

        //checking if email already exist
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        //if email exist in the database respond with a status of 409
        if (emailcheck) {
            return res.json(409).send("Authentication failed");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default saveUser;