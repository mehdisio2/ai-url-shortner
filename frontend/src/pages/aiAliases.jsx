import { useState } from "react";

function AiGeneration(){
    const [input, setInput] = useState('');
    const [aliases, setAliases] = useState([]);
    const [editedAliase, setEditableAliase] = useState('');

    const generateAliases = async () => {
       const response = await fetch('http://localhost:5000/ai-generated-url', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({url: input})
        })
        if(!response.ok){
            console.log('cannot fetch data')
            return;
        }
        
        const {aliases} = await response.json();
        setAliases(aliases);
    }


    return (
        <>
            <input type="text" placeholder="Enter a url" onChange={(e) => setInput(e.target.value)}/>
            <button onClick={generateAliases}>Generate</button>
            <ul>
                {aliases.map((item, index) => (
                    setEditableAliase(item.alias),
                    <li key={index}>
                        <input type="text" value={item.alias}
                         onChange={(e) => setEditableAliase(e.target.value)}/>
                    </li>
                ))}
            </ul> 
        </>

    )

}

export default AiGeneration;