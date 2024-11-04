import { Button } from '@/components/ui/button'
import React from 'react'

const TestThemePage = () => {
    return (
        <div>
            <Button className='bg-[var(--background)]'>
                Test
            </Button>
            <div className='w-40 h-40 bg-[var(--background)] text-[var(--foreground)]'>
                test
            </div>
            <div className='bg-[var(--cm-success)] w-72 h-20'>
                card
            </div>
        </div>
    )
}

export default TestThemePage


// --background: 0 0% 100%;
// --foreground: 0 0% 3.9%;
// --card: 0 0% 100%;
// --card-foreground: 0 0% 3.9%;
// --popover: 0 0% 100%;
// --popover-foreground: 0 0% 3.9%;
// --primary: 0 0% 9%;
// --primary-foreground: 0 0% 98%;
// --secondary: 0 0% 96.1%;
// --secondary-foreground: 0 0% 9%;
// --muted: 0 0% 96.1%;
// --muted-foreground: 0 0% 45.1%;
// --accent: 0 0% 96.1%;
// --accent-foreground: 0 0% 9%;
// --destructive: 0 84.2% 60.2%;
// --destructive-foreground: 0 0% 98%;
// --border: 0 0% 89.8%;
// --input: 0 0% 89.8%;
// --ring: 0 0% 3.9%;
// --chart-1: 12 76% 61%;
// --chart-2: 173 58% 39%;
// --chart-3: 197 37% 24%;
// --chart-4: 43 74% 66%;
// --chart-5: 27 87% 67%;
// --radius: 0.5rem;