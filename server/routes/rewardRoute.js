const express = require("express");
const RewardController = require("../controllers/reward/rewardController");

var router = express.Router();

router.get("/:projectName/:mintAddress/:creator", RewardController.getRecords);
router.get("/getUserRewardDetail", RewardController.getUserRewardDetail);
router.patch("/addRewardRecord", RewardController.addRewardRecord);

router.patch("/updateRewardRecord", RewardController.updateRewardRecord);

module.exports = router;
