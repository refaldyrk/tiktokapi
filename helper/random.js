const randomString = () => {
	Array.from({ length: 7 }, () => Math.random().toString(36)[2]).join("");
};

module.exports = randomString;
