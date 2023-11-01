window.addEventListener("scroll", function(){
    let header = document.querySelector('.img-cap-ios')
    header.classList.toggle('rolagem',window.scrollY > 0)
})