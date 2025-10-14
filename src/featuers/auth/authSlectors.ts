import type { RootState } from "@/store/store";

export const selectAuth = (state: RootState) => state.auth;
