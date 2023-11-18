// let data = [
//     {
//         task: 'chạy 2 km',
//         is_complete: 'flase'
//     },
//     {
//         task: 'reading book',
//         is_complete: 'true'
//     }  
// ]
// Tạo hàm save data
const TODO_LIST_APP = "TODO_LIST_APP";
const saveData = (data) =>{
    localStorage.setItem(TODO_LIST_APP,JSON.stringify(data));
}

// saveData(data);

// Tạo hàm load data
const loadData =()=>{
    let data = JSON.parse(localStorage.getItem(TODO_LIST_APP));
    data=data?data:[];// nếu dât có dữ liệu thì dât bằng chính nó nếu không trả về mảng rỗng
    return data;
}

// data = loadData();


// them du lieu tu form
const addTask =(new_task)=>{
    let data;
    data = loadData();
    data = [...data,new_task];
    saveData(data);
}


    // localStorage.clear();
    // ==========================xuat du lieu ra mang hinh============================
const renderTask = ()=>{
    let data, ulTaskHtml, ulTasks, count_complete =0;
    data = loadData();
     const task_result = document.querySelector('.task-result');
    ulTaskHtml= data.map((Element,index)=>{
        if(Element.is_complete == true) count_complete++;
        return `
        <li class="task-item" index = "${index}" is_complete = "${Element.is_complete}">
                    <span onclick="markTaskComplete(${index})">${Element.task}</span>
                    <div class="task-action">
                        <button onclick="pushEditTask(${index})">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>

                        </button>
                        <button onclick="deleteTasks(this,${index})">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </button>
                    </div>
                </li>
        `;
        
    });
    ulTasks = document.querySelector('ul.tasks');
    ulTasks.innerHTML = ulTaskHtml.join('');
    task_result.textContent = `Số công việc đã hoàn thành : ${count_complete}`;
}

// =========================danh dau cong viec hoan thanh========================
const markTaskComplete =(index)=>{
    let data = loadData();
    data[index].is_complete = data[index].is_complete == true?false:true;
    saveData(data);
    renderTask();
    // console.log(data[index]);
}
// ==============================xoa task==============================
const deleteTasks = (Element, index)=>{
    let data = loadData();
    let delete_confirm = confirm('Bạn có muốn xóa không ?');
    if(delete_confirm == false) {return false};
    // console.log(delete_confirm);
    data.splice(index,1);
    saveData(data);
    renderTask();
}
renderTask();
// =========================editTask================================
const pushEditTask = (index)=>{
    let data = loadData();
    const task = document.querySelector('#task');
    const btn = document.querySelector('#add_task button');
    task.value = data[index].task;
    task.setAttribute('index',index);
    btn.innerText = 'EDIT TASK';
    // console.log(btn);
};
const editTask = (task, index)=>{
    const btn = document.querySelector('#add_task button');
    let data = loadData();
    data[index].task=task;
    btn.innerText='ADD TEXT';
    saveData(data);
};

const formAddTask = document.forms.add_task;
// console.log(formAddTask);
formAddTask.addEventListener('submit',(e)=>{
    
    let new_task;
    const task = document.querySelector('#task');
    const index = task.getAttribute('index');
    if(index){
        editTask(task.value,index);
        task.removeAttribute('index')
    }else{
        new_task ={
        task: `${task.value}`,
        is_complete: 'flase'
    };
    // console.log(new_task);
    addTask(new_task);
    }
    // console.log(loadData());
    renderTask();
    task.value='';
    e.preventDefault();
});