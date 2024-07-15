
export function formatDate(date:Date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    const seconds = ('0' + d.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

export function findStatusType(status:number|undefined) {
  switch(status){
    case 1 :
      return "finish"
    case 2:
      return "process"
    case -1:
      return "wait"
  }
}

export function findStatus(chapter_id: string | undefined, statusArray: chapter_status[]): number | undefined {
  console.log(chapter_id,statusArray)
  const statusItem = statusArray.find(item => item.chapter_id === chapter_id);
  return statusItem ? statusItem.status : undefined;
}