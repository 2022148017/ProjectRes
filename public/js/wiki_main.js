fetch("/js/json/main.json")
  .then((response) => response.json())
  .then((json) => initialize(json))
  .catch((error) => console.log("Error: " + error.message));

var name_disease_group = [];
var category_disease_group = [];

const name_search_button = document.getElementById("name_search_button");
const name_search = document.getElementById("search");
const disease_list = document.querySelector(".list");

const menu = document.querySelector(".menu");
const menu_button = document.getElementById("category");
const menu_icon = document.querySelector("#category i");

function initialize(total_disease_group) {
  // name_disease_group = total_disease_group;
  for (let i = 0; i < 15; i++) {
    let categoryNumber = "category_" + (i + 1);
    let categoryList = document.getElementById(categoryNumber);
    let categoryListValue = document.getElementById(categoryNumber).innerHTML;
    // console.log(document.getElementById(categoryNumber));
    let categoryListValue_parent =
      document.getElementById(categoryNumber).parentNode;
    let subMenu = document.createElement("ul");

    subMenu.className = "submenu";

    for (let j = 0; j < total_disease_group.length; j++) {
      if (total_disease_group[j].type === categoryListValue) {
        let subMenuList = document.createElement("li");
        let subMenuList_href = document.createElement("a");

        subMenuList_href.href = "#";
        subMenuList_href.innerHTML = total_disease_group[j].name;

        subMenuList.appendChild(subMenuList_href);
        subMenu.appendChild(subMenuList);

        subMenuList.addEventListener("click", function () {
          category_disease_group = [];
          category_disease_group.push(total_disease_group[j]);
          displayDetailByCategory();
        });
      }
    }

    categoryListValue_parent.appendChild(subMenu);

    categoryList.addEventListener("click", function () {
      name_disease_group = [];
      for (let k = 0; k < total_disease_group.length; k++) {
        if (total_disease_group[k].type === categoryListValue) {
          name_disease_group.push(total_disease_group[k]);
        }
      }
      update_list();
    });
  }

  let emergencyList = document.getElementById("EmergencyList");
  //console.log(emergencyList);
  let listCategory = document.getElementById("listCategory");

  for (let l = 0; l < emergencyList.childElementCount; l++) {
    let emergencyListNum = "listEmergency_" + (l + 1);
    let emergencyButton =
      document.getElementById(emergencyListNum).childNodes[1];
    let emergencyName = emergencyButton.innerHTML;
    emergencyButton.addEventListener("click", function () {
      for (let n = 0; n < total_disease_group.length; n++) {
        if (total_disease_group[n].name === emergencyName) {
          category_disease_group = [];
          category_disease_group.push(total_disease_group[n]);
          displayDetailByCategory();
        }
      }
    });
  }

  for (let m = 0; m < listCategory.childElementCount; m++) {
    let listCategoryNum = "listCategory_" + (m + 1);
    let listCategoryButton =
      document.getElementById(listCategoryNum).childNodes[1];
    let listCategoryType = listCategoryButton.innerHTML;
    listCategoryButton.addEventListener("click", function () {
      name_disease_group = [];
      for (let u = 0; u < total_disease_group.length; u++) {
        if (total_disease_group[u].type === listCategoryType) {
          name_disease_group.push(total_disease_group[u]);
        }
      }
      update_list();
    });
  }

  name_search_button.addEventListener("click", function () {
    name_disease_group = [];
    category_disease_group = [];

    const searchValue = name_search.value.trim().split(" ").join("");

    if (searchValue !== "") {
      for (let i = 0; i < total_disease_group.length; i++) {
        var disease_name = total_disease_group[i].name.split(" ").join("");
        if (disease_name.indexOf(searchValue) !== -1) {
          name_disease_group.push(total_disease_group[i]);
        }
      }
      update_list();
    } else {
      alert("검색어를 입력해주세요!");
    }
  });
}

function update_list() {
  while (disease_list.firstChild !== null) {
    disease_list.removeChild(disease_list.firstChild);
  }

  if (name_disease_group.length !== 0) {
    display();
  } else {
    var no_result = document.createElement("div");
    no_result.className = "no_result";
    no_result.innerHTML = "검색 결과가 없습니다.";
    disease_list.appendChild(no_result);
  }
}

function display() {
  for (let i = 0; i < name_disease_group.length; i++) {
    const disease = document.createElement("div");
    const diseaseImageBox = document.createElement("div");
    const diseaseImage = document.createElement("img");
    const diseaseComment = document.createElement("div");
    const detailButton = document.createElement("button");

    disease.className = "lst";
    diseaseImageBox.className = "disease_img";
    diseaseComment.className = "comment";

    diseaseImage.src = `/css/image/${name_disease_group[i].image}`;
    diseaseImage.alt = name_disease_group[i].name + " 사진";
    diseaseImageBox.appendChild(diseaseImage);

    detailButton.id = "button_" + (i + 1);
    detailButton.innerHTML = "자세히보기";

    var short_comment =
      "<h2>" +
      name_disease_group[i].name +
      "</h2><p>" +
      name_disease_group[i].comment +
      "</p>";
    diseaseComment.innerHTML = short_comment;
    diseaseComment.appendChild(detailButton);

    disease.appendChild(diseaseImageBox);
    disease.appendChild(diseaseComment);
    disease_list.appendChild(disease);

    detailButton.addEventListener("click", function () {
      displayDetail(i);
    });
  }
}

