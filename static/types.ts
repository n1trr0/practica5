export type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  chatId: string;
};

export type Chat = {
  _id: string;
  messageIds: string[];
  lastMessage: string | null;
  unreadCount: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  contact: Contact;
};

export type ChatListData = {
  count: number;
  data: Chat[];
};

export type Message = {
    _id: string;
    chatId: string;
    isContactMessage: boolean;
    content: string;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type Props = {
  contacts: Contact[];
  onSelect?: (chatId: string) => void;
};

export type ChatResponse = {
  count: number;
  data: { contact: Contact }[];
};