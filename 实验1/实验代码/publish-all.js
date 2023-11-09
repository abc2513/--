//不分频道的发布订阅模式
class PubSub{
    constructor(){
        this.message = [];//已经注册的组件
    }
    publish(data){
        this.message.forEach(item => item(data));
    }
    subscribe(cb){
        this.message.push(cb);
    }
    unSubscribe(cb){
        this.message = this.message.filter(item => item !== cb);
    }
}
class Publisher{
    constructor(pubSub){
        this.pubSub = pubSub;

        //以下为数据可视化部分
        this.div = document.createElement("div");
        this.title= document.createElement("div");
        this.title.innerText = "发布者：";
        this.input = document.createElement("input");
        this.div.appendChild(this.title);
        this.div.appendChild(this.input);
        this.div.style.display = "flex";
        document.body.appendChild(this.div);
        this.input.addEventListener("blur", () => {
            this.publish(this.input.value);
        })
    }
    publish(data){
        this.pubSub.publish(data);
    }
}
class Subscriber{
    constructor(pubSub){
        this.pubSub = pubSub;
        this.pubSub.subscribe(this.cb);//注册

        //以下为数据可视化部分
        this.div = document.createElement("div");
        this.div.innerText = "订阅者：";
        document.body.appendChild(this.div);
    }
    cb = (data) => {
        this.div.innerText += data + ' ；';
    }
}
const title= document.createElement("h3");
title.innerText = "全广播";
document.body.appendChild(title);
const pubSub = new PubSub();
const publisher = new Publisher(pubSub);
const publisher2 = new Publisher(pubSub);
const subscriber = new Subscriber(pubSub);
const subscriber2 = new Subscriber(pubSub);
