import React from "react";
import IntlMessages from "@crema/helpers/IntlMessages";
import { FolderType } from "@crema/types/models/apps/Mail";

const folderList: FolderType[] = [
  { id: 121, name: "Inbox", alias: "inbox" },
  { id: 122, name: "Sent", alias: "sent" },
  { id: 123, name: "Draft", alias: "draft" },
  { id: 124, name: "Starred", alias: "starred" },
  { id: 125, name: "Spam", alias: "spam" },
  { id: 126, name: "Trash", alias: "trash" },
  { id: 127, name: "Archive", alias: "archive" },
];
export default folderList;

export const mailListMessages = (type: number): string => {
  switch (type) {
    case 125: {
      return String(<IntlMessages id="mail.sentToSpam" />);
    }
    case 126: {
      return String(<IntlMessages id="mail.sentTrash" />);
    }
    case 127: {
      return String(<IntlMessages id="mail.archived" />);
    }
    default: {
      return String(<IntlMessages id="mail.updated" />);
    }
  }
};
