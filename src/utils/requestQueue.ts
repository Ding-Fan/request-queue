import { RequestQueueBase } from "./requestQueueBase"

export class RequestQueue extends RequestQueueBase {
  enqueue(
    request: () => Promise<any>,
    onExecuted?: Function
  ): number {

    // https://developer.mozilla.org/en-US/docs/Web/API/AbortController
    // https://dom.spec.whatwg.org/#interface-AbortSignal
    let theController = new AbortController()
    let signal = theController.signal
    const processRequest = async () => {
      return new Promise(async (resolve, reject) => {

        // https://dom.spec.whatwg.org/#abortcontroller-api-integration
        // rejecting the promise with an "AbortError" DOMException
        const error = new DOMException('abort request', 'AbortError')

        if (signal.aborted) {
          return reject(error)
        }

        signal.addEventListener('abort', () => {
          reject(error)
        })

        try {
          const result = await request()

          if (onExecuted) {
            onExecuted(result)
          }

          resolve(result)
        } catch (requestError) {
          console.error(requestError)
        }
      })
    }

    this.increaseId()
    this.theQueue.push({
      request: processRequest,
      controller: theController,
      id: this.id
    })
    this.increaseCounter()

    return this.id
  }
  cancel(id: number): void {
    const theRequestId = this.theQueue.findIndex(i => i.id === id)
    console.log('theQueue', this.theQueue)
    console.log('theRequestId', theRequestId)
    console.log('id', id)


    this.theQueue[theRequestId].controller.abort()
  }
  async processNext(): Promise<void> {

    // Does nothing if no requests left in the queue.
    if (this.counter < 1) {
      return
    }

    const theRequest = this.theQueue.shift()?.request

    try {
      if (theRequest) {
        await theRequest()
      }
      // or await theRequest!()
    } catch (error) {
      console.error(error)
    }
  }
}
