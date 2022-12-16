import f from "."

export const clickButton = (element, action) =>  {
    f.selectById(element).addEventListener('click', action)
}
