
const waitAndRemove = (e) => {
     setTimeout((e) => {
          $(e.target).removeClass('show');
     }, 750);
}

$('#hamburger').on('click', (e) => {
     $('.hamburger-menu').addClass('show');
     $('.menu').addClass('menu-show');
     $('.menu').removeClass('menu-hide');
     $('.menu-right').on('click', (e) => {
          // e.stopPropagation();
          // $(e.target).removeClass('show');
          setTimeout(() => {
               $('.hamburger-menu').removeClass('show');
          }, 358);
          $('.menu').removeClass('menu-show');
          $('.menu').addClass('menu-hide');
          
     })
})