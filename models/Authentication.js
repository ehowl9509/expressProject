module.exports = function(sequelize, DataTypes){
    const User = sequelize.define('User',
        {
            authenticationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            userId : { type: DataTypes.STRING },
            number : { type: DataTypes.STRING }
        }
    );
    return User;
}