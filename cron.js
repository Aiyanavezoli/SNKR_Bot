const cron = require("node-cron");
const snkrBot = require("./bot");
cron.schedule("0 10 * * *", () => {
	snkrBot();
});
