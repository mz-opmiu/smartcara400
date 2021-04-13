var html = document.querySelector('html');

// tab menu
var tabBtns = html.querySelectorAll('.reservation__tab-btn'),
    tabContent = html.querySelectorAll('.reservation__content-desc'),
    tabSubmitBtn = html.querySelector('.reservation__reserv-btn');

// popup - 사전예약
var popupArea = html.querySelector('.reservation-popup'),
    popupCont = popupArea.querySelector('.popup__inner'),
    popupColorBtns = popupArea.querySelectorAll('.popup__color'),
    popupCloseBtn = popupArea.querySelector('.popup__close-btn'),
    successPopup = html.querySelector('.success-popup'),
    successCompBtn = html.querySelector('.success-popup__comp-btn'),
    successPopupCloseBtn = html.querySelector('.success-popup__close-btn');

// product popup
var productViewitems = document.querySelectorAll('.product__view-item-img'),
    popupGalleryArea = document.querySelector('.popup-gallery'),
    popupImgItems = document.querySelectorAll('.popup-gallery__img'),
    popupImgCloseBtn = document.querySelector('.popup-gallery__close-btn'),
    prodReservBtn = document.querySelector('.reserv-btn');


// form 
var popupForm = html.querySelector('.popup__form'),
    popupSubmitBtn = popupForm.querySelector('.popup__submit-btn'),
    nameElm = popupForm.querySelector('input[id=name]'),
    phoneElm = popupForm.querySelector('input[id=phone]'),
    smsCkBox = popupForm.querySelector('input[id=sms]'),
    persInfoCkBox = popupForm.querySelector('input[id=personalInfo]');


var targetColor = 'beige'; // 초기 컬러 베이지로 초기화

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}


function init() {
    // 사전예약 탭 메뉴
    tabBtns.forEach(function(btn,idx){
        btn.addEventListener('click',function (ev) {

            removeClassName();

            tabContent[idx].classList.add('active');
            ev.target.classList.add('active');

            targetColorSetting();
        })
    });

    // 사전예약하기 버튼 
    tabSubmitBtn.addEventListener('click', function(ev) {
        popupArea.style.display = 'block';
        popupCont.style.top = `${html.scrollTop}px`;

        targetColorSetting ();
        submitReserv(); 
    });

    // 사전예약 닫기 버튼
    popupCloseBtn.addEventListener('click',function (ev) {
        closePopup()
    });

    // 팝업 닫기 버튼
    successPopupCloseBtn.addEventListener('click',function (ev) {
        successPopup.style.display = 'none'
    })

    // 팝업 확인(닫기) 버튼
    successCompBtn.addEventListener('click',function (ev) {
        successPopup.style.display = 'none'
    })

    // 제품 팝업 이벤트
    productViewitems.forEach(function(item,index){
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
    prodReservBtn.addEventListener('click',function (ev) {
        popupArea.style.display = 'block';
        popupCont.style.top = `${html.scrollTop}px`;
        
        targetColor = 'beige';

        submitReserv();
    });


    // 팝업 폼 제출 
    popupSubmitBtn.addEventListener('click', function(ev) {
        var colorName = document.querySelector('input[name="colorSelect"]:checked').value
        
            fetchApi({
                agree:smsCkBox.checked,
                agree2: persInfoCkBox.checked,
                color:colorName,
                name: nameElm.value,
                phoneNo:phoneElm.value
            });

    })

}

// 팝업 닫았을때 전체 input값 리셋
function closePopup() {
    // 팝업 닫기
    popupArea.style.opacity = '0';
    setTimeout(function() {
        popupArea.style.display = 'none';
    }, 500);

    // input reset
    smsCkBox.checked  = false
    persInfoCkBox.checked = false
    nameElm.value = ''
    phoneElm.value = ''
}


function fetchApi(body) {
    $.ajax({
        type: "POST", 
        url: "https://test-event-smartcara.pentacle.co.kr/api/reservation2021", 
        data: body,              
        dataType: "json",
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (){
            closePopup();
            setTimeout(function(){
                successPopup.style.display = 'block'
            }, 500);

        },
        error : function(error) {
            alert(JSON.parse(error.response).error)
        }
    })
}

// 사전예약폼에 있는 컬러 버튼
function submitReserv() {

    popupColorBtns.forEach( function(btn){
        if( btn.classList.contains(targetColor) ) {
            var targetInput = btn.querySelector('input');
            targetInput.checked = true;
        }
    })
}


// 선택된 색상 셋팅해주는 함수
function targetColorSetting() {
    tabBtns.forEach(function(btn) {
        if(btn.classList.contains('active')) {
            targetColor = btn.querySelector('button').className;
        }
    })
}



// 전체 클래스명 지우기
function removeClassName() {
    tabBtns.forEach(function(item,idx){
        item.classList.remove('active');
        tabContent[idx].classList.remove('active')
    });
}

// 팝업 아이템 전체 클래스명 지우기
function removeGalleryCn() {
    popupImgItems.forEach(function(item) {
        item.classList.remove('active')
    })
}


init();