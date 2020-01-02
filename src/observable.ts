import produce from 'immer';
import get from 'lodash.get';
import set from 'lodash.set';
import toPath from 'lodash.topath';

type Part<T> = Partial<T> | T | null;
type Path = string | number | (string | number)[];

/**
 * 可观察数据，数据变化时调用订阅的函数
 */
class Observable<State extends {}> {
  private state: Part<State> = null;
  private shadow: Part<State> = null;
  private listeners: Set<Function> = new Set();
  private timer: number = 0;

  /**
   * @param initialState
   */
  constructor(initialState?: Part<State>) {
    this.state = initialState;
    this.shadow = initialState;
  }

  /**
   * 发布数据变化，多次调用只执行一次
   */
  private publish() {
    this.timer = (this.timer + 1) & 0xffffffff;
    Promise.resolve(this.timer).then(timer => {
      if (timer !== this.timer) return;
      if (!Object.is(this.shadow, this.state)) {
        this.shadow = this.state;
        this.listeners.forEach(listener => listener.call(this, this.state));
      }
    });
  }

  /**
   * 订阅数据变化，数据变化时会调用这个函数
   * @param listener 每次数据变化时回调的函数
   * @returns 取消这个订阅的函数
   */
  subscribe(listener: Function) {
    this.listeners.add(listener);
    return this.unsubscribe.bind(this, listener);
  }

  /**
   * 取消订阅，数据变化时将不再调用这个函数
   * @param listener 取消订阅的函数
   */
  unsubscribe(listener: Function) {
    this.listeners.delete(listener);
  }

  /**
   * 获取 path 对应路径上的值
   * @param path 用于获取属性的路径，不传表示根路径
   */
  get(path?: Path) {
    /**
     * lodash.get 不支持根路径，添加 state 构造成非空路径
     */
    return get(this, ['state', ...toPath(path)]);
  }

  /**
   * 设置 path 对应路径上的值
   * @param path 要设置的属性路径，用空字符串或空数组表示根路径
   * @param data 要设置的值
   */
  set(path: Path, data: any) {
    const p = toPath(path);
    /**
     * 1. lodash.set 不支持根路径
     * 2. lodash.set 不支持给非对象数据设置属性（转换为对象/数组）
     * 增加一层，避免根不是对象的情况
     */
    const fn = produce(draft => set(draft, ['state', ...p], data));
    this.state = fn({ state: this.state }).state;
    this.publish();
  }
}

export default Observable;
