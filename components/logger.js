export const logging = ( caller, message, status ) => {
  // caller = The function or peice fo code that called it
  // message = The data to output
  // status = optional data that indicates a status of the message,
  // statusValues = info, warn, error, log; Defaults to log

  status = status || 'log';
  let capCaller = caller.toUpperCase();

  if (process.env.NEXT_PUBLIC_DEBUG) {
    if (status == 'log') {
      console.log(`${capCaller}:: ${message}`);
    } else if (status == 'warn') {
      console.warn(`${capCaller}:: ${message}`);
    } else if (status == 'error') {
      console.error(`${capCaller}:: ${message}`);
    } else if (status == 'info') {
      console.info(`${capCaller}:: ${message}`);
    } else {
      console.warn("LOGGING:: Unsupported Logging Status Passed...");
      console.log(`${capCaller}:: ${message}`);
    }
  }
}
