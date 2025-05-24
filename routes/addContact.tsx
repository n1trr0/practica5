import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

type Contact = {
    name: string;
    email: string;
    phone: string;
};

type Data = {
    message?: string;
};

export const handler: Handlers<Data> = {
    GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
        const url = new URL(req.url);
        const name = url.searchParams.get("name");
        const email = url.searchParams.get("email");
        const phone = url.searchParams.get("phone");

        if (name && email && phone) {
            try {
                const res = await fetch("https://back-a-p4.onrender.com/contacts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, phone }),
                });

            if (!res.ok) {
                const err = await res.text();
                return ctx.render({ message: `Error: ${err}` });
            }

            return new Response(null, {
                status: 303,
                headers: { Location: "/" },
            });
            } catch (_e) {
                return ctx.render({ message: "Error en el servidor." });
            }
        }
        return ctx.render({});
    }
};

export default function AddContactPage(props: PageProps<Data>) {
  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Añadir contacto</h1>
      {props.data.message && (
        <p style={{ color: "red" }}>{props.data.message}</p>
      )}
      <form method="get" action="/addContact">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          required
          style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
        />
        <button
          type="submit"
          className="addContact-button addContact2"
        >
          Añadir contacto
        </button>
      </form>
    </div>
  );
}
