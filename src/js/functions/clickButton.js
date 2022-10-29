export const clickButton = (element, action) =>  {
    document.addEventListener('click', (event) => {
        const button = event.target.innerHTML
        if(button === element) action()
    })
}
