import { MusicProvider } from "../types/MusicProvider.js"

export const Messages = {
  write_success: "Successfully wrote config file! Starting task! 🎉" as const,
  read_success: "Successfully read config file! Starting task! 🎉" as const,
  missing_token: "Please provide a token" as const,
  invalid_token: "Please provide a valid slack token" as const,
  no_option_selected:
    "Choose one of the above, use space to choose an option" as const,
  too_many_options: "Please select only one option" as const,
  token_question: "What is your slack app token?" as const,
  provider_question: "Who is your music provider?" as const,
  no_track_result: (provider: MusicProvider) =>
    `No result, make sure ${provider} is open and that a track is currently playing` as const,
}
