const tiktok = require("tiktok-scraper");
const randomString = require("../helper/random");

async function tiktokDL(url) {
	const headers = {
		"User-Agent": randomString,
		Referer: "https://www.tiktok.com/",
		Cookie: "tt_webid_v2=" + randomString,
	};

	try {
		return await tiktok.getVideoMeta(url, headers);
	} catch (error) {
		console.log(error);
		return null;
	}
}

module.exports = { tiktokDL };
