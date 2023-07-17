import { useEffect, useState } from "react"
import { clientService } from "../../services/client/client.service";
import { Button, Form } from 'semantic-ui-react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UpdateClient(){

    const {id} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const editClient = async () => {
        await clientService.update({
            clientId: id,
            name: name,
            email: email
        });

        alert('EDITADO CON EXITO!');
    }

    async function getClientToEdit(){
        const data = await clientService.getById(id);

        setName(data.client.name);
        setEmail(data.client.email);
    }

    useEffect(() => {
        getClientToEdit();
    }, [])

    return (
        <>
            <h2 className="main-header">Editar cliente</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Nombre</label>
                    <input placeholder='Nombre...' value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Correo electronico</label>
                    <input placeholder='Correo electronico...' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to='/'>
                        <Button>Volver</Button>
                    </Link>

                    <Button type='submit' onClick={editClient}>Editar</Button>
                </div>
            </Form>
        </>
    )
}