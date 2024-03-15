import React,{useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function Button(prop){
    const [title,setTitle] = useState(prop.title)

    const handleClick = (event)=>{
        event.stopPropagation();
        setTitle('updated function');
        alert('success');
    }

    useEffect(()=>{

        const reset = ()=>{
            setTitle(prop.title)
        }

        document.addEventListener('click',reset);

        return ()=>{
            document.removeEventListener('click',reset);
        }
    },[])


    return (
          <button onClick={handleClick}>{title}</button>
    )
}