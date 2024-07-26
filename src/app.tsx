import * as XLSX from 'xlsx'

const App = () => {
  const generate = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { action: 'getDOM' }, (response) => {
          const book = XLSX.utils.book_new()
          const sheet = XLSX.utils.json_to_sheet(response.data, {
            header: ['买手信息', '买手粉丝数', '本店合作销售额', '本店合作商品数'],
          })

          XLSX.utils.book_append_sheet(book, sheet, 'Sheet1')
          XLSX.writeFile(book, 'json2Sheet.xlsx')
        })
      }
    })
  }

  return (
    <div className="w-[100px] flex justify-center bg-violet-500">
      <button onClick={generate} className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:ring focus:ring-violet-300 rounded-md py-2 px-4 text-white font-semibold shadow-md">
        生成execl
      </button>
    </div>
  )
}

export default App
