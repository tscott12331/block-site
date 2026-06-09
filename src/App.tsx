import './App.css'
import { SendRuntimeEvent } from './util/runtime-messages'

function App() {
    async function handleSiteAdd(url: string) {
        const { data } = await SendRuntimeEvent<'store-site'>({
            messageType: 'store-site',
            data: { url },
        });
        console.log(data);
    }

    return (
        <div className="w-3xs aspect-9/16 bg-cyan-950">
            <button onClick={() => handleSiteAdd("baleshfc")}></button>
        </div>
    )
}

export default App
