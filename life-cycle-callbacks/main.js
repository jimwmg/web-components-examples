// Create a class for the element
class Square extends HTMLElement {
  // Specify observed attributes so that
  // attributeChangedCallback will work
  /*
  需要注意的是，如果需要在元素属性变化后，
  触发 attributeChangedCallback()回调函数，你必须监听这个属性。
  这可以通过定义observedAttributes() get 函数来实现，
  observedAttributes()函数体内包含一个 return 语句，返回一个数组，包含了需要监听的属性名称：
  */
  static get observedAttributes() {
    return ['c', 'l'];
  }

  constructor() {
    // Always call super first in constructor
    super();

    const shadow = this.attachShadow({mode: 'open'});

    const div = document.createElement('div');
    const style = document.createElement('style');
    shadow.appendChild(style);
    shadow.appendChild(div);
  }
  /*
  当元素插入到 DOM 中时，connectedCallback()函数将会执行 — 在该函数中，
  */
  connectedCallback() {
    console.log('Custom square element added to page.');
    // updateStyle(this);
  }
  /*
  disconnectedCallback()和adoptedCallback()回调函数只是简单地将消息发送到控制台，提示我们元素什么时候从 DOM 中移除、或者什么时候移动到不同的页面：
  */
  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }
/*
custom-square 上的属性
每当元素的属性变化时，attributeChangedCallback()回调函数会执行。
正如它的属性所示，我们可以查看属性的名称、旧值与新值，以此来对元素属性做单独的操作。
在当前的示例中，我们只是再次执行了updateStyle()函数，以确保方块的样式在元素属性值变化后得以更新：
*/
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
    updateStyle(this);
  }
}

customElements.define('custom-square', Square);

function updateStyle(elem) {
  const shadow = elem.shadowRoot;
  shadow.querySelector('style').textContent = `
    div {
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
      background-color: ${elem.getAttribute('c')};
    }
  `;
}

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');
let square;

update.disabled = true;
remove.disabled = true;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

add.onclick = function() {
  // Create a custom square element
  square = document.createElement('custom-square');
  square.setAttribute('l', '100');
  square.setAttribute('c', 'red');
  document.body.appendChild(square);

  update.disabled = false;
  remove.disabled = false;
  add.disabled = true;
};

update.onclick = function() {
  // Randomly update square's attributes
  square.setAttribute('l', random(50, 200));
  square.setAttribute('c', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
};

remove.onclick = function() {
  // Remove the square
  document.body.removeChild(square);

  update.disabled = true;
  remove.disabled = true;
  add.disabled = false;
};
/*
webcomponent 生命周期
https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements#%E4%BD%BF%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0
*/
