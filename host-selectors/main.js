class ContextSpan extends HTMLElement {
    constructor() {
      super();

      const style = document.createElement('style');
      const span = document.createElement('span');
      span.textContent = this.textContent;

      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(span);

      style.textContent = `
        span:hover { text-decoration: underline; }
        :host-context(h1) { font-style: italic; }
        :host-context(h1):after { content: " - no links in headers!" }
        :host-context(article, aside) { color: gray; }
        :host(.footer) { color : red; }
        :host { background: rgba(0,0,0,0.1); padding: 2px 5px; }
      `;
    }
}

// Define the new element
customElements.define('context-span', ContextSpan);

/**
 * https://developer.mozilla.org/zh-CN/docs/Web/CSS/:host
 * :host CSS 伪类选择包含其内部使用的 CSS 的 shadow DOM 的根元素 -
 *  换句话说，这允许你从其 shadow DOM 中选择一个自定义元素。
 * 备注： 在 shadow DOM 之外使用时，这没有任何效果。
 * 
*/