function displayDetail(order) {
  while (disease_list.firstChild !== null) {
    disease_list.removeChild(disease_list.firstChild);
  }
  console.log(name_disease_group[order]);

  const detailLeftAlign = document.createElement("div");
  const detailImageBox = document.createElement("div");
  const detailImage = document.createElement("img");

  detailLeftAlign.className = "leftAlign";
  detailImageBox.className = "detailImage";

  detailImage.src = `/css/image/${name_disease_group[order].image}`;
  detailImage.alt = name_disease_group[order].name + " 사진";
  detailImageBox.appendChild(detailImage);

  var detailExplain_1;
  var detailExplain_2;

  if (name_disease_group[order].name === "심정지") {
    let heartAttackBox = document.createElement("div");
    let heartAttack = document.createElement("div");
    let heartAttackButton = document.createElement("button");
    let heartAttackButton_href = document.createElement("a");
    let heartAttackButtonImage = document.createElement("img");
    let heartAttackTitle =
      "<h1>개요: " + name_disease_group[order].name + "</h1>";

    heartAttackBox.className = "heartAttackBox";
    heartAttack.className = "heartAttack";

    heartAttackButton_href.href = "./AEDFind.html";
    heartAttackButton_href.innerHTML = "자동제세동기 위치 찾기";

    heartAttackButtonImage.src = "css/image/AED.PNG";
    heartAttackButtonImage.alt = "자동제세동기 위치 찾기";

    heartAttackButton.appendChild(heartAttackButton_href);
    heartAttack.appendChild(heartAttackButtonImage);
    heartAttack.appendChild(heartAttackButton);
    heartAttackBox.innerHTML = heartAttackTitle;
    heartAttackBox.appendChild(heartAttack);
    detailLeftAlign.appendChild(heartAttackBox);

    detailExplain_1 = '<div style="height: 10px"></div><hr><br>';
    detailExplain_2 =
      "<p>" +
      name_disease_group[order].intro +
      '</p><h1>치료방법</h1><div style="height: 10px"></div><hr><div style="height: 10px"></div><p>' +
      name_disease_group[order].cure +
      "</p>";
  } else {
    detailExplain_1 =
      "<h1>개요: " + name_disease_group[order].name + "</h1><hr><br>";
    detailExplain_2 =
      "<p>" +
      name_disease_group[order].intro +
      '</p><h1>치료방법</h1><div style="height: 10px"></div><hr><div style="height: 10px"></div><p>' +
      name_disease_group[order].cure +
      "</p>";
  }

  detailLeftAlign.innerHTML += detailExplain_1;
  detailLeftAlign.appendChild(detailImageBox);
  detailLeftAlign.innerHTML += detailExplain_2;
  disease_list.appendChild(detailLeftAlign);
}

function displayDetailByCategory() {
  while (disease_list.firstChild !== null) {
    disease_list.removeChild(disease_list.firstChild);
  }
  // console.log(name_disease_group[order]);

  const detailLeftAlign = document.createElement("div");
  const detailImageBox = document.createElement("div");
  const detailImage = document.createElement("img");

  detailLeftAlign.className = "leftAlign";
  detailImageBox.className = "detailImage";

  detailImage.src = `/css/image/${category_disease_group[0].image}`;
  detailImage.alt = category_disease_group[0].name + " 사진";
  detailImageBox.appendChild(detailImage);

  var detailExplain_1;
  var detailExplain_2;

  if (category_disease_group[0].name === "심정지") {
    let heartAttackBox = document.createElement("div");
    let heartAttack = document.createElement("div");
    let heartAttackButton = document.createElement("button");
    let heartAttackButton_href = document.createElement("a");
    let heartAttackButtonImage = document.createElement("img");
    let heartAttackTitle =
      "<h1>개요: " + category_disease_group[0].name + "</h1>";

    heartAttackBox.className = "heartAttackBox";
    heartAttack.className = "heartAttack";

    heartAttackButton_href.href = "./AEDFind.html";
    heartAttackButton_href.alt = "자동제세동기 위치 찾기";
    heartAttackButton_href.innerHTML = "자동제세동기 위치 찾기";

    heartAttackButtonImage.src = "css/image/AED.PNG";
    heartAttackButtonImage.alt = "자동제세동기 위치 찾기";

    heartAttackButton.appendChild(heartAttackButton_href);
    heartAttack.appendChild(heartAttackButtonImage);
    heartAttack.appendChild(heartAttackButton);
    heartAttackBox.innerHTML = heartAttackTitle;
    heartAttackBox.appendChild(heartAttack);
    detailLeftAlign.appendChild(heartAttackBox);

    detailExplain_1 = '<div style="height: 10px"></div><hr><br>';
    detailExplain_2 =
      "<p>" +
      category_disease_group[0].intro +
      '</p><h1>치료방법</h1><div style="height: 10px"></div><hr><div style="height: 10px"></div><p>' +
      category_disease_group[0].cure +
      "</p>";
  } else {
    detailExplain_1 =
      "<h1>개요: " +
      category_disease_group[0].name +
      '</h1><div style="height: 10px"></div><hr><br>';
    detailExplain_2 =
      "<p>" +
      category_disease_group[0].intro +
      '</p><h1>치료방법</h1><div style="height: 10px"></div><hr><div style="height: 10px"></div><p>' +
      category_disease_group[0].cure +
      "</p>";
  }

  detailLeftAlign.innerHTML += detailExplain_1;
  detailLeftAlign.appendChild(detailImageBox);
  detailLeftAlign.innerHTML += detailExplain_2;
  disease_list.appendChild(detailLeftAlign);
}
