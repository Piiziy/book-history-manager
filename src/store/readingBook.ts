import { atom } from "jotai";

import { UserBook } from "@/types/userBook";

export const readingBookAtom = atom<UserBook[]>([]);
