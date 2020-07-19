export default function debounce(fn, wait) {
    let timer

    return async function f() {
        if (timer) {
            clearTimeout(timer)
            timer = null
        } else {
            timer = setTimeout(() => {
                fn()
            }, wait)
        }
    }
}