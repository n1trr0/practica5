import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import ChatList from "./ChatList.tsx";
import { Message, Props } from "../static/types.ts";

export default function ChatApp({ contacts }: Props) {
  const activeChatId = useSignal<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (activeChatId.value) {
      fetch(`https://back-a-p4.onrender.com/messages/chat/${activeChatId.value}`)
        .then((res) => res.json())
        .then((data) => setMessages(data.data || []));
    }
  }, [activeChatId.value]);

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim() !== "" && activeChatId.value) {
      const newMessage = {
        chatId: activeChatId.value,
        isContactMessage: false,
        content: inputValue.trim(),
        timestamp: new Date().toISOString(),
      };

      try {
        const res = await fetch("https://back-a-p4.onrender.com/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage),
        });

        if (res.ok) {
          setInputValue("");
        }
      } catch (err) {
        console.error("Error de red:", err);
      }
    }
  };


  return (
    <div className="chat-app-container">
      <div className="chat-contacts">
        <a href="/addContact"><button type="submit" className="addContact-button">Añadir contacto</button></a>
        <h2>Contactos</h2>
        <ChatList contacts={contacts} onSelect={(chatId) => (activeChatId.value = chatId)}/>
      </div>

      <div className="chat-messages-area">
        {activeChatId.value ? (
          <>
            <div className="chat-messages-container">
              {messages.map((msg) => (
                <div key={msg._id} className={`chat-message ${msg.isContactMessage ? "chat-message-left" : "chat-message-right"}`}>
                  <span className={`chat-bubble ${msg.isContactMessage ? "chat-bubble-left" : "chat-bubble-right"}`}>{msg.content}</span>
                </div>
              ))}
            </div>

            <input type="text" value={inputValue} onInput={(e) => setInputValue(e.currentTarget.value)}
              onKeyDown={handleKeyDown} placeholder="Escribe un mensaje..." className="chat-input"/>
          </>
        ) : (<p>Selecciona un contacto para comenzar a chatear.</p>)}
      </div>
    </div>
  );
}
