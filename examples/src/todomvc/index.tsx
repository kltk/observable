import 'todomvc-app-css/index.css';
import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Info from './components/Info';
import useTodomvc from './store/useTodomvc';
import './index.css';

function TodoMVC() {
  const todos = useTodomvc();
  const haveTodos = !!todos.state.length;
  return (
    <div>
      <section className="todoapp fixed">
        <Header />
        {haveTodos && <Main />}
        {haveTodos && <Footer />}
      </section>
      <Info />
    </div>
  );
}

export default TodoMVC;
