/**
 * Your mission:
 * Create and return a request queue with the following methods.
 * Carefully read the description of each method.
 */


export abstract class RequestQueueBase {
  constructor(
    protected theQueue: Array<MyLib.RequestWithId> = [],
    protected counter: number = 0,
    protected id: number = 0
  ) {
  }
  /**
   * Adds an asynchronous request to the end of the queue.
   * @param {() => Promise<any>} request - The asynchronous request.
   * @param {?Function} onExecuted - An optional callback that should be executed with the resolved
   * result of the request.
   * @returns {number} - An ID for the enqueued request.
   */
  abstract enqueue(
    request: MyLib.Request,
    onExecuted?: Function
  ): number

  /**
   * Cancels the request with the given ID.
   * @param {number} id - The ID of the request.
   */
  abstract cancel(id: number): void

  /**
   * Executes the next asynchronous request in the queue, resolving when the request is complete.
   * Does nothing if there are no requests left in the queue.
   * @returns {Promise<void>}
   */
  // "You shouldn't use async unless you are awaiting something in the implementation."
  // https://github.com/Microsoft/vscode/issues/51991#issuecomment-397678745
  abstract processNext(): Promise<void>

  /**
   * Returns the current size of the queue.
   */
  getSize(): number {
    return this.counter
    // or return this.theQueue.length
  }

  /**
   * Add 1 to the counter
   */
  protected increaseCounter() {
    this.counter = this.counter + 1
  }

  /**
   * Subtract 1 from the counter
   */
  protected decreaseCounter() {
    this.counter = this.counter - 1
  }


  /**
   * Add 1 to the id  
   */
  protected increaseId() {
    this.id = this.id + 1
  }

  get getQueue() {
    return this.theQueue
  }
}
