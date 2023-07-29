&nbsp;&nbsp;
<img src="https://github.com/thispastwinter/now-listening/blob/main/images/banner.png?raw=true" />
&nbsp;&nbsp;

![example workflow](https://github.com/thispastwinter/now-listening/actions/workflows/CI.yml/badge.svg)
[![codecov](https://codecov.io/gh/thispastwinter/now-listening/branch/main/graph/badge.svg?token=U1EZEJ0EMZ)](https://codecov.io/gh/thispastwinter/now-listening)

## Please Note

This assumes you have already created a slack app in your current workspace and added the appropriate permissions. For this app to work, you'll want to include the following scope(s): `users.profile:write`. If you don't know where to start, read the slack app documentation [here](https://api.slack.com/start/apps)!

**This app is currently only supported on macos as it uses applescript internally to get current track information**

## 📦 Installation

This application is intended to be ran globally. If you have forked this repository and wish to contribute see [Local Development](#local-development) for instructions on how to run things locally.

**npm:**

```bash
npm install -g now-listening
```

## 🏃 Running the App

To start the application, run the following command in your terminal:

```bash
now-listening
```

Upon running the app for the first time, you'll be prompted to provide your user token and preferred music provider. These credentials will be written to a file called `config.txt` in the dist directory. Subsequent runs will read those credentials from `config.txt`.

To find your user token go to https://api.slack.com/apps/. Select your app from the list. Then click `Add features and functionality`, followed by `Permissions` and copy the token in the box below `User OAuth Token` it will start with `xoxp-`. See more about user tokens [here](https://api.slack.com/authentication/token-types#user).

Currently **_Now Listening_** supports `Apple Music` and `Spotify` with plans to support other services in the near future.

## 🛠️ Local Development

### Install dependencies:

```bash
npm install
```
### Run the app in dev mode: 

To run the app, run the following script:
```bash
npm run dev 
```
This will start nodemon in watch mode and rebuild the app anytime you make changes. 

### Build the App

To build the app, run the following script:

```bash
npm run build
```

This will build the app with [rollup](https://rollupjs.org/) and overwrite the existing `dist` directory with your changes.

## 🤝 Contributing to now-listening

Thank you for considering contributing to now-listening! We appreciate your interest in helping us make this project better. Before you get started, please take a moment to read through these guidelines to ensure a smooth and collaborative contribution process.

### How to Contribute

**Fork the Repository:** Before starting your work, please fork the now-listening repository to your GitHub account. You can do this by clicking the `Fork` button on the top right corner of this repository page.

**Clone Your Fork:** Once you've forked the repository, clone it to your local machine using the following command, replacing `[username]` with your GitHub username:

   ```bash
   git clone https://github.com/[username]/now-listening.git
   cd now-listening
   ```

**Create a new Branch:** Create a new branch with a descriptive name, starting from the development branch, using the following command:

   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/[your-feature-name]
   ```

**Make Changes:** Now, you can make your desired changes, add new features, or fix issues. Please write clean, concise, and well-documented code.

**Test Your Changes:** Before submitting your changes, run the appropriate tests to ensure your modifications don't introduce any regressions.

**Commit and Push:** Once you are satisfied with your changes, commit them to your local branch and push the changes to your fork on GitHub:

   ```bash
   git add .
   git commit -m "Brief description of your changes"
   git push origin feature/[your-feature-name]
   ```

**Open a Pull Request:** Finally, navigate to the now-listening repository on GitHub and open a pull request (PR). Please ensure your PR targets the `development` branch, not `main`. Our team will review your changes and provide feedback as soon as possible.

Important Guidelines for Pull Requests (PRs):

- Please focus your PR on specific changes related to the proposed feature or issue.
- Use clear and concise commit messages to explain your changes effectively.
- Provide sufficient commits to showcase the progression of your work.
- Ensure your changes align with the scope of the proposed feature.

We value collaboration and are here to support you throughout the process. Feel free to reach out if you need any assistance or clarification. Let's work together to make now-listening even better! 🙌

### Important Notes

- We will not accept direct pull requests to the `main` branch. All contributions must be made through pull requests targeting the `development` branch.
- Contributions must be made under the terms of the [LICENSE](LICENSE) of this project.
- Be respectful and considerate of others' work and opinions. We welcome constructive feedback and collaboration.
