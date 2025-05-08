'use client'

import { Button } from '@/components/ui/button'
import { Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from '@/components/ui/dialog'
import LinkCard from '@/components/linkCard'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'

// Define the type for the card objects
type Card = {
    original_url: string;
    short_code: string;
};

export default function Page() {
    // Initialize the state with the correct type
    const [input, setInput] = useState('');
    const [cards, setCards] = useState<Card[]>([]);


    useEffect(() => {
        fetch("/api/getUrls", {
            method: 'GET',
            credentials: 'include'
        }
        ) 
         .then((res) => res.json())
         .then(data => setCards(data.links))
         .then((data) => console.log(data))

        }
    ,[])

    const shortenUrl = async () => {
        const response = await fetch("/api/shorten", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: input }),
            credentials: 'include'
        });

        const data = await response.json();
        const { shortUrl } = data;

        // Add the new card to the state
        setCards([...cards, { original_url: input, short_code: shortUrl }]);
    };

    return(
        <div className='flex flex-col p-4 gap-4'>
            <div className='flex justify-end'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={'default'} size={'lg'}>Shorten a URL</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Enter a URL    
                            </DialogTitle>  
                            <DialogDescription>
                                Enter a long Url to shorten it    
                            </DialogDescription>                          
                        </DialogHeader>
                        <div className='p-2'>
                            <Input placeholder='https://example.com/very/long/path/to/so...'
                                onChange={(e) => setInput(e.target.value)}
                            ></Input>            
                        </div>
                        <DialogFooter>
                          <Button onClick={shortenUrl}>Shorten Url</Button>    
                        </DialogFooter>    
                    </DialogContent>    
                </Dialog>
            </div>
            <div className='flex flex-col p-4 gap-2'>
                {cards.map((card, index) => (
                    <LinkCard key={index} longUrl={card.original_url} shortUrl={`http://localhost:5000/${card.short_code}`}></LinkCard>
                ))}
            </div>
        </div>
    )
}