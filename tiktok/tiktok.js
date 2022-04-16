const tiktok = require("tiktok-scraper");
const randomString = require("../helper/random");

async function tiktokDL(url, req, res) {
	const headers = {
		"User-Agent": randomString,
		Referer: "https://www.tiktok.com/",
		Cookie: "tt_webid_v2=" + randomString,
	};

	try {
		return await tiktok.getVideoMeta(url, headers);
	} catch (error) {
		console.log(error);
		res.json({
			status: "error",
			message: "Something went wrong: " + error,
		});
	}
}

module.exports = { tiktokDL };
