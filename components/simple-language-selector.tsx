"use client"

import { useLanguage } from "@/components/language-provider"

export function SimpleLanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-4">
      <p>Current Language: {language}</p>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as any)}
        className="p-2 border rounded-md"
      >
        <option value="en">English</option>
        <option value="kn">ಕನ್ನಡ</option>
        <option value="hi">हिन्दी</option>
        <option value="ur">اردو</option>
        <option value="ks">کٲشُر</option>
        <option value="doi">डोगरी</option>
      </select>
    </div>
  )
}
