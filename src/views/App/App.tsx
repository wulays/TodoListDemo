import React, {useState} from 'react';
import './App.scss'
import {nanoid} from 'nanoid'
import styless from './App.module.scss'
import {DeleteThemes, CheckOne, Round} from '@icon-park/react'

interface todoItem {
    id: string,
    name: string,
    done: boolean
}

function App() {

    const [value, setValue] = useState('')

    const [todoList, setTodoList] = useState<todoItem[]>([])

    function handleChangeValue(ev: React.ChangeEvent<HTMLInputElement>) {
        setValue(() => ev.target.value)
    }

    function handleAddItem(ev: React.KeyboardEvent<HTMLInputElement>) {
        const keyList = ['Enter', 'NumpadEnter']
        if (keyList.includes((ev.code))) {
            if (value.trim() === '') return
            else if(todoList.some(item => item.name === value.trim())) return alert('已经有相同的咯~！')
            setTodoList(list => [{id: nanoid(4), name: value, done: false}].concat(list))
            setValue('')
        }
    }

    function handleDelItem(id: string) {
        setTodoList(list => list.filter(item => item.id !== id))
    }

    function handleDoneItem(id: string) {
        setTodoList(list => list.map(item => {
            if (item.id === id) return {...item, done: !item.done}
            else return item
        }).sort((a, b) => {
            if (!a.done && b.done) return -1
            else return 0
        }))
    }

    return (
        <div className={styless.app}>
            <div className={styless.title}>Todo List</div>
            <div className={styless.input}>
                <input type="text" placeholder="今天该干点什么呢~" value={value} onChange={handleChangeValue}
                       onKeyDown={handleAddItem}/>
            </div>
            <ul className={styless.list}>
                {todoList.map(todo => <li className={todo.done ? styless.doneItem : ''}
                                          key={todo.id}>
                    {todo.done ?
                        <CheckOne className={styless.done} onClick={() => handleDoneItem(todo.id)} theme="outline"
                                  size="24"/> :
                        <Round className={styless.done} onClick={() => handleDoneItem(todo.id)} theme="outline"
                               size="24"/>}
                    {todo.name}
                    <DeleteThemes className={styless.del} theme="outline" size="24"
                                  onClick={() => handleDelItem(todo.id)}/>
                </li>)}
                {todoList.length === 0 && <li className={styless.empty}>这里空空如也~</li>}
            </ul>
            <div className={styless.footer}>
                {todoList.reduce((total, item) => {
                    return total + (item.done ? 1 : 0)
                }, 0)} / {todoList.length}
            </div>
        </div>
    );
}

export default App;
