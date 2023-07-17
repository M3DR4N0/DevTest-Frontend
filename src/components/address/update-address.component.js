import { useEffect, useState } from "react"
import { addressService } from "../../services/address/address.service";
import { Button, Form } from 'semantic-ui-react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UpdateAddress(){

    const {clientId, id} = useParams();
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');

    const editAddress = async () => {
        await addressService.update({
            addressId: id,
            street: street,
            city: city,
            clientId: clientId
        });

        alert('EDITADO CON EXITO!');
    }

    async function getAddressToEdit(){
        const data = await addressService.getById(id);

        setStreet(data.address.street);
        setCity(data.address.city);
    }

    useEffect(() => {
        getAddressToEdit();
    }, [])

    return (
        <>
            <h2 className="main-header">Editar ubicacion</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Calle</label>
                    <input placeholder='Calle...' value={street} onChange={(e) => setStreet(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Ciudad</label>
                    <input placeholder='Ciudad...' value={city} onChange={(e) => setCity(e.target.value)}/>
                </Form.Field>
                
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to={`/detalle-cliente/${clientId}`}>
                        <Button>Volver</Button>
                    </Link>

                    <Button type='submit' onClick={editAddress}>Editar</Button>
                </div>
            </Form>
        </>
    )
}