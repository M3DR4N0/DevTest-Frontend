import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react'
import { addressService } from '../../services/address/address.service';
import { Link } from 'react-router-dom';

export default function ReadAddress({clientId}) {
    const [addresses, SetAddresses] =   
        useState([{
            addressId: 0,
            street: '',
            city: ''
        }]);

    async function getAlladdresss(){
        const data = await addressService.getAllByClient(clientId);

        SetAddresses(data.addresses);
    }

    async function deleteAddress(id){
        await addressService.delete(id);

        alert('ELIMINADO CON EXITO!');

        await getAlladdresss();
    }

    useEffect(() => {
        getAlladdresss();
    }, []);

    return (
        <>
            <div style={{width: '60vw', display: 'flex', justifyContent: 'space-between'}}>
                <h2 className="main-header">Lista de ubicaciones</h2>
                <Link to={`/detalle-cliente/${clientId}/agregar-ubicacion`}>
                    <Button>Agregar ubicacion</Button>                                        
                </Link>
            </div>
            <Table className='table'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>      
                        <Table.HeaderCell>Calle</Table.HeaderCell>                     
                        <Table.HeaderCell colspan={2}>Ciudad</Table.HeaderCell>       
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {addresses.length > 0 ? 
                        addresses.map(address => {
                            return (
                                <Table.Row key={address.addressId}>
                                    <Table.Cell>{address.addressId}</Table.Cell>
                                    <Table.Cell>{address.street}</Table.Cell>
                                    <Table.Cell>{address.city}</Table.Cell>
                            
                                    <Table.Cell style={{display: 'flex', 'justify-content': 'flex-end'}}>                                   
                                        <Link to={`/detalle-cliente/${clientId}/editar-ubicacion/${address.addressId}`}>
                                            <Button>Editar</Button>
                                        </Link>
                                        <Button onClick={() => deleteAddress(address.addressId)}>Eliminar</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        }) : 
                        <Table.Row>
                            <Table.Cell colspan={4} style={{ color:'red', 'text-align': 'center' }}>
                                <h4>No hay ubicaciones para mostrar</h4>
                            </Table.Cell>
                        </Table.Row>
                    }
                    
                </Table.Body>
            </Table>
        </>
    )
}