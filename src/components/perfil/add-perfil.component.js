import { useState } from "react"
import { perfilService } from "../../services/perfil/perfil.service";
import { Button, Form } from 'semantic-ui-react';
import { Link, useParams } from "react-router-dom";

export default function AddPerfil(){
    const {clientId} = useParams();

    const [description, setDescription] = useState('');

    const insertPerfil = async () => {
        await perfilService.create({
            description: description,
            clientId: clientId
        });

        alert('INSERTADO CON EXITO!');
    }

    return (
        <>
            <h2 className="main-header">Agregar perfil</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Descripcion</label>
                    <input placeholder='Descripcion...' onChange={(e) => setDescription(e.target.value)}/>
                </Form.Field>
                
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to={`/detalle-cliente/${clientId}`}>
                        <Button>Volver</Button>
                    </Link>

                    <Button type='submit' onClick={insertPerfil}>Agregar</Button>
                </div>
                
            </Form>
        </>
    )
}