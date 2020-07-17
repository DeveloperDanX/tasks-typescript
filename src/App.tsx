import React, { useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSumbit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toogleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <div className='container p-4'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={handleSumbit}>
                <input
                  autoFocus
                  className='form-control'
                  type='text'
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  ref={taskInput}
                />
                <button className='btn btn-success btn-block mt-2'>Save</button>
              </form>
            </div>
          </div>
          {tasks.map((t: ITask, i: number) => (
            <div key={i} className='card card-body mt-2'>
              <h2 style={{ textDecoration: t.done ? 'line-through' : '' }}>
                {t.name}
              </h2>
              <div>
                <button
                  className='btn btn-secondary'
                  onClick={() => toogleDoneTask(i)}
                >
                  {t.done ? '✘' : '✓'}
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => removeTask(i)}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
