// tab menu
const tabBtns = document.querySelectorAll('.reservation__tab-btn'),
    tabContent = document.querySelectorAll('.reservation__content-desc'),
    tabSubmitBtn = document.querySelector('.reservation__submit-btn');

// popup 
const popupArea = document.querySelector('.reservation-popup'),
    popupColorBtnBox = document.querySelector('.popup__color-list'),
    popupColorBtns = popupArea.querySelectorAll('.popup__color-btn'),
    popupCloseBtn = popupArea.querySelector('.popup__close-btn');


let targetColor = 'beige'; // 초기 컬러 베이지로 초기화

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

}

popupEvent();

function popupEvent() {
    // 사전예약하기 버튼 
    tabSubmitBtn.addEventListener('click', function(ev) {
        popupArea.style.display = 'block';

        submitReserv(); 

    });


    popupCloseBtn.addEventListener('click',function (ev) {
        console.log(ev.target);
        popupArea.style.display = 'none';
    })
}


// 사전예약폼에 있는 컬러 버튼
function submitReserv() {
    popupColorBtns.forEach((btn,idx) => {
        if( btn.classList.contains(targetColor) ) {
            removeColorBtnCn();
            btn.classList.add('active')
        }
    })
}

function removeColorBtnCn() {
    popupColorBtns.forEach(btn => {
        btn.classList.remove('active')
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





