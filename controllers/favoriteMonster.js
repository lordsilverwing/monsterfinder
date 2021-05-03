const User = require('../models/user');

module.exports = {
    create,
    deleteFavorite
}

async function create(req, res){
 
    try {
        const user = await User.findById(req.params.id);
        console.log(req)
        user.favoriteMonsters.push({monsterName: req.body.monster.name, monsterIndex: req.body.monster.index}); //mutating a document
        await user.save()
        console.log("added")
        res.status(201).json(user.favoriteMonsters)
    } catch(err){
        console.log("error", err)
        res.json({data: err})
    }
    
}

async function deleteFavorite(req, res){
    try {
        
        const user = await User.findOne({'favoriteMonsters._id': req.params.id});
        user.favoriteMonsters.remove(req.params.id)
        await user.save()
        res.json(user.favoriteMonsters)
    } catch(err){
        res.json({error: err})
    }
}