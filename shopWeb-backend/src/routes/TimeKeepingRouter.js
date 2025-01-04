const express = require("express");
const router= express.Router();
const timekeepingController = require('../controllers/TimeKeepingController');

router.post('/create', timekeepingController.createTimeKeeping);
router.put('/update/:id', timekeepingController.updateTimeKeeping);
router.get('/get', timekeepingController.getTimeKeeping);
router.get('/getByUserId/:userId', timekeepingController.getByUserId);
router.delete('/delete/:id', timekeepingController.deleteTimeKeeping);
module.exports = router;