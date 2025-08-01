import type { User as FirebaseUser } from "firebase/auth";
import type { Timestamp } from "firebase/firestore";

export type User = FirebaseUser;

export type UserData = {
  uid: string;
  email: string | null;
  displayName: string;
  avatar: string | null;
  isAnonymous: boolean;
  createdAt: Timestamp;
  lastLogin: Timestamp;
  formsCreated?: number;
};

export const allFieldTypes = [
  "text",
  "textarea",
  "email",
  "select",
  "switch",
  "number",
] as const;

export type FieldType = (typeof allFieldTypes)[number];

export type Field = {
  id: string;
  type: FieldType;
  label: string;
  placeholder: string;
  required?: boolean;
  order: number;
  options?: { value: string; label: string }[];
};

export type Form = {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  fields: Field[];
  settings?: { themeColor?: string; isPublic?: boolean };
};

export type LocalForm = Omit<Form, "createdBy" | "createdAt" | "updatedAt">;

export type FormResponse = {
  id: string;
  respondentId?: string;
  submittedAt: Timestamp;
  answers: { fieldId: string; value: string | number | boolean | null }[];
};
