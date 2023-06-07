export const collection = JSON.parse(localStorage.getItem('Tasks')) || [];

export default class Task {
  constructor(name, index) {
    this.Name = name;
    this.Checked = false;
    this.Index = index;
  }
}