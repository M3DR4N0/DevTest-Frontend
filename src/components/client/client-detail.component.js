import { useEffect, useState } from "react"
import { clientService } from "../../services/client/client.service";
import { Button, Form } from 'semantic-ui-react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReadAddress from "../address/read-address.component";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReadPerfil from "../perfil/read-perfil.component";

export default function ClientDetail() {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

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
            <h1 className="main-header">Detalles del cliente</h1>
            <Form className="detail-form" style={{display:'flex', justifyContent: 'space-between'}}>
                <Form.Field style={{'margin-right': '20px'}}>
                    <label>Nombre</label>
                    <input disabled value={name} />
                </Form.Field>
                <Form.Field style={{'margin-right': '20px'}}>
                    <label>Correo electronico</label>
                    <input disabled value={email}/>
                </Form.Field>
            </Form>
            
            <Tabs>
                <TabList>
                    <Tab>Ublicaciones</Tab>
                    <Tab>Perfiles</Tab>
                </TabList>

                <TabPanel>
                    <ReadAddress clientId={id}/>
                </TabPanel>
                <TabPanel>
                    <ReadPerfil clientId={id}/>
                </TabPanel>
            </Tabs>

            <div style={{display: 'flex', justifyContent: 'flex-start', width: '60vw'}}>
                <Link to='/'>
                    <Button>Volver</Button>
                </Link>
            </div>
        </>
    )
}