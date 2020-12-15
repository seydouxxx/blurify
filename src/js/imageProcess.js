
export const dragImage = () => {
};
export const dropImage = (e) => {
    e = e || event;
    e.preventDefault();
    console.log(e);

    const pic_panel = document.getElementById('pic-panel');
    const div_pic_list = pic_panel.appendChild(document.createElement('div'));
    div_pic_list.style.height = "100px";
    console.log(e.dataTransfer.Files);
};