import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react'
import { clientService } from '../../services/client/client.service';
import { Link } from 'react-router-dom';

export default function ReadClient() {
    const [clients, SetClients] =   
        useState([{
            clientId: 0,
            name: '',
            email: ''
        }]);

    async function getAllClients(){
        const data = await clientService.getAll();

        SetClients(data.clients);
    }

    async function deleteClient(id){
        await clientService.delete(id);

        alert('ELIMINADO CON EXITO!');

        await getAllClients();
    }

    useEffect(() => {
        getAllClients();
    }, []);

    return (
        <>
            <div style={{width: '60vw', display: 'flex', justifyContent: 'space-between'}}>
                <h2 className="main-header">Lista de clientes</h2>
                <Link to='/agregar-cliente'>
                    <Button>Agregar cliente</Button>                                        
                </Link>
            </div>
            <Table className='table'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>      
                        <Table.HeaderCell>Nombre del cliente</Table.HeaderCell>                     
                        <Table.HeaderCell colspan={2}>Correo electronico</Table.HeaderCell>       
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {clients.length > 0 ? 
                        clients.map(client => {
                            return (
                                <Table.Row key={client.clientId}>
                                    <Table.Cell>{client.clientId}</Table.Cell>
                                    <Table.Cell>{client.name}</Table.Cell>
                                    <Table.Cell>{client.email}</Table.Cell>
                            
                                    <Table.Cell style={{display: 'flex', 'justify-content': 'flex-end'}}>
                                        <Link to={`/detalle-cliente/${client.clientId}`}>
                                            <Button>Detalles</Button>
                                        </Link>
                                        <Link to={`/editar-cliente/${client.clientId}`}>
                                            <Button>Editar</Button>
                                        </Link>
                                        <Button onClick={() => deleteClient(client.clientId)}>Eliminar</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }) : 
                        <Table.Row>
                            <Table.Cell colspan={4} style={{ color:'red', 'text-align': 'center' }}>
                                <h4>No hay clientes para mostrar</h4>
                            </Table.Cell>
                        </Table.Row>
                    }
                    
                </Table.Body>
            </Table>
        </>
    )
}