import { useParams } from 'react-router-dom';

export const Club=()=>{
    const {name} = useParams();
    return(
        <div>
            <p>Club avec l'id {name}</p>
        </div>
    )
}