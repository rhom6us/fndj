export default PriorityQueue;
/**
 * @private
 *
 * Priority queue implementing a binary heap.
 * Acts as a min heap by default, can be dynamically changed to a max heap
 * by setting `reverse` to true.
 *
 * _note_: the queue creates and maintains a new property (i.e. `queueTime`)
 * to each object added.
 *
 * @param {Number} [heapLength=100] - Default size of the array used to create the heap.
 */
declare class PriorityQueue {
    constructor(heapLength?: number);
    /**
     * Pointer to the first empty index of the heap.
     * @type {Number}
     * @memberof PriorityQueue
     * @name _currentLength
     * @private
     */
    private _currentLength;
    /**
     * Array of the sorted indexes of the entries, the actual heap. Ignore the index 0.
     * @type {Array}
     * @memberof PriorityQueue
     * @name _heap
     * @private
     */
    private _heap;
    /**
     * Type of the queue: `min` heap if `false`, `max` heap if `true`
     * @type {Boolean}
     * @memberof PriorityQueue
     * @name _reverse
     * @private
     */
    private _reverse;
    /**
     * Change the order of the queue (max heap if true, min heap if false),
     * rebuild the heap with the existing entries.
     *
     * @type {Boolean}
     */
    set reverse(arg: boolean);
    get reverse(): boolean;
    /**
     * Time of the first element in the binary heap.
     * @returns {Number}
     */
    get time(): number;
    /**
     * First element in the binary heap.
     * @returns {Number}
     * @readonly
     */
    get head(): number;
    _isLower: (time1: number, time2: number) => boolean;
    _isHigher: (time1: number, time2: number) => boolean;
    /**
     * Fix the heap by moving an entry to a new upper position.
     *
     * @private
     * @param {Number} startIndex - The index of the entry to move.
     */
    private _bubbleUp;
    /**
     * Fix the heap by moving an entry to a new lower position.
     *
     * @private
     * @param {Number} startIndex - The index of the entry to move.
     */
    private _bubbleDown;
    /**
     * Build the heap (from bottom up).
     */
    buildHeap(): void;
    /**
     * Insert a new object in the binary heap and sort it.
     *
     * @param {Object} entry - Entry to insert.
     * @param {Number} time - Time at which the entry should be orderer.
     * @returns {Number} - Time of the first entry in the heap.
     */
    insert(entry: any, time: number): number;
    /**
     * Move a given entry to a new position.
     *
     * @param {Object} entry - Entry to move.
     * @param {Number} time - Time at which the entry should be orderer.
     * @return {Number} - Time of first entry in the heap.
     */
    move(entry: any, time: number): number;
    /**
     * Remove an entry from the heap and fix the heap.
     *
     * @param {Object} entry - Entry to remove.
     * @return {Number} - Time of first entry in the heap.
     */
    remove(entry: any): number;
    /**
     * Clear the queue.
     */
    clear(): void;
    /**
     * Defines if the queue contains the given `entry`.
     *
     * @param {Object} entry - Entry to be checked
     * @return {Boolean}
     */
    has(entry: any): boolean;
}
//# sourceMappingURL=PriorityQueue.d.ts.map
