var express = require("express");
const router = express.Router();
const postsController = require("../../controllers/post-management/postController");


//user_routes//

router.get("/posts", postsController.getAllPosts);
router.post("/addpost", postsController.addPost);
router.get("/:id", postsController.getById);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

router.get("/user_post/:id", postsController.getPostByUserId);
router.get("/accepted_posts", postsController.getAcceptedPosts);

router.get("/filter_posts", postsController.getAllPostsFilter);
router.put("/switch_accepted/:id", postsController.switchPostToaccepted);





module.exports = router;

