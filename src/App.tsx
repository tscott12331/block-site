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
        <div className="h-full bg-mauve-900 text-amber-50 overflow-x-hidden">
            <header className="my-2 text-center">
                <h1>Block Sites</h1>
            </header>
            <main>
                <section className="w-2/3 mx-auto my-2">
                    <form className="flex gap-1">
                        <input 
                            className="grow-4 bg-mauve-950 outline outline-amber-50 rounded-sm h-8 p-1"
                            placeholder="site to block..." 
                            name="url" 
                            />
                        <button
                            className="grow bg-mauve-600 outline outline-amber-50 rounded-sm h-8 p-1 aspect-square"
                            onClick={() => handleSiteAdd("baleshfc")}
                            >+</button>
                    </form>
                </section>
                <section className="w-2/3 mx-auto my-2">
                    <div className="flex flex-col gap-1 p-1 overflow-y-auto">
                        <div className="px-2 py-1 border border-mauve-400 rounded-2xl">
                            <p className="inline inline-4/5 me-auto">site.url</p>
                            <div className="inline inline-1/5">+</div>
                        </div>
                        <div className="px-2 py-1 border border-mauve-400 rounded-2xl">
                            <p className="inline inline-4/5 me-auto">othersite.url</p>
                            <div className="inline inline-1/5">+</div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App
