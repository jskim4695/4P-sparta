
// 클래스명 변수 선언
const button = $('.button');
const tabContainer = $('.tab-container');
const tabDesc = $('.tab-desc')

const clickedColor = ['clickedColor-BlueGreen','clickedColor-LightBlue','clickedColor-Orange','clickedColor-Purple']

const deleteAll = clickedColor.join(' ')
//탭에 해당하는 paragraph를 출력시켜줌
for (let i = 0; i < tabContainer.children().length; i++) {
  button.eq(i).on('click', function (e) {
    button.removeClass(deleteAll);
    if (e.target == document.querySelectorAll('button')[i]) {
      button.eq(i).addClass(`${clickedColor[i]}`);
    }
    tabDesc.slideUp();
    if (tabDesc.eq(i).is(':visible')) {
      button.eq(i).removeClass(`${clickedColor[i]}`);
      return false
    };
    setTimeout(async function () {

      const locations = ['daegu', 'incheon', 'seoul', 'busan']; // 지역 배열
      const location = locations[i];

      const apiUrl = `http://spartacodingclub.shop/sparta_api/weather/${location}`;

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        //icon 변경하는 부분
        let icon = data['icon']
        $('#icon').attr('src', icon)

        // 날씨 정보에 따라 스타일 설정
        applyStyles(data['icon']);
      } catch (error) {
        console.error('An error occurred while fetching weather data:', error);
      }
      
      tabDesc.eq(i).slideDown();
    }, 500);



  });
};

// 날씨 정보에 따라 스타일을 적용하는 함수
function applyStyles(icon) {
  let backgroundColor = '';
  let navColor = '';

    // 아이콘 값에 따라 스타일 설정
    if (icon === 'http://openweathermap.org/img/w/01n.png'
    || icon === 'http://openweathermap.org/img/w/02n.png'
    || icon === 'http://openweathermap.org/img/w/01d.png'
    || icon === 'http://openweathermap.org/img/w/02d.png') {
      backgroundColor = '#6495ED';
      navColor = 'white';
    } else if (icon === 'http://openweathermap.org/img/w/03n.png'
    || icon === 'http://openweathermap.org/img/w/04n.png'
    || icon === 'http://openweathermap.org/img/w/03d.png'
    || icon === 'http://openweathermap.org/img/w/04d.png') {
      backgroundColor = 'gray';
      navColor = '#C0C0C0';
    } else if (icon === 'http://openweathermap.org/img/w/10n.png'
    || icon === 'http://openweathermap.org/img/w/11n.png'
    || icon === 'http://openweathermap.org/img/w/13n.png'
    || icon === 'http://openweathermap.org/img/w/10d.png'
    || icon === 'http://openweathermap.org/img/w/11d.png'
    || icon === 'http://openweathermap.org/img/w/13d.png') {
      backgroundColor = '#708090';
      navColor = '#191970';
    }

    // style.css의 스타일 변경
    $('.main-text, .main-box, .introduce, .section1, .img-box img').css('background-color', backgroundColor);
    
    $('.header').css('background-color', navColor);
  }

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { doc, getDoc ,updateDoc} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhtzn_ZOGHyXQQa0ntOj2oWsq_3Iqfzzc",
  authDomain: "sparta-16f5d.firebaseapp.com",
  projectId: "sparta-16f5d",
  storageBucket: "sparta-16f5d.appspot.com",
  messagingSenderId: "973986178508",
  appId: "1:973986178508:web:535f6e61a213f702cfe969"
};
// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Loop through ids 1 to 4
for (let i = 1; i <= 4; i++) {
  const dbdoc = doc(db, "team", String(i));
  const docSnap = await getDoc(dbdoc);

  if (docSnap.exists()) {
    let row = docSnap.data();
    let image = row['image'];
    let name = row['name'];
    let content = row['content'];
    let mbti = row['mbti'];
    let url = row['url'];
    let tmi = row['tmi'];
    let role = row['role'];

    let temp_html = `
      <div class="col">
        <div class="card h-100">
            <img src="${image}" class="card-img-top" alt="image">
          <div class="card-body">
            <h5 class="card-name">이름 : ${name}</h5>
            <p class="card-text">역할 : ${role}</p>
            <p class="card-text">mbti : ${mbti}</p>
            <p class="card-text">comment : ${content}</p>
            <p class="card-text">tmi : ${tmi}</p>
            <div style="clear: both;"></div>

          </div>
          <div class="card-footer">
            <a href="${url}" target='_blank'><small class="text-body-secondary">${url}</small>
          </div>
        </div>
      </div>`;

    // Use the specific id to append to the corresponding element
    $(`#${i}`).append(temp_html);
  } else {
    console.log(`No such document for id ${i}!`);
  }
}

$("#updatebtn").click(async function () {
  let newid = $('#update_box #update_id').val();
  let newimage = $('#update_box #update_image').val();
  let newname = $('#update_box #update_name').val();
  let newrole = $('#update_box #update_role').val();
  let newcontent = $('#update_box #update_content').val();
  let newmbti = $('#update_box #update_mbti').val();
  let newtmi = $('#update_box #update_tmi').val();
  let newurl = $('#update_box #update_url').val();

  let newdoc = {
    image: newimage,
    name: newname,
    role: newrole,
    content: newcontent,
    mbti: newmbti,
    tmi: newtmi,
    url: newurl
  };

  try {
    // Assuming "test" is the collection name and "1" is the document ID, adjust accordingly
    const updateDocRef = doc(db, "team", newid);
    await updateDoc(updateDocRef, newdoc);
    alert("Update complete");
    window.location.reload();
  } catch (error) {
    console.error("Error updating document: ", error);
    alert("Error updating document. Please try again.");
  }
});
