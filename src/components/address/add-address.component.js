import { useState } from "react"
import { addressService } from "../../services/address/address.service";
import { Button, Form } from 'semantic-ui-react';
import { Link, useParams } from "react-router-dom";

export default function AddAddress(){
    const {clientId} = useParams();
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');

    const insertAddress = async () => {
        await addressService.create({
            street: street,
            city: city,
            clientId: clientId
        });

        alert('INSERTADO CON EXITO!');
    }

    return (
        <>
            <h2 className="main-header">Agregar ubicacion</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Calle</label>
                    <input placeholder='Calle...' onChange={(e) => setStreet(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Ciudad</label>
                    <input placeholder='Ciudad...' onChange={(e) => setCity(e.target.value)}/>
                </Form.Field>
                
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to={`/detalle-cliente/${clientId}`}>
                        <Button>Volver</Button>
                    </Link>

                    <Button type='submit' onClick={insertAddress}>Agregar</Button>
                </div>
                
            </Form>
        </>
    )
}