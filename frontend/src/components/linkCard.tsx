import { Button } from "./ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

type linkCrdProps = {
    longUrl: string,
    shortUrl: string,
}


function LinkCard({...props} : linkCrdProps) {
    
    const truncateUrl = (url : string, maxLength = 70) => {
        if (!url) return '';
        return url.length > maxLength ? url.slice(0, maxLength) + '...' : url;
      };


    return (
       <div>
        <div className='bg-gray-100 shadow rounded-sm h-35 flex flex-col gap-1.5 p-8 justify-center '>
            <a href={props.longUrl}>
              <TooltipProvider>
                <Tooltip>
                <TooltipTrigger>
                    {truncateUrl(props.longUrl)}
                </TooltipTrigger>
                <TooltipContent>
                    {props.longUrl}
                </TooltipContent>
                </Tooltip>
              </TooltipProvider>


            </a>
            <a href={props.shortUrl} className="font-bold">{props.shortUrl}</a>
            <div className='flex justify-end gap-1'>
                <Button variant={'outline'}>Delete</Button>
                <Button variant={'outline'}>Edit</Button>
            </div>
        </div>
    </div>
    )

}

export default LinkCard;