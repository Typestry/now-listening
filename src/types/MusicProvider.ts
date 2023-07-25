import { MusicProviders } from "../constants/musicProviders"

export type MusicProvider = (typeof MusicProviders)[keyof typeof MusicProviders]
