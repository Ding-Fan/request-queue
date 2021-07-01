import { atom } from 'jotai'
import { ChangeEvent } from 'react'
import { RequestQueue } from '../utils/requestQueue'

export const requestQueue = new RequestQueue()

export const textAtom = atom('')

export const recordListAtom = atom<MyLib.RecordItem[]>([])

export const handleChangeAtom = atom(
    null,
    (get, set, update: ChangeEvent<HTMLInputElement>) => {
        if (get(textAtom) !== update.target.value) {
            set(textAtom, (prev) => {
                return update.target.value
            })
        }
    }
)
export const infoListAtom = atom<Array<string>>([])
export const addInfoAtom = atom(
    null,
    (get, set, update: string) => {
        set(infoListAtom, (prev) => {
            return [...prev, update]
        })
    }
)
export const addRecordAtom = atom(
    null,
    (get, set, update: {
        title: string,
        request: MyLib.Request
    }) => {
        const id = requestQueue.enqueue(update.request, (result: any) => {
            console.log(result)
            set(infoListAtom, (prev) => [...prev, result?.hitokoto])

        })
        set(recordListAtom, (prev) => {
            return [...prev, {
                id, title: update.title
            }]
        })
    }
)

export const removeRecordAtom = atom(
    null,
    (get, set, update: number | 'next') => {
        if (update === 'next') {
            set(recordListAtom, () => get(recordListAtom).splice(1))
        }
        set(recordListAtom, () => {
            return get(recordListAtom).filter(i => i.id !== update)
        })
    }
)

export const filteredRecordListAtom = atom<MyLib.RecordItem[]>((get) => {
    const theList = get(recordListAtom)
    if (get(textAtom)) {
        return theList.filter((i) => i.title?.includes(get(textAtom)))
    } else {
        return theList
    }
})