/* ---------- 인트로 영상 ---------- */
const intro = document.querySelector('#intro');
const introVideo = document.querySelector('#introVideo');
const main = document.querySelector('#main');

introVideo.addEventListener('ended', () => {

  intro.classList.add('hide');
  main.classList.add('show');

});

/* ---------- 스크롤 시 헤더 ---------- */
const header = document.querySelector('header');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', function () {

  const currentScrollY = window.scrollY;

  /* 맨 위 */
  if (currentScrollY <= 30) {

    header.classList.remove('header_show');
    header.classList.remove('header_hide');
    header.classList.add('header_top');

    lastScrollY = currentScrollY;
    return;
  }

  /* 아래로 스크롤 */
  if (currentScrollY > lastScrollY) {

    header.classList.remove('header_show');
    header.classList.remove('header_top');
    header.classList.add('header_hide');

  }

  /* 위로 스크롤 */
  else {

    header.classList.remove('header_hide');
    header.classList.remove('header_top');
    header.classList.add('header_show');

  }

  lastScrollY = currentScrollY;
});


/* ---------- 경계선 라인 애니메이션 ---------- */
const lineSvg = document.querySelectorAll(".line_ani1, .line_ani2");

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if (entry.isIntersecting) {

      // 애니메이션 처음부터 다시 시작
      entry.target.classList.remove("active");
      void entry.target.offsetWidth;
      entry.target.classList.add("active");

    } else {

      // 화면 밖으로 나가면 초기화
      entry.target.classList.remove("active");

    }

  });

}, {
  threshold: 0.3
});

lineSvg.forEach((line) => {
  observer.observe(line);
});


/* ---------- 콜렉션 이미지 호버시 유지 - 시작 ----------*/
/* 콜렉션 1 */
$("#collection1 .mini_img1").mouseenter(function () {

  $("#collection1 .pic").removeClass("active");
  $("#collection1 .pic1").addClass("active");

});

$("#collection1 .mini_img2").mouseenter(function () {

  $("#collection1 .pic").removeClass("active");
  $("#collection1 .pic2").addClass("active");

});

$("#collection1 .mini_img3").mouseenter(function () {

  $("#collection1 .pic").removeClass("active");
  $("#collection1 .pic3").addClass("active");

});

/* 콜렉션 2 */
$("#collection2 .mini_img4").mouseenter(function () {

  $("#collection2 .pic").removeClass("active");
  $("#collection2 .pic4").addClass("active");

});

$("#collection2 .mini_img5").mouseenter(function () {

  $("#collection2 .pic").removeClass("active");
  $("#collection2 .pic5").addClass("active");

});

$("#collection2 .mini_img6").mouseenter(function () {

  $("#collection2 .pic").removeClass("active");
  $("#collection2 .pic6").addClass("active");

});


/* ---------- 콜렉션 위시리스트 클릭 ----------*/
document.querySelectorAll('.wish_btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    this.classList.toggle('active');
  });
});


/* ---------- 이벤트 타이틀 클릭 시, 정보 ----------*/
$(".event_title").click(function () {
  $(".event_hover").addClass("active");
});


/* ----------  sns 슬라이더 ---------- */
const snsSlider = document.querySelector('.sns_slider');
const snsItems = document.querySelectorAll('.sns_slider li');

const move = 318;

let current = 5;
let isMoving = false;


function updateSnsSlider(animate = true) {

  snsItems.forEach(function (item) {
    item.classList.remove('active');
  });


  if (animate) {

    snsSlider.style.transition =
      'transform 0.55s ease';

    snsItems.forEach(function (item) {
      item.style.transition =
        'width 0.55s ease, height 0.55s ease';
    });

  } else {

    snsSlider.style.transition = 'none';

    snsItems.forEach(function (item) {
      item.style.transition = 'none';
    });
  }


  snsItems[current].classList.add('active');


  const moveX = (current - 2) * move;

  snsSlider.style.transform =
    `translateX(-${moveX}px)`;
}

/* 오른쪽 */
document.querySelector('#sns .swiper-button-next')
  .addEventListener('click', function () {

    if (isMoving) return;

    isMoving = true;

    current++;

    updateSnsSlider(true);
  });

/* 왼쪽 */
document.querySelector('#sns .swiper-button-prev')
  .addEventListener('click', function () {

    if (isMoving) return;

    isMoving = true;

    current--;

    updateSnsSlider(true);
  });


/* 애니메이션 끝 */
snsSlider.addEventListener('transitionend', function (e) {

  if (e.propertyName !== 'transform') return;

  /* 뒤 복제 1 → 원본 1 */
  if (current >= 10) {

    current = 3;

    updateSnsSlider(false);
  }

  /* 앞 복제 7 → 원본 7 */
  else if (current <= 2) {

    current = 9;

    updateSnsSlider(false);
  }

  /* 다음 클릭 허용 */
  isMoving = false;

  /* transition 다시 켜기 */
  requestAnimationFrame(function () {

    requestAnimationFrame(function () {

      snsSlider.style.transition =
        'transform 0.55s ease';

      snsItems.forEach(function (item) {
        item.style.transition =
          'width 0.55s ease, height 0.55s ease';
      });

    });

  });

});

updateSnsSlider(false);


/* ---------- sns 자동 슬라이드 ---------- */

const snsNextBtn = document.querySelector('#sns .swiper-button-next');
const snsPrevBtn = document.querySelector('#sns .swiper-button-prev');

let snsAutoSlide;

/* 자동 슬라이드 시작 */
function startSnsAutoSlide() {

  clearInterval(snsAutoSlide);

  snsAutoSlide = setInterval(function () {

    snsNextBtn.click();

  }, 2500);

}

/* 직접 버튼을 누르면 3초 다시 카운트 */
snsNextBtn.addEventListener('click', function () {
  startSnsAutoSlide();
});

snsPrevBtn.addEventListener('click', function () {
  startSnsAutoSlide();
});

startSnsAutoSlide();


/* ---------- sns 꾸미기 요소 > 화면 들어올 시 시작 ---------- */
const snsSection = document.querySelector('#sns');

const snsObserver = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry) {

    if (entry.isIntersecting) {

      document.querySelector('.sns_line')
        .classList.add('active');

      document.querySelector('.sns_starline')
        .classList.add('active');

      document.querySelector('.sns_star')
        .classList.add('active');

      document.querySelector('.sns_heart')
        .classList.add('active');


      /* 최초 한 번 실행 후 감시 종료 */
      snsObserver.unobserve(snsSection);
    }

  });

}, {
  threshold: 0.3
});

snsObserver.observe(snsSection);