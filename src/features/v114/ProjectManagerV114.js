// V11.4 Project Manager Extension
export const PROJECT_STORAGE_KEY_V114 = "brand_engine_projects_v114";

export function saveProjectV114(project){
 const list = JSON.parse(localStorage.getItem(PROJECT_STORAGE_KEY_V114)||"[]");
 const item={...project,id:project.id||Date.now(),updatedAt:new Date().toISOString()};
 const idx=list.findIndex(x=>x.id===item.id);
 if(idx>=0) list[idx]=item; else list.push(item);
 localStorage.setItem(PROJECT_STORAGE_KEY_V114,JSON.stringify(list));
 return item;
}
export function loadProjectsV114(){
 return JSON.parse(localStorage.getItem(PROJECT_STORAGE_KEY_V114)||"[]");
}
