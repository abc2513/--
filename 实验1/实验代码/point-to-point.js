//点对点模式

//消息队列
class MessageQueue {
    constructor() {
        this.queue = [];
        //以下为数据可视化部分
        this.div = document.createElement("div");
        this.title = document.createElement("div");
        this.message = document.createElement("div");
        this.title.innerText = "消息队列：";
        this.div.appendChild(this.title);
        this.div.appendChild(this.message);
        this.div.style.display = "flex";
        this.render();
        document.body.appendChild(this.div);
    }
    render() {//可视化渲染函数
        this.message.innerText = this.queue.join(" ; ");
    }
    send(message) {
        this.queue.push(message);
        this.render();//渲染
    }
    receive() {
        const result = this.queue.shift();
        this.render();//渲染
        return result;
    }
}

//生产者
class Producer {
    constructor(messageQueue) {
        this.messageQueue = messageQueue;

        //以下为数据可视化部分
        this.div = document.createElement("div");
        this.title = document.createElement("div");
        this.input = document.createElement("input");
        this.title.innerText = "生产者：";
        this.div.appendChild(this.title);
        this.div.appendChild(this.input);
        this.div.style.display = "flex";
        document.body.appendChild(this.div);
        this.input.addEventListener("blur", () => {
            this.produce();
        });
    }
    produce() {
        this.messageQueue.send(this.input.value);
    }
}
//消费者
class Consumer {
    constructor(messageQueue) {
        this.messageQueue = messageQueue;

        //以下为数据可视化部分
        this.div = document.createElement("div");
        this.title = document.createElement("div");
        this.button = document.createElement("button");
        this.message = document.createElement("div");
        this.div.style.display = "flex";
        this.title.innerText = "消费者：";
        this.button.innerText = "消费";
        this.div.appendChild(this.title);
        this.div.appendChild(this.button);
        this.div.appendChild(this.message);
        document.body.appendChild(this.div);
        this.button.addEventListener("click", () => {
            this.consume();
        });
    }
    consume() {
        const message = this.messageQueue.receive();
        this.message.innerText += message+';';
    }
}


(()=>{const title = document.createElement("h3");
title.innerText = "点对点";
document.body.appendChild(title);

const messageQueue = new MessageQueue();
const producer1 = new Producer(messageQueue);
const producer2 = new Producer(messageQueue);
const consumer1 = new Consumer(messageQueue);
const consumer2 = new Consumer(messageQueue);
const consumer3 = new Consumer(messageQueue);})()