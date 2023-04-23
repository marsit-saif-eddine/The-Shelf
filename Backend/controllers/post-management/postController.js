const Post = require("../../models/post.js")



const getAllPosts = async (req, res, next) => {

  let posts;
  try {
   posts = await Post.find();
  } catch (err) {
    console.log(err);
  }

  if (!posts) {
    return res.status(404).json({ message: "No posts found" });
  }
  return res.status(200).json(posts);
};


const getAllPostsFilter = async (req, res) => {
  try {
    // Extract the query parameters from the request
    const { q, sortColumn, sort, page, perPage, is_accepted } = req.query;
       // Create the filter object based on the query parameters
       const filter = {};
       if (q) {
         filter.$or = [  
             { name: new RegExp(q, 'i') },    
             { author: new RegExp(q, 'i') },  
         ]; 
       }
       if (is_accepted) {
         filter.is_accepted = is_accepted;
       }
       

    // Set the sort order based on the query parameters
    const sortOrder = {};
    if (sortColumn) {
      sortOrder[sortColumn] = sort === 'desc' ? -1 : 1;
    }

    // Query the database for matching users and calculate pagination variables
    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / perPage);
    const posts = await Post.find(filter)
      .sort(sortOrder)
      .skip((page - 1) * perPage)
      .limit(perPage);
      let profiles = [];
      posts.map(post => {
          let profile = {
              ...post
          }
          profile = {
              ...profile['_doc'],
          };
          profiles.push(profile);
      });

     // Return the response as a JSON object
     res.json({ posts: profiles, total:totalPosts , perPage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
 


const getAcceptedPosts = async (req, res, next) => {
  let posts;
  try {
 posts = await Post.find({is_accepted:true});
 console.log('this is postlist',posts)
  } catch (err) {
    console.log(err);
  }

  if (!posts) {
    return res.status(404).json({ message: "No posts found" });
  }
  return res.status(200).json(posts);
};


const getById = async (req, res, next) => {
  const id = req.params.id;
  let post;
  try {
    post = await Post.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!post) {
    return res.status(404).json({ message: "No Post found" });
  }
  return res.status(200).json(post);
};


const getPostByUserId = async (req, res, next) => {
  let posts;
  const id = req.params.id;
  try {
 posts = await Post.find({owner_Id : id});
console.log('My postlist',posts)
  } catch (err) {
    console.log(err);
  }

  if (!posts) {
    return res.status(404).json({ message: "No posts found" });
  }
  return res.status(200).json(posts);
};


const addPost = async (req, res, next) => {
  const { content, is_accepted, image, date, owner, owner_Id} = req.body;
  let post;
  try {
    post = new Post({
      content,
      is_accepted,
      image,
      date,
      owner,
      owner_Id
    });
    await post.save();
  } catch (err) {
    console.log(err);
  }

  if (!post) {
    return res.status(500).json({ message: "Unable To Add Post" });
  }
  return res.status(201).json(post);
};

const updatePost = async (req, res, next) => {
  const id = req.params.id;
  const { content, is_accepted, image, date, owner, owner_Id}= req.body;
  let post;
  try {
    post = await Post.findByIdAndUpdate(id, {
        content,
        is_accepted,
        image,
        date,
        owner,
        owner_Id
    });
    post = await post.save();
  } catch (err) {
    console.log(err);
  }
  if (!post) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json( {post} );
};


const switchPostToaccepted = async (req, res, next) => {
  const id = req.params.id;
  const {is_accepted} = req.body;
  let post;
  try {
    post = await Post.findByIdAndUpdate(id, {
      is_accepted
    });
    post = await post.save();
  } catch (err) {
    console.log(err);
  }
  if (!post) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json( {post} );
};



const deletePost = async (req, res, next) => {
  const id = req.params.id;
  let post;
  try {
    post = await Post.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!post) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Post Successfully Deleted" });
};




exports.getAllPosts = getAllPosts;
exports.addPost = addPost;
exports.getById = getById;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.getPostByUserId = getPostByUserId;
exports.getAcceptedPosts = getAcceptedPosts;
exports.getAllPostsFilter= getAllPostsFilter;
exports.switchPostToaccepted = switchPostToaccepted;


