import { RichTextNode } from "@uniformdev/richtext";

interface RichTextDescription {
  type: string;
  value: {
    root: any; // Use the proper type if available
  };
}
export type Parameters = {
  title: string;
  description: RichTextDescription;
};

export type Slots = string;
