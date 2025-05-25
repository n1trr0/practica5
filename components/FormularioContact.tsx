import { FunctionalComponent } from "preact/src/index.d.ts";

type Data = {
    message?: string;
}

const FormularioContact : FunctionalComponent<Data> = (props) => {
    return(
        <>
        <div className="addContactForm">
            <h1>Añadir contacto</h1>
            {props.message && (<p className="error">{props.message}</p>)}

            <form method="get" action="/addContact">
                <input type="text" name="name" placeholder="Nombre" required className="form"/>

                <input type="email" name="email" placeholder="Email" required className="form"/>

                <input type="tel" name="phone" placeholder="Teléfono" required className="form"/>

                <button type="submit" className="addContact-button addContact2">Añadir contacto</button>
            </form>
        </div>
        </>
    )
}

export default FormularioContact;