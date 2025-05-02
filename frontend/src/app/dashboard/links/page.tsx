import { UrlTable } from '@/components/url-table'
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

export default function Page() {
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
                            <Input placeholder='https://example.com/very/long/path/to/so...'></Input>            
                        </div>
                        <DialogFooter>
                          <Button>Generate Url</Button>    
                        </DialogFooter>    
                    </DialogContent>    
                </Dialog>
            </div>
            <div className='flex flex-col p-4 gap-2'>
                <LinkCard></LinkCard>
            </div>
        </div>
        
    )
}