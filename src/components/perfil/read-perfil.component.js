import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react'
import { perfilService } from '../../services/perfil/perfil.service';
import { Link } from 'react-router-dom';

export default function ReadPerfil({clientId}) {
    const [perfils, SetPerfils] =   
        useState([{
            perfilId: 0,
            description: ''
        }]);

    async function getAllPerfils(){
        const data = await perfilService.getAllByClient(clientId);
        
        SetPerfils(data.perfils);
    }

    async function deletePerfil(id){
        await perfilService.delete(id);

        alert('ELIMINADO CON EXITO!');

        await getAllPerfils();
    }

    useEffect(() => {
        getAllPerfils();
    }, []);

    return (
        <>
            <div style={{width: '60vw', display: 'flex', justifyContent: 'space-between'}}>
                <h2 className="main-header">Lista de perfiles</h2>
                <Link to={`/detalle-cliente/${clientId}/agregar-perfil`}>
                    <Button>Agregar perfil</Button>                                        
                </Link>
            </div>
            <Table className='table'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>                         
                        <Table.HeaderCell colspan={2}>Descripcion</Table.HeaderCell>       
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {perfils.length > 0 ? 
                        perfils.map(perfil => {
                            return (
                                <Table.Row key={perfil.perfilId}>
                                    <Table.Cell>{perfil.perfilId}</Table.Cell>
                                    <Table.Cell>{perfil.description}</Table.Cell>                    
                            
                                    <Table.Cell style={{display: 'flex', 'justify-content': 'flex-end'}}>                                   
                                        <Link to={`/detalle-cliente/${clientId}/editar-perfil/${perfil.perfilId}`}>
                                            <Button>Editar</Button>
                                        </Link>
                                        <Button onClick={() => deletePerfil(perfil.perfilId)}>Eliminar</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }) : 
                        <Table.Row>
                            <Table.Cell colspan={4} style={{ color:'red', 'text-align': 'center' }}>
                                <h4>No hay perfiles para mostrar</h4>
                            </Table.Cell>
                        </Table.Row>
                    }
                    
                </Table.Body>
            </Table>
        </>
    )
}