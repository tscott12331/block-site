import './App.css'
import { SendRuntimeEvent } from './util/runtime-messages'

function App() {
    async function handleSiteAdd(url: string) {
        const { data } = await SendRuntimeEvent<'store-site'>({
            messageType: 'store-site',
            data: { url },
        });
    }

    return (
        <>
        <button></button>
        </>
    )
}

export default App
