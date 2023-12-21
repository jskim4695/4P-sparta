
// 클래스명 변수 선언
const button = $('.button'); 
const tabContainer = $('.tab-container');
const tabDesc = $('.tab-desc')

//.tab-container 자식요소의 길이만큼 
for (let i = 0; i < tabContainer.children().length; i++) {
  button.eq(i).on('click', function (){
  tabDesc.removeClass('show');
  tabDesc.eq(i).addClass('show');

})
};
