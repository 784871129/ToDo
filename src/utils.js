export function getChineseMonth(string){
    const map=new Map([
        ['Jan','一'],
        ['Feb','二'],
        ['Mar','三'],
        ['Apr','四'],
        ['May','五'],
        ['Jun','六'],
        ['Jul','七'],
        ['Aug','八'],
        ['Sept','九'],
        ['Oct','十'],
        ['Nov','十一'],
        ['Dec','十二']
    ])
    return map.get(string);
}
export function getChineseDay(string) {
    const map=new Map([
        ['Mon','星期一'],
        ['Tue','星期二'],
        ['Wed','星期三'],
        ['Thu','星期四'],
        ['Fri','星期五'],
        ['Sat','星期六'],
        ['Sun','星期天']
    ])
    return map.get(string)
}

export function getChineseDate(string){
    const arr=[
        '一','二','三','四','五','六','七','八','九','十',
        '十一','十二','十三','十四','十五','十六','十七','十八','十九','二十',
        '二十一','二十二','二十三','二十四','二十五','二十六','二十七','二十八','二十九','三十',
        '三十一',
    ]
    return arr[parseInt(string-1)];
}

export function createDescription(item,listName='我的一天'){   
    const {finished,duedate,circular,additionInfo,appendix,isInTodayList,list,tags,subtasks,subtasksfinished}=item;
        const des=[];//create description to show brief infos of ONE task
        if(finished){
            des.push('已完成')
        }
        if(isInTodayList){
            des.push(listName==='我的一天'?list||'任务':'我的一天');
        }
        if(subtasks.length!==0){
            let count=0;
            subtasksfinished.forEach(item => {
                if(item){
                    count++;
                }
            })
            des.push(`第${count}步，共${subtasks.length}步`)
        }//Tue Oct 05 2021
        if(duedate){
            let _duedate=new Date(duedate);
            const _duedateString=_duedate.toDateString().split(' ');
            let current=new Date();
            const durings=_duedate.getDate()-current.getDate()
            const month_date=`${getChineseMonth(_duedateString[1])}月${getChineseDate(_duedateString[2])}日 ${getChineseDay(_duedateString[0])}`
            if(_duedate<current){    
                if(current.getFullYear()-_duedate.getFullYear()>=1){
                    des.push(`已到期 到期时间：${_duedateString[3]}年 ${month_date}`)
                }else {
                    des.push(`已到期 到期时间：${month_date}`) 
                }
            }else if(durings===1){
                des.push(`明天 ${month_date} 到期`)
            }else if(durings===2){
                des.push(`后天 ${month_date} 到期`)
            }else if(durings===0){
                des.push(`今天 ${month_date} 到期`)
            }else {
                des.push(`${month_date} 到期`)
            }
        }    
        if(circular)des.push('\u21BA')
        return des.join(' · ')
}

export function createSubtasksArray(subtasks,subtasksFinished) {
    if(!subtasks.length)return [];
    let arr=[];
    for(let i=0;i<subtasks.length;i++){
        arr.push({name:subtasks[i],finished:subtasksFinished[i],id:i})
    }
    return arr;
}
