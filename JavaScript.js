
// 클래스명 변수 선언
const button = $('.button'); 
const tabContainer = $('.tab-container');
const tabDesc = $('.tab-desc')

//탭에 해당하는 paragraph를 출력시켜줌
for (let i = 0; i < tabContainer.children().length; i++) {
  button.eq(i).on('click', function (){
  tabDesc.removeClass('show');
  tabDesc.eq(i).addClass('show');

})
};


