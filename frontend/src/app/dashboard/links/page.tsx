import { UrlTable } from '@/components/url-table'
import { Button } from '@/components/ui/button'

export default function Page() {
    return(
        <div className='flex flex-col p-4 gap-4'>
            <div className='flex justify-end'>
                <Button variant={'default'} size={'lg'}>Shorten a URL</Button>
            </div>
            <UrlTable></UrlTable>
        </div>
        
    )
}