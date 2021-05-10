export type Assign<Target, Source> = Omit<Target, keyof Source> & Source;

export type Listener<State> = (state: State) => void;

export type Observable<State> = {
  id: number;
  state: State;
  getState: <Return>(getter: (state: State) => Return) => Return;
  setState: (recipe: State | ((draft: State) => State | void)) => void;
  subscribe: (listener: Listener<State>) => () => void;
  unsubscribe: (listener: Listener<State>) => void;
};

export type Minimal<State> = Assign<
  Observable<State>,
  {
    getState: () => State;
    setState: (newState: State) => void;
  }
>;
