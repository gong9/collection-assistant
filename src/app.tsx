import { useState, useEffect } from 'react'
import * as XLSX from "xlsx";


const App = () => {
    const generate = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tab = tabs[0];
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, { action: "getDOM" }, function (response) {
                    const book = XLSX.utils.book_new()
                    const sheet = XLSX.utils.json_to_sheet(response.data, {
                        header: ['买手信息', '买手粉丝数', '本店合作销售额', '本店合作商品数']
                    })

                    XLSX.utils.book_append_sheet(book, sheet, 'Sheet1')

                    // 写入文件，直接触发浏览器的下载
                    XLSX.writeFile(book, 'json2Sheet.xlsx')
                });
            }
        });
    };

    return (
        <div style={{ minWidth: "500px" }}>
            <button onClick={generate}>生成</button>
        </div>
    );
};

export default App;