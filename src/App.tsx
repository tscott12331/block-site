import { useEffect, useState } from 'react';
import './App.css'
import { sendRuntimeEvent } from './util/runtime-messages'
import type { Site } from './util/site';

function App() {
    const [sites, setSites] = useState<Site[]>([]);

    async function initSites() {
        const { data } = await sendRuntimeEvent<'get-sites'>({
            messageType: 'get-sites',
            data: null
        });

        setSites(data.sites);
    }

    async function siteAddAction(formData: FormData) {
        const url = formData.get('url')?.toString();
        if(!url) {
            return;
        }

        const { data } = await sendRuntimeEvent<'store-site'>({
            messageType: 'store-site',
            data: { site: url },
        });

        setSites(data.result);
    }

    async function removeSite(site: Site) {
        const { data } = await sendRuntimeEvent<'delete-site'>({
            messageType: 'delete-site',
            data: { site: site },
        });

        setSites(data.result);
    }

    useEffect(() => {
        initSites();
    }, []);

    return (
        <div className="flex flex-col h-full bg-mauve-900 text-amber-50 overflow-hidden">
            <header className="grow my-2 text-center flex justify-center items-center text-5xl">
                <h1>Block Sites</h1>
            </header>
            <main className="flex flex-col grow-7 overflow-hidden my-2">
                <section className="w-2/3 mx-auto my-2">
                    <form 
                        action={siteAddAction}
                        className="flex gap-1"
                    >
                        <input 
                            className="grow-4 bg-mauve-950 outline outline-amber-50 rounded-sm h-8 p-1"
                            placeholder="site to block..." 
                            name="url" 
                            />
                        <button
                            className="grow bg-mauve-600 outline outline-amber-50 rounded-sm h-8 p-1 aspect-square"
                            type="submit"
                            >+</button>
                    </form>
                </section>
                <section className="flex flex-col grow w-2/3 mx-auto my-2 gap-1 p-1 overflow-y-auto border-2 border-dashed border-mauve-700 rounded-sm scrollbar-thin">
                    {sites.map(s => 
                        <div className="flex justify-between px-2 py-1 border border-mauve-400 rounded-2xl">
                            <p>{s}</p>
                            <button onClick={() => removeSite(s as Site)}>+</button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default App
