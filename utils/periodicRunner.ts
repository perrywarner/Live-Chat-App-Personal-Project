/** 
 * executes function that was passed after a delay
 * @param fn - the function that will be executed
 * @param msDelay - default = 1000ms (1 second)
 * @param forever - default = true
 */
export const periodicRunner = (fn: (args: void) => void, msDelay = 1000, forever = true) => {
    if (forever) {
        setInterval(fn, msDelay);
    } else {
        setTimeout(fn, msDelay);
    }
}