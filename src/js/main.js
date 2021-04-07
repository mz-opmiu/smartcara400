// tab menu
const tabBtns = document.querySelectorAll('.reservation__tab-btn'),
    tabContent = document.querySelectorAll('.reservation__content-desc'),
    tabSubmitBtn = document.querySelector('.reservation__reserv-btn');

// popup - 사전예약
const popupArea = document.querySelector('.reservation-popup'),
    popupCont = document.querySelector('.popup__inner'),
    popupColorBtns = popupArea.querySelectorAll('.popup__color'),
    popupCloseBtn = popupArea.querySelector('.popup__close-btn');

// product popup
const productViewitems = document.querySelectorAll('.product__view-item-img'),
    popupGalleryArea = document.querySelector('.popup-gallery'),
    popupImgItems = document.querySelectorAll('.popup-gallery__img'),
    popupImgCloseBtn = document.querySelector('.popup-gallery__close-btn');

const prodReservBtn = document.querySelector('.reserv-btn');


let targetColor = 'beige'; // 초기 컬러 베이지로 초기화

let currentLo = 5;

// 팝업 위치 => 현재 로케이션 + 10 하기? or html 구조 다시 잡기

//// 🐙 팝업 닫았을 경우 모든 인풋정보 리셋

function init() {
    // 사전예약 탭 버튼 이벤트
    tabBtns.forEach((btn,idx) => {
        btn.addEventListener('click',function (ev) {
            targetColor = ev.target.querySelector('button').className;

            removeClassName();

            tabContent[idx].classList.add('active');
            ev.target.classList.add('active')
            
        })
    });

    // 제품 팝업 이벤트
    productViewitems.forEach((item,index) => {
        item.addEventListener('click', function (ev) {
            removeGalleryCn();
            popupGalleryArea.classList.add('active');
            popupImgItems[index].classList.add('active');
        })
    });

    // 제품 팝업 닫기
    popupImgCloseBtn.addEventListener('click',function (ev) {
        popupGalleryArea.classList.remove('active');
        removeGalleryCn()
    });


    // 제품 부분 사전 예약 버튼
    // 컬러 버튼은 베이지로 하기..
    prodReservBtn.addEventListener('click',function (ev) {
        console.log(ev.target);
        popupArea.style.display = 'block';
        popupCont.style.top = '2600px'

        targetColor = 'beige';

        submitReserv();
    })

}

// 팝업 아이템 클래스 네임 삭제
function removeGalleryCn() {
    popupImgItems.forEach(item => {
        item.classList.remove('active')
    })
}

popupEvent();

function popupEvent() {
    // 사전예약하기 버튼 
    tabSubmitBtn.addEventListener('click', function(ev) {
        popupArea.style.display = 'block';
        popupCont.style.top = '15px'

        submitReserv(); 

    });


    popupCloseBtn.addEventListener('click',function (ev) {
        popupArea.style.display = 'none';
    })
}

// top: 2648px;


// 사전예약폼에 있는 컬러 버튼
function submitReserv() {
    console.log('사전예약폼에 있는 컬러 버튼',targetColor);
    popupColorBtns.forEach( btn => {
        if( btn.classList.contains(targetColor) ) {
            const targetInput = btn.querySelector('input');
            targetInput.checked = true;
        }
    })
}



// 전체 클래스명 지우기
function removeClassName() {
    tabBtns.forEach((item,idx) => {
        item.classList.remove('active');
        tabContent[idx].classList.remove('active')
    });
}

init();





