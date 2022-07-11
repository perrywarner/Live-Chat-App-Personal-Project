// Source: ripped off from https://github.com/ThePrimeagen/BunSpreader/blob/master/src/html.ts

type Message = {
    message: any,
    time: number,
}

type QueueNode = {
    time: Message;
    next?: QueueNode;
}

class Queue {
    private head?: QueueNode;
    private tail?: QueueNode;
    public length: number;
    constructor() {
        this.length = 0;
    }

    enqueue(time: Message) {
        this.length++;
        const node = {time, next: undefined};
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.tail!.next = node;
        this.tail = node;
    }
    peek(): number | undefined {
        if (!this.head) {
            return undefined;
        }

        return this.head.time.time;
    }

    deque() {
        this.length--;
        if (!this.head) {
            return;
        }

        const node = this.head;
        this.head = this.head.next;
        node.next = undefined;
    }
}

const queue = new Queue();


function empty_queue() {
    const now = Date.now();
    while (queue.peek() !== undefined && queue.peek() as number < now) {
        queue.deque();
    }
}