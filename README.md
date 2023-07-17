**Please Note**

This assumes you have already created a slack app in your current workspace and added the appropriate permissions. For this app to work, you'll want to include the following scope(s): `users.profile:write`. If you don't know where to start, read the slack app documentation [here](https://api.slack.com/start/apps)!

🏃 Running the App:

Be sure to run `npm install` first and foremost.

Run the app with `npm run start`. Your first time running the app you'll be asked to provide your slack token and preferred music provider. These credentials will be written to a file called 'config.txt' in the root directory. Subsequent runs will read those credentials from the config.txt.
