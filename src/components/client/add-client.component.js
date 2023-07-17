import { useState } from "react"
import { clientService } from "../../services/client/client.service";
import { Button, Form } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default function AddClient(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const insertClient = async () => {
        await clientService.create({
            name,
            email
        });

        alert('INSERTADO CON EXITO!');
    }

    return (
        <>
            <h2 className="main-header">Agregar cliente</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Nombre</label>
                    <input placeholder='Nombre...' onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Correo electronico</label>
                    <input placeholder='Correo electronico...' onChange={(e) => setEmail(e.target.value)}/>
                </Form.Field>
                
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to='/'>
                        <Button>Volver</Button>
                    </Link>

                    <Button type='submit' onClick={insertClient}>Agregar</Button>
                </div>
                
            </Form>
        </>
    )
}