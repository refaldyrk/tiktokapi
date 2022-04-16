/**
 * Please Copyright Refaldy Rizky Karim 2022
 */
const { default: axios } = require("axios");
const express = require("express");
const { tiktokDL } = require("./tiktok/tiktok");
const app = express();
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get("/api", async (req, res) => {
	const url = req.query.url;

	if (!url) {
		res.jsonp({
			status: "fail",
			message: "param gaada bruh",
			author: "Refaldy",
		});
	}
	const splitStr = url.split("/");
	const hostLink = splitStr[2];
	if (hostLink == "vt.tiktok.com") {
		res.json({
			status: "fail",
			message:
				"url tidak valid, gunakan url yang diawali https://tiktok.com/@example/video/idnya",
		});
		console.log("url tidak valid");
		return;
	}

	const vid = await tiktokDL(url, req, res).catch(error => {
		console.log(error);
		res.jsonp({
			status: "error",
			message: "Something went wrong: " + error,
		});
	});
	if (!vid) {
		return console.log("[Error] Tidak ada video");
	}

	res.json({
		status: "success",
		data: {
			username: vid.collector[0].authorMeta.nickName,
			avatar: vid.collector[0].authorMeta.avatar,
			image: vid.collector[0].imageUrl,
			music: {
				name: vid.collector[0].musicMeta.musicName,
				author: vid.collector[0].musicMeta.musicAuthor,
				image: vid.collector[0].musicMeta.coverThumb,
			},
			video: {
				videoUrl: vid.collector[0].videoUrl,
				videoNoWaterMark: vid.collector[0].videoUrlNoWaterMark,
			},
			authorAPI: "Refaldy",
			github: "github.com/refaldyrk",
		},
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
