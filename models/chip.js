module.exports = (sequelize, DataTypes) => {
    const Chip = sequelize.define('chip', {
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chipType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        chipFlavor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imageURL: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        owner:{
            type:DataTypes.INTEGER, 
            allowNull:false
        }
    })

    return Chip;
}