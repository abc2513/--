class PubSub {//发布订阅模式，事件的调度中心
    constructor() { 
        this.message = {
            //"频道key":[订阅的模块处理函数， ...]
        };
    };
    
    publish(type, data) {
        console.log('调度中心发布事件',type,data);
        if(type===null){
            //广播模式
            for (const key in this.message) {
                this.message[key].forEach(item => item(data))
            }
            return;
        }
        if (this.message[type]) {
            this.message[type].forEach(item => item(data))
            return
        }
    };
    subscribe(type, cb) {//订阅
        if (this.message[type]) {
            this.message[type].push(cb);
        }
        else {
            this.message[type]=[cb];
        }
    }
    unSubscribe(type, cb) {//取消订阅
        if (message[type]) {
            message[type] = message[type].filter(item => item !== cb);
        }
    }
}
class publisher {//发布者
    constructor(pubSub, types ) { //传入调度中心和实例
        this.pubSub = pubSub;
        this.types = types;

        //以下为数据可视化部分
        //创建内嵌标题和input的div
        this.div = document.createElement("div");
        this.h3 = document.createElement("div");
        this.h3.innerText=`发布者（频道${this.types.map(item=>item+'；')}）：`;
        this.input = document.createElement("input");
        this.div.appendChild(this.h3);
        this.div.appendChild(this.input);
        this.div.style.display="flex";
        document.body.appendChild(this.div);
        //绑定失焦事件
        this.input.addEventListener("blur",()=>{
            console.log('输入框失焦');
            this.publish(this.input.value);
        })
    };
    publish(data) {
        console.log('发布者发布事件',this.types,data);
        this.types.forEach(type => {
            this.pubSub.publish(type, data);
        });
    }
}
class subscriber {//订阅者
    constructor(pubSub,types) {
        this.pubSub = pubSub;
        this.types = types;
        this.types.forEach(type => {
            this.pubSub.subscribe(type, this.cb);//订阅
        });

        //以下为数据可视化部分
        //新建一个div
        this.div = document.createElement("div");
        this.div.innerText = `订阅者（频道${this.types.map(item=>item+'；')}）：`;
        document.body.appendChild(this.div);
    }
    cb=(data)=>{//接受到消息的处理函数
        console.log('订阅者接受到事件',data);
        this.div.innerText+=data+' ；';
    }
}
const pubSub = new PubSub();
const publisher_a = new publisher(pubSub, ['a']);//创建一个发布者，发布频道为a
const publisher_b = new publisher(pubSub, ['b']);//创建一个发布者，发布频道为b
const publisher_ab = new publisher(pubSub, ['a','b']);//创建一个发布者，发布频道为a和b
const publisher_all= new publisher(pubSub, [null]);//创建一个发布者，为广播模式
const subscriber_a = new subscriber(pubSub,['a']);//创建一个订阅者，订阅频道为a
const subscriber_b = new subscriber(pubSub,['b']);//创建一个订阅者，订阅频道为b
const subscriber_ab = new subscriber(pubSub,['a','b']);//创建一个订阅者，订阅频道为a和b
const subscribe_c= new subscriber(pubSub,['c']);//创建一个订阅者，订阅频道为c