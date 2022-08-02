// 요구 사항 정리
// TODO 메뉴 추가

// -[v] 메뉴의 이름을 입력받고 확인 버튼을 누르면 메뉴가 추가된다.
// -[v] 메뉴의 이름을 입력받고 엔터키를 눌려도 메뉴가 추가된다.
// -추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입한다.
// -[v] 메뉴가 추가되면 input 은 빈값으로 초기화 한다.
// -[v] 만약 빈값을 입력했으면 메뉴 추가가 되지 않고 prompt 창을 띄운다.
// -[v] 빈값을 입력하고 엔터키를 눌러도 메뉴가 추가되지 않고 prompt 창을 띄운다.
// -[v] 메뉴가 추가될때마다 총 개수의 정보가 변경된다.

// TODO 메뉴 수정
// -[v] 수정 버튼을 누르면 모달 창이 뜨고 수정 메뉴 이름을 입력받는다.
// -[v] 모달창이 뜰때 메뉴 이름은 기본적으로 원래 이름이 들어가 있다. (prompt 함수 두번째 인자에 삽입..)
// -[v] 수정 완료 버튼을 누르면 해당 메뉴의 이름이 바뀐다.

// TODO 메뉴 삭제
// -[v] 메뉴 삭제버튼을 누르면 확인하는 prompt 창이 뜨고 확인을 누르면 해당 메뉴를 삭제한다.
// -[v] 메뉴의 총 개수도 업데이트 한다.

const menuInput = document.querySelector("#espresso-menu-name"); // 메뉴 input.
const menuAddBtn = document.querySelector("#espresso-menu-submit-button"); // 메뉴 추가 버튼.
const ul = document.querySelector("#espresso-menu-list"); // 메뉴 목록을 나타낼 리스트.
const menuForm = document.querySelector("submit");
const menuCount = document.querySelector(".menu-count");

function App() {
  // ********* 메뉴 추가 ********

  // 페이지 reload 막음.
  // menuForm.addEventListener("submit",e=>{
  //     e.preventDefault();
  // })
  menuInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      // ***.엔터키를 입력했을때
      const menuName = menuInput.value;
      if (menuName === "") {
        alert("메뉴명을 입력해 주세요.");
        return;
      }
      e.preventDefault(); // 새로고침 방지

      // (1) 메뉴 추가
      createMenu(menuName);

      // (2) input text 초기화
      menuInput.value = "";
      const menuItemList = document.querySelectorAll(".menu-list-item");
      const menuItemCount = menuItemList.length;

      // count 수 업데이트
      menuCount.innerText = `총 ${menuItemCount}개`;
    }
  });

  menuAddBtn.addEventListener("click", () => {
    // ***. 확인 버튼을 눌렀을때
    const menuName = menuInput.value;
    if (menuName === "") {
      alert("메뉴명을 입력해 주세요.");
      return;
    }

    // (1) 메뉴 추가
    createMenu(menuName);

    // (2) input text 초기화
    menuInput.value = "";
    const menuItemList = document.querySelectorAll(".menu-list-item");
    const menuItemCount = menuItemList.length;

    // count 수 업데이트
    menuCount.innerText = `총 ${menuItemCount}개`;
  });

  // ********* 메뉴 수정 ********
  ul.addEventListener("click", (e) => {
    //console.log(e.target);
    if (e.target.classList.contains("menu-edit-button")) {
      //console.log("수정버튼 클릭!");
      const $menuName = e.target.closest("li").querySelector(".menu-name");
      const editMenuName = prompt(
        "수정할 이름을 입력해 주세요.",
        $menuName.innerText
      );

      // 메뉴 이름 변경
      $menuName.innerText = editMenuName;
    }

    // ********* 메뉴 삭제 ********
    if (e.target.classList.contains("menu-remove-button")) {
      const result = confirm("해당 메뉴를 삭제하시겠습니까?");
      if (result) {
        // 확인 버튼 클릭시 해당 메뉴 삭제
        e.target.closest("li").remove();

        // count 수 업데이트
        const menuItemList = document.querySelectorAll(".menu-list-item");
        const menuItemCount = menuItemList.length;

        menuCount.innerText = `총 ${menuItemCount}개`;
      }
    }
  });
} // end of App()

App();

function createMenu(menuName) {
  // 메뉴 추가 함수
  const menuItemTemplate = `<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${menuName}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
</li>`;
  ul.insertAdjacentHTML("beforeend", menuItemTemplate);
} // end of App()
