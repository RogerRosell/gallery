export const KeywordsList = ({keywords, removeKeyword}: {keywords: string[], removeKeyword: (keyword: string)=>void}) => {

  return (
    <div className="mt-2 flex gap-2">
      {keywords.map((keyword, index) => (
        <button key={index} onClick={() => removeKeyword(keyword)} className="border border-gray-300 rounded-lg px-2 py-1 text-xs hover:bg-black hover:text-white">{keyword}</button>
      ))}
    </div>
  )
}