module.exports = {
    root: true,    
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
    },
    extends: 'airbnb',
    parser: 'babel-eslint',
    rules: {
        "indent": ["error", 2],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "no-console": "error",
        "arrow-parens": 0
    }
}