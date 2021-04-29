const express = require('express');
const router = express.Router();
const favoriteMonsterCtrl = require('../../controllers/favoriteMonster')

router.post('/user/:id/favorite', favoriteMonsterCtrl.create)
router.delete('/favorite/:id', favoriteMonsterCtrl.deleteFavorite)

module.exports = router;