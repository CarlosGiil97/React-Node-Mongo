import React from "react";
import Axios from "axios"



export default function ListadoPelis (pelis)  {

    

    let data = pelis.data;
   
    const listItems = data.map((peli) =>
        <tr>
            
            <td>{peli._id}</td>
            <td>{peli.title}</td>
            <td>{peli.description}</td>
           
        </tr>  
);
   
    return (
        <table className="table table-striped">
                <thead>
                <tr>
                    
                    <th scope="col">Id</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Descripción</th>
                    
                </tr>
            </thead>
            <tbody>
                {listItems}
            </tbody>
            </table>
    )
    
    
    
    
}