
// 클래스명 변수 선언
const button = $('.button');
const tabContainer = $('.tab-container');
const tabDesc = $('.tab-desc')

//탭에 해당하는 paragraph를 출력시켜줌
for (let i = 0; i < tabContainer.children().length; i++) {
  console.log("start")
  button.eq(i).on('click', function () {
    tabDesc.removeClass('show');
    tabDesc.eq(i).addClass('show');
  })
  console.log("end")
};

$(document).ready(function () {
  let url = "http://spartacodingclub.shop/sparta_api/weather/seoul";
  fetch(url).then(res => res.json()).then(data => {
    let temp = data['temp']

    $('#TT').append(temp);
  })
})

// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { doc,getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-name">이름 : ${name}</h5>
            <p class="card-text">역할 : ${role}</p>
            <p class="card-text">mbti : ${mbti}</p>
            <p class="card-text">comment : ${content}</p>
            <p class="card-text">tmi : ${tmi}</p>
          </div>
          <div class="card-footer">
            <a href="${url}"><small class="text-body-secondary">${url}</small>
          </div>
        </div>
      </div>`;

    // Use the specific id to append to the corresponding element
    $(`#${i}`).append(temp_html);
  } else {
    console.log(`No such document for id ${i}!`);
  }
}


