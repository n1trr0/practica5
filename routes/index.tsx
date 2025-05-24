import ChatApp from "../islands/ChatApp.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

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


type ChatResponse = {
  count: number;
  data: { contact: Contact }[];
};

export const handler: Handlers = {
  async GET(_, ctx) {
    const res = await fetch("https://back-a-p4.onrender.com/chats");
    const chats: ChatResponse = await res.json();
    const contacts = chats.data.map(c => c.contact);
    return ctx.render({ contacts });
  }
};

export default function Home(props: PageProps<{ contacts: Contact[] }>) {
  return <ChatApp contacts={props.data.contacts} />;
}
