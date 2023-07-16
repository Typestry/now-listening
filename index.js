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

const script = `tell application "${process.env.MUSIC_PROVIDER}" to get player state & (get {name, artist} of current track)`

const updateStatus = () => {
    applescript.execString(
        script,
        async (err, result) => {
            if (err) {
                return
            }

            const [state, song, artist] = await result;
            
            if (state !== "paused") {
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
        }
    );
}

nodeChron.schedule("* * * * *", updateStatus)
