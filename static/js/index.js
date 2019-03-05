let translateData = {
  from: "en",
  to: "zh",
  q: ""
};

const templates = trans => {
  let html = "";
  for (let index = 0; index < trans.length; index++) {
    const text = trans[index].dst;
    html = html + `<div class="item">${text}</div>`;
  }
  return html;
};

const updateHtml = trans => {
  let to = e(".to");
  console.log("trans html", templates(trans));
  to.innerHTML = templates(trans);
};

const post = (url, data) => {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    headers: {
      "content-type": "application/json"
    },
    method: "POST" // *GET, POST, PUT, DELETE, etc.
  }).then(response => response.json()); // parses response to JSON
};

const apiTranslate = data => {
  post("/translate", data).then(data => {
    console.log("data is", data);
    updateHtml(data.trans_result);
  });
};

// 每次点击就切换中英文
const bindSwap = () => {
  bind(".swap", "click", () => {
    // 找到中文的元素
    let zh = e(".zh");
    // 把文字换成英文
    zh.innerText = "英文";
    // 加上en的样式
    zh.classList.add("en");
    // 去掉ch的样式
    zh.classList.remove("zh");
    // 同上
    let en = e(".en");
    en.innerText = "中文";
    en.classList.add("zh");
    en.classList.remove("en");

    if (translateData.from === "zh") {
      translateData.from = "en";
    } else {
      translateData.from = "zh";
    }

    if (translateData.to === "zh") {
      translateData.to = "en";
    } else {
      translateData.to = "zh";
    }
  });
};

const bindInputChange = () => {
  console.log(99);
  bind(".source", "input", e => {
    console.log(e.target.value);
    translateData.q = e.target.value;
  });
};

const bindEnter = () => {
  bind(".source", "keydown", e => {
    console.log("eeee", e);
    let key = e.key;
    // 如果按下的是Enter就发送翻译的请求
    if (key === "Enter") {
      apiTranslate(translateData);
    }
  });
};

const bindEvents = () => {
  bindSwap();
  bindInputChange();
  bindEnter();
};

const main = () => {
  bindEvents();
};

main();
