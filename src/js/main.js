var html = document.querySelector('html');

// tab menu
var tabBtns = html.querySelectorAll('.reservation__tab-btn'),
    tabContent = html.querySelectorAll('.reservation__content-desc'),
    tabSubmitBtn = html.querySelector('.reservation__reserv-btn');

// popup - 사전예약
var popupArea = html.querySelector('.reservation-popup'),
    popupCont = popupArea.querySelector('.popup__inner'),
    popupColorBtns = popupArea.querySelectorAll('.popup__color'),
    popupCloseBtn = popupArea.querySelector('.popup__close-btn');

// product popup
var productViewitems = document.querySelectorAll('.product__view-item-img'),
    popupGalleryArea = document.querySelector('.popup-gallery'),
    popupImgItems = document.querySelectorAll('.popup-gallery__img'),
    popupImgCloseBtn = document.querySelector('.popup-gallery__close-btn'),
    prodReservBtn = document.querySelector('.reserv-btn');


// form 
var popupForm = html.querySelector('.popup__form'),
    nameInput = popupForm.querySelector('input[id=name]'),
    phoneInput = popupForm.querySelector('input[id=phone]');


var targetColor = 'beige'; // 초기 컬러 베이지로 초기화

// 팝업 위치 => 현재 로케이션 + 10 하기? or html 구조 다시 잡기

//// 🐙 팝업 닫았을 경우 모든 인풋정보 리셋

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}


function init() {
    // 사전예약 탭 메뉴
    tabBtns.forEach((btn,idx) => {
        btn.addEventListener('click',function (ev) {
            
            removeClassName();

            tabContent[idx].classList.add('active');
            ev.target.classList.add('active');
            

            targetColorSetting ();
        })
    });

    // 사전예약하기 버튼 
    tabSubmitBtn.addEventListener('click', function(ev) {
        popupArea.style.display = 'block';
        popupCont.style.top = `${html.scrollTop}px`;

        // console.log('스크롤탑🐱‍🚀🐱‍🚀👍🏻',html.scrollTop);
        targetColorSetting ();
        submitReserv(); 

    });


    popupCloseBtn.addEventListener('click',function (ev) {
        popupArea.style.display = 'none';
    })

    // 제품 팝업 이벤트
    productViewitems.forEach((item,index) => {
        item.addEventListener('click', function (ev) {

            console.log(ev.target);
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
        popupArea.style.display = 'block';
        popupCont.style.top = `${html.scrollTop}px`;
        
        targetColor = 'beige';

        submitReserv();
    });


    // 팝업 폼 제출 
    popupForm.addEventListener('submit', function(ev) {
        ev.preventDefault()
        // console.log(ev.target.value);
        if( nameInput.value && phoneInput.value ) {
            console.log(nameInput.value);
            console.log(phoneInput.value);
            console.log(targetColor);

        } else {
            console.log('입력이 안되어있습니다!');
        }
    })

}

// top: 2648px;


// 사전예약폼에 있는 컬러 버튼
function submitReserv() {
    console.log('사전예약폼에 있는 컬러 버튼',targetColor);

    popupColorBtns.forEach( btn => {
        if( btn.classList.contains(targetColor) ) {
            var targetInput = btn.querySelector('input');
            targetInput.checked = true;
        }
    })
}

// 선택된 색상 셋팅해주는 함수
function targetColorSetting() {
    tabBtns.forEach((btn,index) => {
        if(btn.classList.contains('active')) {
            targetColor = btn.querySelector('button').className;
            

            console.log('현재 타겟 컬러입니다~💟💟',targetColor);
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

// 팝업 아이템 전체 클래스명 지우기
function removeGalleryCn() {
    popupImgItems.forEach(item => {
        item.classList.remove('active')
    })
}


init();