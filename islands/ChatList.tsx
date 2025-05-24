import { Contact } from "../components/types.ts";

export type Props = {
    contacts: Contact[];
    onSelect: (chatId: string) => void;
};

export default function ChatList({ contacts, onSelect }: Props) {
    return (
        <ul className="chat-list">
            {contacts
            .filter((contact) => contact && contact.name)
            .map((contact) => (
                <li key={contact._id} className="mb-1rem cursor-pointer" onClick={() => onSelect(contact.chatId)}>
                    <strong>{contact.name}</strong>
                    <br/>
                    <small>{contact.email}</small>
                    <br/>
                    <small>{contact.phone}</small>
                </li>
            ))}
        </ul>
    );
}
