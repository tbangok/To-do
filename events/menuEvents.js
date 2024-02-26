export function menuToggle() {

  const menuToggleBtn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const inMenus = document.querySelectorAll('.in-menu');
  const texts = document.querySelectorAll('.text');
  let isOpen = true;

  function toggle() {
    if (isOpen) {
      menu.style.width = '100px';
      inMenus.forEach(me => me.style.width = '20px');
      isOpen = !isOpen;
      texts.forEach(text => text.classList.add('hidden'));
      menuToggleBtn.textContent = '>';

    } else {
      menu.style.width = '400px';
      inMenus.forEach(me => me.style.width = '340px');
      texts.forEach(text => text.classList.remove('hidden'));
      menuToggleBtn.textContent = '<';
      isOpen = !isOpen;
    }
  }

  menuToggleBtn.addEventListener('click', toggle)
}