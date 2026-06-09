import './App.css'
import { SendRuntimeEvent } from './util/runtime-messages'

function App() {
    async function handleSiteAdd(url: string) {
        const result = await SendRuntimeEvent({
            messageType: 'store-site',
            data: { url },
        })
    }

    return (
        <>
        <button></button>
        </>
    )
}

export default App
