import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VigenereCipher() {
  const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";

  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [result, setResult] = useState(null);
  const [showMatrix, setShowMatrix] = useState(false); // Управление видимостью таблицы

  const buildMatrix = () => {
    const size = alphabet.length;
    const matrix = [];
    for (let i = 0; i < size; i++) {
      let row = alphabet.slice(i) + alphabet.slice(0, i);
      matrix.push(row.split(""));
    }
    return matrix;
  };

  const encrypt = () => {
    const matrix = buildMatrix();
    let fullKey = "";
    for (let i = 0; i < text.length; i++) {
      fullKey += key[i % key.length];
    }

    let cipher = "";
    for (let i = 0; i < text.length; i++) {
      const p = text[i].toLowerCase();
      const k = fullKey[i].toLowerCase();
      const row = alphabet.indexOf(k);
      const col = alphabet.indexOf(p);
      if (row !== -1 && col !== -1) {
        cipher += matrix[row][col];
      } else {
        cipher += text[i];
      }
    }
    setResult(cipher);
  };

  const matrix = buildMatrix();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Заголовок */}
      <h1 className="text-4xl font-bold text-center mb-4 text-[#0044CC]">Шифр Виженера</h1>
      <p className="text-center text-gray-500 text-sm mb-8">Классический шифр с использованием ключа</p>

      {/* Кнопка показа/скрытия таблицы */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowMatrix(!showMatrix)}
          className="text-sm sm:text-base text-[#0044CC] hover:text-[#003399] font-medium underline transition duration-200 focus:outline-none cursor-pointer"
        >
          {showMatrix ? 'Скрыть таблицу' : 'Показать таблицу Виженера'}
        </button>
      </div>

      {/* Таблица Виженера — показывается по клику */}
      <AnimatePresence>
        {showMatrix && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-8"
          >
            <div className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-x-auto">
              <table className="w-full text-center text-[0.6rem] sm:text-xs md:text-xs font-mono leading-tight">
                <tbody>
                  {matrix.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      {row.map((ch, j) => (
                        <td
                          key={j}
                          className="p-0.5 sm:p-1 border-t border-l border-gray-100 last:border-r text-gray-700 whitespace-nowrap"
                        >
                          {ch}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Форма ввода */}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
        <label className="block mb-2 text-sm font-semibold text-gray-700">
          Введите исходную строку
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Например: привет"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0044CC] transition"
        />

        <label className="block mt-4 mb-2 text-sm font-semibold text-gray-700">
          Введите ключ
        </label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Например: ключ"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0044CC] transition"
        />

        <button
          onClick={encrypt}
          disabled={!text || !key}
          className="w-full mt-6 bg-[#0044CC] hover:bg-[#003399] disabled:bg-gray-300 
                    text-white font-semibold py-3 rounded-xl transition
                    transform hover:scale-102 active:scale-98 shadow-md cursor-pointer"
        >
          Получить шифр
        </button>

        {/* Результат */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 p-4 bg-blue-50 border border-[#0044CC]/20 rounded-xl text-center text-lg font-mono text-[#0044CC]"
            >
              {result}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Отступ снизу */}
      <div className="h-8" />
    </div>
  );
}
