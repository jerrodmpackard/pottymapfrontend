import React, { useEffect, useState } from 'react'

const AutocompleteAddress = () => {

    const [source, setSource] = useState<any>();
    const [addressList, setAddressList] = useState<any>([])

    const getAddressList = async () => {
        const res = await fetch('/api/search-address?q=' + source, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await res.json();
        setAddressList(result)
    }

    useEffect(() => {
        const delayFunction = setTimeout(() => {
            getAddressList()
        }, 500)

        return () => clearInterval(delayFunction)
    }, [source, getAddressList])

    console.log(`Source: ${source}`);

    return (
        <div className='mt-5'>
            <div className='relative'>
                <label className="text-gray-400">Enter Address</label>
                <input type='text'
                    className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-sky-600'
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />
                {addressList?.suggestions ?
                    <div className='shadow-md p-1 rounded-md absolute w-full bg-white'>
                        {addressList.suggestions.map((item: any, index: number) => (
                            <h2 className='p-3 hover:bg-gray-100 cursor-pointer'
                                onClick={() => { setSource(item.full_address); setAddressList([]) }}
                            >{item.full_address}</h2>
                        ))}
                    </div> : null}
            </div>
        </div>
    )
}

export default AutocompleteAddress