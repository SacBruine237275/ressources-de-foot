import { useParams } from 'react-router-dom';

export const Club=()=>{
    const { name,id } = useParams();
    return(
        <div>
            <p>Club avec l'id {name}</p>
        </div>
    )
}