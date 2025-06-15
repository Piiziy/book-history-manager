import { atom } from "jotai";
import { UserBook } from "@/types/userBook";

export const finishedBooksAtom = atom<UserBook[]>([]);
