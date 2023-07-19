## Please Note

This assumes you have already created a slack app in your current workspace and added the appropriate permissions. For this app to work, you'll want to include the following scope(s): `users.profile:write`. If you don't know where to start, read the slack app documentation [here](https://api.slack.com/start/apps)!

## Installation

This application is intended to be ran globally. If you have forked this repository and wish to contribute see [Local Development](#local-development) for instructions on how to run things locally.

***npm:*** 
```bash
npm install -g now-listening
```
## Local Development

🏃 **Running the App:**

Be sure to run `npm install` first and foremost.

Run the app with `npm run start`. Your first time running the app you'll be asked to provide your slack token and preferred music provider. These credentials will be written to a file called `config.txt` in the `dist` directory. Subsequent runs will read those credentials from the `config.txt`.

***Upcoming functionality will include overwriting your credentials***

🔨 **Building the App:**

Build the app buy running the script `npm run build`. This will overwrite the existing `dist` directory with your changes.
