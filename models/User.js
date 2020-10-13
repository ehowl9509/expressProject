module.exports = function(sequelize, DataTypes){
    const User = sequelize.define('User',
        {
            userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            email : { type: DataTypes.STRING },
            password : { type: DataTypes.STRING },
            status : { type: DataTypes.STRING }
        }
    );
    return User;
}