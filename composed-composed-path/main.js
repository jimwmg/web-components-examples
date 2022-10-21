customElements.define('event-message',
  class extends HTMLElement {
    constructor() {
      super();
      const pElem = document.createElement('p');
      pElem.textContent = this.getAttribute('text');
      this.addEventListener('click',function(){
        console.log('dispatchEvent',this.dispatchEvent)
        // showDom 触发事件 //如果自定义事件添加了  bubbles 那么会冒泡，否则没有
        this.dispatchEvent(new CustomEvent('myEvent2',{
          detail:'jim',
          bubbles: true,
        }));
        // window.dispatchEvent(new CustomEvent('myEvent2',{
        //   detail:'jim2',
        //   bubbles: true
        // }));
      })
      //如果没有通过 shadow dom 节点追加到 dom 树中，那么自定义组件的样式会影响外部,同样，外部的样式也会影响内部
      // const shadowRoot = this.attachShadow({mode: 'open'});
      // shadowRoot.appendChild(pElem);
      // console.log('shadowroot',shadowRoot)
      this.append(pElem)
    }
  }
);
customElements.define('no-shadow',
  class extends HTMLElement {
    constructor() {
      super();
      console.log('this',this);//表示 自定义元素 open-shadow
      const pElem = document.createElement('p');
      pElem.textContent = this.getAttribute('text');
      pElem.classList.add('inner-no-show')
      const style = document.createElement('style');
      style.textContent = `
        .outer{
          color:red
        }
      `
      //如果没有通过 shadow dom 节点追加到 dom 树中，那么自定义组件的样式会影响外部,同样，外部的样式也会影响内部
      // const shadowRoot = this.attachShadow({mode: 'open'});
      // shadowRoot.appendChild(pElem);
      // console.log('shadowroot',shadowRoot)
      this.append(style,pElem)
      console.log('no-shadow-data',window.data)
    }
  }
);
customElements.define('open-shadow',
  class extends HTMLElement {
    constructor() {
      super();
      console.log('this',this);//表示 自定义元素 open-shadow
      const pElem = document.createElement('p');
      pElem.textContent = this.getAttribute('text');
      pElem.addEventListener('click',function(){
        console.log('open-shadow-click')
      },true)

      pElem.classList.add('inner2')
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(pElem);
      console.log('shadowroot',shadowRoot)
      console.log('open-shadow-data',window.data)
    }
  }
);

customElements.define('closed-shadow',
  class extends HTMLElement {
    constructor() {
      super();

      const pElem = document.createElement('p');
      pElem.textContent = this.getAttribute('text');
      pElem.addEventListener('click',function(){
        console.log('closed-shadow-click')
      },true)
      pElem.id = 'closeShadow'
      pElem.classList.add('close-shadow')
      const shadowRoot = this.attachShadow({mode: 'closed'});
      shadowRoot.appendChild(pElem);
      console.log('shadowroot',shadowRoot)
      console.log('close-shadow-data',window.data)
      console.log('p-close-show',document.getElementsByTagName('p'));
      //同样获取不到
      console.log('closeShadow',document.getElementById('closeShadow'));//null
      //可以通过  shadowRoot 上的方法获取到
      console.log('shadowRoot-closeShadow',shadowRoot.getElementById('closeShadow'))
    }
  }
);

document.querySelector('html').addEventListener('click', e => {
  //Event 接口的只读属性 composed 返回一个 Boolean 值，用来指示该事件是否可以从 Shadow DOM 传递到一般的 DOM。
  console.log(e.composed);
  //composedPath() 是 Event 接口的一个方法，当对象数组调用该侦听器时返回事件路径。如果影子根节点被创建并且ShadowRoot.mode是关闭的，那么该路径不包括影子树中的节点。
  console.log(e.composedPath());
},true);

//当第三个参数设置为true就在捕获过程中执行，反之就在冒泡过程中执行处理函数。默认为false 表示

/*

webcomponents
声明的自定义组件依然可以访问 window 等基础全局变量

外部 documnet.getElement 等方法不会获取 shadow dom 内部的元素 但是可以获取外部的元素

自定义组件内部 通过  document.getElement 等方法获取 shadow dom 内部的元素同样获取不到

基于 Shadow DOM， 可以实现基于组件的应用。它可以为网络开发中的常见问题提供解决方案：

DOM 隔离：组件的 DOM 是独立的（例如，document.querySelector() 不会返回组件 shadow DOM 中的节点）。这意味着在主文档里，通过 querySelectorAll、getElementsByTagName 等方法，无法获取到 shadow DOM 内的任何元素。
样式隔离：shadow DOM 内部定义的 CSS 在其作用域内。样式规则不会泄漏至组件外，页面样式也不会渗入。
组合：为组件设计一个声明性、基于标记的 API。
简化 CSS： 作用域 DOM 意味着您可以使用简单的 CSS 选择器，更通用的 id/类名称，而无需担心命名冲突。
效率： 将应用看成是多个 DOM 块，而不是一个大的（全局性）页面。

 


一个布尔值，表示在 DOM 树中注册了 listener 的元素，是否要先于它下面的 EventTarget 调用该 listener。
当 useCapture（设为 true）时，沿着 DOM 树向上冒泡的事件不会触发 listener。
当一个元素嵌套了另一个元素，并且两个元素都对同一事件注册了一个处理函数时，
所发生的事件冒泡和事件捕获是两种不同的事件传播方式。事件传播模式决定了元素以哪个顺序接收事件。
进一步的解释可以查看 DOM Level 3 事件及 JavaScript 事件顺序文档。如果没有指定，useCapture 默认为 false。

false 元素绑定的事件在 冒泡阶段触发 捕获阶段不会触发

true 元素绑定的事件在 捕获阶段触发  冒泡阶段不会触发

默认是在 冒泡阶段触发事件

事件流模型为 先 捕获（capture） 后 冒泡 (bubble)

如果 内部元素事件 设置了  e.stopPropagation() 那么冒泡将会停止，事件不会在继续往上
*/