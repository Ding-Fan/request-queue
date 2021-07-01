declare namespace MyLib {
    type Request = () => Promise<any>

    interface RequestWithId {
        request: Request
        controller: AbortController
        title?: string
        id: number
    }

    interface RecordItem {
        title: string
        id: number
    }
}