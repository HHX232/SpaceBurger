module.exports = {
   transform: {
     "^.+\\.(js|jsx)$": "babel-jest"
   },
   moduleNameMapper: {
     "^react-dnd$": "react-dnd/dist/cjs", // Перенаправляем на CommonJS версию
     "^react-dnd-html5-backend$": "react-dnd-html5-backend/dist/cjs"
   },
   transformIgnorePatterns: [
     "node_modules/(?!(react-dnd|dnd-core|react-dnd-html5-backend)/)"  // Транспиляция этих модулей
   ],
   testEnvironment: "jsdom",
   moduleFileExtensions: ["js", "jsx"]
 };
 