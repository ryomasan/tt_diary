//user model
const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                max: 255
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                max: 255
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [9, 255]
            }
        },
        user_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, { timestamps: true },)
    return User
}

export default userModel