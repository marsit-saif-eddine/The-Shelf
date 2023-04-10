const search =async (req, res) => {
	try {
		const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";
		//  let sort = req.query.sort || "rating";
		// let fav_genre = req.query.fav_genre || "All";

		// const genreOptions = [
		// 	"Action",
		// 	"Romance",
		// 	"Fantasy",
		// 	"Drama",
		// 	"Crime",
		// 	"Adventure",
		// 	"Thriller",
		// 	"Sci-fi",
		// 	"Music",
		// 	"Family",
		// ];

		// fav_genre === "All"
		// 	? (fav_genre = [...genreOptions])
		// 	: (fav_genre = req.query.fav_genre.split(","));
		// req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		// let sortBy = {};
		// if (sort[1]) {
		// 	sortBy[sort[0]] = sort[1];
		// } else {
		// 	sortBy[sort[0]] = "asc";
		// }

		const users = await user.find({ firstname: { $regex: search, $options: "i" } })
			//  .where("fav_genre")
			//   .in([...fav_genre])
			//  .sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await user.countDocuments({
			// lastname: { $in: [...lastname] },
			firstname: { $regex: search, $options: "i" },
		});
    let profiles = [];
    users.map(user => {
        let profile = {
            ...user
        }
        profile = {
            ...profile['_doc'],
            rate: 0
        };
        profile.rate = profile.rating.reduce((a, b) => a + b.value, 0);
        profile.rate = profile.rate / profile.rating.length;
        delete profile.rating;

        profiles.push(profile);
    });
		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			// fav_genres: genreOptions,
			profiles,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
}
module.exports={search}
