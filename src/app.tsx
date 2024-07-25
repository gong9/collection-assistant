import { useState, useEffect } from 'react'

const App = () => {
    const [count, setCount] = useState(0);
    const [currentURL, setCurrentURL] = useState<string>();
    const [data, setData] = useState<any>();

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            setCurrentURL(tabs[0].url);
        });
    }, []);

    const generate = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tab = tabs[0];
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, { action: "getDOM" }, function (response) {
                    if (chrome.runtime.lastError) {
                        console.error(JSON.stringify(chrome.runtime.lastError));
                        return;
                    }
                    if (response.status === 'contentSent') {
                        console.log("元素内容已发送到背景脚本进行处理");

                        // 监听来自背景脚本的完成通知
                        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                            if (request.action === 'downloadComplete') {
                                console.log("Excel文件生成并下载成功");
                            }
                        });
                    }
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