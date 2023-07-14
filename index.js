const applescript = require("applescript");
const axios = require("axios");
const nodeChron = require("node-cron")
require("dotenv").config()

const options = {
  method: "POST",
  url: "https://slack.com/api/users.profile.set",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
  },
};

const updateStatus = () => {
    applescript.execString(
        `tell app "${process.env.MUSIC_PROVIDER}" to get {name, artist} of current track`,
        async (err, result) => {
            if (err) {
                console.error(err);
            }

            const [song, artist] = await result;
            const status_emoji = '🎶';
            const status_text = `${song} by ${artist}`;
            const data = { profile: { status_emoji, status_text } };

            await axios
                .request({ ...options, data })
                .then(function () {
                    console.log(`Successfully updated status with: ${status_emoji} ${status_text}`);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    );
}

nodeChron.schedule("* * * * *", updateStatus)
