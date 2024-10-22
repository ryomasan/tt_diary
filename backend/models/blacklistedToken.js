// blacklistedTokenModel.js
const blacklistedTokenModel = (sequelize, DataTypes) => {
    const BlacklistedToken = sequelize.define("blacklisted_token", {
        token: {
            type: DataTypes.STRING,
            allowNull: false, // tokenは必須
        },
    }, { timestamps: true }); // 自動でcreatedAtとupdatedAtを生成

    return BlacklistedToken;
};

export default blacklistedTokenModel;
