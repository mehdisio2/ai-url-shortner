import { Button } from "./ui/button"

function LinkCard({...props}) {

    return (
       <div>
        <div className='bg-gray-100 shadow rounded-sm h-30 flex flex-col gap-1 p-8 justify-center '>
            <a href="https://example.com/very/long/path/to/so...">
                
            </a>
            <p className='font-bold '>http://localhost:5000/cyber01</p>
            <div className='flex justify-end gap-1'>
                <Button variant={'outline'}>Delete</Button>
                <Button variant={'outline'}>Edit</Button>
            </div>
        </div>
    </div>
    )

}

export default LinkCard;