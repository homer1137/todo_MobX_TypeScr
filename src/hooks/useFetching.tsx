import { useState } from "react";



export const useFetching =(callback:Function)=>{
    const [pending, setPending] = useState(false);
    const [error, setError]= useState('');

    const registrate =async()=>{
        try {
            setPending(true)
            await callback()
        } catch (error:any) {
            console.log(error)
            setError(error.message+' '+error.response.data);
        } finally {
            setPending(false)
        }

    }

    return [registrate, pending, error] as const;
}