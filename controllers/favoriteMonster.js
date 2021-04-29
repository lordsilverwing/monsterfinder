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
        await user.save()// save it
        console.log("added")
        res.status(201).json({data: 'fav added'})
    } catch(err){
        console.log("error", err)
        res.json({data: err})
    }
    
}

async function deleteFavorite(req, res){
    try {
        
        const user = await User.findOne({'favoriteMonster._id': req.params.id, 'favoriteMonster.monsterName': req.monster.name});
        user.favoriteMonsters.remove(req.params.id) // mutating a document
        // req.params.id is the like id 
        await post.save() // after you mutate a document you must save
        res.json({data: 'fav removed'})
    } catch(err){
        res.json({error: err})
    }
}