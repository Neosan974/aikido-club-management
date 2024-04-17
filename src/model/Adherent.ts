import type { Gender } from "./Gender";

export type Adherent = {
  id?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  email?: string;
  address?: string;
  gender?: Gender;
};
