// tab menu
const tabBtns = document.querySelectorAll('.reservation__tab-btn'),
    tabContent = document.querySelectorAll('.reservation__content-desc'),
    tabSubmitBtn = document.querySelector('.reservation__submit-btn');

// popup 
const popupArea = document.querySelector('.reservation-popup'),
    popupColorBtnBox = document.querySelector('.popup__color-list'),
    popupColorBtns = popupArea.querySelectorAll('.popup__color-btn'),
    dimmed = document.querySelector('.dimmed');



let targetColor = 'beige'; // 초기 컬러 베이지로 초기화

function init() {
    // 사전예약 탭 버튼 이벤트
    tabBtns.forEach((btn,idx) => {
        btn.addEventListener('click',function (ev) {
            targetColor = ev.target.querySelector('button').className;

            // console.log('타켓 컬러는???????',targetColor);

            removeClassName();

            tabContent[idx].classList.add('active');
            ev.target.classList.add('active')
            
        })
    });

}

// let status = true;

popupEvent();

function popupEvent() {
    // 사전예약하기 버튼 
    tabSubmitBtn.addEventListener('click', function(ev) {
        console.log('클릭');
        popupArea.style.display = 'block';
        popupArea.classList.add('active');
        dimmed.style.display = 'block';

        submitReserv(); 
        // status = !status;

    });

    window.addEventListener('click', function(ev) {
        console.log('window ev target ===>',ev.target);
        console.log('hihihi');

        
            console.log('a');
            if( !checkInBox(ev.target,popupArea) ) {
                popupArea.style.display = 'none';
                popupArea.classList.remove('active');
                dimmed.style.display = 'none';

                // console.log('닫자');
            } 

            function checkInBox(clickTarget,listBox) {
                // console.log('clickTarget 🐸',clickTarget.tagName);
                // console.log('clickTarget 🦁',listBox.tagName);
                console.log('clickTraget className ===>',clickTarget.className);
                console.log('clickTarget',clickTarget);
                console.log('listBox',listBox);
                console.log('같은지?????', clickTarget === listBox);
            
            
                    while ( clickTarget.tagName !== 'HTML' ) {
                        if( clickTarget === listBox ) {
                            return true
                        } 
            
                        clickTarget  = clickTarget.parentNode;
                    }
            
                    return false
            }
    
        
    })


    


}


// 사전예약폼에 있는 컬러 버튼
function submitReserv() {
    console.log('🎈',targetColor);

    popupColorBtns.forEach((btn,idx) => {
        if( btn.classList.contains(targetColor) ) {
            console.log('📌',btn);
            btn.classList.add('active')
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





