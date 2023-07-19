```


███╗   ██╗ ██████╗ ██╗    ██╗    ██╗     ██╗███████╗████████╗███████╗███╗   ██╗██╗███╗   ██╗ ██████╗ 
████╗  ██║██╔═══██╗██║    ██║    ██║     ██║██╔════╝╚══██╔══╝██╔════╝████╗  ██║██║████╗  ██║██╔════╝ 
██╔██╗ ██║██║   ██║██║ █╗ ██║    ██║     ██║███████╗   ██║   █████╗  ██╔██╗ ██║██║██╔██╗ ██║██║  ███╗
██║╚██╗██║██║   ██║██║███╗██║    ██║     ██║╚════██║   ██║   ██╔══╝  ██║╚██╗██║██║██║╚██╗██║██║   ██║
██║ ╚████║╚██████╔╝╚███╔███╔╝    ███████╗██║███████║   ██║   ███████╗██║ ╚████║██║██║ ╚████║╚██████╔╝
╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝     ╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                                                     


```
                                                                                                                                                                                                      
## Please Note

This assumes you have already created a slack app in your current workspace and added the appropriate permissions. For this app to work, you'll want to include the following scope(s): `users.profile:write`. If you don't know where to start, read the slack app documentation [here](https://api.slack.com/start/apps)!

## Installation

This application is intended to be ran globally. If you have forked this repository and wish to contribute see [Local Development](#local-development) for instructions on how to run things locally.

**npm:** 
```bash
npm install -g now-listening
```

## 🏃 Running the App:

To start the application, run the following command in your terminal:

```bash
now-listening
```

Upon running the app for the first time, you'll be prompted to provide your user token and preferred music provider. These credentials will be written to a file called config.txt in the dist directory. Subsequent runs will read those credentials from config.txt.

To find your user token go to https://slack.com/apps/. Select your app from the list. Then click `Add features and functionality`, followed by `Permissions` and copy the token in the box below `User OAuth Token` it will start with `xoxp-`. See more about user tokens [here](https://api.slack.com/authentication/token-types#user). 

Currently ***Now Listening*** supports `Apple Music` and `Spotify` with plans to support other services in the near future.  


## Local Development

- Be sure to run `npm install` first and foremost.
- Run the app with `npm run start`. 

🔨 **Building the App:**

To build the app, run the following script:

```bash
npm run build
```

This will overwrite the existing `dist` directory with your changes.
