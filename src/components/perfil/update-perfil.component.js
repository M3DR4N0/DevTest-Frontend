import { useEffect, useState } from "react"
import { perfilService } from "../../services/perfil/perfil.service";
import { Button, Form } from 'semantic-ui-react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UpdatePerfil(){

    const {clientId, id} = useParams();
    const [description, setDescription] = useState('');

    const editperfil = async () => {
        await perfilService.update({
            perfilId: id,
            description: description,
            clientId: clientId
        });

        alert('EDITADO CON EXITO!');
    }

    async function getPerfilToEdit(){
        const data = await perfilService.getById(id);

        setDescription(data.perfil.description);
    }

    useEffect(() => {
        getPerfilToEdit();
    }, [])

    return (
        <>
            <h2 className="main-header">Editar perfil</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Descripcion</label>
                    <input placeholder='Descripcion...' value={description} onChange={(e) => setDescription(e.target.value)}/>
                </Form.Field>
                
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to={`/detalle-cliente/${clientId}`}>
                        <Button>Volver</Button>
                    </Link>

                    <Button type='submit' onClick={editperfil}>Editar</Button>
                </div>
            </Form>
        </>
    )
}