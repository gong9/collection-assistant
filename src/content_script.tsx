//@ts-nocheck

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

  if (msg.action === "getDOM") {
    function extractData() {
      // 获取所有买手信息元素
      const buyerInfoElements = document.querySelectorAll('.distributor-name');
      // 创建一个数组来存储所有的数据
      const tableData = [];

      const wrapper = document.querySelector('.d-table-wrapper');
      const gridTableElements = wrapper.querySelector('.d-grid.d-table');
      const filteredElements = [];

      [...gridTableElements.children].forEach((child) => {
        if (child.classList.contains('d-grid-item') && child.classList.contains('d-td') && child.classList.contains('d-table-cell-border-bottom')) {
          filteredElements.push(child);
        }
      })

      const fanCount = []
      const salesAmount = []
      const productCount = []

      for (let i = 1; i < filteredElements.length; i += 5) {
        fanCount.push(filteredElements[i].querySelector('span').innerText);
      }
      for (let i = 2; i < filteredElements.length; i += 5) {
        salesAmount.push(filteredElements[i].querySelector('span').innerText);
      }
      for (let i = 3; i < filteredElements.length; i += 5) {
        productCount.push(filteredElements[i].querySelector('span').innerText);
      }


      for (let i = 0; i < buyerInfoElements.length; i++) {
        tableData.push({
          买手信息: buyerInfoElements[i].innerText,
          买手粉丝数: fanCount[i],
          本店合作销售额: salesAmount[i],
          本店合作商品数: productCount[i],
        });
      }

      console.table(tableData);

    }

    // 执行数据提取和打印
    extractData();




    chrome.runtime.sendMessage({ action: "processData", content: content }, function (response) {
      if (response.status === 'processing') {
        sendResponse({ status: 'contentSent' });
      }
    });
    
    return true;
  }

});
