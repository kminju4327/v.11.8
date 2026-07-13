
// V11.3 Project Storage Engine
// MVP local project save foundation.

const KEY = 'brand_engine_projects';

export function saveProject(project) {
  const list = JSON.parse(localStorage.getItem(KEY) || '[]');
  list.push({...project, updatedAt: new Date().toISOString()});
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function loadProjects() {
  return JSON.parse(localStorage.getItem(KEY) || '[]');
}
