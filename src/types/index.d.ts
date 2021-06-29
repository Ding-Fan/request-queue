declare namespace myLib {
    type Request = () => Promise<any>

    interface RequestWithId {
        request: Request
        id: number
    }
}