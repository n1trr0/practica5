import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import FormularioContact from "../components/FormularioContact.tsx";

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
        <FormularioContact message={props.data.message}/>
    );
}
