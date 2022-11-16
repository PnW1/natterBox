const TweetController = require("../controllers/tweet/tweetController");
const express = require("express");

var router = express.Router();

router.get("/getUserIdFromName/:username", TweetController.getUserIdFromName);

router.get("/getUserMentions/:username", TweetController.getUserMentions);

router.get("/getUserFollowers/:userId", TweetController.getUserFollowers);

router.get("/getTweetById/:tweetId", TweetController.getTweetById);

router.get("/getTweetliked/:tweetId", TweetController.getTweetliked);

router.get("/getRetweets/:tweetId", TweetController.getRetweets);

router.get(
  "/getQuotedTweetsByTweetId/:tweetId",
  TweetController.getQuotedTweetsByTweetId
);

router.get(
  "/getAllReplyForATweet/:tweetId",
  TweetController.getAllReplyForATweet
);

router.patch("/likeSpecificTweet/:tweetId", TweetController.likeSpecificTweet);

router.patch(
  "/replyToTweetWithTweetId/:tweetId",
  TweetController.replyToTweetWithTweetId
);

router.patch("/retweetATweet/:tweetId", TweetController.retweetATweet);

router.patch("/mentionClaim/:tweetId", TweetController.mentionClaim);

module.exports = router;
