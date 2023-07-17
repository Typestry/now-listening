import inquirer from "inquirer";
import { startStatusTask } from "./utils/startStatusTask";
import { readFileSync, writeFile } from "fs";
import { verifyAuth } from "./utils/verifyAuth";

(async () => {
  try {
    const response = readFileSync("config.txt", "utf8");
    const { token, provider } = JSON.parse(response);
    console.log("Successfully read config file! Starting task! 🎉");
    startStatusTask(provider, token);
  } catch (err) {
    const {
      token,
      options: [provider],
    } = await getAnswers();
    const content = JSON.stringify({ token, provider });
    writeFile("config.txt", content, (err) => {
      if (err) {
        console.error(err);
      }
      console.log("Successfully wrote config file! 🎉");
    });
    startStatusTask(provider, token);
  }
})();

function getAnswers() {
  return inquirer.prompt([
    {
      name: "token",
      message: "What is your slack app token?",
      type: "input",
      validate: async (token: string) => {
        const isValid = await verifyAuth(token);

        if (!isValid) {
          return "Please provide a valid slack token";
        }

        if (!token.length) {
          return "Please provide a token";
        }

        return true;
      },
    },
    {
      name: "options",
      message: "Who is your music provider?",
      type: "checkbox",
      choices: ["Music", "Spotify"],
      validate: (options: Array<string>) => {
        if (!options.length) {
          return "Choose at least one of the above, use space to choose the option";
        }

        if (options.length > 1) {
          return "Please select only one option";
        }

        return true;
      },
    },
  ]);
}
