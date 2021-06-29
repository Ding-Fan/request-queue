import { RequestQueueBase } from "./requestQueueBase"

export class RequestQueue extends RequestQueueBase {
  enqueue(
    request: () => Promise<any>,
    onExecuted?: Function
  ): number {
    const processRequest = async () => {
      try {
        const result = await request()
        if (onExecuted) {
          onExecuted(result)
        }
      } catch (error) {
        console.error(error)
      }
    }

    this.theQueue.push({
      request: processRequest,
      id: this.id
    })
    this.increaseCounter()
    this.increaseId()

    return this.id
  }
  cancel(id: number): void {
    this.theQueue = this.theQueue.filter(i => i.id === id)
    this.decreaseCounter()
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
